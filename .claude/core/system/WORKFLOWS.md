---
title: Awesome Second Brain Workflows System
version: 1.0.0
layer: SYSTEM
purpose: Workflow types, mandatory format, and execution constraints
last_updated: 2026-05-01
---

## 1. Two Workflow Types

| Type | Location | Triggered by |
|------|---------|-------------|
| **Command workflows** | `.claude/commands/[name].md` | User invoking `/[name]` slash command |
| **Skill workflows** | `.claude/skills/[name]/workflows/[file].md` | AI Agent routing via skill's `SKILL.md` routing table |

Both types use the same mandatory format.

---

## 2. Mandatory File Format

All workflow files MUST follow this structure:

```markdown
---
description: Short action-oriented description of what this achieves.
---

# Workflow Name

## Parameters
- Expected inputs (user-provided values, context needed).

## Prerequisites
- What must be true before starting (e.g., Obsidian must be running, inbox must have files).

## Steps
1. First distinct action.
2. Second distinct action.
   - 2a. Sub-step if needed.
3. Third distinct action.

## Validation / Success Criteria
- How to determine the workflow completed successfully.
- What outputs should exist when done.
```

---

## 3. Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Command file | `lower-kebab-case.md` | `audit.md` |
| Skill workflow | `kebab-case.md` | `create-domain.md` |
| Workflow names | Verb-led | `create-x`, `archive-y`, `sync-z` |

---

## 4. Execution Constraints

- Execute steps in order. No skipping unless the user explicitly instructs.
- If a step fails: halt, report to the user in plain language, and present numbered recovery options.
- Validate against "Success Criteria" before marking the workflow complete.
- For workflows that create notes: apply all vault rules (frontmatter, wikilinks, correct folder) before finishing.

---

## 5. Command Workflow Index

| Command | File | Purpose |
|---------|------|---------|
| `/open-day` | `rituals/open-day.md` | Morning kickoff — context, tasks, priorities, daily note |
| `/close-day` | `rituals/close-day.md` | Session end — verify notes, indexes, links, suggest improvements |
| `/week-prep` | `rituals/week-prep.md` | Weekly planning — committed tasks, weekly file in `plan/` |
| `/week-close` | `rituals/week-close.md` | Close week — velocity, consolidate daily notes, archive |
| `/week-cycle` | `rituals/week-cycle.md` | Full weekly lifecycle (close + plan in one shot) |
| `/weekly` | `rituals/weekly.md` | Weekly synthesis — patterns, North Star alignment, wins |
| `/brain-dump` | `capture/brain-dump.md` | Reflective capture — atomic extraction with tags |
| `/quick-dump` | `capture/quick-dump.md` | All-in-one capture: raw → classify → route |
| `/general` | `capture/general.md` | Stage 1 — raw capture to `inbox/raw/` |
| `/process` | `core/process.md` | Stage 2 — frontmatter + domain classification |
| `/distribute` | `core/distribute.md` | Stage 3 — route to domain, add wikilinks, update indexes |
| `/ingest-url` | `core/ingest-url.md` | One-command URL ingest: defuddle → process → distribute |
| `/1-1` | `capture/1-1.md` | Structured 1:1 capture |
| `/incident` | `capture/incident.md` | Incident from Slack into structured vault note |
| `/slack-scan` | `capture/slack-scan.md` | Deep scan Slack for evidence |
| `/peer-scan` | `capture/peer-scan.md` | Deep scan a peer's GitHub PRs |
| `/brief` | `review/brief.md` | Generate review brief (manager or peer) |
| `/self` | `review/self.md` | Write self-assessment |
| `/peer` | `review/peer.md` | Write peer review |
| `/project-create` | `manage/project-create.md` | New domain project |
| `/task-sync` | `manage/task-sync.md` | Aggregate tasks to `dashboards/TASKS.md` |
| `/audit` | `core/audit.md` | Audit indexes, links, orphans |
| `/upgrade` | `core/upgrade.md` | Import content from existing vault |
| `/project-archive` | `manage/project-archive.md` | Archive completed project |
| `/ask` | `qmd/ask.md` | Ask a complex question and get a synthesized answer with citations |
| `/search` | `qmd/search.md` | Fast keyword search returning a formatted results table |
| `/context` | `qmd/context.md` | Pull and categorize all context available on a specific topic |
| `/reindex` | `qmd/reindex.md` | Manually refresh QMD vector embeddings and BM25 index |
| `/humanize` | `humanize.md` | Voice-calibrated editing |

---

**Related Files:** `SKILL-LOGIC.md`, `ORCHESTRATION.md`, `ARCHITECTURE.md`
