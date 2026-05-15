# Hockey Goalie Coach App — Session Handoff Prompt
**Last updated: May 2026 · For use with Claude Sonnet**

---

## Your role

You are a senior full-stack engineer and product designer continuing work on a professional hockey goalie coaching app for Coach Mitch, a goalie coach based in Connecticut who runs private and semi-private on-ice lessons. The app is coach-facing (not player-facing) and must feel like a premium, polished iOS mobile app. All files are self-contained HTML/CSS/JS — no frameworks, no build tools. Continue exactly from the current state described below.

---

## What exists right now

The app is a Progressive Web App (PWA) built as static HTML files in the `Goalie Lessons/` folder. Two screens are complete and functional:

1. **`index.html`** — The home screen. Shows upcoming lesson cards, AI chat entry point, quick stats. Fully styled.
2. **`lesson_plan_preview_crease_positioning.html`** — The AI-generated lesson plan view. Shows a session overview header + drill cards. Fully styled. This is where coaches review and modify the plan before heading to the rink.

The AI plan generation backend is a live Supabase Edge Function.

---

## Architecture

### Frontend
- `index.html` — Home screen
- `lesson_plan_preview_crease_positioning.html` — Lesson plan review page
- `drill_library.js` — Client-side drill library; exposes `window.DRILL_LIBRARY` (array of ~45 drill objects) and `window.filterDrills(params)` pre-filter function
- `db.js` — SessionStore and GoalieStore (exist but home screen cards are still hardcoded HTML, not yet wired to this)
- `icon.svg` — App icon (1024×1024 squircle, top-down hockey crease design: cream `#F1ECE0` background, red `#D6342E` goal line/arc/posts, light blue `#B9D6EE` crease fill, black `#0A0A0C` puck)
- `drills/*.json` — ~45 individual drill JSON files (the source of truth for the drill library)

### Backend
- **Supabase project**: `whawnvlctxrfzkyvivca`
- **Edge Function**: `generate-plan` (currently v5)
  - Deno/TypeScript
  - Calls Anthropic API with model `claude-sonnet-4-6`
  - `verify_jwt: false` (no auth required)
  - Receives: `{ focus, duration, level, goalies, shooters, screener, drill_library, session_context }`
  - Returns: raw JSON plan string (markdown fences stripped by the function)
  - Key rule baked into system prompt: when 2+ shooters available, strongly prefer `skill_work` drills with `shooter_count_min ≥ 2`
- **Function file**: `supabase/functions/generate-plan/index.ts`

### Data flow: home → plan
1. Coach taps "Build Plan" on a lesson card in `index.html`
2. `index.html` builds a URL with query params: `?goalie=...&goalieId=...&sessionId=...&level=...&duration=...&goalies=...&shooters=...&screener=...&focus=...`
3. Navigates to `lesson_plan_preview_crease_positioning.html` (or optionally opens the chat overlay on index.html first)
4. On that page, `SESSION` object is parsed from URL params
5. On load, `buildPlan()` calls the Supabase Edge Function with `SESSION` data + `window.DRILL_LIBRARY`
6. Response is parsed and `renderDynamicPlan(plan)` builds the drill cards
7. Plan is stored in `localStorage.hh_pending_plan` (for rebuild flow)

---

## Design system

| Token | Value |
|---|---|
| Background | `#f2f2f7` |
| Cards | `white`, `border-radius: 20px`, `box-shadow: 0 2px 14px rgba(0,0,0,0.09)` |
| Header / nav | `#1c3150` (deep navy) |
| Font | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| Skating phase | `#18a6c8` (teal) |
| Shot warmup phase | `#e05c2a` (orange) |
| Skill work phase | `#378ADD` (blue) |
| Compete phase | `#17a064` (green) |
| Max width | 390px |
| Spacing unit | 8px |

### Goalie avatar system
Deterministic tone assignment: `TONES[(firstCharCode - 65) % 4]` where tones are a/b/c/d (coral, teal, amber, slate). Same goalie always gets the same color. Initials = first letter of first name + first letter of last name. Used in three places: home screen lesson cards, chat context strip (overlapping circles), and lesson plan header.

