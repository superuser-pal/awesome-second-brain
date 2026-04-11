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
| Morning kickoff, start of day, what to focus on | `/standup` |
| End of day, wrap up, close session | `/wrap-up` |
| Plan this week, set weekly goals | `/plan-week` |
| Close the week, weekly retrospective | `/close-week` |
| Full weekly lifecycle (close + plan) | `/week-cycle` |
| Weekly synthesis, cross-session patterns | `/weekly` |
| Save something, capture with light formatting | `/save` |
| Quick capture, brain dump, dump this (power) | `/dump` |
| Quick task, TODO, action item | `/task` |
| Stage 1 capture only | `/capture` |
| Process inbox notes, add frontmatter | `/process` |
| Route processed notes to domains | `/distribute` |
| Capture a 1:1 meeting | `/capture-1on1` |
| Capture an incident from Slack | `/incident-capture` |
| Scan Slack channels for evidence | `/slack-scan` |
| Scan a peer's PRs for review prep | `/peer-scan` |
| Generate review brief (manager or peer) | `/review-brief` |
| Write self-assessment / self-review | `/self-review` |
| Write peer review | `/review-peer` |
| Create a new domain project | `/create-project` |
| Sync tasks to TASKS.md | `/sync-tasks` |
| Audit vault health (orphans, links, indexes) | `/vault-audit` |
| Import content from another vault | `/vault-upgrade` |
| Archive a completed project | `/project-archive` |
| Edit text to sound human, not AI | `/humanize` |

---

## Level 2: Command → Subagents

Commands that invoke subagents. Commands not listed here run without subagents.

| Command | Subagents Called | Notes |
|---------|-----------------|-------|
| `/wrap-up` | `wins-capture` | Scans session for uncaptured wins |
| `/weekly` | `wins-capture` | Scans week for patterns and wins |
| `/incident-capture` | `slack-archaeologist`, `contact-importer` | Full Slack reconstruction + person notes |
| `/slack-scan` | `slack-archaeologist` | Deep Slack scan only |
| `/review-brief` | `review-prep` | Aggregates evidence for the review period |
| `/self-review` | `review-fact-checker` | Verifies claims against vault sources |
| `/review-peer` | `review-fact-checker` | Verifies peer review claims against vault sources |
| `/vault-audit` | `cross-linker`, `vault-librarian` | Link audit + deep maintenance |
| `/vault-upgrade` | `vault-migrator` | Full vault migration and transformation |

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
