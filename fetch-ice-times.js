#!/usr/bin/env node
/**
 * fetch-ice-times.js
 *
 * Reads Newington (Bond Sports monthly calendar page) + Champions (public
 * Google Sheets CSV) rink schedules and syncs Hockey Skills slots into your
 * Goalie Sessions Google Calendar for the next DAYS_AHEAD days.
 *
 * Deletion memory: if you delete an event from your calendar, the script
 * remembers and will never re-add it. Deletions are stored in deleted-events.json.
 *
 * Run manually:   node fetch-ice-times.js
 * Runs on schedule every Sunday morning via Cowork scheduled task.
 */

const { google } = require('googleapis');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// ─── Config ────────────────────────────────────────────────────────────────

const CALENDAR_ID =
  '721f102eadb73ee43a9d593c80643347c806fccf57b0def9604515a8b2a73a7b@group.calendar.google.com';

const SERVICE_ACCOUNT_FILE  = path.join(__dirname, 'service-account.json');
const MANAGED_EVENTS_FILE   = path.join(__dirname, 'managed-events.json');
const DELETED_EVENTS_FILE   = path.join(__dirname, 'deleted-events.json');

const DAYS_AHEAD = 40;

const RINKS = [
  {
    name: 'Newington',
    source: 'bondsports',
    // Bond Sports monthly calendar view. Server-renders the full current month
    // as embedded JSON (unlike the old public Google Sheet CSV export, which
    // only ever exposed a rolling ~1-week window).
    url: 'https://schedule.bondsports.co/schedule/Newington-Arena-Schedule?layout=calendar&view=monthly&session=Hockey+Skills',
    keyword: 'Hockey Skills',
    colorId: '7', // Peacock (teal)
  },
  {
    name: 'Champions',
    source: 'csv',
    csvUrl:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxNJGMpP8MzswDYp5aCteUncCXWF_1fE-dShXZF0d6tgPHZnTRyQNgHOlAG5rSHnUBXFYaeD1DoTAV/pub?output=csv&gid=433713822',
    keyword: 'Open Hockey Skills',
    colorId: '6', // Tangerine (orange)
  },
];

// ─── Persistence helpers ───────────────────────────────────────────────────

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return {};
  }
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ─── HTTP + CSV helpers ────────────────────────────────────────────────────

