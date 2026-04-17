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
| `wins-capture` | 20 | Finds uncaptured wins and competency gaps from session activity | `/close-day`, `/weekly` |
| `context-loader` | 20 | Loads all vault context about a person, project, incident, or concept | Direct |
| `cross-linker` | 25 | Finds missing wikilinks, orphans, and broken backlinks across the vault | `/audit` |
| `contact-importer` | 30 | Bulk creates/updates person notes from Slack profiles | `/incident` |
| `review-fact-checker` | 30 | Verifies every claim in a review draft against vault source notes | `/self`, `/peer` |
| `review-prep` | 30 | Aggregates all performance evidence for a given review period | `/brief` |
| `slack-archaeologist` | 40 | Full Slack reconstruction — reads every message, thread, and profile | `/incident` |
| `vault-librarian` | 25 | Deep vault maintenance — orphan detection, broken links, stale notes | `/audit` |
| `vault-migrator` | 50 | Classifies, transforms, and migrates content from a source vault | `/upgrade` |

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
| `prompts` | Searching, promoting, and demoting dormant atomic prompt pages | `.claude/skills/prompts/SKILL.md` |
| `strategy` | Searching, promoting, and demoting dormant atomic strategy pages | `.claude/skills/strategy/SKILL.md` |

**Total: 13 skills**

---

## Commands Index

| Command | File | Subagents Called |
|---------|------|-----------------|
| `/open-day` | `rituals/open-day.md` | — |
| `/close-day` | `rituals/close-day.md` | `wins-capture` |
| `/week-prep` | `rituals/week-prep.md` | — |
| `/week-close` | `rituals/week-close.md` | — |
| `/week-cycle` | `rituals/week-cycle.md` | — |
| `/weekly` | `rituals/weekly.md` | `wins-capture` |
| `/brain-dump` | `capture/brain-dump.md` | — |
| `/quick-dump` | `capture/quick-dump.md` | — |
| `/general` | `capture/general.md` | — |
| `/process` | `core/process.md` | — |
| `/distribute` | `core/distribute.md` | — |
| `/1-1` | `capture/1-1.md` | — |
| `/incident` | `capture/incident.md` | `slack-archaeologist`, `contact-importer` |
| `/slack-scan` | `capture/slack-scan.md` | `slack-archaeologist` |
| `/peer-scan` | `capture/peer-scan.md` | — |
| `/brief` | `review/brief.md` | `review-prep` |
| `/self` | `review/self.md` | `review-fact-checker` |
| `/peer` | `review/peer.md` | `review-fact-checker` |
| `/project-create` | `manage/project-create.md` | — |
| `/task-add` | `manage/task-add.md` | — |
| `/task-sync` | `manage/task-sync.md` | — |
| `/audit` | `core/audit.md` | `cross-linker`, `vault-librarian` |
| `/upgrade` | `core/upgrade.md` | `vault-migrator` |
| `/project-archive` | `manage/project-archive.md` | — |
| `/save` | `core/save.md` | — |
| `/onboard` | `core/onboard.md` | — |
| `/humanize` | `humanize.md` | — |
| `/thinking:reset` | `thinking/reset.md` | — |
| `/thinking:eval` | `thinking/eval.md` | — |
| `/thinking:cot` | `thinking/cot.md` | — |

**Total: 30 commands**

---

**Related Files:** `DOMAINS-REGISTRY.md`, `ROUTING-TABLE.md`, `AGENTS-LOGIC.md`, `SKILL-LOGIC.md`