### App icon
`icon.svg` — 1024×1024 with squircle clip path (real iOS shape, not border-radius). Use `<link rel="icon" type="image/svg+xml" href="icon.svg">` and `<link rel="apple-touch-icon" href="icon.svg">` in all HTML files.

---

## What was built in the last session

### `index.html` changes (complete)
- Removed confirmed/pending status pills from lesson cards
- Replaced brand-mark SVG mask icon with the new `icon.svg` image (32×32, `border-radius: 9px`, removed `::before` gradient overlay)
- Replaced `.chat-context-icon` CSS with `.ctx-avatars` + `.ctx-avatar` overlapping circles layout
- Rewrote `renderContextStrip(ctx)` to generate goalie avatar circles from `ctx.goalie` — splits on `&` for multi-goalie sessions, uses same `initials()` + `tone()` helpers as lesson cards
- Updated the static Jake Reynolds plan card `onclick` to pass correct URL params to lesson plan page

### `lesson_plan_preview_crease_positioning.html` changes (complete)
- Added `.ph-rebuild` CSS (ghost/outlined secondary button)
- Added `rebuildPlan()` JS + event listener → navigates back to `index.html?rebuild=sessionId`
- **Smart swap**: Rewrote swap modal to pull real drills from `DRILL_LIBRARY` filtered by same phase/slot (removed hardcoded `SWAP_OPTIONS`). Applying a swap fully rebuilds the card HTML in-place (video, badges, name, description, stats, cues).
- **Drill picker**: Full bottom-sheet browse modal with live search. Coach can add a drill to any phase. Tapping "Add Drill +" opens the picker filtered to that phase. Already-in-plan drills are shown dimmed. Added drill animates in with a slide-down effect.
- Goalie avatars in session header: `renderGoalieAvatars()` reads `SESSION.goalies` list and renders the same avatar circles from the home screen into a `.lp-goalie-row` above the session title
- Added PWA meta tags: `viewport-fit=cover`, `apple-mobile-web-app-capable`, `theme-color`, favicon links

### `icon.svg` (complete)
Final file is the V1 crease design: 1024×1024 squircle, top-down hockey crease with cream background, red posts/crossbar/line/arc, light blue crease fill, black puck.

---

## Current known issues / gaps

1. **`manifest.json` not yet created** — needed for proper "Add to Home Screen" PWA install on iPhone. Without it, the icon and name won't appear correctly when installed.
2. **Drill video clips sparse** — `drill-clips/` folder has only a few `.mp4` files. Most cards will show the "No clip available" placeholder. This is expected until original footage is filmed.
3. **Home screen cards are static HTML** — the three lesson cards (Champions Skating Center, Northford Ice Pavilion, Wonderland of Ice) are hardcoded. They are not wired to `SessionStore`/`GoalieStore` from `db.js`. The data flow works (clicking a card navigates to lesson plan page with correct URL params) but the cards themselves are not dynamic yet.
4. **Goalie profiles page doesn't exist** — "Profile" buttons on lesson cards navigate nowhere.
5. **On-ice mode not built** — `session.html` doesn't exist yet. This is the simplified rink view: one drill at a time, large text, swipe to advance, video autoplay, drill timer.
6. **No end-to-end test done** since last set of changes — verify full flow (tap card → lesson plan page → plan generates → avatars render → drills show correctly) before Saturday.

---

## Drill library schema (quick reference)

```json
{
  "id": "slug-format",
  "name": "Human readable name",
  "description": "...",
  "drill_category": ["crease_movement"],
  "session_slot": "skill_work",
  "duration_minutes": 10,
  "difficulty": "beginner | intermediate | advanced",
  "shooter_count_min": 1,
  "shooter_count_max": 2,
  "shot_count": 2,
  "requires_screener": true,
  "requires_goalie_partner": true,
  "ice_zone": ["hash_marks"],
  "goalie_starting_position": "...",
  "movement_sequence": ["step 1", "step 2"],
  "save_types": ["blocker_save"],
  "coaching_cues": ["Cue 1", "Cue 2"],
  "tags": [],
  "variations": [],
  "clip_file": "drill-clips/filename.mp4",
  "clip_loop": true,
  "coach_notes": "..."
}
```

