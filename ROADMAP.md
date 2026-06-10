# HockeyHub Goalie Coach — Product Roadmap

_Last updated: June 2026_

---

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

## ✅ Done — Booking Calendar Design (June 2026)

- [x] Research best-in-class booking UX patterns (Calendly, Acuity, CoachNow, CoachIQ, Mindbody, ClassPass, TrueCoach)
- [x] Define 8 design patterns for client-facing booking flow
- [x] High-fidelity annotated mobile mockup: booking calendar + confirmation screen (`booking-calendar-mockup.html`)
- [x] Identify design system gaps (green-tint token, amber palette, 4 new components needed)
- [x] GTM and pricing research: competitor benchmarks, Stripe Connect fee norms, tier recommendations

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
- [ ] `bookings` table in Supabase — parent books → row created
- [ ] Coach approves from within the coach app (not admin.html)
- [ ] Google Calendar event created automatically on approval
- [ ] Home screen lesson cards sourced from Supabase (not Calendar directly)

### Phase 3 — Full automation (commercial prerequisite)
- [ ] Stripe payment collected at booking time (single session upfront)
- [ ] Automated confirmation email via Resend (no manual "tap Send")
- [ ] Automated reminder 24h before lesson
- [ ] Cancellation + rescheduling flow

---

## Now — Coach Setup & Payments

What a coach needs to configure before their booking page goes live. This is the core SaaS onboarding spine.

