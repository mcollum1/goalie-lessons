/* ═══════════════════════════════════════════════════════════════════════
   generate-plan — Supabase Edge Function
   Builds a structured goalie lesson plan using the Anthropic API.

   POST /functions/v1/generate-plan
   Body: { params: SessionParams, drills: Drill[] }
   Returns: { plan: Plan }
   ═══════════════════════════════════════════════════════════════════════ */

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

/* ── Types ────────────────────────────────────────────────────────────── */

interface SessionParams {
  goalies:  number;
  shooters: number;
  level:    "beginner" | "intermediate" | "advanced";
  duration: number;   // minutes
  screener: "yes" | "no" | "skip";
  focus:    string;   // drill_category value or "surprise_me"
  goalie?:  string;   // display name, e.g. "Jake Reynolds"
}

interface Drill {
  id:                  string;
  name:                string;
  drill_category:      string[];
  session_slot:        string;
  duration_minutes:    number;
  difficulty:          string;
  shooter_count_min:   number;
  shooter_count_max:   number;
  shot_count?:         number;
  coaching_cues:       string[];
  clip_file?:          string;
  requires_screener?:  boolean;
  tags?:               string[];
}

interface PlanDrill {
  drill_id:   string;
  name:       string;
  phaseLabel: string;
  duration:   string;
  difficulty: string;
  shots?:     string;
  clip:       string;
  cues:       string[];
}

interface PlanSection {
  phase: string;
  name:  string;
  time:  string;
  drills: PlanDrill[];
}

interface Plan {
  title:    string;
  notes:    { focus: string; drills: string };
  sections: PlanSection[];
}

/* ── CORS ─────────────────────────────────────────────────────────────── */

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

/* ── Prompt builder ───────────────────────────────────────────────────── */

function buildDrillSummary(drills: Drill[]): string {
  // Send only the fields the AI needs for planning — keeps the prompt lean
  return JSON.stringify(drills.map(d => ({
    id:               d.id,
    name:             d.name,
    drill_category:   d.drill_category,
    session_slot:     d.session_slot,
    duration_minutes: d.duration_minutes,
    difficulty:       d.difficulty,
    shooter_count_min: d.shooter_count_min,
    shooter_count_max: d.shooter_count_max,
    shot_count:       d.shot_count ?? 0,
    requires_screener: d.requires_screener ?? false,
    tags:             d.tags ?? [],
    // Top 3 cues — the AI uses these verbatim in the output
    cues:             (d.coaching_cues ?? []).slice(0, 3),
    clip:             d.clip_file ?? "",
  })), null, 2);
}

function buildSystemPrompt(): string {
  return `You are an expert ice hockey goalie coach AI. Your job is to build structured practice session plans for individual goalie lessons.

You will receive session parameters and a pre-filtered drill library. Select and sequence drills into a complete session following the rules below.

SESSION STRUCTURE (always follow this phase order):
1. "skating" — Skating warm-up: 1–2 drills from session_slot "warmup" with drill_category containing "skating". Total ~5–10 min.
2. "shot"    — Shot warm-up: exactly 1 drill from session_slot "warmup" with drill_category containing "warmup". Total ~5 min.
3. "skill"   — Skill work: 2–4 drills from session_slot "skill_work". Prioritize drills whose drill_category or tags match the requested focus_area. Total ~20–35 min.
4. "compete" — Compete/bonus: 0–1 drills from session_slot "compete". Only include if shooter_count_min ≤ available shooters. Omit if no eligible drill exists or time is tight.

RULES:
- Only select drills from the provided library. Never invent drills.
- Use exact drill id, name, cues, and clip values from the library.
- Total plan duration must be approximately the requested duration (within ±5 min).
- Assign drill duration_minutes from the library as the "duration" field (format: "X min").
- For "shots": if shot_count is 0 or missing, omit the field. Otherwise use "X shot" (singular) or "X shots" (plural).
- Assign phaseLabel as a readable label: "Skating warmup" / "Shot warmup" / "Skill work" / "Situational" / "Compete".
- Write the notes.focus as 1–2 sentences of coaching intent for the session in the voice of the head coach.
- Write notes.drills as 1 sentence summarizing the drill progression.
- The title should be concise (3–5 words) and reflect the focus area.
- SHOOTER UTILIZATION: When 2 or more shooters are available, strongly prefer skill drills with shooter_count_min ≥ 2. Only fall back to 1-shooter skill drills if no multi-shooter drills fit the focus area or duration. Using available shooters is more valuable than picking a simpler drill.

OUTPUT FORMAT:
Return ONLY a valid JSON object. No explanation, no markdown, no code fences. The JSON must match this exact schema:

{
  "title": "string",
  "notes": {
    "focus": "string — 1-2 sentence coaching intent",
    "drills": "string — 1 sentence drill progression summary"
  },
  "sections": [
    {
      "phase": "skating | shot | skill | compete",
      "name": "string — readable phase name",
      "time": "string — e.g. '10 min'",
      "drills": [
        {
          "drill_id": "string — exact id from library",
          "name": "string — exact name from library",
          "phaseLabel": "string",
          "duration": "string — e.g. '5 min'",
          "difficulty": "string — from library",
          "shots": "string — omit if no shots",
          "clip": "string — exact clip_file from library",
          "cues": ["string", "string", "string"]
        }
      ]
    }
  ]
}`;
}

