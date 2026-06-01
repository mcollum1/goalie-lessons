# HockeyHub Goalie Coach App — CLAUDE.md

**Owner:** Coach Mitch (mitchcollum@gmail.com)  
**Live URL:** https://goalie-coach.pages.dev (Cloudflare Pages)  
**Repo:** `/Users/mmartins-collum/Documents/Claude/Projects/Goalie Lessons/`

---

## Stack & Architecture

- **Pure HTML/CSS/JS** — no framework, no build step, no bundler. Keep it that way until there's a real reason to change.
- **`db.js`** — localStorage-backed data layer (`GoalieStore`, `SessionStore`, `PlanStore`, `DrillUsageStore`). The API is intentionally designed to swap to Supabase without changing call sites. Don't bypass it with raw `localStorage` calls.
- **`drill_library.js`** — 45 drills as `window.DRILL_LIBRARY` array + `window.filterDrills(params)`. Each drill has `name`, `description`, `session_slot` (`warmup|skill_work|compete`), `difficulty_level`, `requires_goalie_partner`, `min_shooters`, `max_shooters`, `duration_minutes`, `focus_tags[]`, `coach_notes`, `clip`. Fields `own_content` (bool) and `clip_credit` (string) are planned but not yet added to schema.
- **`sw.js`** — Service worker, cache version `hh-goalie-v2`.
- **AI plan generation** — POST to `https://whawnvlctxrfzkyvivca.supabase.co/functions/v1/generate-plan` with `{ params, drills }`. `params` includes `goalie_notes` (injected from `GoalieStore`).
- **Google Calendar** — OAuth 2.0 via Google Identity Services (GIS). Client ID: `329026777999-v4hljil36dfe58e3bvpsibdet15a4oa1.apps.googleusercontent.com`. Token cached in localStorage. OAuth flow lives in `index.html` ~line 3047–3580.

---

## File Map

| File | Purpose |
|------|---------|
| `index.html` | Home — session cards, AI plan chat sheet, goalie profile sheet, Google Calendar auth |
| `session.html` | On-ice drill runner — video, timer, swipe nav, completion screen |
| `lesson_plan_preview_crease_positioning.html` | Lesson plan view/editor *(rename target: `plan.html`)* |
| `db.js` | Data layer — GoalieStore, SessionStore, PlanStore, DrillUsageStore |
| `drill_library.js` | Drill library — `window.DRILL_LIBRARY`, `window.filterDrills()` |
| `sw.js` | Service worker |
| `manifest.json` | PWA manifest |
| `drill-review.html` | Admin drill review page |
| `fetch-ice-times.js` | Cloudflare Worker for secondary calendar |
| `drill-clips/` | Video clips folder |

---

## Key Globals & localStorage Patterns

```javascript
// Data access (always use db.js, never raw localStorage)
window.DB.GoalieStore.save({ id, name, notes, level, ... })
window.DB.GoalieStore.getById(id)
window.DB.GoalieStore.getAll()

// Sheet inter-script communication (IIFE scope isolation workaround)
window._hhOpenSheet(context)           // open AI plan chat sheet
window._hhOpenProfileSheet(name, id)   // open goalie profile sheet
window._hhApplySavedPlanState(btn)     // toggle "View plan" vs "Build plan"

// Plan flow keys (direct localStorage — outside db.js by design)
localStorage.getItem('hh_pending_plan')          // plan JSON in transit to plan page
localStorage.getItem('hh_rebuild_context')       // session context for rebuild flow
localStorage.getItem('savedPlan_<goalie>')       // saved plan per goalie
localStorage.getItem('hh_raw_notes_<goalieId>')  // raw note queue per goalie
```

---

## Design Tokens

CSS custom properties in `index.html` (should eventually move to shared `tokens.css`):
- `--gc-navy: #1c3150`
- `--hh-primary: #2563eb`
- Phase color variables per drill type (`--phase-warmup`, `--phase-skill`, `--phase-compete`)

---

## Open Priorities

