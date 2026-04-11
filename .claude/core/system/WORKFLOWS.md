---
title: PAL Second Brain Workflows System
version: 1.0.0
layer: SYSTEM
purpose: Workflow types, mandatory format, and execution constraints
last_updated: 2026-04-05
---

## 1. Two Workflow Types

| Type | Location | Triggered by |
|------|---------|-------------|
| **Command workflows** | `.claude/commands/[name].md` | User invoking `/[name]` slash command |
| **Skill workflows** | `.claude/skills/[name]/workflows/[file].md` | Claude routing via skill's `SKILL.md` routing table |

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
| Command file | `lower-kebab-case.md` | `vault-audit.md` |
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
| `/standup` | `standup.md` | Morning kickoff — context, tasks, priorities, daily note |
| `/wrap-up` | `wrap-up.md` | Session end — verify notes, indexes, links, suggest improvements |
| `/plan-week` | `plan-week.md` | Weekly planning — committed tasks, weekly file in `plan/` |
| `/close-week` | `close-week.md` | Close week — velocity, consolidate daily notes, archive |
| `/week-cycle` | `week-cycle.md` | Full weekly lifecycle (close + plan in one shot) |
| `/weekly` | `weekly.md` | Weekly synthesis — patterns, North Star alignment, wins |
| `/dump` | `dump.md` | All-in-one capture: raw → classify → route |
| `/capture` | `capture.md` | Stage 1 — raw capture to `inbox/raw/` |
| `/process` | `process.md` | Stage 2 — frontmatter + domain classification |
| `/distribute` | `distribute.md` | Stage 3 — route to domain, add wikilinks, update indexes |
| `/capture-1on1` | `capture-1on1.md` | Structured 1:1 capture |
| `/incident-capture` | `incident-capture.md` | Incident from Slack into structured vault note |
| `/slack-scan` | `slack-scan.md` | Deep scan Slack for evidence |
| `/peer-scan` | `peer-scan.md` | Deep scan a peer's GitHub PRs |
| `/review-brief` | `review-brief.md` | Generate review brief (manager or peer) |
| `/self-review` | `self-review.md` | Write self-assessment |
| `/review-peer` | `review-peer.md` | Write peer review |
| `/create-project` | `create-project.md` | New domain project |
| `/sync-tasks` | `sync-tasks.md` | Aggregate tasks to `dashboards/TASKS.md` |
| `/vault-audit` | `vault-audit.md` | Audit indexes, links, orphans |
| `/vault-upgrade` | `vault-upgrade.md` | Import content from existing vault |
| `/project-archive` | `project-archive.md` | Archive completed project |
| `/humanize` | `humanize.md` | Voice-calibrated editing |

---

**Related Files:** `SKILL-LOGIC.md`, `ORCHESTRATION.md`, `ARCHITECTURE.md`