function buildUserMessage(params: SessionParams, drillSummary: string): string {
  const focusLabel = params.focus === "surprise_me"
    ? "any focus area — choose the best fit given the drills available"
    : params.focus.replace(/_/g, " ");

  return `SESSION PARAMETERS:
- Goalie: ${params.goalie ?? "unnamed"}
- Level: ${params.level}
- Duration: ${params.duration} minutes
- Goalies on ice: ${params.goalies}
- Shooters available: ${params.shooters}
- Screener available: ${params.screener}
- Focus area: ${focusLabel}

DRILL LIBRARY (${drillSummary.split('"id"').length - 1} eligible drills after filtering):
${drillSummary}

Build the session plan now.`;
}

/* ── Anthropic API call ───────────────────────────────────────────────── */

async function callClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY secret is not set");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key":         apiKey,
      "anthropic-version": "2023-06-01",
      "content-type":      "application/json",
    },
    body: JSON.stringify({
      model:      "claude-sonnet-4-6",
      max_tokens: 4096,
      system:     systemPrompt,
      messages: [
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const rawText = data.content?.[0]?.text ?? "";

  // Strip any accidental markdown fences before parsing
  return rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
}

/* ── Post-process: add step numbers + fill in any missing clip paths ──── */

function postProcess(plan: Plan): Plan {
  let stepNum = 1;
  for (const section of plan.sections) {
    for (const drill of section.drills) {
      (drill as PlanDrill & { step: string }).step = `Step ${stepNum++}`;
      // Ensure clip always has a value (fallback to empty string)
      if (!drill.clip) drill.clip = "";
    }
  }
  return plan;
}

/* ── Main handler ─────────────────────────────────────────────────────── */

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let params: SessionParams;
  let drills: Drill[];

  try {
    const body = await req.json();
    params = body.params;
    drills = body.drills;

    if (!params || !drills || !Array.isArray(drills)) {
      return json({ error: "Body must include { params, drills[] }" }, 400);
    }
    if (drills.length === 0) {
      return json({ error: "No eligible drills after filtering — check session params" }, 400);
    }
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  try {
    const systemPrompt  = buildSystemPrompt();
    const drillSummary  = buildDrillSummary(drills);
    const userMessage   = buildUserMessage(params, drillSummary);

    console.log(`[generate-plan] ${params.goalie ?? "?"} · ${params.level} · ${params.duration}min · ${drills.length} drills`);

    const rawJson = await callClaude(systemPrompt, userMessage);
    const plan    = postProcess(JSON.parse(rawJson) as Plan);

    return json({ plan });
  } catch (err) {
    console.error("[generate-plan] Error:", err);
    return json({ error: String(err) }, 500);
  }
});
