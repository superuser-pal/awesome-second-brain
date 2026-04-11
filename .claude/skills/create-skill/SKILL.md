---
name: create-skill
description: Create and validate vault skills. USE WHEN create skill, new skill, skill structure, validate skill, check skill, update skill, add workflow, canonicalize skill, fix skill structure.
---

# create-skill

Creates and validates skills for the PAL Second Brain vault. Skills live in `.claude/skills/[name]/` and follow the canonical flat structure defined in `SKILL-LOGIC.md`.

## Authoritative Source

Before creating or validating any skill, read:
- `.claude/core/system/SKILL-LOGIC.md` — naming conventions, structure rules, SKILL.md format

## Skill Structure (Quick Reference)

```
.claude/skills/[skill-name]/
├── SKILL.md                    # Required — entry point and routing table
└── workflows/                  # One file per workflow
    └── workflow_name.md
```

**Naming:**
- Directory: `lower-kebab-case`
- `SKILL.md`: uppercase
- Workflow files: `kebab-case.md`
- YAML `name:` field: `lower-kebab-case` (matches directory)

**No `tools/`, `context/`, `docs/`, or `resources/` subdirectories.** Context files live at skill root if needed.

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| `create-skill` | "create skill", "new skill", "build skill" | `workflows/create-skill.md` |
| `validate-skill` | "validate skill", "check skill", "audit skill" | `workflows/validate-skill.md` |
| `update-skill` | "update skill", "add workflow", "modify skill" | `workflows/update-skill.md` |
| `canonicalize-skill` | "canonicalize skill", "fix skill structure", "clean up skill" | `workflows/canonicalize-skill.md` |

## Examples

**Example 1: Create a new skill**
```
User: "Create a skill for managing cooking recipes"
→ Invokes create-skill workflow
→ Reads SKILL-LOGIC.md
→ Creates .claude/skills/recipe-manager/ with SKILL.md + workflows/
→ Generates USE WHEN triggers based on intent
→ Registers in reference/SYSTEM-INDEX.md
```

**Example 2: Validate an existing skill**
```
User: "Validate the daily-rituals skill"
→ Invokes validate-skill workflow
→ Checks naming, frontmatter, workflow routing table, Examples section
→ Checks registration in reference/SYSTEM-INDEX.md
→ Reports compliance with issues and fixes
```

**Example 3: Fix a skill with old structure**
```
User: "Canonicalize the qmd skill"
→ Invokes canonicalize-skill workflow
→ Renames any wrongly-named files
→ Ensures SKILL.md has correct format
→ Verifies workflow routing table is accurate
```