### Stripe Connect — Coach Payment Setup
- [ ] Stripe Connect onboarding flow — coach creates or links their Stripe account from within HockeyHub
- [ ] HockeyHub takes a **3% application fee** on all processed payments (sits on top of Stripe's 2.9%+30¢)
- [ ] Dashboard shows coach their net earnings after fees (transparent)
- [ ] Stripe Connect webhook handling — payment success, refund, dispute events

### Session Type Configuration
- [ ] Session type editor: name, description, duration, price, max participants (1-on-1 vs 2-on-1)
- [ ] Per-session-type settings: lead time required, cancellation window, buffer time between sessions
- [ ] Supports multiple session types per coach (e.g. Skill Work $175 · Compete Prep $175 · Evaluation $120)

### Payment Options (Coach-configurable per session type)
- [ ] **Single session** — full payment at booking via Stripe
- [ ] **Session pack** — client buys X sessions for a bundle price (e.g. 5-pack $800 vs $875 singles); credits deduct automatically at each booking. Packs are **type-scoped** — a pack purchased for Private 1:1 sessions can only be redeemed against Private 1:1 bookings. This keeps discount math clean and protects coach revenue. Pack type and remaining credits shown explicitly at booking (e.g. "5-pack · Private 1:1 · Coach Mitch — 3 credits remaining"). Escape hatch: parent can always opt to pay full price and preserve credits. V2: dollar-credit balance (cross-type redemption) if coaches request it post-launch.
- [ ] **Offline collection** — coach marks a booking as offline; no Stripe charge, no platform fee. Available on paid plan only.

### Availability Configuration
- [ ] Weekly availability template (recurring hours per day)
- [ ] Date-specific overrides (block a week, add a one-off slot)
- [ ] Minimum booking lead time (e.g. 48h advance notice required)
- [ ] Buffer time between sessions (e.g. 15 min between back-to-back)

### Waivers & Legal
- [ ] **HockeyHub Terms of Service** — platform-level ToS, agreed to at coach signup and at client booking. Must exist before first live payment. Draft via SaaS lawyer or Clerky template (~$500–1,500).
- [ ] **Coach liability waiver** — coach-configurable per account. GoalieHub provides a hockey-specific default template coaches can use as-is or customize. Coach is solely responsible for waiver content and enforceability — platform ToS must make this explicit.
- [ ] **Waiver acceptance logging** — store timestamp + IP address on every booking record when client checks the waiver box. Display per-client waiver history in coach dashboard.
- [ ] **Checkbox UX** — single required checkbox at checkout: "I agree to [Coach Name]'s Liability Waiver and HockeyHub's Terms of Service" with inline links to both documents opening in a modal (not a new tab). No e-signature required — timestamped checkbox is industry standard for this use case.
- [ ] **Coach onboarding step** — add waiver setup as step 4.5 in onboarding flow (after session types, before availability). Coach can use default template or paste custom text. Cannot publish booking page without acknowledging waiver setup.

---

## Now — Coach Onboarding Flow

First-time experience for a new coach signing up to HockeyHub. Goal: coach goes from signup to live booking page in under 10 minutes.

### Onboarding Steps (in order)
1. [ ] **Account creation** — name, email, password (or Google OAuth)
2. [ ] **Coach profile** — photo upload, tagline, bio (shown on public booking page)
3. [ ] **Home rink(s)** — rink name and address (shown on booking page + confirmation emails)
4. [ ] **Session types** — create at least one session type with price and duration (guided, can't skip)
5. [ ] **Availability** — set weekly recurring hours; coach sees a live preview of their calendar
6. [ ] **Stripe Connect** — link or create Stripe account (can defer, but booking page stays in preview mode until complete)
7. [ ] **Booking page preview** — coach sees exactly what a parent will see; one-click to publish

### Onboarding Gates
- [ ] Booking page is hidden from the public until Stripe Connect is complete
- [ ] "Preview mode" lets the coach share a private link to test the flow before publishing
- [ ] Post-onboarding checklist remains on coach dashboard until all steps are done

---

## Next — Client-Facing Booking Page

The public-facing scheduling interface parents use to book lessons.

### Core Booking Flow (based on mockup)
- [ ] Coach profile header: photo, name, tagline, rink, price range, duration
- [ ] Session type selector — horizontally scrollable cards with name, price, duration
- [ ] Month calendar view — green dot (open), amber dot (limited ≤2 slots), gray (unavailable)
- [ ] Time slot picker — appears below selected date, 3-column grid
- [ ] Booking summary panel — date/time, session type, location, total price (3rd price checkpoint)
- [ ] Guest checkout — name, email, phone only. No account required.
- [ ] Waiver + ToS checkbox — required before payment step. Links open coach waiver and HockeyHub ToS in modals. Acceptance logged with timestamp + IP.
- [ ] Stripe payment (card entry) — hosted Stripe Elements or Payment Link

### Confirmation Screen
- [ ] Success state: "You're booked!" with full booking summary
- [ ] Calendar add button (Apple Calendar / Google Calendar / .ics download)
- [ ] Confirmation email with rink address, arrival instructions, coach contact
- [ ] Session pack upsell shown to single-session bookers ("Save $X with a 5-pack")
- [ ] Account creation offer: "Save your info for next time" — benefit-framed, never required

---

## Next — Multi-Coach & Goalie School Support

Enables organizations like ProCrease Goaltending or StopIt Goaltending to run multiple coaches under one account.

### School Account Model
- [ ] Organization account type (distinct from individual coach)
- [ ] School admin can invite and manage coach seats (up to 5 on School plan, +$15/seat beyond)
- [ ] Each coach has their own profile, availability, and session types
- [ ] School-level branding: logo, name, and color on all public booking pages
- [ ] Parent books a specific coach OR books "any available coach" (school-mode)
- [ ] Admin dashboard: all bookings across all coaches, revenue summary, payout overview

### Coach Seat Management
- [ ] Invite coach by email — they complete their own Stripe Connect separately
- [ ] Admin can deactivate a coach seat (e.g. coach leaves the school)
- [ ] Per-coach performance view: sessions run, revenue, client roster

---

## Next — Session Management Improvements

- [ ] Saved session history — re-use a plan from a previous week
- [ ] Per-goalie drill history — track what each goalie has worked on
- [ ] Session notes — coach adds notes after a session
- [ ] Per-drill notes — what worked, what didn't

---

## Next — Drill Curation (Coach Preferences)

The drill library is a core competitive advantage — coaches need to trust that the AI will never give them a drill they hate. Drill curation lets each coach signal their preferences so the AI plans reflect their actual teaching style.

### Drill Signals (per coach, stored in Supabase)
- [ ] **Favorite** — coach loves this drill, wants it surfaced first. AI treats favorited drills as preferred candidates.
- [ ] **Dislike / Never Use** — coach hates this drill or it doesn't fit their system. AI hard-excludes disliked drills from plan generation and `filterDrills()` output. These should never appear.
- [ ] **Used recently** — implicit signal: don't repeat a drill used in the last 2 sessions with the same goalie (AI instruction, not hard filter).

### UX — Where Signals Are Set
- [ ] **In the plan view** — thumb up / thumb down icon on each drill card. Tap sets the signal immediately without leaving the session.
- [ ] **In the drill review tool** (`drill-review.html`) — favorite/dislike toggles per drill for bulk curation.
- [ ] **During on-ice session** (`session.html`) — thumbs up/down on the current drill card; saves signal on completion.

### Data Model
- [ ] `coach_drill_preferences` table in Supabase: `coach_id`, `drill_id`, `signal` (`favorite | dislike`), `updated_at`
- [ ] `db.js` — `DrillPreferenceStore`: `setPreference(drillId, signal)`, `getPreferences()`, `clearPreference(drillId)`
- [ ] `filterDrills()` — accepts optional `preferences` param; hard-excludes `dislike` drills before returning candidates
- [ ] AI prompt — favorited drills mentioned by name in the system prompt as "preferred drills for this coach"

### Visual Treatment
- [ ] Favorited drills get a ⭐ badge on drill cards in plan view and drill review
- [ ] Disliked drills are hidden in plan view; shown with a strikethrough in drill review (so coach can undo)
- [ ] Empty state: "No favorite drills yet — tap ⭐ on any drill card to save it here"

---

## Later — Own Drill Library (Bring Your Own Content)

Some coaches will not want to use HockeyHub's AI drill library — they have their own system. This accommodates them without forcing the platform's content.

### Library Mode Options (per coach)
- [ ] **HockeyHub AI Library** (default) — full access to 45+ drills, AI plan generation, clip library
- [ ] **Custom Library** — coach uploads their own drills (name, description, optional video clip). No AI plan generation; they build plans manually or from their own drills only.
- [ ] **Hybrid** — coach can use HockeyHub drills and mix in custom drills in the same plan
- [ ] **Booking Only Mode** — coach uses HockeyHub only for scheduling and payments; no plan features at all. Useful for coaches who run their own separate coaching software.

### Custom Drill Tools
- [ ] Custom drill creator: name, description, focus tags, session slot, optional video upload (Cloudflare R2)
- [ ] Custom drills appear alongside HockeyHub library drills in the plan builder (Hybrid mode)
- [ ] "CM" badge on cards indicates coach's own content (vs. HockeyHub library drills)
- [ ] Coach can mark a drill as private (only visible to them) or shareable to a goalie

---

## Later — Content

- [ ] Replace YouTube-sourced clips with original filmed content before commercial release
- [ ] Add `own_content`, `clip_credit`, `clip_source_url` fields to drill schema
- [ ] "CM" badge on coach's own content in plan and session views
- [ ] Content status dashboard in `drill-review.html`
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
- [ ] Clips stored locally, synced to Cloudflare R2 on wifi

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

## Pricing Model (Decided)

Based on competitive research (Acuity, TrueCoach, CoachNow, Mindbody) and GTM analysis.

### Recommended: Simple Hybrid

| Tier | Monthly | Annual | What's included |
|------|---------|--------|-----------------|
| **Trial** | Free | — | Full access · 14 days · 1 coach · 3 active clients · hard expiry |
| **Solo Coach** | $29/mo | $249/yr | 1 coach seat · unlimited clients · Stripe booking · AI plan generation · session history · Google Calendar sync · offline session logging |
| **School** | $79/mo | $699/yr | Up to 5 coach seats · school branding · per-coach reporting · admin dashboard. Additional seats: +$15/seat/mo |

**Platform fee: 3% on all Stripe-processed payments (both paid tiers)**

### Rationale
- $29/mo is below the cognitive friction threshold for a coach charging $150–200/session. Full cost at 10 sessions/month ≈ 3.3% of gross — invisible.
- 3% application fee reads as "payment processing" not "commission." Below TrueCoach's 5% (2026) and Mindbody's 20% new-client commission.
- 14-day time-limited trial (not permanent free tier) converts at 15–30% vs. 2–5% for freemium.
- School tier at $79/mo positions the natural next buyer: goalie schools and academies. That's where ARR multiples are.
- Offline sessions: available on paid tiers only. No fee on offline revenue (can't enforce it; trying to creates resentment).

---

## Backlog / Ideas

- Drill ratings / favorites for quick access — see "Drill Curation" section above
- Shareable session plans between coaches
- Coaching voice layer — inject coach-specific language into AI-generated session briefs
- Offline mode — cache selected plan's drills + clips (~80–120MB) for no-wifi rinks
- Cloudflare R2 migration for drill clips (when library grows beyond current repo size)
- `.ics` feed per coach for calendar subscription (zero cost, no Calendly needed)
- Rename `lesson_plan_preview_crease_positioning.html` → `plan.html`
- Extract shared CSS to `tokens.css` + `styles.css` (currently inline per file)
- Multi-tenant auth: Supabase RLS per `coach_id` when scaling beyond single coach
