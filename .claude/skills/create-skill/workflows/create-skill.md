---
description: Create a new skill in the PAL Second Brain vault following the canonical flat structure.
---

# create-skill Workflow

## Parameters
- Skill name (user-provided — will be converted to `lower-kebab-case`)
- What the skill does
- What triggers it (USE WHEN intents)
- Which workflows it needs

## Prerequisites
- `.claude/core/system/SKILL-LOGIC.md` must be read before proceeding

## Steps

1. **Read the authoritative source**
   Read `.claude/core/system/SKILL-LOGIC.md` completely before proceeding.

2. **Gather requirements**
   Ask the user:
   - What does this skill do?
   - What should trigger it? (will become the USE WHEN clause)
   - What workflows does it need? (name + trigger for each)

3. **Determine naming**
   Convert user input to canonical conventions:

   | Component | Format | Example |
   |-----------|--------|---------|
   | Skill directory | `lower-kebab-case` | `recipe-manager/` |
   | `SKILL.md` | Always uppercase | `SKILL.md` |
   | Workflow files | `kebab-case.md` | `create_recipe.md` |
   | YAML `name:` | `lower-kebab-case` | `name: recipe-manager` |

   Check the skill directory does not already exist:
   ```bash
   ls .claude/skills/ | grep [skill-name]
   ```

4. **Create the skill directory**
   ```bash
   mkdir -p .claude/skills/[skill-name]/workflows
   ```
   No `tools/` directory — PAL Second Brain skills do not use TypeScript tools.

5. **Create SKILL.md**
   Write `.claude/skills/[skill-name]/SKILL.md`:

   ```markdown
   ---
   name: skill-name
   description: [What it does]. USE WHEN [intent triggers using OR]. [Additional capabilities].
   ---

   # skill-name

   [Brief description — 1-2 sentences]

   ## Workflow Routing

   | Workflow | Trigger | File |
   |----------|---------|------|
   | `workflow_name` | "trigger phrase" | `workflows/workflow_name.md` |

   ## Examples

   **Example 1: [Common use case]**
   ```
   User: "[Typical user request]"
   → Invokes workflow_name
   → [What happens]
   → [What the user gets]
   ```

   **Example 2: [Another use case]**
   ```
   User: "[Different request]"
   → [Process]
   → [Output]
   ```
   ```

   Rules:
   - `description` must be a single line and contain `USE WHEN`
   - `description` must be under 1024 characters
   - No separate `triggers:` or `workflows:` arrays in YAML

6. **Create workflow files**
   For each workflow listed in the routing table:
   - Write `.claude/skills/[skill-name]/workflows/[workflow_name].md`
   - Use the workflow format from `WORKFLOWS.md`: frontmatter description, Parameters, Prerequisites, Steps (numbered), Validation

7. **Verify naming and structure**
   ```bash
   ls .claude/skills/[skill-name]/
   ls .claude/skills/[skill-name]/workflows/
   ```

   Confirm:
   - Directory is `lower-kebab-case`
   - `SKILL.md` is uppercase
   - All workflow files are `kebab-case.md`
   - Routing table entries match actual file names exactly

8. **Register in SYSTEM-INDEX.md**
   Add a new row to the **Skills** table in `.claude/core/reference/SYSTEM-INDEX.md`:

   ```markdown
   | `skill-name` | [USE WHEN summary — 1 line] | `.claude/skills/skill-name/SKILL.md` |
   ```

   Update the skills total count at the bottom of the table.

## Validation / Success Criteria
- `SKILL.md` exists with valid frontmatter (single-line description with USE WHEN, name matches directory)
- `workflows/` directory exists with at least one workflow file
- All workflow routing table entries point to existing files
- `## Examples` section has 2+ examples
- Skill registered in `reference/SYSTEM-INDEX.md`
