/* ═══════════════════════════════════════════════════════════════════════
   db.js — Goalie Coach App · Client-side Data Access Layer

   Stage 1: localStorage
   Stage 2 (planned): IndexedDB — swap store internals, same public API
   Stage 3 (planned): Supabase — wrap each method in fetch(), same API

   All reads and writes go through the store objects below.
   No file outside this one should touch localStorage directly.

   Usage (both HTML pages):
     <script src="db.js"></script>
     const { GoalieStore, SessionStore, PlanStore, DrillUsageStore } = DB;

   Exports: window.DB
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────
     UTILITIES
     ───────────────────────────────────────────────────────────────────── */

  function uid(prefix) {
    // Collision-resistant enough for a single-device prototype.
    // Replace with crypto.randomUUID() or a server-assigned id in Stage 3.
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function nowISO() {
    return new Date().toISOString();
  }


  /* ─────────────────────────────────────────────────────────────────────
     STORE FACTORY
     ─────────────────────────────────────────────────────────────────────
     Creates a store object backed by a single localStorage key.

     The API surface mirrors what a Supabase table client would expose,
     so each method can be wrapped in a Promise when we migrate to Stage 3
     without changing any call sites in the UI.
     ───────────────────────────────────────────────────────────────────── */

  function createStore(storageKey) {
    function _read() {
      try {
        return JSON.parse(localStorage.getItem(storageKey) || '[]');
      } catch {
        return [];
      }
    }

    function _write(records) {
      localStorage.setItem(storageKey, JSON.stringify(records));
    }

    return {
      /** Return all records as an array. */
      getAll() {
        return _read();
      },

      /** Find one record by primary key. Returns undefined if not found. */
      getById(id) {
        return _read().find(r => r.id === id);
      },

      /**
       * Filter records with a predicate.
       * Equivalent to a WHERE clause — returns an array (possibly empty).
       */
      where(predicate) {
        return _read().filter(predicate);
      },

      /**
       * Upsert by id.
       * - If record.id exists in the store → merge-update (shallow merge).
       * - If not → insert, auto-assigning id/created_at if missing.
       * Returns the saved record.
       */
      save(record) {
        const all  = _read();
        const ts   = nowISO();
        const idx  = all.findIndex(r => r.id === record.id);
        let saved;
        if (idx >= 0) {
          saved      = { ...all[idx], ...record, updated_at: ts };
          all[idx]   = saved;
        } else {
          saved = {
            ...record,
            id:         record.id || uid(storageKey.replace('hh_', '')),
            created_at: record.created_at || ts,
            updated_at: ts,
          };
          all.push(saved);
        }
        _write(all);
        return saved;
      },

      /**
       * Partial field update — only the keys in `fields` are changed.
       * Returns the updated record, or null if id not found.
       */
      update(id, fields) {
        const all = _read();
        const idx = all.findIndex(r => r.id === id);
        if (idx < 0) return null;
        all[idx] = { ...all[idx], ...fields, updated_at: nowISO() };
        _write(all);
        return all[idx];
      },

      /** Hard-delete a record by id. */
      remove(id) {
        _write(_read().filter(r => r.id !== id));
      },

      /** Drop all records. Useful for dev resets. */
      clear() {
        _write([]);
      },

      count() {
        return _read().length;
      },
    };
  }


  /* ─────────────────────────────────────────────────────────────────────
     CORE STORES
     ─────────────────────────────────────────────────────────────────────
     Each store extends the base factory with domain-specific query helpers.
     ───────────────────────────────────────────────────────────────────── */

  /* ── Goalie ──────────────────────────────────────────────────────── */
  /*
   Schema:
   {
     id:                      string,   // e.g. "goalie_jake_reynolds"
     name:                    string,
     initials:                string,   // 2-char, for avatar display
     tone:                    string,   // "a"|"b"|"c"|"d" — avatar color
     level:                   "beginner"|"intermediate"|"advanced",
     default_session_minutes: number,
     default_shooters:        number,
     notes:                   string,   // coach free-text, updated any time
     created_at:              ISO string,
     updated_at:              ISO string,
   }
  */
  const GoalieStore = Object.assign(createStore('hh_goalies'), {
    /** Fetch an array of goalies by their ids (preserving order). */
    getByIds(ids) {
      const all = this.getAll();
      return ids.map(id => all.find(g => g.id === id)).filter(Boolean);
    },
  });


  /* ── Session ─────────────────────────────────────────────────────── */
  /*
   Schema:
   {
     id:               string,
     goalie_ids:       string[],          // 1–4 goalie ids
     scheduled_at:     ISO string,        // local time, no Z suffix for display
     duration_minutes: number,
     location:         string,
     plan_id:          string | null,     // linked Plan; null until built
     status:           "scheduled"|"completed"|"cancelled",
     coach_notes:      string,            // post-session annotation
     calendar_event_id: string | null,   // future: Google Calendar sync
     created_at:       ISO string,
     updated_at:       ISO string,
   }
  */
  const SessionStore = Object.assign(createStore('hh_sessions'), {
    getByGoalieId(goalieId) {
      return this.where(s => s.goalie_ids && s.goalie_ids.includes(goalieId));
    },

    /** Upcoming sessions, sorted earliest-first. */
    getUpcoming() {
      const now = Date.now();
      return this.where(s => new Date(s.scheduled_at).getTime() >= now)
        .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
    },

    /** Sessions on a specific calendar date (pass 'YYYY-MM-DD'). */
    getByDate(dateStr) {
      return this.where(s => s.scheduled_at.startsWith(dateStr));
    },

    /** Completed sessions, most-recent-first. */
    getCompleted() {
      return this.where(s => s.status === 'completed')
        .sort((a, b) => new Date(b.scheduled_at) - new Date(a.scheduled_at));
    },
  });


  /* ── Plan ────────────────────────────────────────────────────────── */
  /*
   Schema:
   {
     id:                string,
     session_id:        string | null,  // null for standalone plans
     goalie_ids:        string[],
     title:             string,
     focus_areas:       string[],       // drill_category values
     duration_minutes:  number,
     level:             string,
     shooter_count:     number,
     screener_available: boolean,
     status:            "draft"|"saved"|"used",
     ai_brief:          string,
     sections: [
       {
         phase:   string,
         name:    string,
         time:    string,
         drills: [
           {
             drill_id:   string,       // references drills/*.json
             step:       string,
             name:       string,
             phaseLabel: string,
             duration:   string,
             difficulty: string,
             shots:      string | undefined,
             clip:       string,
             cues:       string[],
           }
         ]
       }
     ],
     created_at: ISO string,
     updated_at: ISO string,
   }
  */
  const PlanStore = Object.assign(createStore('hh_plans'), {
    getBySessionId(sessionId) {
      return this.where(p => p.session_id === sessionId);
    },

    /** All plans that include a goalie, most-recent-first. */
    getByGoalieId(goalieId) {
      return this.where(p => p.goalie_ids && p.goalie_ids.includes(goalieId))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    /** Saved or used plans, most-recently-updated first. */
    getSaved() {
      return this.where(p => p.status === 'saved' || p.status === 'used')
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    },
  });


  /* ── DrillUsage ──────────────────────────────────────────────────── */
  /*
   Schema:
   {
     id:         string,
     drill_id:   string,    // drill filename slug
     plan_id:    string,
     session_id: string,
     goalie_ids: string[],
     used_at:    ISO string,
     created_at: ISO string,
     updated_at: ISO string,
   }

   One record per drill per session — not per rep.
   This is the "event log" table. Never update; only insert.
  */
  const DrillUsageStore = Object.assign(createStore('hh_drill_usage'), {
    getByGoalieId(goalieId) {
      return this.where(u => u.goalie_ids && u.goalie_ids.includes(goalieId))
        .sort((a, b) => new Date(b.used_at) - new Date(a.used_at));
    },

    getByDrillId(drillId) {
      return this.where(u => u.drill_id === drillId)
        .sort((a, b) => new Date(b.used_at) - new Date(a.used_at));
    },

    /**
     * Last time a drill was used with a goalie.
     * Returns ISO string or null.
     */
    lastUsed(drillId, goalieId) {
      const matches = this.where(u =>
        u.drill_id === drillId &&
        u.goalie_ids &&
        u.goalie_ids.includes(goalieId)
      ).sort((a, b) => new Date(b.used_at) - new Date(a.used_at));
      return matches.length ? matches[0].used_at : null;
    },

    /**
     * Drill frequency map for a goalie.
     * Returns { [drill_id]: count } — useful for the profile page.
     */
    frequencyForGoalie(goalieId) {
      return this.getByGoalieId(goalieId).reduce((acc, u) => {
        acc[u.drill_id] = (acc[u.drill_id] || 0) + 1;
        return acc;
      }, {});
    },
  });


  /* ─────────────────────────────────────────────────────────────────────
     SEED DATA
     ─────────────────────────────────────────────────────────────────────
     Runs once on first load (guarded by hh_seeded version flag).
     Mirrors every goalie and session hardcoded in index.html today.
     Bump SEED_VERSION to re-seed after schema changes (clears all stores).
     ───────────────────────────────────────────────────────────────────── */

  const SEED_VERSION = 1;

  function seed() {
    // ── Goalies ────────────────────────────────────────────────────
    [
      { id: 'goalie_jake_reynolds', name: 'Jake Reynolds',     initials: 'JR', tone: 'a', level: 'intermediate', default_session_minutes: 60, default_shooters: 1, notes: '' },
      { id: 'goalie_mason_k',       name: 'Mason K.',          initials: 'MK', tone: 'b', level: 'intermediate', default_session_minutes: 60, default_shooters: 2, notes: '' },
      { id: 'goalie_lily_p',        name: 'Lily P.',           initials: 'LP', tone: 'c', level: 'intermediate', default_session_minutes: 60, default_shooters: 2, notes: '' },
      { id: 'goalie_aiden_torres',  name: 'Aiden Torres',      initials: 'AT', tone: 'd', level: 'intermediate', default_session_minutes: 60, default_shooters: 1, notes: '' },
      { id: 'goalie_eli_m',         name: 'Eli M.',            initials: 'EM', tone: 'a', level: 'intermediate', default_session_minutes: 60, default_shooters: 2, notes: '' },
      { id: 'goalie_sam_c',         name: 'Sam C.',            initials: 'SC', tone: 'b', level: 'intermediate', default_session_minutes: 60, default_shooters: 2, notes: '' },
    ].forEach(g => GoalieStore.save({ ...g, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' }));

    // ── Sessions ───────────────────────────────────────────────────
    // Reference date: 2026-05-12 (Tuesday)
    [
      // Today
      { id: 'session_jake_0512',       goalie_ids: ['goalie_jake_reynolds'],              scheduled_at: '2026-05-12T16:00:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: null,                   status: 'scheduled' },
      { id: 'session_mason_lily_0512', goalie_ids: ['goalie_mason_k', 'goalie_lily_p'],   scheduled_at: '2026-05-12T17:15:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: null,                   status: 'scheduled' },
      // This week
      { id: 'session_aiden_0519',      goalie_ids: ['goalie_aiden_torres'],               scheduled_at: '2026-05-19T18:30:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: null,                   status: 'scheduled' },
      { id: 'session_eli_sam_0521',    goalie_ids: ['goalie_eli_m', 'goalie_sam_c'],      scheduled_at: '2026-05-21T17:00:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: null,                   status: 'scheduled' },
      // Completed (powers the "Recent lessons" section)
      { id: 'session_jake_0508',       goalie_ids: ['goalie_jake_reynolds'],              scheduled_at: '2026-05-08T16:00:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: 'plan_jake_crease_0508', status: 'completed' },
    ].forEach(s => SessionStore.save({
      ...s,
      coach_notes: '',
      calendar_event_id: null,
      created_at: '2026-05-01T00:00:00Z',
      updated_at: '2026-05-01T00:00:00Z',
    }));

    // ── Plans ──────────────────────────────────────────────────────
    PlanStore.save({
      id:                 'plan_jake_crease_0508',
      session_id:         'session_jake_0508',
      goalie_ids:         ['goalie_jake_reynolds'],
      title:              'Crease Movement & Positioning',
      focus_areas:        ['crease_movement', 'post_play'],
      duration_minutes:   60,
      level:              'intermediate',
      shooter_count:      1,
      screener_available: false,
      status:             'used',
      ai_brief:           "Build clean crease movement habits — eyes first, hands second, push into the lean.",
      sections: [
        {
          phase: 'skating', name: 'Skating warm-up', time: '10 min',
          drills: [
            { drill_id: 'board-to-board-movement-series',   step: 'Step 1', name: 'Board-to-Board Movement Series',          phaseLabel: 'Skating warmup', duration: '5 min',  difficulty: 'Beginner',     clip: 'drill-clips/diagonal-t-push-pivots.mp4',            cues: ['Eyes go first', 'Lean into the push', 'Lead with hands'] },
            { drill_id: 'post-entry-exit-rvh-powerslide',   step: 'Step 2', name: 'Post Entry & Exit — RVH to Powerslide',   phaseLabel: 'Skating warmup', duration: '5 min',  difficulty: 'Intermediate', clip: 'drill-clips/post-entry-exit-rvh-powerslide.mp4',    cues: ['Clean post entry — set the RVH before the bump', 'Sharp pivot off the RVH', 'Stay in butterfly through the powerslide'] },
          ],
        },
        {
          phase: 'shot', name: 'Shot warm-up', time: '10 min',
          drills: [
            { drill_id: 'butterfly-shot-warmup',             step: 'Step 3', name: 'Butterfly Shot Warmup — Tracking Series', phaseLabel: 'Shot warmup',    duration: '10 min', difficulty: 'Beginner',     shots: '1 shot', clip: 'drill-clips/butterfly-shot-warmup.mp4',           cues: ['Track the puck all the way in — see it into the save', 'Exaggerate the lean to the save side', 'Drive eyes and nose into the save'] },
          ],
        },
        {
          phase: 'skill', name: 'Skill work', time: '30 min',
          drills: [
            { drill_id: 'overlap-t-push-go-call-react',      step: 'Step 4', name: 'Overlap — T-Push and Go Call React',     phaseLabel: 'Skill work',     duration: '10 min', difficulty: 'Intermediate', shots: '2 shots', clip: 'drill-clips/overlap-t-push-go-call-react.mp4',    cues: ["Use the overlap to load momentum — don't just walk back to the post", 'Clean post touch before the t-push', 'Hard t-push to center top of crease — get to depth'] },
            { drill_id: 'go-call-lateral-drop-net-attack',   step: 'Step 5', name: 'Go Call — Lateral Release and Net Attack', phaseLabel: 'Skill work',   duration: '10 min', difficulty: 'Intermediate', shots: '2 shots', clip: 'drill-clips/go-call-lateral-drop-net-attack.mp4', cues: ["Eyes find F1 before dropping — don't react blind to the call", 'Locate first, drop second — the head turn is the trigger', 'Stay connected through the lateral release'] },
            { drill_id: 'lateral-release-rvh-bump-out-slot', step: 'Step 6', name: 'Lateral Release — RVH Post Entry and Bump Out', phaseLabel: 'Skill work', duration: '10 min', difficulty: 'Intermediate', shots: '2 shots', clip: 'drill-clips/lateral-release-rvh-bump-out-slot.mp4', cues: ['Lead with eyes through the lateral release', "Rotate push into RVH — set clean before the 'go' call", 'Eyes and hands lead out of the bump — not the pads'] },
          ],
        },
      ],
      created_at: '2026-05-08T12:00:00Z',
      updated_at: '2026-05-08T12:00:00Z',
    });

    // ── DrillUsage (Jake's May 8 session) ─────────────────────────
    [
      'board-to-board-movement-series',
      'post-entry-exit-rvh-powerslide',
      'butterfly-shot-warmup',
      'overlap-t-push-go-call-react',
      'go-call-lateral-drop-net-attack',
      'lateral-release-rvh-bump-out-slot',
    ].forEach((drillId, i) => {
      DrillUsageStore.save({
        id:         `usage_jake_0508_${i}`,
        drill_id:   drillId,
        plan_id:    'plan_jake_crease_0508',
        session_id: 'session_jake_0508',
        goalie_ids: ['goalie_jake_reynolds'],
        used_at:    '2026-05-08T16:00:00Z',
        created_at: '2026-05-08T16:00:00Z',
        updated_at: '2026-05-08T16:00:00Z',
      });
    });

    localStorage.setItem('hh_seeded', String(SEED_VERSION));
    console.log('[DB] Seeded v' + SEED_VERSION);
  }

  // Re-seed guard: bump SEED_VERSION above to wipe + re-seed
  const seededVersion = parseInt(localStorage.getItem('hh_seeded') || '0', 10);
  if (seededVersion < SEED_VERSION) {
    // Clear all stores before re-seeding so stale records don't linger
    ['hh_goalies', 'hh_sessions', 'hh_plans', 'hh_drill_usage'].forEach(k => localStorage.removeItem(k));
    seed();
  }


  /* ─────────────────────────────────────────────────────────────────────
     PUBLIC API
     ───────────────────────────────────────────────────────────────────── */

  window.DB = {
    GoalieStore,
    SessionStore,
    PlanStore,
    DrillUsageStore,

    /**
     * True if a session has a linked plan in saved or used status.
     * Used by the home screen to decide "Build plan" vs "See plan".
     */
    hasSavedPlan(sessionId) {
      const session = SessionStore.getById(sessionId);
      if (!session || !session.plan_id) return false;
      const plan = PlanStore.getById(session.plan_id);
      return Boolean(plan && (plan.status === 'saved' || plan.status === 'used'));
    },

    /**
     * Record every drill in a plan as used, then link the plan to its session.
     * Call this when the coach saves a plan from the lesson plan page.
     */
    commitPlan(planId, sessionId) {
      const plan = PlanStore.getById(planId);
      if (!plan) return;

      // Mark plan as saved
      PlanStore.update(planId, { status: 'saved' });

      // Link plan to session
      if (sessionId) {
        SessionStore.update(sessionId, { plan_id: planId });
      }

      // Record each drill as used
      const usedAt = new Date().toISOString();
      plan.sections.forEach(section => {
        section.drills.forEach(drill => {
          DrillUsageStore.save({
            drill_id:   drill.drill_id,
            plan_id:    planId,
            session_id: sessionId || null,
            goalie_ids: plan.goalie_ids,
            used_at:    usedAt,
          });
        });
      });
    },
  };

  console.log('[DB] Ready —', GoalieStore.count(), 'goalies,', SessionStore.count(), 'sessions,', PlanStore.count(), 'plans');

})();
