# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

**Owner:** Coach Mitch (mitchcollum@gmail.com)
**Live URL:** https://goalie-coach.pages.dev (Cloudflare Pages — auto-deploys on push to `main`)
**Product:** HockeyHub Goalie Coach — a PWA for an ice hockey goalie coach to plan and run on-ice sessions.

---

## Commands

```bash
# Rebuild drill_library.js after editing any drills/*.json file
node build_drill_library.js

# Sync rink ice times to Google Calendar (runs automatically every Sunday via scheduled task)
node fetch-ice-times.js

# Deploy Supabase Edge Function
supabase functions deploy generate-plan --project-ref whawnvlctxrfzkyvivca
```

There is no build step, bundler, or dev server for the frontend. Open HTML files directly in a browser or deploy to Cloudflare Pages. There are no tests.

If you see `.git/index.lock` or `.git/HEAD.lock` errors: `rm -f .git/index.lock .git/HEAD.lock`

---

## Architecture

**Pure HTML/CSS/JS — no framework, no build step.** Keep it that way.

### Frontend pages

| File | Purpose |
|------|---------|
| `index.html` | Home — session cards from Google Calendar, AI plan chat sheet, goalie profile sheet |
| `lesson_plan_preview_crease_positioning.html` | Lesson plan view/editor *(rename target: `plan.html`)* |
| `session.html` | On-ice drill runner — video, timer, swipe nav, completion screen |
| `drill-review.html` | Admin drill review tool |
| `admin.html` | Booking approval page (Google Calendar OAuth) |
| `availability.html` | Coach availability configuration |
| `profiles.html` | Goalie profiles list |

### Key JS files

**`db.js`** — the entire client-side data layer. All reads/writes go through this; never touch `localStorage` directly from other files. Architecture is localStorage-first with fire-and-forget Supabase sync in the background:
- Synchronous LS reads/writes preserve offline-first behavior
- Every write fires `_syncWrite()` async to Supabase
- Offline writes are enqueued in `hh_sync_queue` and flushed on next online write
- On startup, `_syncDown()` pulls Supabase → LS (remote wins on `updated_at` conflict)
- `_migrate()` is a one-time LS → Supabase migration, guarded by `hh_migrated` flag
- Stores: `GoalieStore` (`hh_goalies`), `SessionStore` (`hh_sessions`), `PlanStore` (`hh_plans`), `DrillUsageStore` (`hh_drill_usage`)
- `COACH_ID = 'coach_mitch'` scopes all Supabase rows (single-coach for now)

**`drill_library.js`** — auto-generated file, do not edit directly. Source of truth is `drills/*.json`. After editing any drill JSON, run `node build_drill_library.js` to regenerate. Exports `window.DRILL_LIBRARY` (array) and `window.filterDrills(params)`. Each drill has: `id`, `name`, `description`, `drill_category[]`, `session_slot` (`warmup|skill_work|compete`), `duration_minutes`, `difficulty`, `shooter_count_min/max`, `ice_zone[]`, `movement_sequence[]`, `save_types[]`, `coaching_cues[]`, `tags[]`, `clip`.

**`sw.js`** — service worker, cache version `hh-goalie-v2`.

**`fetch-ice-times.js`** — Node.js script (not frontend). Reads Newington + Champions rink schedules from public Google Sheets CSV and syncs "Hockey Skills" slots into the Goalie Sessions Google Calendar for the next 14 days. Uses a service account (`service-account.json`). Remembers user-deleted events in `deleted-events.json` to avoid re-adding them.

**`build_drill_library.js`** — Node.js script that reads all `drills/*.json` files, sorts by `id`, and writes `drill_library.js`.

### Supabase Edge Function

`supabase/functions/generate-plan/` — Deno edge function. Called via POST from `index.html` with `{ params, drills }`. `params` includes `goalie_notes` injected from `GoalieStore`. Uses `claude-sonnet-4-6` to generate a structured lesson plan.

Supabase project: `https://whawnvlctxrfzkyvivca.supabase.co`

### Cross-page data flow (plan lifecycle)

The plan flow crosses page boundaries using `localStorage` keys that are intentionally outside `db.js`:

```
index.html (AI chat) 
  → writes localStorage['hh_pending_plan'] = planJSON
  → navigates to lesson_plan_preview_crease_positioning.html

lesson_plan_preview_crease_positioning.html
  → reads hh_pending_plan on load
  → saves to PlanStore on "Save" / "Save & Start"
  → writes localStorage['hh_rebuild_context'] + navigates back to index for rebuild

session.html
  → reads plan from PlanStore by goalieId
```

Per-goalie persistence keys: `savedPlan_<goalieId>`, `hh_raw_notes_<goalieId>`.

### Inter-script communication

`index.html` uses multiple IIFEs for scope isolation. Cross-IIFE calls use globals:
- `window._hhOpenSheet(context)` — open AI plan chat sheet
- `window._hhOpenProfileSheet(name, id)` — open goalie profile sheet
- `window._hhApplySavedPlanState(btn)` — toggle "View plan" vs "Build plan" button

### Google Calendar (frontend)

OAuth 2.0 via Google Identity Services (GIS). Client ID: `329026777999-v4hljil36dfe58e3bvpsibdet15a4oa1.apps.googleusercontent.com`. Token cached in `localStorage`. OAuth flow lives in `index.html` ~line 3047–3580. Calendar ID for goalie sessions: `721f102eadb73ee43a9d593c80643347c806fccf57b0def9604515a8b2a73a7b@group.calendar.google.com`.

**Known issue:** `Error 400: invalid_request` on live deployment — `https://goalie-coach.pages.dev` must be added to Authorized JavaScript Origins in Google Cloud Console → APIs & Services → Credentials → "Coach Mitch" OAuth client. Also verify app is in Production mode (or mitchcollum@gmail.com is a test user).

### Design tokens

`tokens.css` — shared CSS custom properties. Key values: `--gc-navy: #1c3150`, `--hh-primary: #2563eb`, plus phase color variables (`--phase-warmup`, `--phase-skill`, `--phase-compete`). Some pages still have inline tokens — the intent is to consolidate everything into `tokens.css`.

---

## Goalie Roster

Jake Reynolds, Mason K., Lily P., Aiden Torres, Eli M., Sam C., Fischer Rogers (Pomfret)

---

## Stripe Integration (Active)

HockeyHub is being built as a SaaS. Business model: **$29/mo Solo Coach · $79/mo School · 3% platform fee on all Stripe-processed payments.** Stripe Connect is the payment architecture (coaches get paid, HockeyHub takes application fee). See `ROADMAP.md` for full feature backlog.

---

## Open Priorities (summary)

1. **Google OAuth fix** — add live domain to GCP OAuth client (manual, 5 min)
2. **Schedule integration** — wire Google Calendar events into home screen as real lesson cards
3. **Stripe Connect onboarding** — coach payment setup flow
4. **Booking page** — public-facing client booking UI (see `booking-calendar-mockup.html` for mockup)
5. **Drill schema additions** — `own_content` (bool), `clip_credit` (string), `clip_source_url` (string) in `drills/*.json`

Full detail in `ROADMAP.md`.