function fetchUrl(url, redirectCount = 0) {
  if (redirectCount > 5) return Promise.reject(new Error('Too many redirects'));
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'goalie-calendar-bot/1.0' } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        const location = res.headers.location;
        if (!location) return reject(new Error('Redirect with no Location header'));
        res.resume();
        return resolve(fetchUrl(location, redirectCount + 1));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      cells.push(cell.trim());
      cell = '';
    } else {
      cell += ch;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function parseCsv(text) {
  const lines = text.split('\n').map((l) => l.replace(/\r$/, ''));
  const headerIdx = lines.findIndex((l) => l.toLowerCase().includes('start date'));
  if (headerIdx === -1) {
    console.error('  ⚠️  Could not find "Start Date" header row in CSV');
    return [];
  }
  const headers = parseCsvLine(lines[headerIdx]);
  return lines
    .slice(headerIdx + 1)
    .filter((l) => l.trim())
    .map((line) => {
      const vals = parseCsvLine(line);
      const row = {};
      headers.forEach((h, i) => (row[h.trim()] = (vals[i] || '').trim()));
      return row;
    });
}

// ─── Bond Sports calendar page helpers ─────────────────────────────────────

/**
 * The Bond Sports monthly calendar page is a Next.js app that server-renders
 * the full schedule as JSON embedded in the initial HTML (inside
 * self.__next_f.push(...) flight-protocol chunks, with quotes backslash-escaped).
 * There's no documented public API, so we unescape the HTML and regex out each
 * slot object. Each slot's "startDate" carries a T00:00:00.000Z sentinel (the
 * real time lives in "startTime"/"endTime"), and "timezone" is sometimes null.
 */
const BOND_SPORTS_SLOT_RE = new RegExp(
  '"title":"([^"]*)","slotType":"[^"]*","paymentStatus":"[^"]*","approvalStatus":"[^"]*",' +
  '"startDate":"(\\d{4}-\\d\\d-\\d\\d)T00:00:00\\.000Z","startTime":"(\\d\\d:\\d\\d:\\d\\d)",' +
  '"endDate":"\\d{4}-\\d\\d-\\d\\dT00:00:00\\.000Z","endTime":"(\\d\\d:\\d\\d:\\d\\d)",' +
  '"timezone":(?:null|"[^"]*"),"spaceId":\\d+,"instructorsIds":\\[[^\\]]*\\],' +
  '"colorCodeId":(?:\\d+|null),"space":\\{"id":\\d+,"name":"([^"]*)"\\}',
  'g'
);

function parseBondSportsSlots(html, keyword) {
  const text = html.replace(/\\"/g, '"');
  const rows = [];
  let m;
  while ((m = BOND_SPORTS_SLOT_RE.exec(text))) {
    const [, title, dateStr, startTime, endTime, space] = m;
    if (!title.includes(keyword)) continue;
    const [y, mo, d] = dateStr.split('-').map(Number);
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const startDt = new Date(y, mo - 1, d, sh, sm, 0, 0);
    const endDt = new Date(y, mo - 1, d, eh, em, 0, 0);
    const timeLabel = `${startTime.slice(0, 5)}–${endTime.slice(0, 5)}`;
    rows.push({ startDt, endDt, space, timeLabel });
  }
  return rows;
}

// ─── Date / time helpers ───────────────────────────────────────────────────

const MONTH_MAP = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseSheetDate(dateStr) {
  if (!dateStr) return null;
  const clean = dateStr.replace(/^[A-Za-z]+,\s*/, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length < 2) return null;
  const month = MONTH_MAP[parts[0].toLowerCase().slice(0, 3)];
  const day = parseInt(parts[1], 10);
  if (month === undefined || isNaN(day)) return null;
  const now = new Date();
  let d = new Date(now.getFullYear(), month, day);
  if (d < new Date(now.getTime() - 86400000)) {
    d = new Date(now.getFullYear() + 1, month, day);
  }
  return d;
}

function parseTimes(baseDate, timeRange) {
  const parts = timeRange.split('-').map((t) => t.trim());
  const parseOne = (t) => {
    const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return null;
    let h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const ampm = m[3].toUpperCase();
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    const d = new Date(baseDate);
    d.setHours(h, min, 0, 0);
    return d;
  };
  const start = parseOne(parts[0]);
  const end = parts[1] ? parseOne(parts[1]) : null;
  return [start, end || (start ? new Date(start.getTime() + 3600000) : null)];
}

function isWeekend(date) {
  const d = date.getDay();
  return d === 0 || d === 6;
}

function isAfter1PM(date) {
  return date.getHours() >= 13;
}

function isMorning(date) {
  return date.getHours() < 12;
}

// ─── Event key (stable, local-time based) ──────────────────────────────────

/**
 * Builds a stable key from a Date object (using local time) + event summary.
 * Using local time avoids UTC/offset mismatches when comparing created vs. existing events.
 */
function eventKey(date, summary) {
  const p = (n) => String(n).padStart(2, '0');
  const dateStr = `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
  const timeStr = `${p(date.getHours())}:${p(date.getMinutes())}`;
  return `${dateStr}T${timeStr}|${summary}`;
}

// ─── Auth ──────────────────────────────────────────────────────────────────

async function getAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return auth.getClient();
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏒  fetch-ice-times.js starting…\n');

  // Load deletion memory
  const managed = loadJson(MANAGED_EVENTS_FILE); // keys the script has ever added
  const deleted = loadJson(DELETED_EVENTS_FILE); // keys manually deleted by Mitchell
  console.log(`🧠  Memory: ${Object.keys(managed).length} managed, ${Object.keys(deleted).length} blocked\n`);

  const auth = await getAuth();
  const cal = google.calendar({ version: 'v3', auth });

  const now = new Date();
  const windowStart = new Date(now); windowStart.setHours(0, 0, 0, 0);
  const windowEnd   = new Date(now); windowEnd.setDate(windowEnd.getDate() + DAYS_AHEAD);
  windowEnd.setHours(23, 59, 59, 999);

  console.log(`Window: ${windowStart.toDateString()} → ${windowEnd.toDateString()}\n`);

  // Fetch existing calendar events
  const { data } = await cal.events.list({
    calendarId: CALENDAR_ID,
    timeMin: windowStart.toISOString(),
    timeMax: windowEnd.toISOString(),
    singleEvents: true,
    maxResults: 500,
  });
  const existing = data.items || [];

  // Build lookup by our stable local-time key
  const existingByKey = {};
  existing.forEach((e) => {
    const dtStr = e.start?.dateTime || e.start?.date;
    if (!dtStr) return;
    const dt = new Date(dtStr);
    const k = eventKey(dt, e.summary);
    existingByKey[k] = e;
  });
  console.log(`📅  ${existing.length} events already in calendar\n`);

  const seenKeys    = new Set();
  const fetchedRinks = new Set();
  let added = 0, skipped = 0, blocked = 0, removed = 0;
  let managedDirty = false;
  let deletedDirty = false;

  for (const rink of RINKS) {
    console.log(`📋  Fetching ${rink.name} schedule…`);
    let rows;
    try {
      if (rink.source === 'bondsports') {
        const html = await fetchUrl(rink.url);
        rows = parseBondSportsSlots(html, rink.keyword);
      } else {
        const csvText = await fetchUrl(rink.csvUrl);
        rows = parseCsv(csvText)
          .filter((row) => (row['Event Name'] || '').includes(rink.keyword))
          .map((row) => {
            const date = parseSheetDate(row['Start Date']);
            if (!date) return null;
            const [startDt, endDt] = parseTimes(date, row['Time'] || '');
            if (!startDt || !endDt) return null;
            const space = (row['Space'] || rink.name)
              .replace(/\s*-\s*Champions Skating Center/i, '')
              .replace(/\s*-\s*Newington Ice/i, '')
              .trim();
            return { startDt, endDt, space, timeLabel: row['Time'] || '' };
          })
          .filter(Boolean);
      }
      fetchedRinks.add(rink.keyword);
    } catch (err) {
      console.error(`  ❌  Could not fetch schedule: ${err.message}`);
      console.error(`  ⚠️   Skipping stale removal for ${rink.name} to avoid accidental deletions.`);
      continue;
    }

    console.log(`  ${rows.length} rows parsed`);

    for (const row of rows) {
      const { startDt, endDt, space, timeLabel } = row;
      if (startDt < windowStart || startDt > windowEnd) continue;

      // Time filter: weekdays must be a morning slot (before noon) or ≥ 1:00 PM; weekends any time
      if (!isWeekend(startDt) && !isMorning(startDt) && !isAfter1PM(startDt)) continue;

      const summary = `Open Lesson – ${space}`;
      const key = eventKey(startDt, summary);
      seenKeys.add(key);

      // 1. Skip if user has blocked this event (manually deleted before)
      if (deleted[key]) {
        blocked++;
        continue;
      }

      // 2. Skip if already in calendar
      if (existingByKey[key]) {
        skipped++;
        continue;
      }

      // 3. If it was previously managed but is now missing from calendar → user deleted it
      if (managed[key]) {
        console.log(`  🚫  Blocked (you deleted this): ${summary} on ${startDt.toDateString()} @ ${timeLabel}`);
        deleted[key] = true;
        deletedDirty = true;
        blocked++;
        continue;
      }

      // 4. Genuinely new — add to calendar
      try {
        await cal.events.insert({
          calendarId: CALENDAR_ID,
          requestBody: {
            summary,
            start: { dateTime: startDt.toISOString(), timeZone: 'America/New_York' },
            end:   { dateTime: endDt.toISOString(),   timeZone: 'America/New_York' },
            colorId: rink.colorId,
            description: `Rink: ${space}\nSource: ${rink.name} schedule`,
          },
        });
        console.log(`  ✅  Added: ${summary} on ${startDt.toDateString()} @ ${timeLabel}`);
        managed[key] = true;
        managedDirty = true;
        added++;
      } catch (err) {
        console.error(`  ❌  Failed to add "${summary}": ${err.message}`);
      }
    }
    console.log('');
  }

  // Remove events that are no longer on the rink schedule (rink cancelled/moved them)
  // Only for rinks we successfully fetched. Never remove blocked events.
  for (const [key, event] of Object.entries(existingByKey)) {
    const belongsToFetchedRink = [...fetchedRinks].some((kw) => event.summary?.includes(kw));
    if (!seenKeys.has(key) && belongsToFetchedRink && !deleted[key]) {
      try {
        await cal.events.delete({ calendarId: CALENDAR_ID, eventId: event.id });
        console.log(`🗑️   Removed (rink schedule changed): ${event.summary}`);
        // Clean up from managed so it can be re-added if the rink puts it back
        delete managed[key];
        managedDirty = true;
        removed++;
      } catch (err) {
        console.error(`  ❌  Failed to remove "${event.summary}": ${err.message}`);
      }
    }
  }

  // Save updated memory files
  if (managedDirty) saveJson(MANAGED_EVENTS_FILE, managed);
  if (deletedDirty) saveJson(DELETED_EVENTS_FILE, deleted);

  console.log(`\n✅  Done — added: ${added}, existed: ${skipped}, blocked: ${blocked}, removed: ${removed}`);
}

main().catch((err) => {
  console.error('\n💥  Fatal error:', err.message);
  process.exit(1);
});
