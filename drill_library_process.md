# Goalie Drill Library — Process & Schema Handoff

## What We're Building
A structured drill library for a Hockey Goalie Coach app. Each drill entry powers two things:
1. **The drill card** — coaches browse/search the library and understand the drill
2. **AI lesson planning** — an AI reads drill metadata to auto-build 60-min lesson plans based on focus areas, player level, session goals, etc.

---

## The Workflow (for each drill)

### Step 1 — Clip (optional but helpful)
- Pull a 7–15 sec YouTube clip showing the drill
- Script: `clip_drills.sh` in the Goalie Lessons folder handles download + trim via yt-dlp + ffmpeg
- Clips are personal use only; will be replaced with own filmed content before any commercial release

### Step 2 — Write the natural language description
Plain English description of the drill. Should answer:
- What does the goalie do? (movements, saves, sequence)
- Where does the shooter start? How many shooters?
- What is the goalie trying to learn/practice?
- What phase of a session does this fit? (warm-up, technique, compete, etc.)

Example:
> "C starts at center ice hash marks with 2 pucks. G shuffles from off-post to center ice. C passes to a player on the goal line who walks across and stuffs the puck — G butterfly slides into a power slide the other direction to cover the post. Reset and repeat other side."

### Step 3 — AI structures it into schema
Feed the natural language description to Claude and ask it to output the drill schema (see below). Review and correct. Save to the library.

### Step 4 — Attach media (optional)
- Link the video clip file path
- Optionally add or reference an animated diagram (canvas animation)

---

## Drill Schema (target structure)

```json
{
  "id": "unique-slug",
  "name": "Human-readable drill name",
  "description": "2–3 sentence plain English summary (used for AI indexing)",
  "focus_areas": ["butterfly_slide", "power_slide", "post_coverage"],
  "session_phase": "technique",
  "duration_minutes": 10,
  "difficulty": "intermediate",
  "shooter_count": 1,
  "puck_count": 2,
  "ice_zone": "slot",
  "goalie_starting_position": "off_post",
  "movement_sequence": [
    "shuffle_to_center",
    "butterfly_drop",
    "butterfly_slide_right",
    "power_slide_left"
  ],
  "save_types": ["stick_save", "blocker_save"],
  "coaching_cues": [
    "Lead with the pad, not the chest",
    "Keep eyes on puck through the slide"
  ],
  "tags": ["jam_play", "in_tight", "post_to_post", "crease_movement"],
  "variations": [
    {
      "name": "Variation 2 — Hybrid VH",
      "description": "Same setup but goalie sets VH on post then slides into shooter",
      "movement_sequence": ["set_VH", "slide_to_shooter"],
      "clip_file": "drill_variation2_vh_slide.mp4"
    }
  ],
  "clip_file": "drill_variation1_butterfly_powerslide.mp4",
  "has_animation": false,
  "coach_notes": "Good for teaching goalie not to over-commit early on pass play"
}
```

---

## Focus Area Taxonomy (for AI lesson planning)

These are the tags the AI uses to build lesson plans. A lesson plan might say "today we're working on crease movement and post play" → AI pulls drills tagged with those focus areas.

### Movement / Skating
`t_push`, `shuffle`, `c_cut`, `butterfly_slide`, `power_slide`, `overlap`, `telescoping`, `lateral_push`

### Technique / Save
`butterfly`, `half_butterfly`, `RVH`, `VH`, `paddle_down`, `blocker_save`, `glove_save`, `stick_save`, `poke_check`, `desperation_save`

### Situation
`post_play`, `in_tight`, `jam_play`, `screen`, `tip`, `rebound`, `two_on_one`, `breakaway`, `pass_and_shoot`

### Session Phase
`skating_warmup`, `shot_warmup`, `technique`, `compete`, `situational`

### Difficulty
`beginner`, `intermediate`, `advanced`

---

## Session Progression Template (how lesson plans are built)

| Phase | Duration | Always? | Notes |
|-------|----------|---------|-------|
| Skating warm-up | 5–10 min | Yes | T-pushes, shuffles, c-cuts, butterfly slides |
| Shot warm-up | 5 min | Yes | Glove / blocker / chest / stick — systematic |
| Focus drills | 30–40 min | Yes | 2–4 drills on the day's theme |
| Situational | 0–15 min | Optional | Game-situation compete drills |

---

## Drills Already Clipped

| File | Drill | Timestamps | Tags |
|------|-------|------------|------|
| `drill_variation1_butterfly_powerslide.mp4` | Pass → walk across → butterfly slide + power slide | 6:49–6:59 | `butterfly_slide`, `power_slide`, `post_coverage`, `jam_play` |
| `drill_variation2_vh_slide.mp4` | Hybrid VH → slide into shooter | 7:27–7:37 | `VH`, `post_play`, `in_tight`, `jam_play` |

Source video: https://www.youtube.com/watch?v=24LI38Pf_B0 (Jamie Phillips)

---

## What to Do in a New Chat

1. Paste this document
2. Say: "I want to build out my drill library. Here's a drill — [describe it in plain English]. Please structure it into the schema above."
3. Review the output, correct anything wrong
4. Optionally tell Claude if you have a clip file to attach
5. Repeat for each drill

Once you have ~10–15 drills structured, we can build the AI lesson planning logic on top.
