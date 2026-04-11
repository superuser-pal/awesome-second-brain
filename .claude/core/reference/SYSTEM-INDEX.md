---
title: PAL Second Brain System Index
version: 1.0.0
layer: REFERENCE
purpose: Writable capability registry — subagents, skills, domain agents, and commands
last_updated: 2026-04-05
---

# System Index

> **This file is the writable capability registry.** Add rows when creating new agents or skills. Remove rows when retiring them. The registry is the authoritative source — do not duplicate this data in CLAUDE.md or skill files.

---

## Subagents

Task-specific agents invoked BY commands. All have `maxTurns`. Run in isolated context windows.

| Agent | maxTurns | Purpose | Invoked By |
|-------|---------|---------|-----------|
| `wins-capture` | 20 | Finds uncaptured wins and competency gaps from session activity | `/wrap-up`, `/weekly` |
| `context-loader` | 20 | Loads all vault context about a person, project, incident, or concept | Direct |
| `cross-linker` | 25 | Finds missing wikilinks, orphans, and broken backlinks across the vault | `/vault-audit` |
| `contact-importer` | 30 | Bulk creates/updates person notes from Slack profiles | `/incident-capture` |
| `review-fact-checker` | 30 | Verifies every claim in a review draft against vault source notes | `/self-review`, `/review-peer` |
| `review-prep` | 30 | Aggregates all performance evidence for a given review period | `/review-brief` |
| `slack-archaeologist` | 40 | Full Slack reconstruction — reads every message, thread, and profile | `/incident-capture` |
| `vault-librarian` | 25 | Deep vault maintenance — orphan detection, broken links, stale notes | `/vault-audit` |
| `vault-migrator` | 50 | Classifies, transforms, and migrates content from a source vault | `/vault-upgrade` |

**Total: 9 subagents**

---

## Domain Agents

Interactive persona agents invoked BY the user. No `maxTurns` — conversational sessions. Created with the `create-agent` skill.

| Agent | Domain | Purpose | How to Activate |
|-------|--------|---------|----------------|
| *(none yet — create with `create-agent` skill)* | | | |

**Total: 0 domain agents**

---

## Skills

| Skill | USE WHEN | Location |
|-------|---------|---------|
| `obsidian-markdown` | Creating/editing Obsidian notes — wikilinks, callouts, embeds, properties | `.claude/skills/obsidian-markdown/SKILL.md` |
| `obsidian-cli` | Running vault CLI operations when Obsidian is running | `.claude/skills/obsidian-cli/SKILL.md` |
| `obsidian-bases` | Creating/editing `.base` files with views, filters, formulas | `.claude/skills/obsidian-bases/SKILL.md` |
| `json-canvas` | Creating/editing `.canvas` files with nodes and edges | `.claude/skills/json-canvas/SKILL.md` |
| `defuddle` | Extracting clean markdown from web pages | `.claude/skills/defuddle/SKILL.md` |
| `qmd` | Semantic vault search — use proactively before reading files | `.claude/skills/qmd/SKILL.md` |
| `project-management` | Creating, tracking, and archiving domain-scoped projects | `.claude/skills/project-management/SKILL.md` |
| `daily-rituals` | Daily and weekly planning cycle workflows | `.claude/skills/daily-rituals/SKILL.md` |
| `create-agent` | Creating and validating Domain Agents | `.claude/skills/create-agent/SKILL.md` |
| `create-domain` | Creating, validating, mapping, and archiving domains | `.claude/skills/create-domain/SKILL.md` |
| `create-skill` | Creating and validating vault skills | `.claude/skills/create-skill/SKILL.md` |

**Total: 11 skills**

---

## Commands Index

| Command | File | Subagents Called |
|---------|------|-----------------|
| `/standup` | `standup.md` | — |
| `/wrap-up` | `wrap-up.md` | `wins-capture` |
| `/plan-week` | `plan-week.md` | — |
| `/close-week` | `close-week.md` | — |
| `/week-cycle` | `week-cycle.md` | — |
| `/weekly` | `weekly.md` | `wins-capture` |
| `/dump` | `dump.md` | — |
| `/capture` | `capture.md` | — |
| `/process` | `process.md` | — |
| `/distribute` | `distribute.md` | — |
| `/capture-1on1` | `capture-1on1.md` | — |
| `/incident-capture` | `incident-capture.md` | `slack-archaeologist`, `contact-importer` |
| `/slack-scan` | `slack-scan.md` | `slack-archaeologist` |
| `/peer-scan` | `peer-scan.md` | — |
| `/review-brief` | `review-brief.md` | `review-prep` |
| `/self-review` | `self-review.md` | `review-fact-checker` |
| `/review-peer` | `review-peer.md` | `review-fact-checker` |
| `/create-project` | `create-project.md` | — |
| `/sync-tasks` | `sync-tasks.md` | — |
| `/vault-audit` | `vault-audit.md` | `cross-linker`, `vault-librarian` |
| `/vault-upgrade` | `vault-upgrade.md` | `vault-migrator` |
| `/project-archive` | `project-archive.md` | — |
| `/humanize` | `humanize.md` | — |
| `/onboard` | `onboard.md` | — |

**Total: 24 commands**

---

**Related Files:** `DOMAINS-REGISTRY.md`, `ROUTING-TABLE.md`, `AGENTS-LOGIC.md`, `SKILL-LOGIC.md`
