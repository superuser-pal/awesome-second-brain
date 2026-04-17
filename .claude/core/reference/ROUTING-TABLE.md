---
title: PAL Second Brain Routing Table
version: 1.0.0
layer: REFERENCE
purpose: Two-level lookup — user intent to command, and command to subagents called
last_updated: 2026-04-05
---

# Routing Table

Quick reference for routing logic. Level 1 maps user intent to the right command. Level 2 shows which subagents each command invokes.

For full intent routing logic, see `ORCHESTRATION.md`. For subagent details, see `SYSTEM-INDEX.md`.

---

## Level 1: Intent → Command

| User Intent | Command |
|-------------|---------|
| Morning kickoff, start of day, what to focus on | `/open-day` |
| End of day, wrap up, close session | `/close-day` |
| Plan this week, set weekly goals | `/week-prep` |
| Close the week, weekly retrospective | `/week-close` |
| Full weekly lifecycle (close + plan) | `/week-cycle` |
| Weekly synthesis, cross-session patterns | `/weekly` |
| Save something, capture with light formatting | `/save` |
| Reflective capture, capture my thoughts, reflection | `/brain-dump` |
| Quick capture, brain dump, dump this (power) | `/quick-dump` |
| Quick task, TODO, action item | `/task-add` |
| Stage 1 capture only | `/general` |
| Process inbox notes, add frontmatter | `/process` |
| Route processed notes to domains | `/distribute` |
| Capture a 1:1 meeting | `/1-1` |
| Capture an incident from Slack | `/incident` |
| Scan Slack channels for evidence | `/slack-scan` |
| Scan a peer's PRs for review prep | `/peer-scan` |
| Generate review brief (manager or peer) | `/brief` |
| Write self-assessment / self-review | `/self` |
| Write peer review | `/peer` |
| Create a new domain project | `/project-create` |
| Sync tasks to TASKS.md | `/task-sync` |
| Audit vault health (orphans, links, indexes) | `/audit` |
| Import content from another vault | `/upgrade` |
| Archive a completed project | `/project-archive` |
| Edit text to sound human, not AI | `/humanize` |
| Search or promote a dormant prompt | `prompts` skill |
| Demote an active prompt | `prompts` skill |
| Search or promote a reasoning strategy | `strategy` skill |
| Demote an active strategy | `strategy` skill |
| Apply CoT reasoning to current session | `/thinking:cot` |
| Evaluate which active strategy fits a task | `/thinking:eval` |
| Clear the active strategy from session | `/thinking:reset` |

---

## Level 2: Command → Subagents

Commands that invoke subagents. Commands not listed here run without subagents.

| Command | Subagents Called | Notes |
|---------|-----------------|-------|
| `/close-day` | `wins-capture` | Scans session for uncaptured wins |
| `/weekly` | `wins-capture` | Scans week for patterns and wins |
| `/incident` | `slack-archaeologist`, `contact-importer` | Full Slack reconstruction + person notes |
| `/slack-scan` | `slack-archaeologist` | Deep Slack scan only |
| `/brief` | `review-prep` | Aggregates evidence for the review period |
| `/self` | `review-fact-checker` | Verifies claims against vault sources |
| `/peer` | `review-fact-checker` | Verifies peer review claims against vault sources |
| `/audit` | `cross-linker`, `vault-librarian` | Link audit + deep maintenance |
| `/upgrade` | `vault-migrator` | Full vault migration and transformation |

---

## Domain Agent Routing

Domain Agents are not invoked by commands — they are loaded directly by the user.

| How to activate | Format |
|----------------|--------|
| User types `/agent:[name]` | Loads the agent and its domain context |
| Agent presents command menu | User interacts with `*menu`, `*context`, `*dismiss` |
| To dismiss | User types `*dismiss` — agent saves optional session note |

See `SYSTEM-INDEX.md` Domain Agents table for registered agents.

---

**Related Files:** `ORCHESTRATION.md`, `SYSTEM-INDEX.md`, `AGENTS-LOGIC.md`
