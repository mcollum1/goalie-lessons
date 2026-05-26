# HockeyHub Goalie Coach App — Session Handoff
**Date:** May 26, 2026  
**Developer/Owner:** Coach Mitch (mitchcollum@gmail.com)  
**Live URL:** https://goalie-coach.pages.dev (Cloudflare Pages)  
**Repo:** Local at `/Users/mmartins-collum/Documents/Claude/Projects/Goalie Lessons/`

---

## What This App Is

A **Progressive Web App (PWA)** for an ice hockey goalie coach. Coach Mitch uses it on his iPhone/iPad rinkside and on his MacBook at home. Core workflow:

1. **Home screen** (`index.html`) — shows upcoming sessions pulled live from Google Calendar. Tap "Build plan" on any session card to open an AI chat that generates a drill plan. Tap "Profile" to view/edit notes for that goalie.
2. **Lesson plan page** (`lesson_plan_preview_crease_positioning.html`) — shows the AI-generated plan, lets coach add/remove/swap drills, shows video clips, recalculates total time. Save plan or "Save & Start."
3. **On-ice session** (`session.html`) — drill-by-drill swipe-through view with video, timer, coaching cues. Completion screen with back-to-plan and back-to-last-drill options.
4. **Goalie profile sheet** — slides up from any session card. Shows coach notes, text + voice dictation input, pending raw notes queue, AI cleanup button.

