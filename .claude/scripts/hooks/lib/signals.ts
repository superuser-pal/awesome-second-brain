/**
 * Classification signals for UserPromptSubmit routing hints.
 * Ported from classify-message.py. Shared source of truth so other tooling
 * can import these without duplicating them.
 */

export interface Signal {
  name: string;
  message: string;
  patterns: string[];
}

export const SIGNALS: readonly Signal[] = [
  {
    name: "DECISION",
    message:
      "DECISION detected — consider creating a Decision Record in work/01_PROJECTS/ and logging in work/INDEX.md Decisions Log",
    patterns: [
      "decided", "deciding", "decision", "we chose", "agreed to",
      "let's go with", "the call is", "we're going with",
    ],
  },
  {
    name: "INCIDENT",
    message:
      "INCIDENT detected — consider using /incident or creating an incident note in work/03_INCIDENTS/",
    patterns: [
      "incident", "outage", "pagerduty", "severity",
      "p0", "p1", "p2", "sev1", "sev2", "postmortem", "rca",
    ],
  },
  {
    name: "1:1 CONTENT",
    message:
      "1:1 CONTENT detected — consider creating a 1-on-1 note in work/02_1-1/ and updating the person section in work/06_ORG/PEOPLE.md",
    patterns: [
      "1:1", "1-1", "1-on-1", "one on one", "1on1",
      "catch up with", "sync with",
    ],
  },
  {
    name: "WIN",
    message: "WIN detected — consider adding to perf/Brag Doc.md with a link to the evidence note",
    patterns: [
      "shipped", "shipping", "ships",
      "launched", "launching", "launches",
      "completed", "completing", "completes",
      "released", "releasing", "releases",
      "deployed", "deploying", "deploys",
      "achieved", "achieving", "won", "promoted", "praised", "win",
      "kudos", "shoutout", "great feedback", "recognized",
    ],
  },
  {
    name: "ARCHITECTURE",
    message:
      "ARCHITECTURE discussion — consider creating a reference note in reference/ or a decision record",
    patterns: [
      "architecture", "system design", "rfc", "tech spec",
      "trade-off", "design doc", "adr",
    ],
  },
  {
    name: "PERSON CONTEXT",
    message:
      "PERSON CONTEXT detected — consider updating the relevant person section in work/06_ORG/PEOPLE.md and linking from the conversation note",
    patterns: [
      "told me", "said that", "feedback from", "met with",
      "talked to", "spoke with",
      "mentioned that", "mentioned the", "mentioned a",
    ],
  },
  {
    name: "CAPTURE_INTENT",
    message:
      "CAPTURE_INTENT detected — if no command was invoked, route through the /quick-dump workflow (classify, create/update notes, add wikilinks, update indexes)",
    patterns: [
      "notes from", "from today's meeting", "from the meeting",
      "i learned", "takeaway", "wanted to note",
      "just had a", "recap of",
    ],
  },
  {
    name: "TASK",
    message:
      "TASK detected — if no command was invoked, offer to create a task via the /task-add workflow",
    patterns: [
      "todo", "to-do", "need to", "have to",
      "remind me", "action item", "follow up on", "task:",
    ],
  },
  {
    name: "PROJECT UPDATE",
    message:
      "PROJECT UPDATE detected — consider updating the active work note in work/01_PROJECTS/ and checking if wins should go to work/05_REVIEW/WINS.md",
    patterns: [
      "project update", "sprint", "milestone", "iteration", "cycle update",
      "shipped", "shipping", "ships", "shipped feature",
      "launched", "launching", "launches",
      "completed", "completing", "completes",
      "released", "releasing", "releases",
      "deployed", "deploying", "deploys",
      "went live", "rolled out", "rolling out",
      "merged", "merging", "merges",
      "cut the release", "release cut",
      "submitted", "submitting", "submits",
      "published", "publishing", "publishes",
      "delivered", "delivering", "delivers",
      "iteration", "cycle complete",
    ],
  },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Match a phrase as a whole word using Latin-letter lookarounds.
 * Mirrors Python: (?<![a-zA-Z])phrase(?![a-zA-Z])
 */
export function anyWordMatch(phrases: string[], text: string): boolean {
  for (const phrase of phrases) {
    const re = new RegExp(`(?<![a-zA-Z])${escapeRegex(phrase)}(?![a-zA-Z])`, "i");
    if (re.test(text)) return true;
  }
  return false;
}

export function classifyPrompt(prompt: string): string[] {
  const lower = prompt.toLowerCase();
  return SIGNALS
    .filter((sig) => anyWordMatch(sig.patterns, lower))
    .map((sig) => sig.message);
}
