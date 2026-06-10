/* ═══════════════════════════════════════════════════════════════════════
   drill_library.js — Goalie Coach App · Drill Library Bundle
   Auto-generated from drills/*.json (52 drills)
   Run: node build_drill_library.js

   Exports: window.DRILL_LIBRARY (array) + window.filterDrills(params)
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Full drill library ──────────────────────────────────────────── */
  const DRILLS =   [
    {
      "id": "backdoor-one-timer-wrap-around",
      "name": "Backdoor One-Timer — Wrap-Around Read",
      "description": "F1 starts at the face-off dot and passes to F2 backdoor for a one-timer. G pivots to the backdoor side, tracks the pass, and saves the first shot. After the one-timer, F2 skates behind the net, picks up a puck, and attempts a wrap-around. G tracks F2 going behind the net, sets post position, reads which side the wrap is coming to, and makes the save. Second puck is played out. A progression from the pass-to-slot RVH drill — similar pivot and behind-net tracking demands with a wrap-around finish instead of a bump-out.",
      "drill_category": [
        "crease_movement",
        "save_technique",
        "positioning_angles"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "in_tight",
        "behind_net"
      ],
      "goalie_starting_position": "Center of crease, square to F1",
      "movement_sequence": [
        "track_pass_from_F1_to_F2_backdoor",
        "pivot_to_backdoor_side",
        "save_first_shot_one_timer",
        "track_F2_moving_behind_net",
        "set_post_position",
        "read_wrap_around_side",
        "save_wrap_around",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "RVH",
        "paddle_down"
      ],
      "coaching_cues": [
        "Pivot early to the backdoor — track the pass, not F2's skates",
        "Eyes and hands get to the one-timer before the shot",
        "Track F2 going behind the net immediately after shot 1",
        "Set post clean — don't drift before F2 commits to a side",
        "Read the wrap early — stay patient on the post",
        "Play the second puck all the way out"
      ],
      "tags": [
        "pivot",
        "backdoor",
        "one_timer",
        "wrap_around",
        "post_play",
        "behind_net",
        "tracking_vision",
        "two_shot",
        "crease_movement",
        "RVH",
        "paddle_down"
      ],
      "variations": [],
      "clip_file": "drill-clips/backdoor-one-timer-wrap-around.mp4",
      "progression_of": "pass-slot-shot-rvh-bump-out",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "A natural progression from the pass-slot-shot-rvh-bump-out drill — same pivot demand on shot 1, but the second rep is a wrap-around instead of a bump-out pass. The backdoor pivot is the same habit: eyes and hands arrive before the puck. On the wrap-around, patience on the post is key — the goalie needs to track F2 around the net and wait for the commitment to a side before moving. Goalies who guess early on the wrap get beaten to the short side. Run this after the RVH bump-out drill is clean."
    },
    {
      "id": "backdoor-pass-loop-walk-in",
      "name": "Backdoor Pass — Loop and Walk-In",
      "description": "F1 starts at the top of the circle with puck 1 and passes to F2 backdoor for a shot. G reads F2's hand and pushes to make the save. F1 then loops down to the face-off dot to pick up puck 2 while F2 loops around the circle. F1 passes to F2 as F2 comes to the top of the circle and walks in for a shot. G gains ice on the second shot, challenges F2, and controls the rebound. A progression from the backdoor one-timer wrap-around drill — same backdoor read on shot 1, but shot 2 demands proactive ice gain and challenging a shooter walking in off a pass.",
      "drill_category": [
        "crease_movement",
        "positioning_angles",
        "rebound_control"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "in_tight",
        "hash_marks",
        "top_of_circles"
      ],
      "goalie_starting_position": "Center of crease, square to F1",
      "movement_sequence": [
        "track_pass_from_F1_to_F2_backdoor",
        "read_F2_hand",
        "push_to_backdoor_save",
        "save_first_shot",
        "gain_ice_and_track_players_resetting",
        "track_F2_looping_to_top_of_circle",
        "challenge_F2_walking_in",
        "save_second_shot",
        "control_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Read F2's hand early — know where to push before the pass arrives",
        "Try to beat the pass — get set before F2 shoots",
        "Gain ice between shots — don't sit back",
        "Challenge F2 walking in — get to your depth before the shot",
        "Control the rebound — don't give up a second chance"
      ],
      "tags": [
        "backdoor",
        "pivot",
        "tracking_vision",
        "telescoping",
        "walk_in",
        "rebound",
        "two_shot",
        "crease_movement",
        "positioning",
        "pass_and_shoot"
      ],
      "variations": [],
      "clip_file": "drill-clips/backdoor-pass-loop-walk-in.mp4",
      "progression_of": "backdoor-one-timer-wrap-around",
      "clip_loop": false,
      "has_animation": false,
      "coach_notes": "The hand read on shot 1 is the same habit as the backdoor one-timer wrap-around drill — G needs to identify F2's hand before the pass arrives to know which side to push. Shot 2 is the key progression: the goalie has to actively gain ice as F2 loops around the circle rather than sitting back and waiting. A goalie who stays deep gives F2 too much net on the walk-in. Rebound control on shot 2 is emphasized because F1 is still active and can convert a loose puck."
    },
    {
      "id": "backdoor-slot-rebound-battle",
      "name": "Backdoor + Slot Rebound Battle",
      "description": "Two-shot battle drill. F1 positions backdoor on the far post side. F2 sets up in the high slot. Coach or goalie partner positions on the face-off dot on the same side as the goalie's starting post. The goalie starts on the post on the passer's side. The passer sends a backdoor pass to F1; the goalie pivots with a hard push and gets hands out to make the save. The goalie then immediately resets eyes to the passer, who passes to F2 in the high slot. The goalie beats the pass to challenge F2, who shoots. Coach and F1 play the rebound. Can be run with 3 rotating shooters or 2 shooters and a goalie partner as passer.",
      "drill_category": [
        "save_technique",
        "crease_movement",
        "compete"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 3,
      "shot_count": 2,
      "ice_zone": [
        "in_tight",
        "top_of_circles"
      ],
      "goalie_starting_position": "on post, same side as passer at face-off dot",
      "movement_sequence": [
        "set_on_post_same_side_as_passer",
        "read_backdoor_pass_to_f1",
        "pivot_hard_push_hands_out_for_f1_backdoor_shot",
        "make_save_on_f1_backdoor",
        "reset_eyes_to_passer_immediately",
        "beat_pass_to_f2_in_high_slot",
        "challenge_f2_and_control_rebound_on_slot_shot",
        "battle_rebound_with_coach_and_f1_crashing"
      ],
      "save_types": [
        "glove_save",
        "blocker_save",
        "pad_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Find F1 with your eyes before the pass is made — don't wait for the puck to move",
        "Pivot hard and push with hands leading — don't arrive late to the backdoor",
        "After the save, reset your eyes to the passer immediately — the second pass is coming fast",
        "Beat the pass to F2 — your push starts as the puck leaves the passer's stick",
        "Control the rebound on the slot shot — know where F1 and Coach are crashing"
      ],
      "tags": [
        "backdoor",
        "pivot",
        "hands",
        "lateral_slide",
        "reset",
        "high_slot",
        "rebound_control",
        "compete",
        "battle",
        "pass_and_shoot",
        "two_puck"
      ],
      "variations": [],
      "clip_file": "drill-clips/backdoor-slot-rebound-battle.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The battle element comes from the rebound crash after shot 2 — Coach and F1 both attack the net, so the goalie must control the rebound or cover quickly. The critical timing point is the reset between shots: goalies who linger after the backdoor save will be caught flat-footed on the slot pass. In early reps, run each shot option in isolation before chaining them. Can be run with 3 rotating shooters cycling through all roles, or with 2 shooters and a goalie partner feeding as passer."
    },
    {
      "id": "behind-net-feed-rotation-game",
      "name": "Behind Net Feed Rotation Game",
      "description": "King-of-the-hill compete game requiring at least 3 shooters. Pucks are staged behind the net. F1 starts behind the net and passes to any shooter in front, who must shoot immediately. After each save, play continues with one pass allowed per save. If the goalie covers the puck or it hits the boards, the puck is dead — goalie earns a point and players rotate. If a player scores, players earn a point and goalies rotate. Play to 10.",
      "drill_category": [
        "compete",
        "rebound_control",
        "save_technique",
        "tracking_vision"
      ],
      "session_slot": "compete",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 3,
      "shooter_count_max": 5,
      "shot_count": 10,
      "ice_zone": [
        "behind_net",
        "in_tight",
        "hash_marks"
      ],
      "requires_goalie_partner": true,
      "goalie_starting_position": "set in crease, tracking F1 behind net",
      "movement_sequence": [
        "track_f1_behind_net_read_pass_direction",
        "adjust_angle_to_receiving_shooter_in_front",
        "make_save_on_first_shot",
        "cover_or_direct_to_boards_for_dead_puck_point",
        "track_one_pass_and_make_second_save_if_live"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Track F1 behind the net — the pass direction tells you where to set your angle",
        "Cover or direct to the boards on every save — a dead puck is your point",
        "After a save, find the puck immediately — one pass and the next shot is coming",
        "Know where all shooters are in front before the pass — F1 can go anywhere",
        "Stay alive after the first shot — don't relax until the puck is dead"
      ],
      "tags": [
        "behind_net",
        "compete",
        "game_format",
        "rebound_control",
        "rotation",
        "cover",
        "tracking",
        "multi_shooter",
        "pass_and_shoot"
      ],
      "variations": [],
      "clip_file": "drill-clips/behind-net-feed-rotation-game.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "King-of-the-hill format that adds unpredictability through the behind-net feed — F1 can pass to any shooter in front, so the goalie can't cheat to one side. The one-pass-per-save rule maintains pressure after good saves without letting the game turn into chaos. Player rotation on goalie points and goalie rotation on player points keeps everyone engaged and prevents one matchup from dominating. Works best with 4–5 skaters (1 behind net, 3–4 in front) so rotations stay smooth and the pace stays high. Distinct from the rebound game in that shots originate from a feed rather than a set position."
    },
    {
      "id": "blocker-save-rebound-tip-smother",
      "name": "Blocker Save + Rebound + Tip Smother",
      "description": "Two-shot technique drill requiring a goalie partner. F1 is on the face-off dot. The goalie partner positions backdoor on the far post side. The goalie starts in butterfly, square to F1. F1 shoots high blocker (shot 1); the goalie makes the save and follows the rebound all the way to the near post. The goalie then t-pushes back out to F1, who shoots a pass along the ice to the goalie partner backdoor. The goalie partner tips it and the goalie slides across with hands out to smother the tip (shot 2). Drill switches sides.",
      "drill_category": [
        "save_technique",
        "crease_movement",
        "rebound_control"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "in_tight"
      ],
      "requires_goalie_partner": true,
      "goalie_starting_position": "butterfly, square to F1 at face-off dot",
      "movement_sequence": [
        "set_in_butterfly_square_to_f1_at_face_off_dot",
        "make_blocker_save_on_high_shot",
        "follow_rebound_all_the_way_to_near_post",
        "t_push_back_out_to_f1",
        "read_f1_pass_along_ice_to_gp_backdoor",
        "slide_across_with_hands_out_to_smother_gp_tip"
      ],
      "save_types": [
        "blocker_save",
        "glove_save",
        "pad_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Start square in butterfly — set your base before F1 shoots",
        "Follow the rebound all the way to the post — don't stop short",
        "T-push back out to F1 with purpose — reset your depth before the second play",
        "Read F1's stick early — a pass along the ice to GP telegraphs early",
        "Slide with hands leading — palms out, close the gap on the tip before it arrives"
      ],
      "tags": [
        "butterfly",
        "blocker_save",
        "rebound_control",
        "t_push",
        "backdoor",
        "tip",
        "hands",
        "lateral_slide",
        "two_puck"
      ],
      "variations": [],
      "clip_file": "drill-clips/blocker-save-rebound-tip-smother.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Two-phase technique drill that chains a blocker save and rebound track directly into a backdoor tip reaction. The most common error is the goalie not getting all the way to the post after the blocker save — stopping short leaves the near side open and puts the goalie in a poor position to t-push back out. On the tip smother, the goalie should be reading F1's stick and starting the slide before the tip rather than reacting after contact. The goalie partner should deliver a firm, low pass so the tip is a realistic game-speed reaction."
    },
    {
      "id": "board-to-board-movement-series",
      "name": "Board-to-Board Movement Series",
      "description": "G starts on the blueline facing the near boards and moves laterally across the ice using a repeating pivot-and-push pattern, stopping at the far boards then returning. Run as a progression — start with V1 and advance through variations as the goalie builds confidence and conditioning.",
      "drill_category": [
        "skating",
        "crease_movement"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "blue_line"
      ],
      "setup_required": "open_ice",
      "goalie_starting_position": "Blueline, facing near boards",
      "movement_sequence": [
        "pivot",
        "t_push_diagonal",
        "hard_stop",
        "pivot",
        "t_push_diagonal_opposite",
        "hard_stop",
        "repeat_to_far_boards"
      ],
      "save_types": [],
      "coaching_cues": [
        "Eyes go first",
        "Lean into the push",
        "Lead with hands",
        "Explosive push and stop",
        "Hard edges on the stop"
      ],
      "tags": [
        "t_push",
        "shuffle",
        "butterfly_slide",
        "power_slide",
        "skating",
        "edgework",
        "explosiveness",
        "lateral_movement"
      ],
      "variations": [
        {
          "name": "V2 — Shuffle Pivots",
          "description": "Same pattern as V1 but replace the t-push with 2-3 quick shuffles on each diagonal. Focus on staying square through the shuffle and short, controlled steps.",
          "movement_sequence": [
            "pivot",
            "shuffle_diagonal_2_to_3",
            "hard_stop",
            "pivot",
            "shuffle_diagonal_opposite_2_to_3",
            "hard_stop",
            "repeat_to_far_boards"
          ],
          "difficulty": "beginner",
          "clip_file": "drill-clips/diagonal-shuffle-pivots.mp4",
          "clip_loop": true
        },
        {
          "name": "V3 — T-Push, Butterfly, Recover",
          "description": "G pivots, t-pushes on the diagonal, drops into butterfly, recovers to feet, pivots, t-pushes the other diagonal, drops into butterfly, recovers to feet. Repeats board to board. Introduces butterfly drop and recovery into the skating pattern.",
          "movement_sequence": [
            "pivot",
            "t_push_diagonal",
            "butterfly_drop",
            "recover_to_feet",
            "pivot",
            "t_push_diagonal_opposite",
            "butterfly_drop",
            "recover_to_feet",
            "repeat_to_far_boards"
          ],
          "difficulty": "intermediate",
          "clip_file": null,
          "clip_loop": true
        },
        {
          "name": "V4 — Butterfly, Pivot, Powerslide, Recover",
          "description": "G drops into butterfly, pivots, powerslides on the diagonal, recovers to feet. Repeats in the opposite direction board to board. Trains powerslide generation out of butterfly and recovery.",
          "movement_sequence": [
            "butterfly_drop",
            "pivot",
            "power_slide_diagonal",
            "recover_to_feet",
            "pivot",
            "power_slide_diagonal_opposite",
            "recover_to_feet",
            "repeat_to_far_boards"
          ],
          "difficulty": "intermediate",
          "clip_file": null,
          "clip_loop": true
        },
        {
          "name": "V5 — Butterfly, Pivot, Powerslide, Stop in Butterfly",
          "description": "G drops into butterfly, pivots, powerslides on the diagonal, stops while remaining in butterfly. Pivots and powerslides back the other direction, stopping in butterfly again. Repeats continuously board to board without recovering to feet. Builds butterfly mobility and powerslide control under fatigue.",
          "movement_sequence": [
            "butterfly_drop",
            "pivot",
            "power_slide_diagonal",
            "stop_in_butterfly",
            "pivot",
            "power_slide_diagonal_opposite",
            "stop_in_butterfly",
            "repeat_to_far_boards"
          ],
          "difficulty": "advanced",
          "clip_file": null,
          "clip_loop": true
        }
      ],
      "clip_file": "drill-clips/diagonal-t-push-pivots.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Run as a progression within a warmup block — V1 and V2 for all levels, V3 onward for intermediate and advanced goalies. The pivot must be sharp and immediate on all variations; hesitating before the push or slide kills momentum. On V5, watch for hips rotating back — they should stay square through every powerslide."
    },
    {
      "id": "butterfly-lean-screen-read",
      "name": "Butterfly Lean Save — Screen Recover Read",
      "description": "A screen (goalie partner or dummy) is set in front of the crease. G starts in butterfly at the top of the crease, set on F1 who is at the top of the circle above the face-off dot. F1 shoots high far side — G leans into the save. G immediately recovers to feet and t-pushes to F2, who is positioned at the top of the circles center. G picks a side to see F2's release around the screen and reacts to the shot. Focus is on tracking the first shot all the way in, then making a clean, explosive recovery and getting set on F2 in time to find the puck.",
      "drill_category": [
        "crease_movement",
        "tracking_vision",
        "save_technique"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "top_of_circles"
      ],
      "requires_screener": true,
      "goalie_starting_position": "Butterfly at top of crease, set on F1",
      "movement_sequence": [
        "start_in_butterfly_on_F1_angle",
        "track_F1_shot_high_far_side",
        "lean_into_save",
        "recover_to_feet",
        "t_push_to_F2_center",
        "pick_side_to_see_release_around_screen",
        "save_second_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Track shot 1 all the way in — don't anticipate the lean",
        "Lean, don't lunge — stay connected through the save",
        "Explosive recovery up — don't rest in butterfly",
        "Hard t-push to get depth on F2 before the shot",
        "Pick your side early — commit to seeing the release around the screen",
        "React to the release, not the shooter's body"
      ],
      "tags": [
        "butterfly",
        "screen",
        "tracking_vision",
        "t_push",
        "lean_save",
        "recovery",
        "two_shot",
        "crease_movement"
      ],
      "variations": [],
      "clip_file": "drill-clips/butterfly-lean-screen-read.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The butterfly start is intentional — the goalie has to make a real save before transitioning, not just stand and react. The lean on shot 1 should be controlled; a common error is lunging too far and making the recovery harder. The t-push to F2 needs to be immediate and reach proper depth so the goalie has a realistic angle to peek around the screen. If they come out too shallow, the screen wins every time. Picking a side to see the release is a decision the goalie has to make early — cue them to commit rather than drift looking for a clear sightline that won't come."
    },
    {
      "id": "butterfly-shot-warmup",
      "name": "Butterfly Shot Warmup — Tracking Series",
      "description": "G sits in butterfly in the crease. Shooter is just inside the top of the circles at center. Shooting at 70-80% for multiple reps. G focuses on tracking the puck all the way into the save, exaggerating the lean and driving eyes and nose into the save side. Run through all variations in sequence as a warmup block.",
      "drill_category": [
        "warmup",
        "tracking_vision"
      ],
      "session_slot": "warmup",
      "duration_minutes": 10,
      "difficulty": "beginner",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "top_of_circles"
      ],
      "goalie_starting_position": "Butterfly in crease",
      "movement_sequence": [
        "set_butterfly",
        "track_puck_to_save_side",
        "exaggerate_lean_to_save_side",
        "reset_butterfly"
      ],
      "save_types": [
        "glove_save",
        "blocker_save",
        "chest_save",
        "stick_save"
      ],
      "coaching_cues": [
        "Track the puck all the way in — see it into the save",
        "Exaggerate the lean to the save side",
        "Drive eyes and nose into the save",
        "Shooter at 70-80% — this is tracking work, not compete"
      ],
      "tags": [
        "tracking",
        "warmup",
        "butterfly",
        "save_technique",
        "glove_save",
        "blocker_save",
        "stick_save"
      ],
      "variations": [
        {
          "name": "V2 — Blocker Side",
          "description": "Same setup, same shooter location. Several reps to the blocker side. G focuses on seeing the puck all the way off the blocker.",
          "movement_sequence": [
            "set_butterfly",
            "track_puck_to_blocker",
            "exaggerate_lean_to_blocker_side",
            "reset_butterfly"
          ],
          "save_types": [
            "blocker_save"
          ],
          "clip_file": null,
          "clip_loop": false
        },
        {
          "name": "V3 — Chest",
          "description": "Same setup. Several reps to the chest. G focuses on feeling the puck all the way in and seeing it into the body.",
          "movement_sequence": [
            "set_butterfly",
            "track_puck_to_chest",
            "reset_butterfly"
          ],
          "save_types": [
            "chest_save"
          ],
          "clip_file": null,
          "clip_loop": false
        },
        {
          "name": "V4 — Stick Saves",
          "description": "Same setup. Reps to the lower corners on each side. G works stick saves, tracking the puck all the way onto the paddle.",
          "movement_sequence": [
            "set_butterfly",
            "track_puck_to_stick_corner",
            "reset_butterfly"
          ],
          "save_types": [
            "stick_save"
          ],
          "clip_file": null,
          "clip_loop": false
        }
      ],
      "clip_file": "drill-clips/butterfly-shot-warmup.mp4",
      "clip_loop": false,
      "has_animation": false,
      "coach_notes": "This is a warmup, not a compete drill — shooter should stay at 70-80% so the goalie can focus entirely on tracking, not reacting to pace. The exaggerated lean and eye movement is the point; goalies tend to guess on shot location in games and this builds the habit of seeing the puck into the save. Run V1 through V4 in sequence before moving to skill work."
    },
    {
      "id": "butterfly-slide-dot-to-dot",
      "name": "Butterfly Slide — Dot to Dot",
      "description": "G starts at the far face-off dot. F1 is at the near face-off dot on the opposite side. G pivots and butterfly slides across to F1 and makes the save. G recovers and repeats for multiple reps before switching sides. A simple, repetitive drill focused on butterfly slide technique, eye tracking through the slide, and hands staying out and ready.",
      "drill_category": [
        "warmup",
        "save_technique",
        "crease_movement"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks"
      ],
      "goalie_starting_position": "Far face-off dot",
      "movement_sequence": [
        "start_at_far_faceoff_dot",
        "pivot",
        "butterfly_slide_to_F1",
        "save_shot_while_sliding",
        "recover_to_feet",
        "repeat_same_side",
        "switch_sides_and_repeat"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Eyes go first — head turns before the slide",
        "Track the puck through the slide, don't guess",
        "Hands out and over the puck on contact",
        "Stay connected through the save — don't reach",
        "Clean recovery before resetting for the next rep"
      ],
      "tags": [
        "butterfly_slide",
        "tracking_vision",
        "lateral_movement",
        "warmup",
        "hands",
        "recovery"
      ],
      "variations": [],
      "clip_file": "drill-clips/butterfly-slide-dot-to-dot.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "A clean drill to groove the butterfly slide habit early in a session. The pivot and head turn should happen together — any goalie sliding without first locating the shooter is already guessing. Watch for hands collapsing in on the save; they should stay out and over the puck through contact. Keep reps moving at a steady pace so the goalie is working recovery along with the slide."
    },
    {
      "id": "butterfly-slide-post-recover-t-push",
      "name": "Butterfly Slide — Post Recover and T-Push",
      "description": "G starts at the far face-off dot. F1 is at the near face-off dot on the opposite side. G pivots and butterfly slides across to F1's side, recovers to the near post, head checks to locate F1, then t-pushes out to challenge F1 for a shot. Repeats for multiple reps before switching sides. Works on linking the butterfly slide to a clean post recovery, building the habit of a head check before pushing out, and finishing with an explosive t-push to proper depth.",
      "drill_category": [
        "warmup",
        "save_technique",
        "crease_movement"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks",
        "in_tight"
      ],
      "goalie_starting_position": "Far face-off dot",
      "movement_sequence": [
        "start_at_far_faceoff_dot",
        "pivot",
        "butterfly_slide_to_F1_side",
        "recover_to_near_post",
        "head_check_locate_F1",
        "t_push_out_to_angle",
        "save_shot",
        "repeat_same_side",
        "switch_sides_and_repeat"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Eyes go first — head turns before the slide",
        "Clean post touch — don't crash into it",
        "Head check before the t-push, every rep",
        "Hard t-push out to depth — don't leak in shallow",
        "Square up to F1 before the shot"
      ],
      "tags": [
        "butterfly_slide",
        "t_push",
        "post_play",
        "tracking_vision",
        "lateral_movement",
        "warmup",
        "head_check",
        "recovery"
      ],
      "variations": [],
      "clip_file": "drill-clips/butterfly-slide-post-recover-t-push.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "A natural progression from the dot-to-dot butterfly slide drill — same start and slide, but now the goalie has to complete a post recovery and head check before pushing back out. The head check is the key habit: the goalie needs to confirm F1's location before committing to the t-push rather than assuming. Common error is rushing through the post touch and skipping the head check entirely. The t-push should reach proper depth so the goalie has a real angle on F1."
    },
    {
      "id": "butterfly-slide-screener-read",
      "name": "Butterfly Slide — Screener & Second Shot",
      "description": "G starts at the far face-off dot angle at the top of the crease. F1 is at the opposite face-off dot. On F1's 'go' call, G turns their head to locate the shooter, butterfly slides across, and makes the save while still sliding. G recovers to the post, then t-pushes out to the top of the crease where a goalie partner or screening dummy is set. G sees around the screen and reacts to a second shot from F2 at the top of the circles. Rebound is played out.",
      "drill_category": [
        "crease_movement",
        "tracking_vision"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "top_of_circles"
      ],
      "requires_screener": true,
      "goalie_starting_position": "Far face-off dot angle, top of crease",
      "movement_sequence": [
        "start_at_far_dot_angle",
        "head_turn_on_go_call",
        "butterfly_slide_to_F1_side",
        "save_first_shot_while_sliding",
        "recover_to_post",
        "t_push_out_to_screener",
        "find_puck_around_screen",
        "save_second_shot_through_screen",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Eyes go first — head turns before the slide",
        "See the puck in on the slide, don't guess",
        "Clean recovery to post before the t-push",
        "Hard t-push out — get to your angle",
        "Find the puck around the screen early",
        "React to the shot, don't anticipate"
      ],
      "tags": [
        "butterfly_slide",
        "t_push",
        "tracking_vision",
        "screen",
        "rebound",
        "two_shot",
        "lateral_movement"
      ],
      "variations": [],
      "clip_file": "drill-clips/butterfly-slide-screener-read.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The head turn on the 'go' call is the critical habit — the goalie must locate the shooter before committing to the slide. A goalie who slides without confirming location is guessing. On the second shot, the t-push out needs to reach proper depth so the goalie has the best angle to see around the screener. If they pop out too shallow, the screen wins."
    },
    {
      "id": "circle-walk-shot-net-drive",
      "name": "Circle Walk Shot + Net Drive",
      "description": "F1 starts on the goal line boards with puck 2 staged at that position. F2 starts at the hash marks on the same side. F1 makes a short pass to F2, who steps around the circle and shoots. The goalie tracks F2 through the arc and makes the first save, then follows the rebound. F1 continues around to the far circle while F2 picks up puck 2 from the goal line boards and drives the net — choosing to shoot short side, jam, or pass to F1 breaking across to the far post. Play the second puck out. Drill switches sides.",
      "drill_category": [
        "save_technique",
        "crease_movement",
        "rebound_control",
        "tracking_vision"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "in_tight"
      ],
      "goalie_starting_position": "set at top of crease, angled to hash marks side",
      "movement_sequence": [
        "set_at_top_of_crease_facing_hash_marks",
        "track_f2_walking_around_circle",
        "make_save_on_circle_shot",
        "follow_rebound_and_reset",
        "read_f2_driving_net_with_second_puck",
        "play_out_second_puck_jam_or_pass_to_f1"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Track F2's hips through the arc — don't let the circle pull you off angle",
        "Stay alive after the first save; don't collapse expecting a whistle",
        "Follow the rebound and reset your depth before the net drive",
        "On the net drive, seal short side — know where F1 is cutting",
        "Read F2's eyes for the pass option to F1 at the far post"
      ],
      "tags": [
        "circle_walk",
        "tracking",
        "rebound_control",
        "net_drive",
        "two_puck",
        "jam_play",
        "pass_and_shoot",
        "in_tight",
        "two_on_one_read"
      ],
      "variations": [],
      "clip_file": "drill-clips/circle-walk-shot-net-drive.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "This drill chains two distinct goalie challenges: tracking a shooter through a wide arc, then immediately transitioning to a net-front read with a pass option. Common error is the goalie over-committing to the first save and losing their feet, leaving no time to reset for the net drive. Watch for goalies who collapse to the ice on puck 1 — they need to stay alive and mobile. The pass option to F1 cutting is a late read, so goalies should default to protecting short side and reacting to F1 if the pass comes."
    },
    {
      "id": "corner-pass-circle-shot-loop-backdoor-read",
      "name": "Corner Pass — Circle Shot, F1 Loop, Backdoor Read",
      "description": "F1 starts in the corner just above the goal line on the near side. F2 is at the top near-side edge of the circle above the hash marks. F1 passes to F2; G reads the pass and pushes out to challenge F2 at the circle. F2 shoots and G makes the save, controlling the rebound. G recovers back to the near-side post. F1 then loops up and around the face-off dot with a second puck and reads: either shoot from the dot or pass backdoor to F2 for a one-timer. G tracks F1 coming around the dot, gains backward momentum, and reads the decision. If F1 passes backdoor, G pivots and pushes on the correct angle toward F2 — not straight across the crease — leading with the hands to reach the backdoor shot. Play out the rebound on the second shot.",
      "drill_category": [
        "crease_movement",
        "positioning_angles",
        "tracking_vision",
        "save_technique"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "in_tight",
        "hash_marks",
        "top_of_circles",
        "behind_net"
      ],
      "goalie_starting_position": "Crease, set to F1 angle in near-side corner",
      "movement_sequence": [
        "set_to_F1_angle_in_corner",
        "track_pass_from_F1_to_F2",
        "push_out_to_F2_angle_at_circle",
        "save_F2_shot",
        "control_rebound",
        "recover_to_near_side_post",
        "track_F1_looping_around_dot",
        "gain_backward_momentum",
        "read_F1_shoot_or_pass_backdoor",
        "if_shoot_challenge_and_save",
        "if_pass_backdoor_pivot_and_push_on_angle_to_F2",
        "save_backdoor_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "butterfly_slide"
      ],
      "coaching_cues": [
        "Gain depth on shot 1 — hands out, project toward F2 at the circle",
        "Dead rebound on shot 1 — control it before moving back to post",
        "Recover to the near-side post clean before F1 commits to shoot or pass",
        "Track F1 looping around the dot — gain backward momentum, don't freeze at the post",
        "Pivot and push on the correct angle toward the backdoor — not straight across or you can't get there",
        "Lead with the hands on the backdoor slide — hands over the puck",
        "Play out the rebound on shot 2"
      ],
      "tags": [
        "t_push",
        "butterfly_slide",
        "post_play",
        "backdoor",
        "tracking_vision",
        "rebound",
        "pass_and_shoot",
        "two_shot",
        "crease_movement",
        "pivot",
        "lateral_release"
      ],
      "variations": [],
      "clip_file": "drill-clips/corner-pass-circle-shot-loop-backdoor-read.mp4",
      "clip_loop": true,
      "has_animation": false
    },
    {
      "id": "cross-circle-rim-walk-out-screen",
      "name": "Cross-Circle Shot + Rim Walk-Out Screen",
      "description": "F1 starts at the top of one circle, F2 starts at the top of the opposite circle. A screener sets up in front of the net. F1 passes cross-ice to F2, who shoots (shot 1). F2 then drives below the net. F1 shoots a second puck around the boards; F2 picks it up behind the net, walks out around to the near face-off dot, and shoots through the screen (shot 2). The screener can be a second goalie or any available player. Drill switches sides.",
      "drill_category": [
        "save_technique",
        "tracking_vision",
        "positioning_angles"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "top_of_circles",
        "behind_net",
        "hash_marks"
      ],
      "requires_screener": true,
      "goalie_starting_position": "set at top of crease, tracking F1 at top of circle",
      "movement_sequence": [
        "track_f1_at_top_of_circle_read_cross_ice_pass",
        "adjust_angle_to_f2_at_top_of_opposite_circle",
        "make_save_on_f2_shot",
        "track_f2_driving_below_net",
        "track_f1_rimming_second_puck_around_boards",
        "track_f2_walking_out_from_behind_net_to_face_off_dot",
        "find_puck_through_screen_make_save_on_f2_dot_shot"
      ],
      "save_types": [
        "blocker_save",
        "glove_save",
        "pad_save",
        "tip_save"
      ],
      "coaching_cues": [
        "Read the cross-ice pass early — your angle shift to F2 starts with F1's stick",
        "After the first save, stay with F2 — track the drive behind the net immediately",
        "Know where the rim is going; anticipate F2 walking out before they get there",
        "Find the puck through the screen before F2 shoots — peek around, don't guess",
        "React to the puck, not the screen's body — the screen will move, the puck tells you where to go"
      ],
      "tags": [
        "cross_ice_pass",
        "top_of_circles",
        "rim",
        "behind_net",
        "walk_out",
        "screen",
        "tip",
        "tracking",
        "two_puck"
      ],
      "variations": [],
      "clip_file": "drill-clips/cross-circle-rim-walk-out-screen.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "This drill strings together three distinct tracking challenges: the cross-ice pass read, the behind-net drive, and the walk-out screen shot. The goalie can't stop tracking between shots — F2's drive behind the net happens immediately after shot 1. The screen shot from the dot is the critical moment; the most common error is the goalie losing the puck early in F2's walk-out and then guessing through the screen rather than finding the puck. The screener should stay static and passive — this is not a tip drill."
    },
    {
      "id": "cross-ice-pass-read-circle-rebound",
      "name": "Cross-Ice Pass Read — Circle & Rebound",
      "description": "F1 starts at the top of the circle on one side, F2 at the dot on the other side. F1 passes cross-ice to F2. G makes a hard t-push across to square up to F2, who can stop and shoot or one-time it from the dot. G makes the save and tracks the puck out. F2 retrieves a puck from the corner and circles up around the top of the circle — G walks with F2 gaining depth. F2 can shoot or pass to F1, who can either stay high and shoot (G t-pushes across) or go backdoor (G gains momentum back and butterfly slides across). Players play out the rebound on the second shot.",
      "drill_category": [
        "crease_movement",
        "tracking_vision",
        "save_technique"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 15,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "top_of_circles",
        "in_tight"
      ],
      "goalie_starting_position": "Square to F1 at top of circle",
      "movement_sequence": [
        "start_square_to_F1",
        "t_push_across_to_F2_on_pass",
        "square_up_to_F2",
        "save_first_shot",
        "track_puck_out",
        "walk_with_F2_gaining_depth_as_they_circle",
        "read_F1_position",
        "IF_F1_stays_high: t_push_across_to_F1",
        "IF_F1_goes_backdoor: gain_momentum_back_butterfly_slide",
        "save_second_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Get all the way square before the first shot",
        "Track the puck out after the save",
        "Walk with F2 on the circle — gain depth",
        "Read F1 early — backdoor or staying high",
        "Gain momentum back before the backdoor slide",
        "Play the rebound on the second shot"
      ],
      "tags": [
        "pass_and_shoot",
        "lateral_movement",
        "t_push",
        "backdoor",
        "rebound",
        "game_read",
        "two_shot"
      ],
      "variations": [],
      "clip_file": "drill-clips/cross-ice-pass-read-circle-rebound.mp4",
      "clip_loop": false,
      "has_animation": false,
      "coach_notes": "The critical read is tracking F1's position while following F2 on the circle. Goalies tend to lock onto the puck carrier and lose F1 entirely. They need to peripheral-track F1 while maintaining depth on F2 — if F1 drifts backdoor the goalie must already be gaining momentum back before the pass is made, not after."
    },
    {
      "id": "drift-shuffle-post-t-push",
      "name": "Drift Out — Shuffle to Post, T-Push",
      "description": "G starts on the goal line, drifts out to the face of their angle, then drifts back and takes two shuffles into the near post. G then t-pushes out to F1, who is positioned between the edge of the circle and the face-off dot, for a shot. G follows and plays out the rebound. Works on controlled depth adjustment, clean post entry, and an explosive t-push to challenge the shooter.",
      "drill_category": [
        "warmup",
        "crease_movement",
        "positioning_angles"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks"
      ],
      "goalie_starting_position": "Goal line, near post area",
      "movement_sequence": [
        "start_on_goal_line",
        "drift_out_to_face_of_angle",
        "drift_back_toward_net",
        "two_shuffles_to_near_post",
        "t_push_out_to_F1",
        "save_shot",
        "follow_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Controlled drift out — stay on your angle",
        "Drift back smooth, don't rush",
        "Two clean shuffles into the post — stay tight",
        "Hard t-push out to F1 — get to depth",
        "Square up before the shot",
        "Follow the rebound all the way out"
      ],
      "tags": [
        "telescoping",
        "shuffle",
        "t_push",
        "post_play",
        "crease_movement",
        "positioning",
        "warmup",
        "rebound"
      ],
      "variations": [],
      "clip_file": "drill-clips/drift-shuffle-post-t-push.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "A simple drill that isolates depth control and post entry before the t-push. The drift out and back teaches the goalie to adjust their depth actively rather than staying static. The two shuffles into the post should be clean and controlled — not rushed. The t-push out to F1 is the payoff rep; it should reach proper depth so the goalie has a real angle on the shooter."
    },
    {
      "id": "dump-in-goalie-pass-one-timer",
      "name": "Dump-In — Goalie Pass and One-Timer Read",
      "description": "F1 dumps a puck in from the blue line. G1 starts at the near post and skates behind the net to stop the puck, while G2 shuffles from the far post to cover the near post. F1 skates toward the net. G1 passes to F1 for a one-timer in tight. G2 tracks the pass, reads F1, and butterfly slides or shuffles out to make the save. Rebound is played out. Goalies then switch positions and repeat. Trains puck handling and passing behind the net for G1, and pass-tracking with a quick read-and-react save for G2.",
      "drill_category": [
        "stickhandling_puck_play",
        "crease_movement",
        "zone_entry"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "behind_net",
        "in_tight",
        "blue_line"
      ],
      "requires_goalie_partner": true,
      "goalie_starting_position": "G1 near post, G2 far post",
      "movement_sequence": [
        "F1_dumps_puck_from_blue_line",
        "G1_skates_behind_net_to_stop_puck",
        "G2_shuffles_from_far_post_to_near_post",
        "F1_skates_toward_net",
        "G1_passes_to_F1_for_one_timer",
        "G2_tracks_pass_and_reads_F1",
        "G2_butterfly_slide_or_shuffle_to_make_save",
        "play_rebound",
        "goalies_switch_positions",
        "repeat"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "butterfly_slide_save"
      ],
      "coaching_cues": [
        "G1: get behind the net quickly — stop the puck clean",
        "G1: firm pass, put it on F1's stick",
        "G2: shuffle to near post as G1 exits — don't wait",
        "G2: track the pass, not G1",
        "G2: read F1's hand and body before committing to the slide or shuffle",
        "G2: play the rebound — don't assume it's dead"
      ],
      "tags": [
        "stickhandling_puck_play",
        "behind_net",
        "pass",
        "one_timer",
        "butterfly_slide",
        "shuffle",
        "zone_entry",
        "rebound",
        "two_goalie"
      ],
      "variations": [],
      "clip_file": "drill-clips/dump-in-goalie-pass-one-timer.mp4",
      "clip_loop": false,
      "has_animation": false,
      "coach_notes": "Two separate skill sets in one rep — the G1 role tests puck handling and passing confidence under pressure, and the G2 role tests pass tracking and quick decision-making in tight. Common G1 error is a weak or misdirected pass that kills the one-timer; the pass needs to be firm and well-timed. Common G2 error is committing too early before tracking the pass — G2 should be reading the pass trajectory and F1's body simultaneously. Make sure goalies get equal reps on both sides."
    },
    {
      "id": "five-puck-elimination-game",
      "name": "Five Puck Elimination Game",
      "description": "End-of-session elimination compete game requiring at least 3 shooters. Five pucks are staged behind the net. One shooter at a time has 45 seconds to score as many of the 5 pucks as possible. The play zone is from behind the net out to the hash marks in an arc — all in-tight. If the goalie covers the puck or the puck leaves the zone, that puck is dead. Otherwise the shooter continues playing the same puck. The shooter who scores the least in a round is eliminated. Rounds continue until one shooter is left. Goalies switch after each round.",
      "drill_category": [
        "compete",
        "save_technique",
        "rebound_control",
        "recovery_desperation"
      ],
      "session_slot": "compete",
      "duration_minutes": 15,
      "difficulty": "advanced",
      "shooter_count_min": 3,
      "shooter_count_max": 5,
      "shot_count": 5,
      "ice_zone": [
        "behind_net",
        "in_tight"
      ],
      "requires_goalie_partner": true,
      "goalie_starting_position": "set in crease, ready for jam play in tight",
      "movement_sequence": [
        "track_shooter_starting_behind_net",
        "adjust_depth_as_shooter_walks_out_into_zone",
        "challenge_and_make_save_or_cover_in_zone",
        "cover_or_direct_out_of_zone_to_kill_puck",
        "reset_quickly_for_next_puck_clock_still_running"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "desperation_save",
        "paddle_down"
      ],
      "coaching_cues": [
        "Cover anything in reach — a smothered puck ends that possession",
        "Track the shooter's hands and body, not just the puck — read intent in tight",
        "Stay aggressive on your depth — don't retreat to the goal line",
        "Reset fast after each dead puck — the clock keeps running",
        "Stay patient between pucks — 45 seconds is long, don't panic early"
      ],
      "tags": [
        "jam_play",
        "in_tight",
        "behind_net",
        "compete",
        "game_format",
        "elimination",
        "cover",
        "rebound_control",
        "wrap_around",
        "desperation_save"
      ],
      "variations": [],
      "clip_file": "drill-clips/five-puck-elimination-game.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "High-pressure elimination game that simulates the most chaotic in-tight scenarios a goalie faces. The zone restriction (behind net to hash marks arc) prevents shooters from backing out for clean looks — every attempt is a jam play, wrap-around threat, or in-tight battle. The elimination format keeps stakes high throughout all rounds, not just the final. Goalies switching after each round ensures both face equal pressure and prevents one goalie from getting a favorable matchup every time. Watch for goalies who over-retreat to the goal line — staying tight to the post and aggressive on depth is essential in this zone."
    },
    {
      "id": "glove-save-post-recover-backdoor",
      "name": "Glove Save + Post Recover + Backdoor",
      "description": "Two-shot technique drill focusing on glove save, post recovery, and backdoor reaction. F1 positions at the dot, slightly inside. The goalie partner or rebound board is set up backdoor. The goalie starts in butterfly, square to F1. F1 shoots high glove (shot 1); the goalie makes the glove save, recovers to the near side post, then shuffles back out to F1. F1 passes or pass-shoots backdoor off the goalie partner or rebound board (shot 2). The goalie tracks and makes the backdoor save. Can be run with a goalie partner or a rebound board as the backdoor target.",
      "drill_category": [
        "save_technique",
        "crease_movement"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "in_tight"
      ],
      "requires_goalie_partner": true,
      "goalie_starting_position": "butterfly, square to F1 at dot",
      "movement_sequence": [
        "set_in_butterfly_square_to_f1",
        "make_glove_save_on_high_shot",
        "recover_to_near_side_post",
        "shuffle_back_out_to_f1",
        "track_f1_pass_backdoor_to_gp_or_rebound_board",
        "make_save_on_backdoor_shot"
      ],
      "save_types": [
        "glove_save",
        "pad_save",
        "blocker_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Start square in butterfly — set your base before F1 shoots",
        "Reach up and through the puck on the glove save — don't wave at it",
        "Recover all the way to the post — don't shortcut the recovery",
        "Shuffle back out with purpose — reset your depth before F1 passes",
        "Eyes lead on the backdoor — track F1's pass before your body moves"
      ],
      "tags": [
        "butterfly",
        "glove_save",
        "post_play",
        "recovery",
        "shuffle",
        "backdoor",
        "tracking",
        "two_puck"
      ],
      "variations": [],
      "clip_file": "drill-clips/glove-save-post-recover-backdoor.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Similar structure to blocker-save-rebound-tip-smother but with a glove focus on shot 1 and a full post recovery before shuffling back out. The rebound board alternative makes this runnable in a 1-goalie, 1-shooter session — versatile drill. Watch for goalies who cheat the post recovery, going only partway before shuffling back out; that leaves short side open and puts the goalie in a poor shuffle angle. The glove save technique is as important as the recovery — 'reach through the puck' is the key cue."
    },
    {
      "id": "go-call-lateral-drop-net-attack",
      "name": "Go Call — Lateral Release and Net Attack",
      "description": "F1 is positioned just below the face-off dot. G starts on the post on F1's side, t-pushes out to the center top of the crease. On F1's 'go' call, G locates F1 and lateral releases into the save for the first shot. F1 then picks up a second puck below the goal line and attacks the net in tight. G plays the second shot and rebound out. Trains reaction to a verbal cue, locating the shooter before committing to the lateral release, and transitioning from a reaction save to an in-tight play.",
      "drill_category": [
        "crease_movement",
        "save_technique"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "in_tight"
      ],
      "goalie_starting_position": "Post on F1's side",
      "movement_sequence": [
        "start_on_post_F1_side",
        "t_push_out_to_center_top_of_crease",
        "react_to_go_call",
        "locate_F1",
        "lateral_release_into_save",
        "save_first_shot",
        "track_F1_picking_up_puck_below_goal_line",
        "set_position_for_in_tight_attack",
        "save_second_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Eyes find F1 before dropping — don't react blind to the call",
        "Locate first, drop second — the head turn is the trigger",
        "Stay connected through the lateral release",
        "Reset immediately after shot 1 — F1 is already moving to the puck",
        "Track F1 attacking from below the goal line",
        "Play the rebound — stay live after shot 2"
      ],
      "tags": [
        "t_push",
        "lateral_movement",
        "tracking_vision",
        "in_tight",
        "jam_play",
        "rebound",
        "two_shot",
        "crease_movement",
        "desperation_save",
        "verbal_cue"
      ],
      "variations": [],
      "clip_file": "drill-clips/go-call-lateral-drop-net-attack.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The 'go' call is a key element — the goalie has to find F1 before dropping, not react to the sound alone. A goalie who drops without locating the shooter first is guessing. After shot 1, the reset has to be immediate; F1 is already picking up the second puck. The in-tight attack on shot 2 rewards a goalie who stays mentally engaged after the first save rather than relaxing."
    },
    {
      "id": "high-slot-entry-backdoor-curl",
      "name": "High Slot Entry + Backdoor Curl",
      "description": "F1 starts in the corner along the goal line against the boards. F2 starts at the top of the circles, center ice, in line with the net (high slot). F1 passes to F2; the goalie makes a hard t-push out to challenge F2. F2 can either walk in a step and shoot, or pass down to F1 driving from the corner for a tip on net. After the first shot, F2 curls up and drives backdoor to the far post. F1 returns to the corner, picks up puck 2, and circles up around the circle. The goalie resets and t-pushes out again to challenge F1's angle. F1 can shoot or hit F2 moving backdoor — the goalie loads momentum toward F1 then slides across for the backdoor save if needed. Play puck 2 out. Drill switches sides.",
      "drill_category": [
        "save_technique",
        "crease_movement",
        "positioning_angles",
        "tracking_vision"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "top_of_circles",
        "in_tight"
      ],
      "goalie_starting_position": "set at top of crease, tracking F1 in corner before the pass",
      "movement_sequence": [
        "track_f1_in_corner_set_initial_depth",
        "t_push_out_to_challenge_f2_at_high_slot",
        "make_save_on_f2_shot_or_track_f1_tip_drive",
        "reset_depth_and_track_f2_curling_backdoor",
        "t_push_out_to_challenge_f1_circling_with_puck_2",
        "load_momentum_toward_f1_read_pass_to_f2_backdoor",
        "make_save_on_f1_shot_or_slide_across_for_f2_backdoor",
        "play_out_second_puck"
      ],
      "save_types": [
        "blocker_save",
        "glove_save",
        "pad_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Hard t-push on the pass — take away F2's shooting lane before they can set",
        "Stay square to F2 at the high slot; don't let F1's tip drive pull your eyes early",
        "During the reset, track F2's curl — know where they're going before puck 2 moves",
        "Match the same aggression on the second t-push as the first — F1 gets the same challenge",
        "Load momentum toward F1 so you have something to push off for the backdoor slide",
        "Wait for F2 to receive the pass before committing to the slide — don't go early"
      ],
      "tags": [
        "t_push",
        "telescoping",
        "high_slot",
        "tip",
        "backdoor",
        "circle_walk",
        "lateral_slide",
        "two_puck",
        "pass_and_shoot"
      ],
      "variations": [],
      "clip_file": "drill-clips/high-slot-entry-backdoor-curl.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "This drill demands two distinct t-push challenges with a full regroup in between. The biggest coaching point is the transition: by the time F1 picks up puck 2 and starts around the circle, the goalie must already know where F2 is setting up backdoor — not be discovering it when the pass comes. Common error is the goalie losing F2's curl path during the reset and getting caught flat-footed. On the backdoor slide, timing is critical — the goalie should be loading off F1's shot angle and reacting to the pass, not anticipating it."
    },
    {
      "id": "lateral-release-rvh-bump-out-slot",
      "name": "Lateral Release — RVH Post Entry and Bump Out",
      "description": "F1 is in the slot with a puck. G starts at the top of the crease square to F1, lateral releases to the face-off dot angle, then rotate pushes into RVH on the near side post. On F1's 'go' call, G bumps off the post and leads with eyes and hands to the shot from F1 in the slot. G plays out the rebound. Trains lateral release technique, rotate push into RVH post entry, and a clean bump out with eyes and hands arriving first.",
      "drill_category": [
        "crease_movement",
        "positioning_angles",
        "save_technique"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks",
        "in_tight"
      ],
      "goalie_starting_position": "Top of crease, square to F1",
      "movement_sequence": [
        "start_top_of_crease_square_to_F1",
        "lateral_release_to_faceoff_dot_angle",
        "rotate_push_into_RVH_near_post",
        "set_RVH_on_post",
        "react_to_go_call",
        "bump_off_post_to_shot",
        "eyes_and_hands_lead_to_F1",
        "save_slot_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Lead with eyes through the lateral release",
        "Rotate push into RVH — set clean before the 'go' call",
        "Eyes and hands lead out of the bump — not the pads",
        "React to F1's release, not the 'go' call alone",
        "Challenge the slot — don't bump and stay deep",
        "Play the rebound out"
      ],
      "tags": [
        "lateral_release",
        "RVH",
        "post_play",
        "bump_out",
        "rotate_push",
        "tracking_vision",
        "crease_movement",
        "verbal_cue",
        "rebound",
        "post_entry_exit"
      ],
      "variations": [],
      "clip_file": "drill-clips/lateral-release-rvh-bump-out-slot.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Three distinct habits in one rep: the lateral release getting eyes ahead of the body, the rotate push setting a clean RVH before the call, and the bump out leading with eyes and hands rather than pads. A goalie who bumps out pad-first is already behind the play. The RVH needs to be fully set before F1 calls 'go' — goalies who are still settling into position on the call have no time to read the shot."
    },
    {
      "id": "overlap-pivot-backdoor-hands",
      "name": "Overlap Pivot + Backdoor Hands",
      "description": "Technique drill focused on pivot quality and hand positioning on a lateral powerslide. The goalie starts in overlap at the top of the crease on the post angle, then cuts back into the post. From there they take a small shuffle or t-push out to the face-off dot on the same side. F1 calls 'go' — the goalie butterfly pivots, finds F1, and powerslides across with hands extended toward the shooter's blade to smother the puck. F1 is positioned between the bottom of the circle and the hash marks, just inside the face-off dot angle, emulating a backdoor shot. The focus is on the correct pivot angle, getting hands out facing the blade, and smothering rather than swatting.",
      "drill_category": [
        "save_technique",
        "crease_movement"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "in_tight"
      ],
      "goalie_starting_position": "overlap at top of crease on post angle",
      "movement_sequence": [
        "start_overlap_at_top_of_crease_on_post_angle",
        "cut_back_from_overlap_into_post",
        "shuffle_or_t_push_out_to_face_off_dot",
        "react_to_go_call_butterfly_pivot_to_find_f1",
        "powerslide_across_with_hands_extended_to_shooters_blade",
        "smother_puck_hands_facing_blade"
      ],
      "save_types": [
        "glove_save",
        "blocker_save",
        "pad_save"
      ],
      "coaching_cues": [
        "Start the butterfly pivot early — your push angle depends on where you pivot to",
        "Find F1's blade before you push — your hands need a target before you commit",
        "Lead with your hands, not your pads — the push gets you there, hands make the save",
        "Palms open, thumbs up — hands facing the blade, not the body",
        "Smother it, don't swat — absorb the puck into your equipment"
      ],
      "tags": [
        "overlap",
        "t_push",
        "shuffle",
        "butterfly_pivot",
        "power_slide",
        "backdoor",
        "hands",
        "lateral_slide",
        "verbal_cue"
      ],
      "variations": [],
      "clip_file": "drill-clips/overlap-pivot-backdoor-hands.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Pure technique rep — the movement chain before the go call is the setup, but the real coaching happens at the pivot and the hands. Two common errors: (1) goalie pivots too late or to the wrong angle, meaning the push takes them past the puck rather than into it; (2) hands are passive or trailing, so the puck finds a gap rather than being smothered. The shooter should aim for the hands deliberately — this isn't about beating the goalie, it's about giving them a target to close on. Run high reps from both sides."
    },
    {
      "id": "overlap-rvh-net-drive",
      "name": "T-Push to Overlap — RVH Net Drive",
      "description": "G starts on top of the crease square to the far top of the circle. T-pushes across and down to the post, then takes a quick double c-cut out in an overlap to challenge F1 just above the goal line. F1 drives the net tight and either shoots or pulls across to the far side. G regains momentum back, drops into RVH, and makes the save.",
      "drill_category": [
        "crease_movement",
        "save_technique"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 2,
      "shot_count": 1,
      "ice_zone": [
        "in_tight"
      ],
      "goalie_starting_position": "Top of crease, square to far top of the circle",
      "movement_sequence": [
        "t_push_across_to_post",
        "double_c_cut_out_overlap",
        "challenge_F1",
        "regain_momentum_back",
        "drop_RVH"
      ],
      "save_types": [
        "pad_save",
        "blocker_save"
      ],
      "coaching_cues": [
        "Explosive t-push to post",
        "Attack the angle on the overlap",
        "Read F1's hands — shoot or pull",
        "Regain momentum before the drop",
        "Seal the post in RVH"
      ],
      "tags": [
        "in_tight",
        "net_drive",
        "post_play",
        "lateral_movement",
        "overlap",
        "RVH"
      ],
      "variations": [],
      "clip_file": "drill-clips/overlap-rvh-net-drive.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The overlap is the key teaching point — goalie has to commit to getting out and challenging, not hanging back on the post. The RVH drop needs momentum already moving back toward the net before the drop; if they're flat-footed when F1 pulls far side the post is exposed."
    },
    {
      "id": "overlap-t-push-go-call-react",
      "name": "Overlap — T-Push and Go Call React",
      "description": "F1 is at the face-off dot. G starts on the far side in an overlap position, uses the overlap to generate momentum back into the post, then t-pushes out to the center top of the crease. On F1's 'go' call, G locates F1 and lateral releases into the save. G follows and plays out the rebound. Trains using the overlap to generate momentum into the post, a clean t-push to depth, and a reaction lateral release off a verbal cue.",
      "drill_category": [
        "crease_movement",
        "save_technique"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks"
      ],
      "goalie_starting_position": "Far side overlap position",
      "movement_sequence": [
        "start_in_far_side_overlap",
        "generate_momentum_back_into_post",
        "t_push_out_to_center_top_of_crease",
        "react_to_go_call",
        "locate_F1",
        "lateral_release_into_save",
        "follow_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Use the overlap to load momentum — don't just walk back to the post",
        "Clean post touch before the t-push",
        "Hard t-push to center top of crease — get to depth",
        "Eyes find F1 on the 'go' call — locate before dropping",
        "Stay connected through the lateral release",
        "Follow the rebound all the way out"
      ],
      "tags": [
        "overlap",
        "t_push",
        "lateral_movement",
        "tracking_vision",
        "crease_movement",
        "verbal_cue",
        "rebound",
        "post_play"
      ],
      "variations": [],
      "clip_file": "drill-clips/overlap-t-push-go-call-react.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The overlap is the setup move — it should generate real momentum back into the post rather than just being a stylistic starting position. A goalie who doesn't use the overlap to load will arrive at the post flat-footed and produce a weak t-push. Pairs naturally with the go-call lateral release net attack drill; both use the same verbal cue and lateral release finish but this one emphasizes the overlap and momentum generation as the starting sequence."
    },
    {
      "id": "pass-slot-shot-rvh-bump-out",
      "name": "Pass to Slot — RVH Head-Check and Bump Out",
      "description": "F1 starts at the dot with a puck and passes to F2 in the slot. F2 takes a one-touch shot or catches and moves back the other way. G pivots and gets eyes and hands to F2 before the first shot. After the shot, F2 skates behind the net to pick up a puck and moves to center behind the net, while F1 drives toward the net. F2 passes to F1 on either side of the net. G sets RVH, head-checks to locate F2 behind the net, reads which side the pass is coming to, and bumps out to challenge F1 for the second shot. Second shot is played out. Works on pivots with eyes and hands arriving first, RVH positioning behind the net, head-checking, and bumping out to the proper angle.",
      "drill_category": [
        "crease_movement",
        "save_technique",
        "positioning_angles"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "in_tight",
        "behind_net"
      ],
      "goalie_starting_position": "Center of crease, square to F1",
      "movement_sequence": [
        "track_pass_from_F1_to_F2",
        "pivot_and_get_eyes_hands_to_F2",
        "save_first_shot_from_F2",
        "reset_and_set_RVH_as_F2_goes_behind_net",
        "head_check_to_locate_F2_behind_net",
        "read_pass_side",
        "bump_out_to_challenge_F1",
        "save_second_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Pivot early — eyes and hands get there before the shot",
        "Track the pass, not F2's skates",
        "Set RVH clean before the head-check",
        "Head-check before committing — know where F2 is",
        "Read the pass direction early, bump to that side",
        "Bump out with authority — get to your angle before F1 shoots"
      ],
      "tags": [
        "RVH",
        "pivot",
        "tracking_vision",
        "behind_net",
        "bump_out",
        "post_play",
        "two_shot",
        "crease_movement",
        "pass_and_shoot"
      ],
      "variations": [],
      "clip_file": "drill-clips/pass-slot-shot-rvh-bump-out.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Two distinct skill reps in one sequence. Shot 1 tests the pivot habit — the goalie should be getting eyes and hands to F2 before the shot arrives, not reacting after release. Shot 2 is the RVH rep: the head-check is the critical habit, and it has to happen before the bump out so the goalie knows which side to move to. A goalie who bumps out without checking is guessing. Watch that the bump out reaches proper depth — coming out too shallow on a net-front pass leaves the far side open."
    },
    {
      "id": "pass-wrap-slide",
      "name": "Pass & Wrap — Slide Series",
      "description": "F1 starts at the hash marks inside the circle and passes to F2 on the goal line. F2 catches and wraps tight trying to score far side. G starts square to F1 and butterfly slides to F2, then power slides across the crease to make the save. Reset and repeat other side.",
      "drill_category": [
        "crease_movement",
        "save_technique"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 1,
      "ice_zone": [
        "in_tight"
      ],
      "goalie_starting_position": "Square to F1, inside the circle just off the hash marks",
      "movement_sequence": [
        "butterfly_slide_to_F2",
        "power_slide_across_crease"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Track the pass",
        "Quick slide and reaction",
        "Keep everything tight, rotate effectively",
        "Hand out and over the puck",
        "Follow the rebound"
      ],
      "tags": [
        "jam_play",
        "in_tight",
        "post_to_post",
        "pass_and_shoot",
        "crease_movement"
      ],
      "variations": [
        {
          "name": "Variation 2 — Hybrid VH",
          "description": "Same setup and read, but goalie sets hybrid VH on the post instead of butterfly sliding to F2, then slides out into the shooter.",
          "movement_sequence": [
            "set_VH_on_post",
            "slide_to_shooter"
          ],
          "clip_file": "drill_variation2_vh_slide.mp4"
        }
      ],
      "clip_file": "drill_variation1_butterfly_powerslide.mp4",
      "has_animation": false,
      "coach_notes": "Hands should be attacking — out and over the puck, not passive. On a glove-to-blocker side slide, paddle down is a good variation to work in."
    },
    {
      "id": "pivot-shuffle-save-dot-to-dot",
      "name": "Pivot — Shuffle, Save, Dot to Dot",
      "description": "F1 is positioned just above the hash marks in the middle of the ice with a stack of pucks. G starts at one face-off dot angle, pivots toward F1, and shuffles to the middle of the crease. F1 shoots; G makes the save and recovers to the opposite (blocker-side) face-off dot. G finds F1, pivots, shuffles back to the middle, makes the save on the far side, and rotates to that face-off dot. The pattern repeats continuously, shuttling back and forth between the two face-off dot angles with a save in the middle each rep. Good for all levels — reinforces pivoting, efficient shuffles to depth, and consistent save position from multiple angles.",
      "drill_category": [
        "warmup",
        "crease_movement",
        "save_technique"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks",
        "top_of_circles"
      ],
      "goalie_starting_position": "Face-off dot angle, one side",
      "movement_sequence": [
        "start_at_faceoff_dot_angle",
        "pivot_toward_F1",
        "shuffle_to_middle_of_crease",
        "save_shot",
        "recover_to_opposite_faceoff_dot",
        "pivot_toward_F1",
        "shuffle_to_middle_of_crease",
        "save_shot_far_side",
        "rotate_to_far_side_faceoff_dot",
        "repeat_continuously"
      ],
      "save_types": [
        "blocker_save",
        "glove_save",
        "pad_save"
      ],
      "coaching_cues": [
        "Sharp pivot before the shuffle — don't start moving before you've turned",
        "Shuffle to your depth — get all the way to the middle, don't stop short",
        "Square up to F1 before the shot — hips and shoulders facing the puck",
        "Recover clean to the dot before the next rep — don't cheat the reset"
      ],
      "tags": [
        "pivot",
        "shuffle",
        "blocker_save",
        "glove_save",
        "continuous",
        "warmup",
        "dot_to_dot",
        "crease_movement"
      ],
      "variations": [],
      "own_content": false,
      "clip_source_url": "instagram",
      "clip_file": "drill-clips/pivot-shuffle-save-dot-to-dot.mov",
      "clip_loop": true,
      "has_animation": false
    },
    {
      "id": "post-entry-exit-rvh-powerslide",
      "name": "Post Entry & Exit — RVH to Powerslide",
      "description": "G starts at the top center of the crease and shuffles toward the post as if tracking a player coming down. Comes into the post and sets RVH. Bumps off the RVH out to center landing in butterfly. Pivots and powerslides to the opposite post. Recovers to feet and t-pushes back to center. Repeat. Trains post entry and exit, RVH positioning, butterfly pivoting, and powerslide generation.",
      "drill_category": [
        "skating",
        "crease_movement"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "intermediate",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "net_required",
      "goalie_starting_position": "Top center of crease",
      "movement_sequence": [
        "shuffle_to_post",
        "set_RVH_on_post",
        "bump_off_RVH_to_center_in_butterfly",
        "pivot",
        "power_slide_to_opposite_post",
        "recover_to_feet",
        "t_push_back_to_center",
        "repeat"
      ],
      "save_types": [],
      "coaching_cues": [
        "Clean post entry — set the RVH before the bump",
        "Sharp pivot off the RVH",
        "Stay in butterfly through the powerslide",
        "Explosive t-push back to center"
      ],
      "tags": [
        "RVH",
        "post_play",
        "butterfly_slide",
        "power_slide",
        "t_push",
        "skating",
        "post_entry_exit"
      ],
      "variations": [],
      "clip_file": "drill-clips/post-entry-exit-rvh-powerslide.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The bump off the RVH is a controlled push, not a fall — the goalie should be generating the butterfly landing deliberately. Common error is pivoting too early before fully landing in butterfly, which kills the powerslide angle. The t-push back to center should be explosive so the next rep starts with momentum."
    },
    {
      "id": "post-shuffle-window-check",
      "name": "Post Shuffle — Window Check",
      "description": "G starts on the post and takes a short shuffle along the goal line, staying on a slight angle (roughly 30 degrees) rather than flat across the line. Checks their window over their shoulder as they go, then shuffles back to the post. Repeats for several reps on one side, then switches to the other post. Trains awareness of plays behind the net and clean entry and exit from the post.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "behind_net"
      ],
      "setup_required": "net_required",
      "goalie_starting_position": "On post",
      "movement_sequence": [
        "shuffle_along_goal_line_on_angle",
        "check_window_over_shoulder",
        "shuffle_back_to_post",
        "repeat_same_side",
        "switch_to_opposite_post",
        "repeat_other_side"
      ],
      "save_types": [],
      "coaching_cues": [
        "Stay on a 30 degree angle — never flat on the goal line",
        "Check the window early — don't wait",
        "Angle lets you pivot and push out quickly if needed",
        "Quick shuffle back to post",
        "Keep depth — don't creep out"
      ],
      "tags": [
        "shuffle",
        "post_play",
        "behind_net",
        "skating",
        "awareness",
        "positioning"
      ],
      "variations": [
        {
          "name": "V2 — Shuffle Off Post, Drop RVH",
          "description": "Same starting position on the post, same 30 degree angle. G shuffles along the goal line and drops into RVH rather than returning to the post. Trains the transition from post position into a save-ready RVH for plays emerging from behind the net.",
          "movement_sequence": [
            "shuffle_along_goal_line_on_angle",
            "drop_RVH"
          ],
          "difficulty": "intermediate",
          "clip_file": "drill-clips/post-shuffle-rvh.mp4",
          "clip_loop": false
        }
      ],
      "clip_file": "drill-clips/post-shuffle-window-check.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The 30 degree angle is critical — a goalie flat on the goal line has to take extra steps to pivot and challenge a shooter coming out from behind the net. The angle keeps them primed to push. The window check is the other key habit; goalies need to track the puck carrier continuously when play goes behind the net."
    },
    {
      "id": "post-t-push-go-call-pivot-slide-back",
      "name": "Post T-Push — Go Call, Pivot, Slide Back",
      "description": "F1 is positioned just inside the top of the circle on the near side with a stack of pucks. G starts on the near-side post, t-pushes out to the far-side face-off dot, and holds. F1 yells go; G pivots, butterfly slides back toward the net, and makes the save with hands leading. G resets to the near-side post and repeats. Good for all levels — reinforces the full push-out and explosive reaction back on the go call.",
      "drill_category": [
        "warmup",
        "crease_movement",
        "save_technique"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks",
        "top_of_circles"
      ],
      "goalie_starting_position": "Near-side post",
      "movement_sequence": [
        "start_near_side_post",
        "t_push_to_far_faceoff_dot",
        "hold_at_depth",
        "react_to_go_call",
        "pivot",
        "butterfly_slide_back_toward_net",
        "save_shot_hands_leading",
        "reset_to_near_side_post"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Full t-push to the far dot — commit to depth before stopping",
        "React on the go call — don't anticipate, wait for the cue",
        "Sharp pivot before the slide — don't start sliding before you've turned",
        "Hands lead back toward the puck — don't let the hands drag behind the slide",
        "Reset clean to the post before the next rep"
      ],
      "tags": [
        "t_push",
        "pivot",
        "butterfly_slide",
        "lateral_release",
        "go_call",
        "hands",
        "warmup",
        "crease_movement"
      ],
      "variations": [],
      "own_content": false,
      "clip_source_url": "https://www.youtube.com/watch?v=oGSxVRM126M",
      "clip_file": "drill-clips/post-t-push-go-call-pivot-slide-back.mp4",
      "clip_loop": true,
      "has_animation": false
    },
    {
      "id": "puck-circuit-arc-back-cut-pivot",
      "name": "Puck Circuit — Arc Back Cut Pivot",
      "description": "Intermediate skating circuit with 4 pucks evenly spaced along the arc of the crease. Goalie starts on P3, butterfly slides to P1, cuts backward around P1 in butterfly, powerslides to P2, pivots and powerslides to P4, then t-pushes back to P3.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "standing on P3 on crease arc",
      "movement_sequence": [
        "start_on_p3",
        "butterfly_slide_to_p1",
        "backward_butterfly_cut_around_p1",
        "powerslide_to_p2",
        "pivot_and_powerslide_to_p4",
        "t_push_to_p3"
      ],
      "save_types": [],
      "coaching_cues": [
        "Stay in butterfly through the backward cut — don't stand up to turn",
        "The backward cut around P1 sets your angle for the powerslide to P2 — get it right before you push",
        "Keep your chest up through the backward cut — don't collapse forward",
        "Load your edges before the pivot — the pivot-powerslide to P4 is one fluid motion",
        "Finish the t-push all the way back to P3 — complete every rep"
      ],
      "tags": [
        "butterfly_slide",
        "butterfly_pivot",
        "power_slide",
        "t_push",
        "puck_circuit",
        "edge_control",
        "crease_movement",
        "backward_cut"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-arc-back-cut-pivot.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Four pucks evenly spaced on the crease arc. The backward butterfly cut around P1 is the technical centerpiece — the goalie stays in butterfly and rotates backward around the puck rather than standing up to turn. This trains efficient low movement without losing the butterfly base. The pivot-powerslide combination (P2→P4) is the most demanding transition and where form tends to break down first. Good intermediate progression before the forward-cut circuits. Run multiple reps and switch directions."
    },
    {
      "id": "puck-circuit-arc-forward-cut-t-push",
      "name": "Puck Circuit — Arc Forward Cut T-Push",
      "description": "Intermediate skating circuit with 4 pucks evenly spaced along the arc of the crease. Goalie starts on P3, t-pushes to P2, butterfly slides to P4, cuts forward around P4 in butterfly, powerslides to P1, t-pushes to P2, then t-pushes back to P3.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "standing on P3 on crease arc",
      "movement_sequence": [
        "start_on_p3",
        "t_push_to_p2",
        "butterfly_slide_to_p4",
        "forward_butterfly_cut_around_p4",
        "powerslide_to_p1",
        "t_push_to_p2",
        "t_push_to_p3"
      ],
      "save_types": [],
      "coaching_cues": [
        "Stay low through the forward butterfly cut — use P4 as your pivot point, not a stopping point",
        "Load your edges after the cut before the powerslide — don't rush the push",
        "Back-to-back t-pushes at the end get the same explosion as the first — no coasting to finish",
        "Keep your chest up through the butterfly slide — stay long and controlled"
      ],
      "tags": [
        "t_push",
        "butterfly_slide",
        "butterfly_pivot",
        "power_slide",
        "puck_circuit",
        "edge_control",
        "crease_movement"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-arc-forward-cut-t-push.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Four pucks evenly spaced on the crease arc. The forward butterfly cut around P4 is the technical focal point — the puck is a pivot marker and the cut should be tight and continuous, not a stop-and-reset. The back-to-back t-pushes at the end (P1→P2→P3) are the conditioning challenge; both should be full-extension explosions. Good intermediate bridge between the simpler arc-t-push-slide circuit and the more complex four-point-arc. Run multiple reps and switch directions."
    },
    {
      "id": "puck-circuit-arc-t-push-slide",
      "name": "Puck Circuit — Arc T-Push Slide",
      "description": "Intermediate skating circuit with 4 pucks evenly spaced along the arc of the crease. Goalie starts on P2, shuffles to P3, t-pushes to P1, butterfly slides to P4, then t-pushes back to P2.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "standing on P2 on crease arc",
      "movement_sequence": [
        "start_on_p2",
        "shuffle_to_p3",
        "t_push_to_p1",
        "butterfly_slide_to_p4",
        "t_push_to_p2"
      ],
      "save_types": [],
      "coaching_cues": [
        "Stay square on the shuffle — don't let your hips open early",
        "Explode on the t-push to P1 — full extension before you glide",
        "Load your edges before the butterfly slide — don't just fall into it",
        "Second t-push back to P2 gets the same effort as the first — no coasting to finish"
      ],
      "tags": [
        "shuffle",
        "t_push",
        "butterfly_slide",
        "puck_circuit",
        "edge_control",
        "crease_movement"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-arc-t-push-slide.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Four pucks evenly spaced on the crease arc. Shorter and cleaner than the other arc circuits — good for earlier in a session or as a warm-up circuit before progressing to the back-cut or forward-cut versions. The two t-pushes should both be full-extension explosions, not lazy glides. The butterfly slide to P4 is the transition between them and should be controlled and low. Run multiple reps and switch directions."
    },
    {
      "id": "puck-circuit-backward-butterfly-slide-lead-edge-powerslide",
      "name": "Puck Circuit — Backward Butterfly Slide, Lead Edge Powerslide",
      "description": "Four pucks arranged in the shape of a crease. G starts at P4, shuffles to P3, shuffles to P2, t-pushes back to P4, performs a backward butterfly slide around P1, powerslides to P2 stopping on the lead skate edge, then rotates into a t-push back to P4.",
      "drill_category": [
        "skating",
        "crease_movement"
      ],
      "session_slot": "warmup",
      "duration_minutes": 8,
      "difficulty": "intermediate",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight",
        "hash_marks"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "P4 — near-side crease position",
      "movement_sequence": [
        "start_at_P4",
        "shuffle_to_P3",
        "shuffle_to_P2",
        "t_push_to_P4",
        "backward_butterfly_slide_around_P1",
        "powerslide_to_P2_stop_on_lead_skate_edge",
        "rotate_t_push_to_P4"
      ],
      "save_types": [],
      "coaching_cues": [
        "Stay tall and crisp through the shuffles — no slouching between pucks",
        "Sharp pivot before the t-push — generate power from the hip",
        "Backward butterfly slide: lead with the pad, stay controlled, go around the puck cleanly",
        "Lead skate edge stop on the powerslide — absorb the stop, don't overshoot the puck",
        "Rotate through the hips into the final t-push — don't just step, generate power"
      ],
      "tags": [
        "shuffle",
        "t_push",
        "backward_butterfly_slide",
        "powerslide",
        "lead_edge_stop",
        "rotate",
        "crease_movement",
        "puck_circuit"
      ],
      "variations": [],
      "own_content": false,
      "clip_source_url": "https://www.youtube.com/watch?v=oGSxVRM126M",
      "clip_file": "drill-clips/puck-circuit-backward-butterfly-slide-lead-edge-powerslide.mp4",
      "clip_loop": true,
      "has_animation": false
    },
    {
      "id": "puck-circuit-butterfly-powerslide",
      "name": "Puck Circuit — Butterfly Slide, Rotation, Powerslide",
      "description": "Three pucks are set up in a semi-circle (right side first, then repeat on the left). Puck 1 is the center starting point, puck 2 is to one side, puck 3 is on the far side of the arc. G starts on puck 1, shuffles to puck 2, t-pushes back to puck 1, butterfly slides to puck 3, rotates forward in butterfly around puck 3, then powerslides back to puck 1 and recovers to feet. Run all reps on the right side, then reset the puck layout and repeat on the left. Trains the full range of butterfly skating — shuffle, t-push, butterfly slide, in-butterfly rotation, and powerslide — in a continuous sequence.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 8,
      "difficulty": "advanced",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "Puck 1 — center of the semi-circle",
      "movement_sequence": [
        "start_on_puck_1",
        "shuffle_to_puck_2",
        "t_push_back_to_puck_1",
        "butterfly_slide_to_puck_3",
        "rotate_forward_in_butterfly_around_puck_3",
        "powerslide_back_to_puck_1",
        "recover_to_feet",
        "repeat_right_side",
        "reset_pucks_to_left_side",
        "repeat_left_side"
      ],
      "save_types": [],
      "coaching_cues": [
        "Sharp edges on the shuffle — stay under control",
        "Explosive t-push back to puck 1, don't drift",
        "Eyes up through the butterfly slide",
        "Hips stay square through the rotation — don't open up early",
        "Generate the powerslide from butterfly — don't stand up to push",
        "Full recovery to feet before resetting for the next rep"
      ],
      "tags": [
        "shuffle",
        "t_push",
        "butterfly_slide",
        "power_slide",
        "butterfly",
        "lateral_movement",
        "edgework",
        "skating",
        "rotation"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-butterfly-powerslide.mp4",
      "clip_loop": false,
      "has_animation": false,
      "coach_notes": "The puck markers force precise edges and destinations — the goalie can't approximate. The in-butterfly rotation around puck 3 is the hardest movement in the sequence; watch for hips opening up or the goalie popping up to reposition instead of staying in butterfly and driving the rotation from the hips. The powerslide back to puck 1 should generate from the butterfly position directly — any early stand-up kills the slide distance and defeats the purpose."
    },
    {
      "id": "puck-circuit-butterfly-slide-pivot-t-push",
      "name": "Puck Circuit — Butterfly Slide, Pivot, T-Push",
      "description": "Three pucks are set in a circuit pattern. G starts on puck 1, butterfly slides through the gap between puck 1 and puck 2, pivots down, recovers to feet, t-pushes to puck 3, then drives a big t-push back up to puck 1. Trains controlled butterfly slide with a sharp low pivot, clean recovery, and explosive t-push generation over distance.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 8,
      "difficulty": "advanced",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "Puck 1",
      "movement_sequence": [
        "start_on_puck_1",
        "butterfly_slide_between_puck_1_and_puck_2",
        "pivot_down",
        "recover_to_feet",
        "t_push_to_puck_3",
        "big_t_push_back_to_puck_1",
        "repeat"
      ],
      "save_types": [],
      "coaching_cues": [
        "Controlled slide through the gap — stay tight between the pucks",
        "Sharp pivot down off the slide",
        "Full recovery before generating the t-push",
        "Explosive t-push to puck 3",
        "Big t-push back to puck 1 — cover the distance, don't drift"
      ],
      "tags": [
        "butterfly_slide",
        "t_push",
        "pivot",
        "recovery",
        "lateral_movement",
        "edgework",
        "skating"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-butterfly-slide-pivot-t-push.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The puck gap on the butterfly slide is a precision marker — the goalie should be threading through cleanly, not overshooting. The pivot down after the slide needs to be sharp and low; a lazy pivot bleeds momentum before the recovery. The big t-push back to puck 1 is the power rep — it should cover real ground and finish at depth. If the goalie is taking extra steps to reach puck 1, they're not generating enough push."
    },
    {
      "id": "puck-circuit-five-point-crease",
      "name": "Puck Circuit — Five Point Crease",
      "description": "Advanced skating circuit with 5 pucks arranged in the shape of the crease, one puck at each key point of the outline. Goalie starts on P2, t-pushes to P3, shuffles to P4, butterfly slides to P5, cuts around P5 in butterfly, powerslides to P1, cuts around P1 in butterfly, powerslides to P4, powerslides to P3, then recovers with a t-push back to P2.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 10,
      "difficulty": "advanced",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "standing on P2",
      "movement_sequence": [
        "start_on_p2",
        "t_push_to_p3",
        "shuffle_to_p4",
        "butterfly_slide_to_p5",
        "cut_around_p5_in_butterfly",
        "powerslide_to_p1",
        "cut_around_p1_in_butterfly",
        "powerslide_to_p4",
        "powerslide_to_p3",
        "recover_t_push_to_p2"
      ],
      "save_types": [],
      "coaching_cues": [
        "Use the puck as a pivot point on every butterfly cut — stay tight, don't drift past it",
        "The butterfly slide to P5 should be low and controlled — load the edge before the cut",
        "Stay explosive on each powerslide — no coasting between pucks",
        "Back-to-back powerslides (P1→P4→P3) are the hardest sequence — keep your weight forward",
        "Finish the recover t-push all the way back to P2 — don't short it"
      ],
      "tags": [
        "t_push",
        "shuffle",
        "butterfly_slide",
        "power_slide",
        "c_cut",
        "puck_circuit",
        "crease_movement",
        "edge_control"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-five-point-crease.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Five pucks placed at key outline points of the crease shape — goalie uses the puck positions to train precise edge control and clean movement transitions around the crease footprint. The butterfly cuts around P5 and P1 are the technical focal points: the puck acts as a pivot marker and the cut must be tight. The two back-to-back powerslides (P1→P4→P3) are the most physically demanding sequence and where form tends to break down first. Run multiple reps and switch directions."
    },
    {
      "id": "puck-circuit-forward-butterfly-slide-backward-powerslide",
      "name": "Puck Circuit — Forward Butterfly Slide, Backward Powerslide",
      "description": "Three pucks arranged in a line or arc. G starts at P3, butterfly slides forward around P2, powerslides to P3 and stops on the edge, powerslides backward around P1, then t-pushes back to P3.",
      "drill_category": [
        "skating",
        "crease_movement"
      ],
      "session_slot": "warmup",
      "duration_minutes": 8,
      "difficulty": "intermediate",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight",
        "hash_marks"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "P3",
      "movement_sequence": [
        "start_at_P3",
        "butterfly_slide_forward_around_P2",
        "powerslide_to_P3_stop_on_edge",
        "powerslide_backward_around_P1",
        "t_push_to_P3"
      ],
      "save_types": [],
      "coaching_cues": [
        "Forward butterfly slide: lead with the pad, stay low and controlled around P2",
        "Edge stop on the powerslide to P3 — absorb the stop cleanly, don't overshoot",
        "Backward powerslide around P1: stay on a tight arc, control the glide",
        "Drive through the hips on the t-push back to P3 — generate power, don't just step"
      ],
      "tags": [
        "butterfly_slide",
        "powerslide",
        "backward_powerslide",
        "edge_stop",
        "t_push",
        "crease_movement",
        "puck_circuit"
      ],
      "variations": [],
      "own_content": false,
      "clip_source_url": "https://www.youtube.com/watch?v=oGSxVRM126M",
      "clip_file": "drill-clips/puck-circuit-forward-butterfly-slide-backward-powerslide.mp4",
      "clip_loop": true,
      "has_animation": false
    },
    {
      "id": "puck-circuit-four-point-arc",
      "name": "Puck Circuit — Four Point Arc",
      "description": "Advanced skating circuit with 4 pucks evenly spaced along the arc of the crease. Goalie starts on P2, shuffles to P3, butterfly slides to P1, cuts forward around P1 in butterfly, powerslides to P4, cuts forward around P4 in butterfly, powerslides back to P1, cuts forward around P1 in butterfly again, then t-pushes back to P2.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 10,
      "difficulty": "advanced",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "standing on P2 on crease arc",
      "movement_sequence": [
        "start_on_p2",
        "shuffle_to_p3",
        "butterfly_slide_to_p1",
        "forward_butterfly_cut_around_p1",
        "powerslide_to_p4",
        "forward_butterfly_cut_around_p4",
        "powerslide_to_p1",
        "forward_butterfly_cut_around_p1",
        "t_push_to_p2"
      ],
      "save_types": [],
      "coaching_cues": [
        "Stay low through every butterfly cut — don't pop up between movements",
        "The forward butterfly cut is a pivot, not a stop — carry momentum through it",
        "Load your edges before each powerslide — no coasting between pucks",
        "P1 is your anchor — you return to it twice, always know where it is",
        "Finish the t-push all the way back to P2 — complete every movement"
      ],
      "tags": [
        "shuffle",
        "butterfly_slide",
        "butterfly_pivot",
        "power_slide",
        "t_push",
        "c_cut",
        "puck_circuit",
        "edge_control",
        "crease_movement"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-four-point-arc.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Four pucks evenly spaced on the crease arc. The forward butterfly cut around each puck is the technical centerpiece — the goalie rotates around the puck in butterfly rather than stopping and resetting. P1 is the central anchor of the circuit, visited three times with a cut each time. The back-to-back powerslides (P4→P1) and the repeated cuts at P1 are where form breaks down first. Common errors: popping out of butterfly too early on the cuts, and losing edge load on the powerslides. Run multiple reps and switch directions."
    },
    {
      "id": "puck-circuit-rvh-post-to-post",
      "name": "Puck Circuit — RVH Post to Post",
      "description": "Intermediate skating circuit combining lateral movement with RVH post work. Three pucks are positioned at both face-off dots (P1 and P3) and center just outside the crease (P2). Goalie starts on P2, shuffles to P1, t-pushes to P3, enters RVH into the far post, transfers post to post in RVH, then hinges a t-push out from the post back to P2. Net required for post work. Drill switches sides.",
      "drill_category": [
        "skating",
        "positioning_angles"
      ],
      "session_slot": "warmup",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight",
        "hash_marks"
      ],
      "setup_required": "net_required",
      "goalie_starting_position": "standing on P2, center just outside crease",
      "movement_sequence": [
        "start_on_p2_center_outside_crease",
        "shuffle_to_p1_face_off_dot",
        "t_push_to_p3_far_face_off_dot",
        "rvh_entry_into_far_post",
        "post_to_post_transfer_in_rvh",
        "hinge_t_push_out_from_post_to_p2"
      ],
      "save_types": [],
      "coaching_cues": [
        "Find the post with your skate blade before settling into RVH — don't assume you're there",
        "Post to post in RVH is one fluid push — stay low through the full transfer",
        "Hinge the t-push out from the post — use the post as your anchor to launch",
        "If you miss the post on RVH entry, pause and find it deliberately before continuing"
      ],
      "tags": [
        "shuffle",
        "t_push",
        "RVH",
        "post_play",
        "post_to_post",
        "hinge",
        "puck_circuit",
        "crease_movement",
        "edge_control"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-rvh-post-to-post.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The RVH post entry and post-to-post transfer are the technical core of this circuit — the lateral puck movement is setup, not the point. If a goalie struggles to find the post in RVH, isolate that movement and have them practice entering RVH and locating the post repeatedly before adding the full circuit. The hinge t-push out from the post is a game-relevant movement, using the post as a launching point to push back out to challenge depth. Puck positions: P1 and P3 at the face-off dots, P2 at center just outside the crease."
    },
    {
      "id": "puck-circuit-t-push-butterfly-rotate",
      "name": "Puck Circuit — T-Push, Butterfly Slide, Rotation, Powerslide",
      "description": "Three pucks are set up in a circuit pattern. G starts on puck 3, t-pushes to puck 2, butterfly slides to puck 1, rotates forward in butterfly around puck 1, then powerslides back to puck 3 and recovers to feet. Run for multiple reps, then switch sides. Trains explosive t-push generation, butterfly slide technique, in-butterfly forward rotation, and powerslide in a continuous linked sequence.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 8,
      "difficulty": "advanced",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "Puck 3",
      "movement_sequence": [
        "start_on_puck_3",
        "t_push_to_puck_2",
        "butterfly_slide_to_puck_1",
        "rotate_forward_in_butterfly_around_puck_1",
        "powerslide_to_puck_3",
        "recover_to_feet",
        "repeat",
        "switch_sides_and_repeat"
      ],
      "save_types": [],
      "coaching_cues": [
        "Explosive t-push off puck 3 — generate speed early",
        "Eyes up through the butterfly slide",
        "Hips stay square through the rotation — don't open up",
        "Drive the powerslide from butterfly — don't stand up to push",
        "Full recovery to feet before the next rep"
      ],
      "tags": [
        "t_push",
        "butterfly_slide",
        "power_slide",
        "butterfly",
        "rotation",
        "lateral_movement",
        "edgework",
        "skating"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-t-push-butterfly-rotate.mp4",
      "clip_loop": false,
      "has_animation": false,
      "coach_notes": "Similar to the butterfly-powerslide puck circuit but starts with a t-push rather than a shuffle, putting more emphasis on explosive push generation and linking it directly into the butterfly slide. The rotation around puck 1 is still the hardest movement — watch for the goalie popping up to reposition instead of staying in butterfly. The powerslide back to puck 3 should cover real distance; if the goalie is standing up to generate it, the drill is being done wrong."
    },
    {
      "id": "puck-circuit-t-push-slide-double-powerslide",
      "name": "Puck Circuit — T-Push, Butterfly Slide, Double Powerslide",
      "description": "Three pucks are set in a circuit pattern. G starts on puck 2, t-pushes to puck 1, butterfly slides to puck 3, pivots around puck 3, powerslides to puck 1, then chains directly into a second powerslide back to puck 2 and recovers to feet. The double powerslide at the finish is the key challenge — the goalie must generate the second slide immediately off the first without standing up. Trains explosive t-push, butterfly slide technique, low pivot, and chained powerslide generation.",
      "drill_category": [
        "skating"
      ],
      "session_slot": "warmup",
      "duration_minutes": 8,
      "difficulty": "advanced",
      "shooter_count_min": 0,
      "shooter_count_max": 0,
      "shot_count": 0,
      "ice_zone": [
        "in_tight"
      ],
      "setup_required": "puck_setup",
      "goalie_starting_position": "Puck 2",
      "movement_sequence": [
        "start_on_puck_2",
        "t_push_to_puck_1",
        "butterfly_slide_to_puck_3",
        "pivot_around_puck_3",
        "powerslide_to_puck_1",
        "powerslide_to_puck_2",
        "recover_to_feet",
        "repeat"
      ],
      "save_types": [],
      "coaching_cues": [
        "Explosive t-push off puck 2 — generate speed early",
        "Eyes up through the butterfly slide",
        "Sharp low pivot around puck 3 — stay in butterfly",
        "Drive the first powerslide from the pivot, don't stand up",
        "Chain directly into the second powerslide — no reset between",
        "Full recovery to feet before the next rep"
      ],
      "tags": [
        "t_push",
        "butterfly_slide",
        "power_slide",
        "pivot",
        "butterfly",
        "lateral_movement",
        "edgework",
        "skating"
      ],
      "variations": [],
      "clip_file": "drill-clips/puck-circuit-t-push-slide-double-powerslide.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The double powerslide is what separates this from the other puck circuits — the goalie has to chain two slides back-to-back without standing up to reset. A goalie who pops up between the two powerslides is breaking the sequence. Watch that the pivot around puck 3 stays low and in butterfly; any early stand-up kills the slide generation on the first powerslide and makes the second impossible. This is a conditioning circuit as much as a technique drill — fatigue will expose poor habits."
    },
    {
      "id": "rebound-game",
      "name": "Rebound Game",
      "description": "End-of-session compete game requiring at least 3 shooters. Players form a semi-circle around the net and shoot from above the hash marks. If the goalie covers the puck or directs it to the boards, the puck is dead and the goalie earns a point. On a live rebound, shooters get one pass before they must shoot again. Play to 10 — first side to 10 points wins.",
      "drill_category": [
        "compete",
        "rebound_control",
        "save_technique"
      ],
      "session_slot": "compete",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 3,
      "shooter_count_max": 5,
      "shot_count": 10,
      "ice_zone": [
        "hash_marks",
        "top_of_circles"
      ],
      "goalie_starting_position": "set in crease, ready position",
      "movement_sequence": [
        "set_in_crease_track_shooter_in_semi_circle",
        "make_save_on_shot_from_above_hash_marks",
        "cover_or_direct_to_boards_for_dead_puck_point",
        "control_rebound_to_deny_pass_and_shoot_opportunity",
        "track_rebound_pass_and_make_second_save"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Cover or direct to the boards — every dead puck is a point for you",
        "Know where your rebounds go; a soft rebound into the slot hands shooters their pass",
        "Aim blocker and glove saves to the corners, not back to the slot",
        "After a rebound, find the puck immediately — you have one pass before the next shot",
        "Absorb when you can; when you can't, direct hard to the boards"
      ],
      "tags": [
        "rebound_control",
        "compete",
        "game_format",
        "semi_circle",
        "cover",
        "tracking",
        "multi_shooter"
      ],
      "variations": [],
      "clip_file": "drill-clips/rebound-game.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Simple compete game that directly rewards the skill most goalies neglect — intentional rebound direction. The one-pass rule on rebounds keeps pressure high and punishes soft rebounds back to the slot without making the game chaotic. Shooters should spread around the semi-circle and move after passing to create different angles. Good energy game to end a session. Works best with 4–5 shooters for fast puck movement around the semi-circle."
    },
    {
      "id": "rvh-seal-bump-read",
      "name": "RVH Seal + Bump Read",
      "description": "Technique drill for RVH post entry and multi-option reads. F1 positions on the goal line about 6 feet off the side of the net. F2 sets up in the slot. A third shooter or goalie partner (acting as center) passes to F1 from just beyond the face-off dot. The goalie enters the post in RVH with a tight short-side seal before the pass arrives. F1 can walk the net for a short side attempt, or pass to F2 in the slot. The goalie reads and responds: hold the RVH seal for a short side walk, bump across the crease for a cross-crease drive, or bump out to challenge F2's slot shot. One shot per rep. Can be run with 3 rotating shooters or 2 shooters and a goalie partner feeding as center.",
      "drill_category": [
        "save_technique",
        "positioning_angles",
        "crease_movement"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 3,
      "shot_count": 1,
      "ice_zone": [
        "in_tight",
        "hash_marks"
      ],
      "goalie_starting_position": "RVH at post, short side sealed",
      "movement_sequence": [
        "enter_post_in_rvh_with_short_side_seal_before_pass_arrives",
        "read_f1_receiving_pass_at_goal_line",
        "option_a_hold_rvh_seal_for_f1_short_side_walk",
        "option_b_bump_across_crease_for_f1_cross_crease_drive",
        "option_c_bump_out_to_challenge_f2_slot_shot"
      ],
      "save_types": [
        "RVH",
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Enter the post in RVH before the pass arrives — don't be late to the post",
        "Seal short side tight — your first job is to take away the near post",
        "Read F1's hands: stick blade loading to shoot or head turning to F2",
        "Bump across stays low — don't stand up to cross the crease",
        "Bump out to the slot is a controlled push, not a scramble — set your angle on F2"
      ],
      "tags": [
        "RVH",
        "post_play",
        "seal",
        "bump_out",
        "cross_crease",
        "slot",
        "in_tight",
        "read_and_react",
        "pass_and_shoot"
      ],
      "variations": [],
      "clip_file": "drill-clips/rvh-seal-bump-read.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The goalie must enter the post with a tight RVH seal before the pass arrives — being late to the post makes all three reads irrelevant because short side is already open. In early reps, call or signal which option F1 will take so the goalie can isolate each response; then let F1 decide freely in later reps. The bump-across and bump-out need to be low and controlled — goalies who stand up on either transition give up their positioning advantage. Can be run with 3 rotating shooters (C, F1, F2 cycling roles) or with 2 shooters and a goalie partner feeding as center."
    },
    {
      "id": "screen-release-read",
      "name": "Screen Release Read",
      "description": "Tracking drill for reading a shot release through a screen and finding the puck on the far side. F1 positions between the face-off dot and the hash marks, elevated toward the top of the circle, and shoots across the far side of the screen. A screener or goalie partner stands stationary in front of the net. The goalie starts on the near side of the screen, reads F1's release, and tracks the puck across to the far side to make the save. High-rep drill — good to use between a skating warm-up and heavier technique work.",
      "drill_category": [
        "save_technique",
        "tracking_vision"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 8,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks",
        "top_of_circles"
      ],
      "requires_screener": true,
      "goalie_starting_position": "set on near side of screen, tracking F1's release point",
      "movement_sequence": [
        "set_on_near_side_of_screen_eyes_on_f1",
        "read_f1_shot_release_through_screen",
        "track_puck_across_far_side_of_screen",
        "make_save_far_side"
      ],
      "save_types": [
        "blocker_save",
        "glove_save",
        "pad_save"
      ],
      "coaching_cues": [
        "Eyes on F1's blade, not the screen — find the release before the puck moves",
        "Pick up the puck as it clears the screen — don't wait for it to appear in the net",
        "Stay patient on the near side — don't lunge or guess before the puck appears",
        "Track low through the screen — most pucks travel at pad height"
      ],
      "tags": [
        "screen",
        "tracking",
        "release_read",
        "far_side",
        "top_of_circles",
        "eyes"
      ],
      "variations": [],
      "clip_file": "drill-clips/screen-release-read.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Low-complexity, high-tracking-value drill. The screener is passive and stationary — this is a pure eyes drill, not a jam play or rebound situation. F1 should shoot at a consistent tempo and location to give the goalie enough reps to build the tracking habit. Run 10–15 shots per side before switching. The skill being trained (reading the release through obstruction and finding the puck on the far side) transfers directly to any game situation with traffic in front. Screener can be a goalie partner if only one shooter is available."
    },
    {
      "id": "screen-shot-tip-drive",
      "name": "Screen — Shot, Tip, Net Drive",
      "description": "A screen (goalie partner or dummy) is set just above the hash marks. G starts square to F1 at the top of the circles. F1 skates in and shoots from around the screen. F1 then moves to the net as F2 shoots through the screen — F1 tips the second shot. F1 retreats to the corner, picks up a puck, and passes to F2 who drives the net for the third shot. G plays the third shot and rebound out. On shots 1 and 2, G focuses on finding the release through or around the screen. On shot 3, G identifies F2's hand and reads whether to push or slide.",
      "drill_category": [
        "crease_movement",
        "tracking_vision"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "advanced",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 3,
      "ice_zone": [
        "top_of_circles",
        "hash_marks",
        "in_tight"
      ],
      "requires_screener": true,
      "goalie_starting_position": "Square to F1 at top of circles",
      "movement_sequence": [
        "start_square_to_F1",
        "track_F1_skating_through_screen",
        "save_first_shot_around_screen",
        "reset_and_locate_F2",
        "track_shot_through_screen",
        "save_tip_at_net",
        "recover_position",
        "read_F2_hand_and_drive_line",
        "push_or_slide_to_angle",
        "save_third_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "tip_save"
      ],
      "coaching_cues": [
        "Find the release — don't watch the screen",
        "Pick up shot 1 around the edge of the screen early",
        "See through the screen to find F2's release on shot 2",
        "Locate F1's stick before the tip — expect it, don't chase it",
        "On shot 3, read F2's hand and drive line before committing",
        "Push if the angle is clean, slide if they're taking you across"
      ],
      "tags": [
        "screen",
        "tip",
        "tracking_vision",
        "net_drive",
        "three_shot",
        "crease_movement",
        "rebound"
      ],
      "variations": [],
      "clip_file": "drill-clips/screen-shot-tip-drive.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The screen is the constant — the goalie must find the release rather than watch traffic in front. On shot 2, the tip is predictable since F1 is already planted at the net; cue the goalie to locate F1's stick early and hold position until release. Shot 3 is the decision rep: the goalie reads F2's hand (lefty/righty) and drive direction to choose the right movement — push to challenge vs. slide if F2 is going cross-crease."
    },
    {
      "id": "shuffle-butterfly-slide-backdoor-recover-loop-shot",
      "name": "Shuffle — Butterfly Slide, Backdoor Recovery, F2 Loop Shot",
      "description": "F1 is at the inside arc of the circle between the hash marks and the top of the circle on the near side, with pucks. F2 starts backdoor on the far side. G starts in the middle of the crease, takes two shuffles toward F2, then butterfly slides to F1's angle. F1 immediately passes backdoor to F2; G recovers from the F1 slide and butterfly slides backdoor to make the save, projecting hands out and over the puck. After shot 1, F2 peels off and loops down around the bottom half of the circle, coming up above the face-off dot. F1 makes a pocket cross pass to F2; G challenges F2 collecting the pass and makes the save. Play out the rebound on shot 2.",
      "drill_category": [
        "crease_movement",
        "save_technique",
        "tracking_vision"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 2,
      "shot_count": 2,
      "ice_zone": [
        "hash_marks",
        "top_of_circles",
        "in_tight",
        "behind_net"
      ],
      "goalie_starting_position": "Middle of crease",
      "movement_sequence": [
        "start_middle_of_crease",
        "two_shuffles_toward_F2",
        "butterfly_slide_to_F1_angle",
        "recover_from_slide_immediately",
        "butterfly_slide_backdoor_to_F2_hands_leading",
        "save_F2_backdoor_shot",
        "track_F2_peeling_off_and_looping",
        "read_F1_pocket_cross_pass_to_F2",
        "challenge_F2_above_faceoff_dot",
        "save_F2_shot",
        "play_rebound"
      ],
      "save_types": [
        "butterfly_slide",
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Two shuffles toward F2 — stay low and controlled, don't drift",
        "Commit to the butterfly slide to F1's angle — don't half-slide",
        "Recover immediately after the F1 slide — the pass backdoor is already happening",
        "Hands out and over the puck on the backdoor slide — hands lead, don't trail",
        "Project hands on the backdoor save — cover the puck, not just the body",
        "Track F2 peeling off after shot 1 — read the loop before it develops",
        "Challenge F2 on the cross pass — get to your angle before F2 collects",
        "Play the rebound all the way out on shot 2"
      ],
      "tags": [
        "shuffle",
        "butterfly_slide",
        "backdoor",
        "lateral_release",
        "hands",
        "recovery",
        "two_shot",
        "crease_movement",
        "tracking_vision",
        "pass_and_shoot",
        "loop"
      ],
      "variations": [],
      "progression_of": "post-t-push-go-call-pivot-slide-back",
      "own_content": false,
      "clip_source_url": "https://www.youtube.com/watch?v=oGSxVRM126M",
      "clip_file": "drill-clips/shuffle-butterfly-slide-backdoor-recover-loop-shot.mp4",
      "clip_loop": true,
      "has_animation": false
    },
    {
      "id": "shuffle-butterfly-slide-recover-t-push",
      "name": "Shuffle — Butterfly Slide, Recover, T-Push",
      "description": "F1 is positioned just inside the top of the circle above the hash marks on one side. G starts at the top center of the crease, takes 2 shuffles toward F1, pivots and butterfly slides to the far face-off dot angle, then pivots, recovers to feet, and t-pushes back out to F1 for a shot. G follows and plays out the rebound. Links shuffle movement, a butterfly slide, and recovery into a single fluid sequence before challenging the shooter.",
      "drill_category": [
        "warmup",
        "crease_movement",
        "save_technique"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks",
        "top_of_circles"
      ],
      "goalie_starting_position": "Top center of crease",
      "movement_sequence": [
        "start_top_center_crease",
        "two_shuffles_toward_F1",
        "pivot",
        "butterfly_slide_to_far_faceoff_dot_angle",
        "pivot",
        "recover_to_feet",
        "t_push_to_F1_angle",
        "save_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Stay tall through the shuffles",
        "Sharp pivot before committing to the slide",
        "Eyes find F1 through the slide — don't lose the puck",
        "Clean recovery before the t-push, don't rush it",
        "Hard t-push to depth — get to your angle",
        "Follow the rebound out"
      ],
      "tags": [
        "shuffle",
        "butterfly_slide",
        "t_push",
        "crease_movement",
        "lateral_movement",
        "recovery",
        "warmup",
        "rebound"
      ],
      "variations": [],
      "clip_file": "drill-clips/shuffle-butterfly-slide-recover-t-push.mp4",
      "progression_of": "shuffle-t-push-shot",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "A progression from the tall shuffle t-push drill — same setup and finish, but now the goalie adds a butterfly slide and recovery in the middle of the sequence. The pivot into the slide must be sharp; a lazy pivot kills the slide angle. The recovery has to be complete before generating the t-push — goalies who try to push while still coming up off the ice lose power and depth. Run this after the simpler shuffle-t-push drill is clean."
    },
    {
      "id": "shuffle-t-push-shot",
      "name": "Tall Shuffle — Hard T-Push Shot",
      "description": "F1 is positioned just inside the top of the circle above the hash marks on one side. G starts at the top center of the crease, takes 3 tall shuffles to the far side, locates F1, then drives a hard t-push across to challenge F1 for a shot. G follows and plays out the rebound. Trains the combination of controlled lateral shuffle movement, picking up the shooter, and converting that into an explosive t-push to proper depth.",
      "drill_category": [
        "warmup",
        "crease_movement"
      ],
      "session_slot": "warmup",
      "duration_minutes": 5,
      "difficulty": "beginner",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 1,
      "ice_zone": [
        "hash_marks",
        "top_of_circles"
      ],
      "goalie_starting_position": "Top center of crease",
      "movement_sequence": [
        "start_top_center_crease",
        "three_tall_shuffles_to_far_side",
        "locate_F1",
        "hard_t_push_across_to_F1_angle",
        "save_shot",
        "play_rebound"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Stay tall through the shuffle — don't sink",
        "Find F1 at the end of the shuffle before committing to the push",
        "Hard t-push — drive to depth, don't drift",
        "Square up to F1 before the release",
        "Track the rebound and follow it out"
      ],
      "tags": [
        "shuffle",
        "t_push",
        "crease_movement",
        "lateral_movement",
        "warmup",
        "rebound"
      ],
      "variations": [],
      "clip_file": "drill-clips/shuffle-t-push-shot.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The 'tall' in the shuffle is the key coaching point — goalies tend to sink into their hips during lateral movement, which slows the transition into the t-push. Staying tall keeps the weight loaded and ready to push. The locate step between the shuffle and the push is important; the goalie should have a clear read on F1 before generating the t-push rather than just launching blind."
    },
    {
      "id": "stick-save-eye-track-hands",
      "name": "Stick Save + Eye Track + Hands",
      "description": "Two-shot technique drill emphasizing rebound control, eye tracking, and sequential saves. F1 positions in the slot with pucks. The goalie starts on the post, t-pushes out, and makes a low on-ice stick save directed to the far side. The goalie powerslides to reset, finds F1 with their eyes first before moving, then powerslides back out to challenge. F1 shoots to the hands for the second save. Focus is on intentional rebound direction on shot 1, leading with eyes before body movement on the reset, and tracking into the hands save on shot 2.",
      "drill_category": [
        "save_technique",
        "tracking_vision",
        "rebound_control"
      ],
      "session_slot": "skill_work",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 1,
      "shooter_count_max": 1,
      "shot_count": 2,
      "ice_zone": [
        "in_tight",
        "hash_marks"
      ],
      "goalie_starting_position": "on post",
      "movement_sequence": [
        "start_on_post",
        "t_push_out_to_challenge",
        "make_low_on_ice_stick_save_directing_rebound_far_side",
        "powerslide_to_reset",
        "find_f1_with_eyes_before_body_moves",
        "powerslide_back_out_to_challenge_f1",
        "make_hands_save_on_f1_slot_shot"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save"
      ],
      "coaching_cues": [
        "Explode on the t-push — set your depth before the shot arrives",
        "Direct the stick save far side — place the rebound, don't just stop the puck",
        "Eyes find F1 before your body moves — track first, push second",
        "Hands ready before F1 shoots — the powerslide delivers you, your hands make the save",
        "A clean rebound on shot 1 sets up shot 2 — bad direction makes the read harder"
      ],
      "tags": [
        "t_push",
        "stick_save",
        "rebound_control",
        "power_slide",
        "tracking",
        "hands",
        "eye_tracking",
        "sequential_saves"
      ],
      "variations": [],
      "clip_file": "drill-clips/stick-save-eye-track-hands.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "The 'eyes first' principle is the coaching spine of this drill. After the stick save and powerslide reset, the goalie's eyes should be locked on F1 before the body starts moving back out — goalies who move before they look will consistently be late or off-angle on shot 2. The stick save must direct the rebound to the far side intentionally, not just stop the puck. Good drill for goalies who tend to move before they look, or who give up soft second-shot opportunities after clean first saves."
    },
    {
      "id": "t-push-breakaway-game",
      "name": "T-Push Breakaway Game",
      "description": "Compete game to end a lesson. F1 starts in the corner along the goal line boards, F2 starts at the hash marks in the middle. F1 passes to F2; the goalie makes a hard t-push out, trying to beat the pass and set their challenge before F2 gets in range. F2 takes a mini breakaway in and tries to score. Game to 10: players win by scoring 10 goals, goalies win by stopping 10 breakaways. Goalies switch on every goal. Players rotate after every rep. Drill switches sides.",
      "drill_category": [
        "compete",
        "save_technique",
        "positioning_angles"
      ],
      "session_slot": "compete",
      "duration_minutes": 10,
      "difficulty": "intermediate",
      "shooter_count_min": 2,
      "shooter_count_max": 5,
      "shot_count": 10,
      "ice_zone": [
        "hash_marks",
        "in_tight"
      ],
      "requires_goalie_partner": true,
      "goalie_starting_position": "set at top of crease, angled to corner side",
      "movement_sequence": [
        "track_f1_in_corner_ready_for_pass",
        "hard_t_push_out_to_beat_pass_to_f2",
        "set_depth_and_challenge_f2_breakaway",
        "make_save_or_yield_goal",
        "switch_goalie_if_scored_on_reset_for_next_rep"
      ],
      "save_types": [
        "pad_save",
        "blocker_save",
        "glove_save",
        "desperation_save"
      ],
      "coaching_cues": [
        "Beat the pass — your t-push should arrive at the challenge point as the puck does",
        "Get your feet set before F2 enters shooting range — don't still be moving when they wind up",
        "Hold your depth on the breakaway; make F2 beat you, don't give them the net",
        "Stay patient — let F2 make the first move before you commit",
        "On a goal, flush it fast — next goalie steps in, game keeps moving"
      ],
      "tags": [
        "t_push",
        "telescoping",
        "breakaway",
        "compete",
        "game_format",
        "in_tight",
        "challenge",
        "pass_and_shoot"
      ],
      "variations": [],
      "clip_file": "drill-clips/t-push-breakaway-game.mp4",
      "clip_loop": true,
      "has_animation": false,
      "coach_notes": "Good lesson-ender. The compete format rewards the goalie skill that was trained earlier in the session — aggressive t-push challenge on the pass — and gives players a scoring incentive that keeps energy high. The goalie rotation on goals keeps both goalies sharp and prevents a single goalie from absorbing a bad run. Watch for goalies who stop pushing hard on the t-push under pressure; that's the first thing to erode in a compete game. Keep score visible and called out loud."
    }
  ];

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