**Stack:**
- Pure HTML/CSS/JS — no framework, no build step
- `db.js` — localStorage-backed data layer (GoalieStore, SessionStore, PlanStore, DrillUsageStore). API designed to be swapped to Supabase later without changing call sites.
- `drill_library.js` — 45 drills as a JS object (`window.DRILL_LIBRARY`), each with name, description, session_slot, difficulty_level, coach_notes, requires_goalie_partner, etc.
- `sw.js` — service worker, cache version `hh-goalie-v2`, offline-capable for app shell + drill clips
- AI plan generation: POST to Supabase Edge Function at `https://whawnvlctxrfzkyvivca.supabase.co/functions/v1/generate-plan` with `{ params, drills }`. `params` now includes `goalie_notes` field (coach's notes for that goalie, injected from DB).
- Google Calendar API: OAuth 2.0 via Google Identity Services (GIS), client ID `329026777999-v4hljil36dfe58e3bvpsibdet15a4oa1.apps.googleusercontent.com`. Token cached in localStorage.

---

## Priority 1 — Fix Google OAuth Error

**Error:** `Error 400: invalid_request` — "doesn't comply with Google's OAuth 2.0 policy for keeping apps secure."

**Cause:** The deployed Cloudflare Pages URL is not in the OAuth client's Authorized JavaScript Origins list.

**Fix (Google Cloud Console):**
1. Go to https://console.cloud.google.com → APIs & Services → Credentials
2. Click the OAuth 2.0 Client ID (app name: "Coach Mitch")
3. Under **Authorized JavaScript origins**, add:
   - `https://goalie-coach.pages.dev`
   - Any Cloudflare preview URLs being tested (e.g. `https://abc123.goalie-coach.pages.dev`)
4. Leave Authorized Redirect URIs untouched (GIS uses popup/implicit flow, not redirects)
5. Save — takes ~5 minutes to propagate

**The OAuth flow lives in `index.html`** around line 3047–3580, in the calendar IIFE. Key pieces:
```javascript
const CLIENT_ID = '329026777999-v4hljil36dfe58e3bvpsibdet15a4oa1.apps.googleusercontent.com';
const SCOPES    = 'https://www.googleapis.com/auth/calendar.readonly';
```

**Secondary check:** In Google Cloud Console → APIs & Services → OAuth consent screen — make sure the app is in "Production" mode (not "Testing"), or that mitchcollum@gmail.com is listed as a test user if still in Testing.

---

## Priority 2 — Expand the Drill Library

**Current state:** 45 drills in `drill_library.js` — 19 warmup, 22 skill_work, 4 compete. No video clips attached (clips would be in `drill-clips/` folder, referenced by path).

**Drill schema (each entry in `window.DRILL_LIBRARY`):**
```javascript
{
  name:                    string,   // display name
  description:             string,   // full drill description
  session_slot:            "warmup" | "skill_work" | "compete",
  difficulty_level:        "beginner" | "intermediate" | "advanced",
  requires_goalie_partner: boolean,
  min_shooters:            number,
  max_shooters:            number,
  duration_minutes:        number,
  focus_tags:              string[],  // e.g. ["powerslide","butterfly","tracking"]
  coach_notes:             string,    // rich coaching cues (long-form)
  clip:                    string,    // path e.g. "drill-clips/my-clip.mp4" (optional)
  // TO ADD:
  own_content:             boolean,   // true = Coach Mitch's own recorded content
  clip_credit:             string,    // attribution if not own content
}
```

**To add new drills:** Append objects to the array in `drill_library.js`. The AI plan generator sends the full library to the edge function on every plan build, so new drills are immediately available.

**Gaps to fill (based on Coach Mitch's priorities):**
- More powerslide-specific drills (full rotation, tall upper body cues)
- Pivot-to-powerslide chains
- Glove tracking / hand save drills
- More compete formats

---

## Priority 3 — Own Content Tagging

**Goal:** Coach Mitch is filming his own drill demonstrations. As clips are replaced, they need to be tagged `own_content: true`. Eventually all content will be his own, enabling monetization.

**Schema addition needed in `drill_library.js`:**
```javascript
own_content:  boolean,   // true = filmed by Coach Mitch, can be monetized
clip_credit:  string,    // e.g. "HockeyShare" or "HockeyTraining.com" when own_content: false
clip_source_url: string, // original URL if sourced externally (for reference/audit)
```

**UI considerations:**
- On the lesson plan page drill cards, a small indicator (e.g. a tiny "CM" badge or lock icon) could show own vs. third-party content so Mitch knows what's been replaced
- The admin/drill review pages (`drill-review.html`, `drill_card_preview.html`) could show a content status dashboard
- When selling/licensing the app, a feature flag could hide third-party clips from non-licensed users

**Files that render clips:**
- `lesson_plan_preview_crease_positioning.html` — `<video>` in drill cards, src set from drill's `clip` field
- `session.html` — `<video>` per drill in the session runner

---

## Priority 4 — Architecture & Quality for Commercial Sale

**Current strengths:**
- Clean data layer abstraction (`db.js`) — already designed for Stage 1 (localStorage) → Stage 2 (IndexedDB) → Stage 3 (Supabase) migration without changing call sites
- PWA-ready: manifest, service worker, offline-capable
- Responsive: tested on iPhone, iPad, MacBook

**Known architecture gaps to address before commercializing:**

### Auth & Multi-tenant
- Currently single-coach (hardcoded to Mitch's Google Calendar & Supabase project)
- Will need coach accounts, team/organization grouping, per-coach drill libraries
- Supabase is already in the stack — RLS (Row Level Security) tables per coach_id is the right path

### Data layer migration
- Move from localStorage → Supabase tables (the DB API is designed for this)
- Priority tables: `goalies`, `sessions`, `plans`, `drill_usage`, `coach_notes`
- localStorage keys today: `hh_goalies`, `hh_sessions`, `hh_plans`, `hh_drill_usage`, `hh_raw_notes_<goalieId>`

### Monetization-ready clip serving
- Clips currently local (`drill-clips/*.mp4`)
- For commercial: move to Cloudflare R2 or Supabase Storage with signed URLs
- `own_content: true` drills get full access; `own_content: false` clips phase out

### Code quality
- No framework is intentional for now (load speed, no build step), but as complexity grows consider Vite + vanilla JS or SvelteKit — both can output a PWA with no runtime overhead
- CSS is inline in each HTML file — should be extracted to shared `styles.css` before it becomes unmaintainable
- The `lesson_plan_preview_crease_positioning.html` filename is a leftover prototype name — should be renamed to `plan.html`

### Design system
- Color tokens and typography are already defined as CSS custom properties (`--hh-*` variables in `index.html`)
- These should be moved to a shared `tokens.css` file so all pages stay in sync
- Current palette: `--gc-navy: #1c3150`, `--hh-primary: #2563eb` (blue), phase colors for each drill type

---

## File Map

| File | Purpose |
|------|---------|
| `index.html` | Home screen — session cards, AI plan chat sheet, goalie profile sheet, Google Calendar auth |
| `session.html` | On-ice drill runner — video, timer, swipe nav, completion screen |
| `lesson_plan_preview_crease_positioning.html` | Lesson plan view/editor — should be renamed `plan.html` |
| `db.js` | localStorage data layer — GoalieStore, SessionStore, PlanStore, DrillUsageStore |
| `drill_library.js` | 45 drills — `window.DRILL_LIBRARY` array, `window.filterDrills(params)` |
| `sw.js` | Service worker — cache version `hh-goalie-v2` |
| `manifest.json` | PWA manifest |
| `drill-review.html` | Drill review/admin page |
| `fetch-ice-times.js` | Cloudflare Worker that fetches a secondary calendar |
| `drill-clips/` | Video clips folder (currently placeholder/external links) |

---

## Key Globals & Patterns

```javascript
// Data access
window.DB.GoalieStore.save({ id, name, notes, level, ... })
window.DB.GoalieStore.getById(id)
window.DB.GoalieStore.getAll()

// Sheet inter-script communication (IIFE scope isolation workaround)
window._hhOpenSheet(context)           // open AI plan chat sheet
window._hhOpenProfileSheet(name, id)   // open goalie profile sheet
window._hhApplySavedPlanState(btn)     // show "View plan" vs "Build plan"

// Plan flow localStorage keys
localStorage.getItem('hh_pending_plan')        // plan JSON in transit to plan page
localStorage.getItem('hh_rebuild_context')     // session context for rebuild flow
localStorage.getItem('savedPlan_<goalie>')     // saved plan per goalie
localStorage.getItem('hh_raw_notes_<goalieId>') // raw note queue per goalie
```

---

## Recent Commits (last 5)
```
6059287 Fix completion screen: add dismissCompletion() and back-to-plan button handler
12b7737 Fix Rebuild button: store session context in localStorage, open chat sheet directly
4c41ba0 Save stays on plan page; always serialize DOM to localStorage on save
382ce1b Fix scope error: expose applySavedPlanState globally for calendar wireNewCards
ccec3dc Fix View Plan state on home; serialize edited plan before session; easy back-to-plan
```

---

## Outstanding Git Issue
There are stale `.git/HEAD.lock` and `.git/index.lock` files (owned by a different process UID in the sandbox) blocking commits from the AI session. Run this from Terminal before continuing:
```bash
cd "/Users/mmartins-collum/Documents/Claude/Projects/Goalie Lessons"
rm .git/index.lock .git/HEAD.lock
git add -A && git commit -m "Add goalie profile sheet: voice/text notes, AI cleanup, inject notes into plan gen" && git push
```
The profile sheet feature (goalie notes, voice recording, AI cleanup, notes injected into plan gen) is fully written in `index.html` but not yet committed.

---

## Goalie Roster (localStorage seed data)
Jake Reynolds, Mason K., Lily P., Aiden Torres, Eli M., Sam C.  
Fischer Rogers (Pomfret) — added via UI, notes to be added via console snippet below.

**Console snippet to add Fischer's coaching notes** (paste in browser DevTools on the live app):
```javascript
(function() {
  const all = JSON.parse(localStorage.getItem('hh_goalies') || '[]');
  const idx = all.findIndex(g => g.name && g.name.toLowerCase().includes('fischer'));
  if (idx < 0) { console.warn('Fischer not found:', all.map(g=>g.name)); return; }
  all[idx].notes = `PRIORITY — Glove hand: snapping DOWN after the save instead of tracking straight to the puck. Hand needs to hold its line through contact and stay on the puck path, not collapse. This is the #1 thing.

POWERSLIDE mechanics (multiple issues):
- Not completing full hip rotation before initiating the push — rotation must finish first
- Back leg too slow coming through; needs to be sharper and more decisive
- Oversliding and flattening out at the end — losing butterfly base at finish
- Loading too low: butt dropping, which collapses the upper body forward
- Fix: keep upper body tall through the load; drive the pivot up and out, not down across

DRILL FOCUS (next session):
- Powerslide circuit — tall upper body through load, full rotation before push
- Pivot-to-powerslide chain — clean up rotation timing into the push
- Warmup tracking drill — cue "straight line to the puck" on every glove save

WARMUP NOTE: Watch hands immediately after each save. Reset cue: "straight line."`;
  all[idx].updated_at = new Date().toISOString();
  localStorage.setItem('hh_goalies', JSON.stringify(all));
  console.log('✓ Notes saved for', all[idx].name);
})();
```
