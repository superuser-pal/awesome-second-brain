---
title: Awesome Second Brain Orchestration
version: 1.0.0
layer: SYSTEM
purpose: AI Agent's routing logic, plan-before-execute rules, and context assembly
last_updated: 2026-05-01
---

## 1. AI Agent's Role

The AI Agent is a vault assistant — not an orchestrator with a persona. At session start, the Agent has access to the full vault context injected by `session-start.sh`. The job is to route user intent to the right command, skill, or agent, then execute or facilitate.

**Default behavior (no command invoked):**
- Answer from loaded context when possible.
- Create notes when the user captures something. Always apply vault rules (frontmatter, wikilinks, correct folder).
- For substantial operations, route to the appropriate command.

---

## 2. Intent Routing Table

Match user intent conceptually — not by keyword. Route to the most specific match.

| User Intent | Route To |
|-------------|---------|
| Morning kickoff, start of day, what should I focus on | `/open-day` |
| End of day, wrap up, session end | `/close-day` |
| Plan this week, set weekly goals | `/week-prep` |
| Close out the week, weekly retrospective | `/week-close` |
| Full weekly lifecycle (close + plan) | `/week-cycle` |
| Weekly synthesis, cross-session patterns | `/weekly` |
| Quick capture / brain dump | `/quick-dump` (all 3 stages) or `/general` (stage 1 only) |
| Process inbox notes | `/process` |
| Distribute processed notes to domains | `/distribute` |
| Capture a 1:1 meeting | `/1-1` |
| Capture an incident from Slack | `/incident` |
| Scan Slack channels for evidence | `/slack-scan` |
| Scan a peer's PRs for review prep | `/peer-scan` |
| Write self-review / self-assessment | `/self` |
| Write peer review | `/peer` |
| Generate review brief | `/brief` |
| Create a new domain project | `/project-create` |
| Sync tasks to TASKS.md | `/task-sync` |
| Audit vault health (orphans, broken links) | `/audit` |
| Migrate content from another vault | `/upgrade` |
| Archive a completed project | `/project-archive` |
| Make text sound human | `/humanize` |
| Create a domain | `create-domain` skill |
| Create a domain agent | `create-agent` skill |
| Daily or weekly planning (open-day/planning enrichment) | `daily-rituals` skill |

---

## 2a. Default Behavior for Unclassified Input

If the user provides substantive content (not a question, not a system command) and no slash command was invoked, treat it as a `/quick-dump` operation — classify, create/update notes, add wikilinks, update indexes.

The user should never need to know `/quick-dump` exists. The system should do the right thing by default. The `classify-message.ts` hook helps by detecting `CAPTURE_INTENT` and `TASK` signals, but even without those signals, if the user is clearly sharing information to capture, route through `/quick-dump`.

---

## 3. Plan-Before-Execute Matrix

For write/delete operations, determine if an explicit plan (Objective, Steps, Files, Risks) is required:

| Task Complexity | Risk Level | Present Plan? |
|----------------|-----------|---------------|
| 1 file, simple write | Low (new note, formatting) | No — execute directly |
| 1 file, logic change | Medium (editing existing) | Maybe — brief summary |
| 1 file, destructive | High (delete, overwrite) | Yes — always |
| 2–3 files, moderate | Any | Yes — brief plan |
| 4+ files, structural | Any | Yes — full plan |
| Domain structure changes | Any | Yes — full plan |

---

## 4. Context Assembly

At `SessionStart`, `session-start.sh` automatically injects:

1. Today's date and day
2. North Star goals (`brain/NORTH_STAR.md`)
3. Active work summary (`work/01_PROJECTS/` file list)
4. Recent git changes (last 10 commits)
5. Open tasks (`dashboards/TASKS.md`)
6. Domain summary (active domains in `domains/`)
7. Inbox status (`inbox/raw/` and `inbox/ready/` counts)
8. Full vault file listing (for QMD indexing)

The AI Agent does not need to manually read these files — they are already in context.

**What is NOT auto-loaded:**
- Individual work notes (read on demand)
- Domain pages and projects (read on demand)
- Brain topic notes other than North Star (read on demand via `MEMORIES.md` index)

---

## 4a. Synthesis File-Back

When the AI Agent reads 2+ vault files to compose a substantive answer (not a simple lookup), offer to file the synthesis as a permanent concept page:

> "This synthesis drew from N vault sources. Save it as a permanent page?"

If the user says yes, create a concept page in the relevant domain's `02_PAGES/` with:
- `type: concept`
- `origin: ai-output`
- `synthesized-from:` list of wikilinks to the source notes

This closes the "query → file back" loop from Karpathy's LLM Wiki pattern. Knowledge compounds — questions and answers become permanent wiki pages.

---

## 5. Execution Constraints

- **Graph-first:** Every note written must contain at least one `[[wikilink]]`. If a note has none, it is a bug — add links before finishing.
- **Vault-first memory:** When the user says "remember X", write to the appropriate `brain/` topic note. Never write to `~/.claude/memory/`.
- **Zero data loss:** When moving or renaming files, always use `git mv`. Never delete + recreate.
- **Obsidian CLI first:** When Obsidian is running, prefer `obsidian` CLI commands over raw filesystem writes.
- **Halt on error:** If a step fails during a command or skill, stop and report in plain language with numbered recovery options.

---

**Related Files:** `ARCHITECTURE.md`, `AGENTS-LOGIC.md`, `MEMORY-LOGIC.md`, `TOOLBOX.md`
