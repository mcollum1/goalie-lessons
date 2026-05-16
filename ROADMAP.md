# Goalie Coach App — Roadmap

## ✅ Done — Core App (May 2025)

- [x] Define drill schema (id, name, description, drill_category, session_slot, coaching cues, variations, etc.)
- [x] Define drill_category + session_slot taxonomy
- [x] Build drill library to 45 drills across all phases
- [x] AI lesson planning via Supabase Edge Function (claude-sonnet-4-6)
- [x] Full E2E flow: home → chat sheet → AI-generated plan → save
- [x] On-ice session mode (session.html) — drill carousel, swipe, per-drill timer, completion
- [x] Start Session + Save + Rebuild buttons on lesson plan page
- [x] Save & Start flow — auto-saves edits before going on-ice
- [x] PWA manifest — installable to iPhone home screen
- [x] Drill tag audit — all 45 drills verified and corrected
- [x] Drill review tool (drill-review.html)
- [x] Deployed to Cloudflare Pages (goalie-coach.pages.dev)

---

## Now — Schedule Integration

Wiring real lesson data into the coach app home screen.

### Phase 1 — Google Calendar (current sprint)
- [x] Pull this week's lessons from Google Calendar into the home screen
- [ ] Dynamic greeting date (today's actual date, not hardcoded)
- [ ] "Today" section shows real calendar events as lesson cards
- [ ] "This Week" section shows upcoming events
- [ ] Token persisted in localStorage — no re-auth on every visit

### Phase 2 — Move bookings into Supabase (next sprint)
Replaces the SMS-based booking flow with a proper backend.
- [ ] `bookings` table in Supabase — parent books → row created
- [ ] Coach approves from within the coach app (not admin.html)
- [ ] Google Calendar event created automatically on approval
- [ ] Home screen lesson cards sourced from Supabase (not Calendar directly)

### Phase 3 — Full automation (commercial prerequisite)
- [ ] Stripe payment collected at booking time
- [ ] Automated confirmation email via Resend (no manual "tap Send")
- [ ] Automated reminder 24h before lesson
- [ ] Cancellation + rescheduling flow

---

## Now — Scheduling as a Product Feature (HockeyHub)

Design notes for when this becomes a paid feature.

- **Source of truth**: Supabase `bookings` table, not Google Calendar
- **Calendar becomes an output**: written to automatically on booking/approval
- **Multi-coach**: each coach has their own calendar ID + goalie roster in the DB
- **Parent-facing**: parents book and pay through HockeyHub (not a separate availability page)
- **Coach app home screen**: reads from Supabase, shows this week's real lessons

---

## Next — Session Management

- [ ] Saved session history — re-use a plan from a previous week
- [ ] Per-goalie drill history — track what each goalie has worked on
- [ ] Session notes — coach adds notes after a session
- [ ] Per-drill notes — what worked, what didn't

---

## Later — Content

- [ ] Replace YouTube-sourced clips with original filmed content before commercial release
- [ ] Animated ice-surface diagrams for each drill
- [ ] Drill difficulty progressions — beginner → intermediate → advanced variants

---

## Later — AI Video Coaching

In-app recording with AI evaluation against library film and coaching heuristics.

### Part 1 — Heuristics Library
- [ ] Define heuristic schema: technique, checkpoint, correct_form, common_errors, severity
- [ ] Write heuristics for core techniques: butterfly drop, T-push, powerslide, RVH, overlap, lateral release, VH/hybrid VH
- [ ] Write heuristics for reading habits: head turn, eyes-before-hands, locate-before-drop, depth on T-push
- [ ] Tag heuristics to drill_category values

### Part 2 — In-App Recording
- [ ] In-session camera UI attached to the active drill card
- [ ] Coach trims clip to a single rep before submitting
- [ ] Clips stored locally, synced to cloud on wifi

### Part 3 — AI Evaluation
- [ ] Pose extraction — key landmarks (hips, head, hands, knees, edges) throughout the rep
- [ ] Compare against heuristics — flag checkpoints where form deviates
- [ ] Side-by-side diff against reference clip at key frames
- [ ] Output: structured feedback report, 1–2 priority corrections

### Part 4 — Goalie-Facing Feedback
- [ ] Annotated playback with highlighted checkpoints overlaid
- [ ] Side-by-side view with reference clip, synced to same point in rep
- [ ] Written feedback card saved to goalie profile

---

## Backlog / Ideas

- Drill ratings / favorites for quick access
- "Build your own" drill tool for coaches to add custom drills
- Shareable session plans between coaches
- Coaching voice layer — inject Jamie Phillips' on-ice language into AI-generated session briefs
- Offline mode — cache selected plan's drills + clips (~80–120MB) for no-wifi rinks
- Cloudflare R2 migration for drill clips (when library grows beyond current repo size)
