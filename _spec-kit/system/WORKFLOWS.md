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

> For the full command index, see `.claude/core/reference/SYSTEM-INDEX.md`.

**Related Files:** `SKILL-LOGIC.md`, `ORCHESTRATION.md`, `ARCHITECTURE.md` (all in `_spec-kit/system/`)