Fields `requires_screener` and `requires_goalie_partner` are omitted when false.

### drill_category values
`skating`, `warmup`, `positioning_angles`, `save_technique`, `crease_movement`, `rebound_control`, `tracking_vision`, `stickhandling_puck_play`, `zone_entry`, `recovery_desperation`, `compete`

### session_slot values
`warmup`, `skill_work`, `situational`, `compete`
(Skating drills: `session_slot: "warmup"` + `drill_category: ["skating"]`)

---

## Session assembly rules (used by Edge Function)

1. **Skating warmup** — 2 drills from `drill_category: skating`, ~10–13 min
2. **Shot warmup** — 1 warmup drill (non-skating), ~5 min
3. **Skill work** — 2–3 `skill_work` drills themed to focus area
4. **Compete** — 1 compete game if available given shooter/screener/partner constraints
- Never include drill if `shooter_count_min > available_shooters`
- Never include `requires_screener: true` drill without a screener
- Never include `requires_goalie_partner: true` drill without 2 goalies
- When 2+ shooters: strongly prefer `skill_work` drills with `shooter_count_min ≥ 2`
- 2-goalie sessions: skill drills double in duration (both goalies take turns)

---

## What to build next (prioritized for Saturday, May 17)

### P0 — Must have before the lesson
1. **End-to-end test** — Open `index.html` on iPhone, tap Jake Reynolds lesson card, confirm: lesson plan page loads, plan generates from Edge Function, goalie avatar(s) appear in header, drills render with correct names/cues/badges. Fix anything broken.
2. **`manifest.json`** — Create PWA manifest so the app installs properly from Safari. Minimum fields:
   ```json
   {
     "name": "Goalie Coach",
     "short_name": "GoalieCoach",
     "start_url": "/index.html",
     "display": "standalone",
     "background_color": "#1c3150",
     "theme_color": "#1c3150",
     "icons": [{ "src": "icon.svg", "sizes": "any", "type": "image/svg+xml" }]
   }
   ```
   Add `<link rel="manifest" href="manifest.json">` to both HTML files.

### P1 — High value, build if time allows
3. **On-ice mode button** — Add a "Start Session" button to the lesson plan page that opens a simplified drill-by-drill view. Can be a new `session.html` or a modal overlay on the existing page. Must work one-handed with large tap targets.
4. **Plan save/export** — Add a "Save Plan" button that writes the current plan JSON to `localStorage` and shows a "Saved ✓" confirmation. Coach can retrieve it later.

### P2 — Polish / future sessions
5. Wire home screen lesson cards to `SessionStore` (dynamic data from `db.js`)
6. Build goalie profiles page
7. Add `manifest.json` offline caching via service worker

---

## File locations

All files live in `/Users/mmartins-collum/Documents/Claude/Projects/Goalie Lessons/` (the mounted workspace folder).

Key files to read before making changes:
- `index.html` — home screen (large file, read before editing)
- `lesson_plan_preview_crease_positioning.html` — lesson plan page (large file, read before editing)
- `drill_library.js` — full client-side drill library
- `supabase/functions/generate-plan/index.ts` — Edge Function source

---

## Tone and voice

The app is for a professional coach at the rink. Language must be:
- Direct and jargon-accurate: T-push, RVH, butterfly, powerslide, lateral release, overlap, bump out, verbal cue
- No marketing language, no emoji in UI copy, no gamification
- Coach's Notes in the session header should sound like one coach talking to another, not a product description

---

## Supabase config (for Edge Function work)

- Project ID: `whawnvlctxrfzkyvivca`
- Function name: `generate-plan`
- Current version: v5
- `verify_jwt: false`
- Model: `claude-sonnet-4-6`
- Do NOT use assistant prefill (`{ role: "assistant", content: ... }`) — this model rejects it with a 400 error
- Strip markdown fences from response before parsing JSON (the function already does this)
