/* ═══════════════════════════════════════════════════════════════════════
   db.js — Goalie Coach App · Client-side Data Access Layer

   Stage 1: localStorage (synchronous, offline-first)
   Stage 2: Supabase (background sync — same public API, no call-site changes)
   Stage 3 (planned): real auth, coach_id scoped per user

   All reads and writes go through the store objects below.
   No file outside this one should touch localStorage directly.

   Usage (all HTML pages):
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
     <script src="db.js"></script>
     const { GoalieStore, SessionStore, PlanStore, DrillUsageStore } = DB;

   Exports: window.DB
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────
     SUPABASE CONFIG
     ───────────────────────────────────────────────────────────────────── */

  const SUPABASE_URL  = 'https://whawnvlctxrfzkyvivca.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoYXdudmxjdHhyZnpreXZpdmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MDYxNTIsImV4cCI6MjA5NDI4MjE1Mn0.JD9rzVHrLHTFOB5uvC9RUvs8epUZ51Fphg7r_ZBCT8I';
  const COACH_ID      = 'coach_mitch';

  let _sbClient = null;
  function _getSb() {
    if (_sbClient) return _sbClient;
    const lib = window.supabase;
    if (!lib || typeof lib.createClient !== 'function') return null;
    _sbClient = lib.createClient(SUPABASE_URL, SUPABASE_ANON);
    return _sbClient;
  }


  /* ─────────────────────────────────────────────────────────────────────
     OFFLINE WRITE QUEUE
     Writes that fail (or are made offline) are queued here and replayed
     on the next successful network connection.
     ───────────────────────────────────────────────────────────────────── */

  const QUEUE_KEY = 'hh_sync_queue';

  function _enqueue(table, record) {
    try {
      const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
      // Replace any existing queued write for the same (table, id) — latest wins
      const deduped = q.filter(op => !(op.t === table && op.r && op.r.id === record.id));
      deduped.push({ t: table, r: record });
      localStorage.setItem(QUEUE_KEY, JSON.stringify(deduped));
    } catch {}
  }

  async function _flushQueue() {
    const sb = _getSb();
    if (!sb) return;
    try {
      const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
      if (!q.length) return;
      for (const op of q) {
        await sb.from(op.t).upsert({ ...op.r, coach_id: COACH_ID });
      }
      localStorage.removeItem(QUEUE_KEY);
      console.log('[DB] Flushed', q.length, 'queued write(s)');
    } catch (err) {
      console.warn('[DB] Queue flush error:', err.message || err);
    }
  }


  /* ─────────────────────────────────────────────────────────────────────
     SUPABASE SYNC HELPERS
     All async — called as fire-and-forget after synchronous LS writes.
     ───────────────────────────────────────────────────────────────────── */

  async function _syncWrite(table, record) {
    if (!navigator.onLine) {
      _enqueue(table, record);
      return;
    }
    const sb = _getSb();
    if (!sb) return;
    try {
      await _flushQueue(); // drain queue first so ordering is preserved
      const { error } = await sb.from(table).upsert({ ...record, coach_id: COACH_ID });
      if (error) throw error;
    } catch (err) {
      console.warn('[DB] Write failed for', table, '—', err.message || err);
      _enqueue(table, record);
    }
  }

  async function _syncDelete(table, id) {
    if (!navigator.onLine) return; // deletes are not queued — rare enough to skip
    const sb = _getSb();
    if (!sb) return;
    try {
      const { error } = await sb.from(table).delete().eq('coach_id', COACH_ID).eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.warn('[DB] Delete failed for', table, id, '—', err.message || err);
    }
  }

  /* Pull Supabase → localStorage: Supabase wins on updated_at conflict */
  async function _syncDown(table, lsKey) {
    const sb = _getSb();
    if (!sb || !navigator.onLine) return;
    try {
      const { data, error } = await sb.from(table).select('*').eq('coach_id', COACH_ID);
      if (error || !data || !data.length) return;

      const remote = data.map(({ coach_id, ...rest }) => rest); // strip coach_id for LS
      const local  = JSON.parse(localStorage.getItem(lsKey) || '[]');
      const byId   = Object.fromEntries(local.map(r => [r.id, r]));

      remote.forEach(r => {
        const l = byId[r.id];
        // Remote wins if local is missing or remote is newer
        if (!l || r.updated_at >= (l.updated_at || '')) {
          byId[r.id] = r;
        }
      });

      localStorage.setItem(lsKey, JSON.stringify(Object.values(byId)));
    } catch (err) {
      console.warn('[DB] Sync-down failed for', table, '—', err.message || err);
    }
  }

  /* Migrate localStorage → Supabase (one-time, skipped after first success) */
  async function _migrate() {
    if (localStorage.getItem('hh_migrated') === '1') return;
    const sb = _getSb();
    if (!sb || !navigator.onLine) return;

    const TABLES = [
      { t: 'goalies',     k: 'hh_goalies'     },
      { t: 'sessions',    k: 'hh_sessions'    },
      { t: 'plans',       k: 'hh_plans'       },
      { t: 'drill_usage', k: 'hh_drill_usage' },
    ];

    for (const { t, k } of TABLES) {
      try {
        const { data: existing } = await sb.from(t).select('id').eq('coach_id', COACH_ID).limit(1);
        if (existing && existing.length) continue; // already populated
        const lsData = JSON.parse(localStorage.getItem(k) || '[]');
        if (!lsData.length) continue;
        await sb.from(t).upsert(lsData.map(r => ({ ...r, coach_id: COACH_ID })));
        console.log('[DB] Migrated', lsData.length, 'records →', t);
      } catch (err) {
        console.warn('[DB] Migration failed for', t, '—', err.message || err);
      }
    }

    localStorage.setItem('hh_migrated', '1');
    console.log('[DB] Migration complete');
  }


  /* ─────────────────────────────────────────────────────────────────────
     UTILITIES
     ───────────────────────────────────────────────────────────────────── */

  function uid(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function nowISO() {
    return new Date().toISOString();
  }


  /* ─────────────────────────────────────────────────────────────────────
     STORE FACTORY
     Creates a localStorage-backed store. All methods are synchronous.
     Each write fires an async Supabase write in the background.

     sbTable: Supabase table name (e.g. 'goalies')
     ───────────────────────────────────────────────────────────────────── */

  function createStore(storageKey, sbTable) {
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
      getAll() {
        return _read();
      },

      getById(id) {
        return _read().find(r => r.id === id);
      },

      where(predicate) {
        return _read().filter(predicate);
      },

      save(record) {
        const all = _read();
        const ts  = nowISO();
        const idx = all.findIndex(r => r.id === record.id);
        let saved;
        if (idx >= 0) {
          saved    = { ...all[idx], ...record, updated_at: ts };
          all[idx] = saved;
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
        _syncWrite(sbTable, saved); // background, non-blocking
        return saved;
      },

      update(id, fields) {
        const all = _read();
        const idx = all.findIndex(r => r.id === id);
        if (idx < 0) return null;
        all[idx] = { ...all[idx], ...fields, updated_at: nowISO() };
        _write(all);
        _syncWrite(sbTable, all[idx]); // background, non-blocking
        return all[idx];
      },

      remove(id) {
        _write(_read().filter(r => r.id !== id));
        _syncDelete(sbTable, id); // background, non-blocking
      },

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
     Each store extends the base factory with domain-specific helpers.
     ───────────────────────────────────────────────────────────────────── */

  /* ── Goalie ──────────────────────────────────────────────────────── */
  /*
   Schema:
   {
     id:                      string,
     name:                    string,
     initials:                string,
     tone:                    string,   // "a"|"b"|"c"|"d"
     level:                   "beginner"|"intermediate"|"advanced",
     default_session_minutes: number,
     default_shooters:        number,
     notes:                   string,   // coach free-text; most recent first
     created_at:              ISO string,
     updated_at:              ISO string,
   }
  */
  const GoalieStore = Object.assign(createStore('hh_goalies', 'goalies'), {
    getByIds(ids) {
      const all = this.getAll();
      return ids.map(id => all.find(g => g.id === id)).filter(Boolean);
    },
  });


  /* ── Session ─────────────────────────────────────────────────────── */
  const SessionStore = Object.assign(createStore('hh_sessions', 'sessions'), {
    getByGoalieId(goalieId) {
      return this.where(s => s.goalie_ids && s.goalie_ids.includes(goalieId));
    },

    getUpcoming() {
      const now = Date.now();
      return this.where(s => new Date(s.scheduled_at).getTime() >= now)
        .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
    },

    getByDate(dateStr) {
      return this.where(s => s.scheduled_at.startsWith(dateStr));
    },

    getCompleted() {
      return this.where(s => s.status === 'completed')
        .sort((a, b) => new Date(b.scheduled_at) - new Date(a.scheduled_at));
    },
  });


  /* ── Plan ────────────────────────────────────────────────────────── */
  const PlanStore = Object.assign(createStore('hh_plans', 'plans'), {
    getBySessionId(sessionId) {
      return this.where(p => p.session_id === sessionId);
    },

    getByGoalieId(goalieId) {
      return this.where(p => p.goalie_ids && p.goalie_ids.includes(goalieId))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    getSaved() {
      return this.where(p => p.status === 'saved' || p.status === 'used')
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    },
  });


  /* ── DrillUsage ──────────────────────────────────────────────────── */
  const DrillUsageStore = Object.assign(createStore('hh_drill_usage', 'drill_usage'), {
    getByGoalieId(goalieId) {
      return this.where(u => u.goalie_ids && u.goalie_ids.includes(goalieId))
        .sort((a, b) => new Date(b.used_at) - new Date(a.used_at));
    },

    getByDrillId(drillId) {
      return this.where(u => u.drill_id === drillId)
        .sort((a, b) => new Date(b.used_at) - new Date(a.used_at));
    },

    lastUsed(drillId, goalieId) {
      const matches = this.where(u =>
        u.drill_id === drillId &&
        u.goalie_ids &&
        u.goalie_ids.includes(goalieId)
      ).sort((a, b) => new Date(b.used_at) - new Date(a.used_at));
      return matches.length ? matches[0].used_at : null;
    },

    frequencyForGoalie(goalieId) {
      return this.getByGoalieId(goalieId).reduce((acc, u) => {
        acc[u.drill_id] = (acc[u.drill_id] || 0) + 1;
        return acc;
      }, {});
    },
  });


  /* ── CoachNotes ──────────────────────────────────────────────────── */
  /*
   Schema:
   {
     id:         string,
     goalie_id:  string,
     body:       string,
     tag:        "observation"|"film"|"improvement"|"goal",
     created_at: ISO string,
     updated_at: ISO string,
   }
  */
  const CoachNotesStore = Object.assign(createStore('hh_coach_notes', 'coach_notes'), {
    getByGoalieId(goalieId) {
      return this.where(n => n.goalie_id === goalieId)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    latestForGoalie(goalieId) {
      const list = this.getByGoalieId(goalieId);
      return list.length ? list[0] : null;
    },
  });


  /* ─────────────────────────────────────────────────────────────────────
     SEED DATA
     Runs once on first load (guarded by hh_seeded version flag).
     Bump SEED_VERSION to re-seed after schema changes.
     ───────────────────────────────────────────────────────────────────── */

  const SEED_VERSION = 1;

  function seed() {
    [
      { id: 'goalie_jake_reynolds', name: 'Jake Reynolds',  initials: 'JR', tone: 'a', level: 'intermediate', default_session_minutes: 60, default_shooters: 1, notes: '' },
      { id: 'goalie_mason_k',       name: 'Mason K.',       initials: 'MK', tone: 'b', level: 'intermediate', default_session_minutes: 60, default_shooters: 2, notes: '' },
      { id: 'goalie_lily_p',        name: 'Lily P.',        initials: 'LP', tone: 'c', level: 'intermediate', default_session_minutes: 60, default_shooters: 2, notes: '' },
      { id: 'goalie_aiden_torres',  name: 'Aiden Torres',   initials: 'AT', tone: 'd', level: 'intermediate', default_session_minutes: 60, default_shooters: 1, notes: '' },
      { id: 'goalie_eli_m',         name: 'Eli M.',         initials: 'EM', tone: 'a', level: 'intermediate', default_session_minutes: 60, default_shooters: 2, notes: '' },
      { id: 'goalie_sam_c',         name: 'Sam C.',         initials: 'SC', tone: 'b', level: 'intermediate', default_session_minutes: 60, default_shooters: 2, notes: '' },
    ].forEach(g => GoalieStore.save({ ...g, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' }));

    [
      { id: 'session_jake_0512',       goalie_ids: ['goalie_jake_reynolds'],            scheduled_at: '2026-05-12T16:00:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: null,                   status: 'scheduled' },
      { id: 'session_mason_lily_0512', goalie_ids: ['goalie_mason_k', 'goalie_lily_p'], scheduled_at: '2026-05-12T17:15:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: null,                   status: 'scheduled' },
      { id: 'session_aiden_0519',      goalie_ids: ['goalie_aiden_torres'],             scheduled_at: '2026-05-19T18:30:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: null,                   status: 'scheduled' },
      { id: 'session_eli_sam_0521',    goalie_ids: ['goalie_eli_m', 'goalie_sam_c'],    scheduled_at: '2026-05-21T17:00:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: null,                   status: 'scheduled' },
      { id: 'session_jake_0508',       goalie_ids: ['goalie_jake_reynolds'],            scheduled_at: '2026-05-08T16:00:00', duration_minutes: 60, location: 'Champions Skating Center · Cromwell', plan_id: 'plan_jake_crease_0508', status: 'completed' },
    ].forEach(s => SessionStore.save({
      ...s,
      coach_notes: '',
      calendar_event_id: null,
      created_at: '2026-05-01T00:00:00Z',
      updated_at: '2026-05-01T00:00:00Z',
    }));

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
            { drill_id: 'board-to-board-movement-series', step: 'Step 1', name: 'Board-to-Board Movement Series', phaseLabel: 'Skating warmup', duration: '5 min', difficulty: 'Beginner', clip: 'drill-clips/diagonal-t-push-pivots.mp4', cues: ['Eyes go first', 'Lean into the push', 'Lead with hands'] },
            { drill_id: 'post-entry-exit-rvh-powerslide', step: 'Step 2', name: 'Post Entry & Exit — RVH to Powerslide', phaseLabel: 'Skating warmup', duration: '5 min', difficulty: 'Intermediate', clip: 'drill-clips/post-entry-exit-rvh-powerslide.mp4', cues: ['Clean post entry — set the RVH before the bump', 'Sharp pivot off the RVH', 'Stay in butterfly through the powerslide'] },
          ],
        },
        {
          phase: 'shot', name: 'Shot warm-up', time: '10 min',
          drills: [
            { drill_id: 'butterfly-shot-warmup', step: 'Step 3', name: 'Butterfly Shot Warmup — Tracking Series', phaseLabel: 'Shot warmup', duration: '10 min', difficulty: 'Beginner', shots: '1 shot', clip: 'drill-clips/butterfly-shot-warmup.mp4', cues: ['Track the puck all the way in — see it into the save', 'Exaggerate the lean to the save side', 'Drive eyes and nose into the save'] },
          ],
        },
        {
          phase: 'skill', name: 'Skill work', time: '30 min',
          drills: [
            { drill_id: 'overlap-t-push-go-call-react',    step: 'Step 4', name: 'Overlap — T-Push and Go Call React',         phaseLabel: 'Skill work', duration: '10 min', difficulty: 'Intermediate', shots: '2 shots', clip: 'drill-clips/overlap-t-push-go-call-react.mp4',    cues: ["Use the overlap to load momentum — don't just walk back to the post", 'Clean post touch before the t-push', 'Hard t-push to center top of crease — get to depth'] },
            { drill_id: 'go-call-lateral-drop-net-attack', step: 'Step 5', name: 'Go Call — Lateral Release and Net Attack',   phaseLabel: 'Skill work', duration: '10 min', difficulty: 'Intermediate', shots: '2 shots', clip: 'drill-clips/go-call-lateral-drop-net-attack.mp4', cues: ["Eyes find F1 before dropping — don't react blind to the call", 'Locate first, drop second — the head turn is the trigger', 'Stay connected through the lateral release'] },
            { drill_id: 'lateral-release-rvh-bump-out-slot', step: 'Step 6', name: 'Lateral Release — RVH Post Entry and Bump Out', phaseLabel: 'Skill work', duration: '10 min', difficulty: 'Intermediate', shots: '2 shots', clip: 'drill-clips/lateral-release-rvh-bump-out-slot.mp4', cues: ['Lead with eyes through the lateral release', "Rotate push into RVH — set clean before the 'go' call", 'Eyes and hands lead out of the bump — not the pads'] },
          ],
        },
      ],
      created_at: '2026-05-08T12:00:00Z',
      updated_at: '2026-05-08T12:00:00Z',
    });

    ['board-to-board-movement-series', 'post-entry-exit-rvh-powerslide', 'butterfly-shot-warmup', 'overlap-t-push-go-call-react', 'go-call-lateral-drop-net-attack', 'lateral-release-rvh-bump-out-slot'].forEach((drillId, i) => {
      DrillUsageStore.save({
        id: `usage_jake_0508_${i}`, drill_id: drillId, plan_id: 'plan_jake_crease_0508',
        session_id: 'session_jake_0508', goalie_ids: ['goalie_jake_reynolds'],
        used_at: '2026-05-08T16:00:00Z', created_at: '2026-05-08T16:00:00Z', updated_at: '2026-05-08T16:00:00Z',
      });
    });

    localStorage.setItem('hh_seeded', String(SEED_VERSION));
    console.log('[DB] Seeded v' + SEED_VERSION);
  }

  const seededVersion = parseInt(localStorage.getItem('hh_seeded') || '0', 10);
  if (seededVersion < SEED_VERSION) {
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
    CoachNotesStore,

    hasSavedPlan(sessionId) {
      const session = SessionStore.getById(sessionId);
      if (!session || !session.plan_id) return false;
      const plan = PlanStore.getById(session.plan_id);
      return Boolean(plan && (plan.status === 'saved' || plan.status === 'used'));
    },

    commitPlan(planId, sessionId) {
      const plan = PlanStore.getById(planId);
      if (!plan) return;
      PlanStore.update(planId, { status: 'saved' });
      if (sessionId) SessionStore.update(sessionId, { plan_id: planId });
      const usedAt = new Date().toISOString();
      plan.sections.forEach(section => {
        section.drills.forEach(drill => {
          DrillUsageStore.save({
            drill_id: drill.drill_id, plan_id: planId, session_id: sessionId || null,
            goalie_ids: plan.goalie_ids, used_at: usedAt,
          });
        });
      });
    },

    /* Prepend a dated session note to a goalie's notes field. */
    addSessionNote(goalieId, note) {
      if (!goalieId || !note || !note.trim()) return false;
      const goalie = GoalieStore.getById(goalieId);
      if (!goalie) return false;
      const date    = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const stamped = `[${date}] ${note.trim()}`;
      const existing = (goalie.notes || '').trim();
      GoalieStore.update(goalieId, { notes: existing ? stamped + '\n\n' + existing : stamped });
      return true;
    },
  };

  console.log('[DB] Ready —', GoalieStore.count(), 'goalies,', SessionStore.count(), 'sessions,', PlanStore.count(), 'plans');


  /* ─────────────────────────────────────────────────────────────────────
     BACKGROUND SYNC
     Runs after DOM is ready so it doesn't block initial render.
     ───────────────────────────────────────────────────────────────────── */

  function _runSync() {
    _migrate().then(() => {
      return Promise.all([
        _syncDown('goalies',     'hh_goalies'),
        _syncDown('sessions',    'hh_sessions'),
        _syncDown('plans',       'hh_plans'),
        _syncDown('drill_usage', 'hh_drill_usage'),
        _syncDown('coach_notes', 'hh_coach_notes'),
      ]);
    }).then(() => {
      console.log('[DB] Sync complete');
    }).catch(err => {
      console.warn('[DB] Sync error:', err.message || err);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _runSync);
  } else {
    setTimeout(_runSync, 0); // yield to page render first
  }

  // Replay queued writes when coming back online
  window.addEventListener('online', () => {
    console.log('[DB] Back online — flushing queue');
    _flushQueue();
  });

})();
