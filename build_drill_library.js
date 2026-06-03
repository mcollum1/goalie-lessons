#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   build_drill_library.js
   Run from the Goalie Lessons folder:  node build_drill_library.js

   Reads all drills/*.json files and regenerates drill_library.js
   ═══════════════════════════════════════════════════════════════════════ */

const fs   = require('fs');
const path = require('path');

const DRILLS_DIR = path.join(__dirname, 'drills');
const OUT_FILE   = path.join(__dirname, 'drill_library.js');

// Load and parse every JSON file in drills/
const drills = fs
  .readdirSync(DRILLS_DIR)
  .filter(f => f.endsWith('.json'))
  .map(f => {
    try {
      return JSON.parse(fs.readFileSync(path.join(DRILLS_DIR, f), 'utf8'));
    } catch (e) {
      console.error(`❌  Failed to parse ${f}:`, e.message);
      process.exit(1);
    }
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const drillsJson = JSON.stringify(drills, null, 2)
  .split('\n')
  .map((line, i) => i === 0 ? '  ' + line : '  ' + line)
  .join('\n');

const output = `/* ═══════════════════════════════════════════════════════════════════════
   drill_library.js — Goalie Coach App · Drill Library Bundle
   Auto-generated from drills/*.json (${drills.length} drills)
   Run: node build_drill_library.js

   Exports: window.DRILL_LIBRARY (array) + window.filterDrills(params)
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Full drill library ──────────────────────────────────────────── */
  const DRILLS = ${drillsJson};

  /* ── filterDrills(params) ────────────────────────────────────────────
     Pre-filters the library to candidate drills before sending to the AI.
     Keeps the prompt lean and avoids sending obviously ineligible drills.

     params {
       shooters:  number  — how many shooters are available
       screener:  string  — 'yes' | 'no' | 'skip'
       level:     string  — 'beginner' | 'intermediate' | 'advanced'
       focus:     string  — drill_category value or 'surprise_me'
       goalies:   number  — how many goalies (affects requires_goalie_partner)
     }
  ─────────────────────────────────────────────────────────────────── */
  function filterDrills(params) {
    const { shooters, screener, level, focus, goalies } = params;

    // Difficulty rank for ceiling checks
    const LEVEL_RANK = { beginner: 1, intermediate: 2, advanced: 3 };
    const sessionRank = LEVEL_RANK[level] ?? 2;

    const availableShooters = Number(shooters) || 0;

    const filtered = DRILLS.filter(d => {
      // Shooter count: drill needs no more shooters than available
      if (shooters != null && d.shooter_count_min > availableShooters) return false;

      // Screener: hide screener drills when coach said no / skip
      if ((screener === 'no' || screener === 'skip') && d.requires_screener) return false;

      // Screener drill only if explicitly available
      if (screener === 'yes' || screener == null) { /* allow all */ }

      // Goalie partner: needs a second goalie actively participating
      if (d.requires_goalie_partner && Number(goalies) < 2) return false;

      // Difficulty ceiling: don't offer advanced drills to beginners
      const drillRank = LEVEL_RANK[d.difficulty] ?? 2;
      if (drillRank > sessionRank + 1) return false;

      return true;
    });

    // When multiple shooters are available, sort skill_work drills so
    // higher shooter_count_min drills bubble up — the AI sees the best
    // utilization options first and is prompted to prefer them.
    if (availableShooters >= 2) {
      const SLOT_ORDER = { warmup: 0, skill_work: 1, compete: 2 };
      filtered.sort((a, b) => {
        const slotA = SLOT_ORDER[a.session_slot] ?? 1;
        const slotB = SLOT_ORDER[b.session_slot] ?? 1;
        if (slotA !== slotB) return slotA - slotB;
        // Within skill_work: prefer drills that use more shooters
        if (a.session_slot === 'skill_work') {
          return b.shooter_count_min - a.shooter_count_min;
        }
        return 0;
      });
    }

    return filtered;
  }

  /* ── Public API ───────────────────────────────────────────────────── */
  window.DRILL_LIBRARY = DRILLS;
  window.filterDrills  = filterDrills;

  console.log('[DrillLibrary] Loaded', DRILLS.length, 'drills');
})();
`;

fs.writeFileSync(OUT_FILE, output, 'utf8');
console.log(`✅  drill_library.js rebuilt — ${drills.length} drills`);
drills.forEach(d => console.log(`   · ${d.id}`));
