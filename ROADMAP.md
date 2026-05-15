# Goalie Coach App — Roadmap

## Now — Drill Library Foundation
Building the structured drill library that powers the app and AI lesson planning.

- [x] Define drill schema (id, name, description, drill_category, session_slot, coaching cues, variations, etc.)
- [x] Define drill_category taxonomy
- [x] Define session_slot values
- [x] First drill saved: Pass & Wrap — Slide Series
- [ ] Build out library to ~15 drills across all categories
- [ ] Design final mobile drill card UI

---

## Next — AI Lesson Planning
Coach describes the session goal, AI builds a 60-min plan from the library.

- [ ] AI reads drill_category, session_slot, difficulty, and duration to assemble a session
- [ ] Session follows the standard progression: warmup → skill work → situational → compete
- [ ] Coach inputs: focus area(s), player level, session length
- [ ] AI outputs a sequenced plan with ~8–10 drills
- [ ] Coach can review and approve the plan before use
- [ ] Bonus slot rule: always surface a compete game as the bonus drill when shooter count allows (session_slot = "compete", shooter_count_min ≤ available shooters); fall back to a bonus skill drill only when no compete game is eligible

---

## Next — On-Ice Mode & Offline
Making the app usable at the rink with no wifi.

- [ ] Build as a Progressive Web App (PWA) — installable to iPhone/iPad home screen
- [ ] "Download session" — caches selected plan's drills + video clips for offline use (~80–120MB vs full library)
- [ ] Lean on-ice card view — name, cues, movement sequence only (no video needed mid-drill)
- [ ] Full card view with video for prep and review
- [ ] Mark drill as done during a session

---

## Later — Session Management
Tools for planning, running, and reviewing sessions over time.

- [ ] Saved session history — re-use a plan from a previous week
- [ ] Swap a drill mid-session — replace one drill with another of the same category/slot
- [ ] Session notes — coach can add notes after a session
- [ ] Per-drill notes — coach can annotate a drill after using it (what worked, what didn't)
- [ ] Goalie profiles — track which drills a specific goalie has worked on

---

## Later — Content
Expanding the library and adding richer media.

- [ ] Replace YouTube-sourced clips with original filmed content before any commercial release
- [ ] Animated diagrams for drills (ice surface overhead view)
- [ ] Drill difficulty progressions — beginner → intermediate → advanced variants of core drills

---

## Later — AI Video Coaching
In-app recording with AI evaluation against library film and goalie best practices.

This is a two-part system: (1) a heuristics library that encodes what "correct" looks like for every key technique, and (2) a video pipeline that records the goalie, analyzes the clip, and returns structured coaching feedback.

### Part 1 — Goalie Coaching Heuristics Library
Before AI can evaluate anything, we need to define what it's evaluating against. This is a structured knowledge base built alongside the drill library.

- [ ] Define heuristic schema: technique, checkpoint, correct_form, common_errors, what_to_look_for (body part / timing cues), severity (critical | major | minor)
- [ ] Write heuristics for core techniques: butterfly drop, T-push, powerslide, RVH set, post entry/exit, overlap, lateral release, paddle down, VH/hybrid VH
- [ ] Write heuristics for reading habits: head turn before slide, eyes-before-hands on pivot, locate-before-drop on verbal cue, head check in RVH, depth on T-push
- [ ] Tag each heuristic to relevant drill_category values so the AI knows which ones apply to a given drill
- [ ] Build a "what good looks like" reference clip set — short annotated clips from the library film showing each heuristic at its correct checkpoint

### Part 2 — In-App Recording
Coach records the goalie during a drill directly from the app.

- [ ] In-session recording mode — camera UI attached to the active drill card
- [ ] Coach can trim the clip to a single rep before submitting for analysis
- [ ] Clips stored locally on device first; sync to cloud on wifi
- [ ] Recordings tagged to the drill, goalie profile, and session date automatically

### Part 3 — AI Evaluation Engine
AI analyzes the recording and returns structured coaching feedback.

- [ ] Frame-by-frame pose extraction — identify key body landmarks (hips, head, hands, knees, skate edges) throughout the rep
- [ ] Compare goalie's movement against the relevant drill heuristics: flag checkpoints where form deviates from correct
- [ ] Compare against library reference clip for the same drill — side-by-side diff at key frames (e.g. "at point of save, goalie's hands were 6 inches behind the puck vs. reference")
- [ ] Output a structured feedback report: technique flagged, what was observed, what correct looks like, severity
- [ ] Prioritize feedback — surface the 1–2 most impactful corrections rather than everything at once
- [ ] Coach can accept, dismiss, or add a note to each feedback item before sharing with the goalie

### Part 4 — Goalie-Facing Feedback
Turning the AI output into something useful for the goalie to watch and understand.

- [ ] Annotated playback — goalie watches their clip with highlighted checkpoints overlaid (e.g. circle around hands at save, arrow on hip angle)
- [ ] Side-by-side view — goalie's clip paired with the reference drill clip, synced to the same point in the rep
- [ ] Written feedback card attached to the clip — same language as the coaching cues in the drill card
- [ ] Feedback saved to goalie profile so progress can be tracked across sessions

---

## Ideas / Backlog
Captured but not yet prioritized.

- Drill ratings / favorites for quick access
- "Build your own" drill tool for coaches to add custom drills
- Shareable session plans between coaches
- Coaching voice layer for pre-session briefs — build a `coaching_voice.md` reference file from Jamie Phillips' on-ice language (vocabulary, correction framing, diagnostic sequence) and inject it as context when the AI generates briefs, so the language matches how he actually coaches
