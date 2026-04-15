import { describe, it, expect } from "bun:test";
import {
  InboxRawSchema,
  InboxReadySchema,
  DomainIndexSchema,
  ProjectSchema,
  DomainPageSchema,
  IncidentSchema,
  WeeklyPlanSchema,
  DailyPlanSchema,
  resolveSchema,
} from "../hooks/lib/schemas.ts";

// ── InboxRaw ──────────────────────────────────────────────────────────────────
describe("InboxRawSchema", () => {
  it("accepts valid inbox/raw frontmatter", () => {
    const r = InboxRawSchema.safeParse({
      date: "2026-04-14",
      created: "2026-04-14",
      status: "unprocessed",
    });
    expect(r.success).toBe(true);
  });

  it("rejects wrong status", () => {
    const r = InboxRawSchema.safeParse({
      date: "2026-04-14",
      created: "2026-04-14",
      status: "ready",
    });
    expect(r.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const r = InboxRawSchema.safeParse({ date: "2026-04-14" });
    expect(r.success).toBe(false);
  });
});

// ── InboxReady ────────────────────────────────────────────────────────────────
describe("InboxReadySchema", () => {
  const valid = {
    name: "my-note",
    domain: "Work",
    origin: "braindump",
    type: "note",
    status: "ready",
    description: "A brief description of the note",
    tags: ["work-note"],
    created: "2026-04-14",
    last_updated: "2026-04-14",
  };

  it("accepts valid inbox/ready frontmatter", () => {
    expect(InboxReadySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects unknown origin", () => {
    const r = InboxReadySchema.safeParse({ ...valid, origin: "slack" });
    expect(r.success).toBe(false);
  });

  it("rejects missing description", () => {
    const { description, ...rest } = valid;
    expect(InboxReadySchema.safeParse(rest).success).toBe(false);
  });
});

// ── DomainIndex ───────────────────────────────────────────────────────────────
describe("DomainIndexSchema", () => {
  const valid = {
    name: "AwesomeSecondBrain",
    description: "The vault scaffolding domain",
    status: "active",
    last_updated: "2026-04-14",
  };

  it("accepts valid domain INDEX frontmatter", () => {
    expect(DomainIndexSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid status", () => {
    const r = DomainIndexSchema.safeParse({ ...valid, status: "deleted" });
    expect(r.success).toBe(false);
  });
});

// ── Project ───────────────────────────────────────────────────────────────────
describe("ProjectSchema", () => {
  const valid = {
    name: "PROJECT_EV_HOME",
    domain: "Work",
    goal: "Launch home charging MVP",
    status: "in_progress",
    priority: "high",
    tags: ["work-note"],
    created: "2026-04-01",
    last_updated: "2026-04-14",
  };

  it("accepts valid project frontmatter", () => {
    expect(ProjectSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid priority", () => {
    const r = ProjectSchema.safeParse({ ...valid, priority: "p0" });
    expect(r.success).toBe(false);
  });

  it("rejects missing goal", () => {
    const { goal, ...rest } = valid;
    expect(ProjectSchema.safeParse(rest).success).toBe(false);
  });
});

// ── DomainPage ────────────────────────────────────────────────────────────────
describe("DomainPageSchema", () => {
  const valid = {
    name: "ev-charging-overview",
    domain: "Work",
    origin: "manual",
    type: "reference",
    status: "processed",
    description: "Overview of EV charging infrastructure decisions",
    tags: ["work-note"],
    created: "2026-04-10",
    last_updated: "2026-04-14",
  };

  it("accepts valid domain page frontmatter", () => {
    expect(DomainPageSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects status='active' (not valid for pages)", () => {
    const r = DomainPageSchema.safeParse({ ...valid, status: "active" });
    expect(r.success).toBe(false);
  });

  it("rejects missing domain", () => {
    const { domain, ...rest } = valid;
    expect(DomainPageSchema.safeParse(rest).success).toBe(false);
  });
});

// ── Incident ──────────────────────────────────────────────────────────────────
describe("IncidentSchema", () => {
  it("accepts incident with severity + status", () => {
    const r = IncidentSchema.safeParse({ severity: "high", status: "resolved" });
    expect(r.success).toBe(true);
  });

  it("rejects missing severity", () => {
    const r = IncidentSchema.safeParse({ status: "resolved" });
    expect(r.success).toBe(false);
  });
});

// ── Plans ─────────────────────────────────────────────────────────────────────
describe("WeeklyPlanSchema", () => {
  const valid = {
    week: "W15",
    date: "2026-04-07",
    goal: "Ship the EV milestone",
    tags: ["weekly"],
  };

  it("accepts valid weekly plan", () => {
    expect(WeeklyPlanSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects missing 'weekly' tag", () => {
    const r = WeeklyPlanSchema.safeParse({ ...valid, tags: ["daily"] });
    expect(r.success).toBe(false);
  });
});

describe("DailyPlanSchema", () => {
  it("accepts valid daily note", () => {
    const r = DailyPlanSchema.safeParse({ date: "2026-04-14", tags: ["daily"] });
    expect(r.success).toBe(true);
  });

  it("rejects missing 'daily' tag", () => {
    const r = DailyPlanSchema.safeParse({ date: "2026-04-14", tags: ["weekly"] });
    expect(r.success).toBe(false);
  });
});

// ── resolveSchema routing ─────────────────────────────────────────────────────
describe("resolveSchema", () => {
  it("routes inbox/raw/ to InboxRaw", () => {
    const r = resolveSchema("/vault/inbox/raw/braindump-test.md");
    expect(r?.label).toBe("Inbox Raw");
  });

  it("routes inbox/ready/ to InboxReady", () => {
    const r = resolveSchema("/vault/inbox/ready/general-test.md");
    expect(r?.label).toBe("Inbox Ready");
  });

  it("routes domains/X/02_PAGES/ to Domain Page", () => {
    const r = resolveSchema("/vault/domains/Work/02_PAGES/ev-overview.md");
    expect(r?.label).toBe("Domain Page");
  });

  it("routes domains/X/01_PROJECTS/PROJECT_*.md to Domain Project", () => {
    const r = resolveSchema("/vault/domains/Work/01_PROJECTS/PROJECT_EV.md");
    expect(r?.label).toBe("Domain Project");
  });

  it("routes domains/X/INDEX.md to Domain INDEX", () => {
    const r = resolveSchema("/vault/domains/Work/INDEX.md");
    expect(r?.label).toBe("Domain INDEX");
  });

  it("routes work/03_INCIDENTS/ to Incident", () => {
    const r = resolveSchema("/vault/work/03_INCIDENTS/api-outage.md");
    expect(r?.label).toBe("Incident");
  });

  it("routes work/02_1-1/ to 1:1 Note", () => {
    const r = resolveSchema("/vault/work/02_1-1/Babis Pagonis.md");
    expect(r?.label).toBe("1:1 Note");
  });

  it("returns null for unknown paths", () => {
    const r = resolveSchema("/vault/brain/MEMORIES.md");
    expect(r).toBeNull();
  });
});
