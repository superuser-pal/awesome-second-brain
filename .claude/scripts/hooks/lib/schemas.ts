/**
 * Zod schema registry — one schema per vault asset class.
 * Authoritative source: .claude/core/reference/ASSET-CLASSES.md
 *
 * Usage:
 *   const resolved = resolveSchema(filePath);
 *   if (resolved) {
 *     const result = resolved.schema.safeParse(frontmatter);
 *   }
 */

import { z } from "zod";
import path from "path";

// ── Shared enums ─────────────────────────────────────────────────────────────

const NoteType = z.enum([
  "concept", "decision", "reference", "meeting", "idea",
  "note", "belief", "frame", "lesson", "model", "goal", "plan", "research",
]);

const Origin = z.enum(["braindump", "url", "doc", "manual", "ai-output"]);

// ── Schemas ───────────────────────────────────────────────────────────────────

/** inbox/raw/*.md — minimal capture */
export const InboxRawSchema = z.object({
  date: z.string(),
  created: z.string(),
  status: z.literal("unprocessed"),
});

/** inbox/ready/*.md — processed, awaiting distribution */
export const InboxReadySchema = z.object({
  name: z.string(),
  domain: z.string(),
  origin: Origin,
  type: NoteType,
  status: z.literal("ready"),
  description: z.string(),
  tags: z.array(z.string()),
  created: z.string(),
  last_updated: z.string(),
});

/** domains/[Name]/INDEX.md */
export const DomainIndexSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["active", "paused", "completed", "archived"]),
  last_updated: z.string(),
});

/** domains/[Name]/01_PROJECTS/PROJECT_*.md */
export const ProjectSchema = z.object({
  name: z.string(),
  domain: z.string(),
  goal: z.string(),
  status: z.enum(["planning", "in_progress", "blocked", "completed", "cancelled"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  tags: z.array(z.string()),
  created: z.string(),
  last_updated: z.string(),
});

/** domains/[Name]/02_PAGES/*.md */
export const DomainPageSchema = z.object({
  name: z.string(),
  domain: z.string(),
  origin: Origin,
  type: NoteType,
  status: z.enum(["processed", "archived"]),
  description: z.string(),
  tags: z.array(z.string()),
  created: z.string(),
  last_updated: z.string(),
});

/** work/03_INCIDENTS/*.md */
export const IncidentSchema = z.object({
  severity: z.string(),
  status: z.string(),
});

/** work/02_1-1/<Person>.md */
export const OneOnOneSchema = z.object({
  person: z.string(),
}).and(z.union([
  z.object({ date: z.string() }),
  z.object({ last_updated: z.string() }),
]));

/** plan/DD-MM-YY-XX.md */
export const DailyPlanSchema = z.object({
  date: z.string(),
  tags: z.array(z.string()).refine((t) => t.includes("daily"), {
    message: "Daily note must have 'daily' tag",
  }),
});

/** plan/W[x]_YYYY-MM-DD.md */
export const WeeklyPlanSchema = z.object({
  week: z.string(),
  date: z.string(),
  goal: z.string(),
  tags: z.array(z.string()).refine((t) => t.includes("weekly"), {
    message: "Weekly plan must have 'weekly' tag",
  }),
});

// ── Resolution ────────────────────────────────────────────────────────────────

export interface SchemaEntry {
  label: string;
  schema: z.ZodTypeAny;
}

const DAY_SUFFIXES = ["-MO", "-TU", "-WE", "-TH", "-FR", "-SA", "-SU"];

export function resolveSchema(filePath: string): SchemaEntry | null {
  const normalized = filePath.replace(/\\/g, "/");
  const basename = path.basename(normalized);

  if (normalized.includes("inbox/raw/")) {
    return { label: "Inbox Raw", schema: InboxRawSchema };
  }
  if (normalized.includes("inbox/ready/")) {
    return { label: "Inbox Ready", schema: InboxReadySchema };
  }
  if (normalized.includes("/02_PAGES/")) {
    return { label: "Domain Page", schema: DomainPageSchema };
  }
  if (normalized.includes("/01_PROJECTS/") && basename.startsWith("PROJECT_")) {
    return { label: "Domain Project", schema: ProjectSchema };
  }
  if (basename === "INDEX.md" && normalized.includes("/domains/")) {
    return { label: "Domain INDEX", schema: DomainIndexSchema };
  }
  if (normalized.includes("/03_INCIDENTS/")) {
    return { label: "Incident", schema: IncidentSchema };
  }
  if (normalized.includes("/02_1-1/")) {
    return { label: "1:1 Note", schema: OneOnOneSchema };
  }
  if (normalized.includes("plan/") && DAY_SUFFIXES.some((s) => basename.includes(s))) {
    return { label: "Daily Plan", schema: DailyPlanSchema };
  }
  if (normalized.includes("plan/") && basename.startsWith("W")) {
    return { label: "Weekly Plan", schema: WeeklyPlanSchema };
  }
  return null;
}