### 1 — Google OAuth Error (UNRESOLVED — manual fix needed)
**Error:** `Error 400: invalid_request` on live deployment.  
**Cause:** `https://goalie-coach.pages.dev` not in the OAuth client's Authorized JavaScript Origins.  
**Fix:** Google Cloud Console → APIs & Services → Credentials → "Coach Mitch" OAuth 2.0 Client → add `https://goalie-coach.pages.dev` to Authorized JavaScript Origins. Also add any Cloudflare preview URLs. Takes ~5 min to propagate.  
**Also check:** OAuth consent screen — app must be in "Production" mode, or mitchcollum@gmail.com listed as test user.

### 2 — Expand Drill Library
Add to `drill_library.js` (full library sent to edge function on every plan build):
- Powerslide circuit drills (tall upper body, full hip rotation)
- Pivot-to-powerslide chains
- Glove tracking / hand save drills
- More compete formats

### 3 — Own Content Tagging
Add to drill schema in `drill_library.js`:
```javascript
own_content:     boolean,  // true = filmed by Coach Mitch, monetizable
clip_credit:     string,   // e.g. "HockeyShare" when own_content: false
clip_source_url: string,   // original URL for audit trail
```
UI: small "CM" badge on drill cards in plan page + session page for own content. Content status dashboard in `drill-review.html`.

### 4 — Calendar Sync (Post-Revenue)
Allow coaches/parents to sync session schedules to external calendars. Defer until the app generates revenue — implement only with free-tier or zero-cost options.

- **Google Calendar** — already partially wired (OAuth in `index.html`). Extend to let users subscribe to their goalie's schedule. Free via Google Calendar API.
- **Apple Calendar / iCal** — serve a static `.ics` feed (no auth required, zero cost). One URL per coach or per goalie that any calendar app can subscribe to.
- **Outlook / Microsoft 365** — `.ics` subscription works here too; no additional cost.
- **Constraint:** do not add any paid third-party scheduling service (Calendly, Cronofy, etc.) until revenue justifies it. `.ics` feed covers 90% of the use case for free.

### 5 — Pre-commercial Architecture
- **Rename** `lesson_plan_preview_crease_positioning.html` → `plan.html`
- **Extract** shared CSS to `tokens.css` + `styles.css` (currently inline per file)
- **Multi-tenant auth:** Supabase RLS per `coach_id` when scaling beyond single coach
- **Data migration:** localStorage → Supabase tables (`goalies`, `sessions`, `plans`, `drill_usage`, `coach_notes`)
- **Clip serving:** `drill-clips/*.mp4` → Cloudflare R2 or Supabase Storage with signed URLs

---

## Goalie Roster

Jake Reynolds, Mason K., Lily P., Aiden Torres, Eli M., Sam C., Fischer Rogers (Pomfret)

**Fischer Rogers coaching notes** — paste in browser DevTools if not already saved:
```javascript
(function() {
  const all = JSON.parse(localStorage.getItem('hh_goalies') || '[]');
  const idx = all.findIndex(g => g.name && g.name.toLowerCase().includes('fischer'));
  if (idx < 0) { console.warn('Fischer not found:', all.map(g=>g.name)); return; }
  all[idx].notes = `PRIORITY — Glove hand: snapping DOWN after the save instead of tracking straight to the puck. Hand needs to hold its line through contact and stay on the puck path, not collapse. This is the #1 thing.\n\nPOWERSLIDE mechanics (multiple issues):\n- Not completing full hip rotation before initiating the push — rotation must finish first\n- Back leg too slow coming through; needs to be sharper and more decisive\n- Oversliding and flattening out at the end — losing butterfly base at finish\n- Loading too low: butt dropping, which collapses the upper body forward\n- Fix: keep upper body tall through the load; drive the pivot up and out, not down across\n\nDRILL FOCUS (next session):\n- Powerslide circuit — tall upper body through load, full rotation before push\n- Pivot-to-powerslide chain — clean up rotation timing into the push\n- Warmup tracking drill — cue "straight line to the puck" on every glove save\n\nWARMUP NOTE: Watch hands immediately after each save. Reset cue: "straight line."`;
  all[idx].updated_at = new Date().toISOString();
  localStorage.setItem('hh_goalies', JSON.stringify(all));
  console.log('✓ Notes saved for', all[idx].name);
})();
```

---

## Git Notes

If you see `.git/index.lock` or `.git/HEAD.lock` errors, remove them:
```bash
rm -f .git/index.lock .git/HEAD.lock
```

The app deploys automatically to Cloudflare Pages on push to `main`.
