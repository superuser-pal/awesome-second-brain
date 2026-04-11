---
description: Add a new workflow or update an existing skill without breaking its structure.
---

# update-skill Workflow

## Parameters
- Skill name to update
- What to add or change (new workflow, updated description, routing table fix)

## Prerequisites
- Target skill must already exist in `.claude/skills/`

## Steps

1. **Read the target skill**
   Read `.claude/skills/[skill-name]/SKILL.md` and list existing workflows:
   ```bash
   ls .claude/skills/[skill-name]/workflows/
   ```

2. **Identify the update type**

   | Update | Action |
   |--------|--------|
   | Add a new workflow | Create workflow file + add row to routing table |
   | Update USE WHEN triggers | Edit `description` field in SKILL.md frontmatter |
   | Fix routing table | Update file paths or trigger descriptions |
   | Update workflow steps | Edit the specific workflow file |

3. **Make the change**

   **Adding a workflow:**
   - Create `.claude/skills/[skill-name]/workflows/[workflow_name].md` (kebab-case)
   - Add a row to the `## Workflow Routing` table in SKILL.md
   - Row format: `| \`workflow_name\` | "trigger phrase" | \`workflows/workflow_name.md\` |`

   **Updating description:**
   - Edit the `description:` field — keep it a single line with USE WHEN
   - Stay under 1024 characters

4. **Verify routing table consistency**
   After any change, confirm:
   - Every file in `workflows/` has a routing table entry
   - Every routing table entry has a corresponding file
   - No broken references

5. **Run validate-skill**
   Invoke `validate-skill` workflow on the updated skill to confirm it still passes.

## Validation / Success Criteria
- SKILL.md updated correctly (single-line description, valid routing table)
- New workflow file exists and follows kebab-case naming
- Routing table is consistent (no orphan entries, no missing files)
- validate-skill passes after the update
