---
title: PAL Second Brain Skills System
version: 1.0.0
layer: SYSTEM
purpose: Skill structure, SKILL.md format, and invocation rules
last_updated: 2026-04-05
---

## 1. Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Skill directory | `kebab-case` | `create-domain/` |
| `SKILL.md` | `UPPER_SNAKE_CASE.md` | `SKILL.md` |
| Workflow files | `kebab-case.md` | `create-domain.md` |
| Reference files | `kebab-case.md` | `callout-types.md` |
| `name:` YAML field | `kebab-case` | `name: create-domain` |

---

## 2. Directory Structure (Max 2 Levels)

```text
.claude/skills/[skill-name]/
├── SKILL.md                    # Required — entry point and routing table
├── workflows/                  # Optional — one file per workflow
│   └── workflow-name.md
└── references/                 # Optional — reference docs, examples, specs
    └── reference-name.md
```

No `tools/`, `context/`, or `docs/` subdirectories. Flat hierarchy only.

---

## 3. Required SKILL.md Format

Every `SKILL.md` has exactly two parts:

### Part 1: YAML Frontmatter

```yaml
---
name: skill-name
description: [What it does]. USE WHEN [intent triggers using OR]. [Additional capabilities].
---
```

- `name` MUST match the directory name.
- `description` MUST contain `USE WHEN` and stay under 1024 characters.
- No separate arrays for triggers or workflows in frontmatter.

### Part 2: Markdown Body

```markdown
# Skill Name
Brief description.

## Workflow Routing
| Workflow | Trigger | File |
|----------|---------|------|
| workflow-name | when to use this | `workflows/workflow-name.md` |

## Examples
2–3 concrete examples showing input, matched workflow, and expected output.
```

---

## 4. Invocation

Skills are invoked via the Skill tool. Claude matches user intent against the `USE WHEN` clause in `description` — conceptual matching, not keyword matching.

When a skill is matched:
1. Claude loads `SKILL.md` to get the workflow routing table.
2. Claude selects the workflow file matching the sub-intent.
3. Claude executes the workflow per `WORKFLOWS.md` rules.

---

## 5. Current Skills

| Skill | Purpose |
|-------|---------|
| `obsidian-markdown` | Obsidian-flavored markdown — wikilinks, callouts, embeds, properties |
| `obsidian-cli` | CLI commands for vault operations (when Obsidian is running) |
| `obsidian-bases` | Create and edit `.base` files with views, filters, and formulas |
| `json-canvas` | Create and edit `.canvas` files with nodes and edges |
| `defuddle` | Extract clean markdown from web pages |
| `qmd` | Semantic vault search — use proactively before reading files |
| `project-management` | Create, track, and archive domain-scoped projects |
| `daily-rituals` | Daily and weekly planning cycle workflows |
| `create-agent` | Create and validate Domain Agents |
| `create-domain` | Create, validate, map, and archive domains |
| `prompts` | Search, promote, and demote atomic prompt pages |
| `strategy` | Search, promote, and demote reasoning strategy pages |

---

## 6. Frontmatter-First Convention

When listing or filtering vault notes, NEVER read full file contents. Always grep YAML frontmatter:

```bash
# Correct — grep frontmatter only
grep -l "status: active" domains/*/01_PROJECTS/PROJECT_*.md | while read f; do grep -m5 "^status:\|^domain:\|^name:" "$f"; done

# Wrong — reading full files
cat domains/*/01_PROJECTS/PROJECT_*.md
```

---

**Related Files:** `ARCHITECTURE.md`, `WORKFLOWS.md`, `ORCHESTRATION.md`
