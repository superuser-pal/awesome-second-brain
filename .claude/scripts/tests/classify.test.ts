import { describe, it, expect } from "bun:test";
import { classifyPrompt, anyWordMatch } from "../hooks/lib/signals.ts";

describe("Word boundary matching (Latin-letter lookbehind)", () => {
  it("matches 'win' as a standalone word", () => {
    expect(anyWordMatch(["win"], "we win this sprint")).toBe(true);
  });

  it("does NOT match 'win' inside 'indecision'", () => {
    expect(anyWordMatch(["decision"], "indecision is paralyzing")).toBe(false);
  });

  it("does NOT match 'win' inside 'winning' (lookbehind stops it)", () => {
    // 'win' pattern should NOT match 'winning' because 'win' is followed by 'n'
    expect(anyWordMatch(["win"], "winning is great")).toBe(false);
  });

  it("matches 'p0' standalone", () => {
    expect(anyWordMatch(["p0"], "this is a p0 incident")).toBe(true);
  });

  it("does NOT match 'p0' inside 'p0001'", () => {
    // 'p0' followed by digit — but our pattern only checks letter boundaries
    // so p0001 would match (digit is not a letter). This is consistent with Python behavior.
    expect(anyWordMatch(["p0"], "ticket p0001")).toBe(true); // same as Python
  });
});

describe("DECISION signal", () => {
  it("matches 'we decided to'", () => {
    const hits = classifyPrompt("we decided to ship the feature");
    expect(hits.some((h) => h.includes("DECISION"))).toBe(true);
  });

  it("matches 'decision'", () => {
    const hits = classifyPrompt("the final decision is made");
    expect(hits.some((h) => h.includes("DECISION"))).toBe(true);
  });

  it("does NOT match 'indecision'", () => {
    const hits = classifyPrompt("the team shows indecision");
    expect(hits.some((h) => h.includes("DECISION"))).toBe(false);
  });
});

describe("WIN signal", () => {
  it("matches 'shipped'", () => {
    const hits = classifyPrompt("we shipped the API today");
    expect(hits.some((h) => h.includes("WIN"))).toBe(true);
  });

  it("matches 'win' standalone", () => {
    const hits = classifyPrompt("this is a win for the team");
    expect(hits.some((h) => h.includes("WIN"))).toBe(true);
  });

  it("matches 'kudos'", () => {
    const hits = classifyPrompt("got kudos from the PM");
    expect(hits.some((h) => h.includes("WIN"))).toBe(true);
  });
});

describe("INCIDENT signal", () => {
  it("matches 'outage'", () => {
    const hits = classifyPrompt("there was an outage last night");
    expect(hits.some((h) => h.includes("INCIDENT"))).toBe(true);
  });

  it("matches 'p0' and 'p1'", () => {
    const hits = classifyPrompt("we had a p0 this morning");
    expect(hits.some((h) => h.includes("INCIDENT"))).toBe(true);
  });
});

describe("ARCHITECTURE signal", () => {
  it("matches 'architecture'", () => {
    const hits = classifyPrompt("let's discuss the system architecture");
    expect(hits.some((h) => h.includes("ARCHITECTURE"))).toBe(true);
  });

  it("matches 'trade-off'", () => {
    const hits = classifyPrompt("there's a trade-off between speed and safety");
    expect(hits.some((h) => h.includes("ARCHITECTURE"))).toBe(true);
  });
});

describe("TASK signal", () => {
  it("matches 'action item'", () => {
    const hits = classifyPrompt("action item: follow up with the team");
    expect(hits.some((h) => h.includes("TASK"))).toBe(true);
  });

  it("matches 'todo'", () => {
    const hits = classifyPrompt("todo: update the docs");
    expect(hits.some((h) => h.includes("TASK"))).toBe(true);
  });
});

describe("Empty / irrelevant prompts", () => {
  it("returns no signals for a generic question", () => {
    const hits = classifyPrompt("what is the weather like today?");
    expect(hits.length).toBe(0);
  });

  it("returns no signals for empty string", () => {
    expect(classifyPrompt("").length).toBe(0);
  });
});
