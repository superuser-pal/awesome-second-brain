---
description: Validate an existing skill against the canonical structure and naming conventions.
---

# validate-skill Workflow

## Parameters
- Skill name to validate (user-provided or detected from context)

## Prerequisites
- `.claude/core/system/SKILL-LOGIC.md` must be read before proceeding

## Steps

1. **Read the authoritative source**
   Read `.claude/core/system/SKILL-LOGIC.md`.

2. **Identify the target skill**
   Ask which skill to validate, or detect from context.
   ```bash
   ls .claude/skills/
   ```

3. **Check directory naming**
   Verify the skill directory uses `lower-kebab-case`:
   - PASS: `create-domain`, `daily-rituals`, `obsidian-cli`
   - FAIL: `CreateDomain`, `Daily_Rituals`, `obsidianCli`

4. **Read SKILL.md**
   Read `.claude/skills/[skill-name]/SKILL.md` completely.

5. **Validate YAML frontmatter**

   | Field | Required | Expected |
   |-------|----------|---------|
   | `name` | Yes | `lower-kebab-case`, matches directory |
   | `description` | Yes | Single line with `USE WHEN`, under 1024 chars |

   **Violations:**
   - Multi-line description using `|` → FAIL
   - Missing `USE WHEN` keyword → FAIL
   - Separate `triggers:` or `workflows:` arrays → FAIL (old format)
   - `name:` not matching directory name → FAIL

6. **Validate markdown body**

   Check for required sections:
   - `## Workflow Routing` with a table (columns: Workflow, Trigger, File) → REQUIRED
   - `## Examples` with 2+ concrete examples → REQUIRED

   Check workflow routing table:
   - All workflow names in `kebab-case`
   - All file paths in format `workflows/workflow_name.md`
   - All referenced files actually exist

7. **Check workflow files**
   ```bash
   ls .claude/skills/[skill-name]/workflows/
   ```

   Verify:
   - All files use `kebab-case.md` naming
   - Every file has a corresponding entry in the `## Workflow Routing` table
   - Every routing entry points to an existing file

8. **Check directory structure**
   ```bash
   ls -la .claude/skills/[skill-name]/
   ```

   Verify:
   - `SKILL.md` exists (uppercase)
   - `workflows/` exists
   - No forbidden subdirectories: `tools/`, `context/`, `docs/`, `resources/`, `backups/`

9. **Check registry entry**
   ```bash
   grep "[skill-name]" .claude/core/reference/SYSTEM-INDEX.md
   ```

   - If found → Note the entry. PASS.
   - If not found → Flag as **unregistered** (needs adding to SYSTEM-INDEX.md Skills table). FAIL.

10. **Generate compliance report**

    ```markdown
    ## Skill Validation Report: [skill-name]

    ### Naming
    - [ ] Directory: lower-kebab-case
    - [ ] SKILL.md: uppercase
    - [ ] Workflow files: kebab-case.md

    ### YAML Frontmatter
    - [ ] name: lower-kebab-case matching directory
    - [ ] description: single-line with USE WHEN
    - [ ] description: under 1024 chars
    - [ ] No separate triggers: or workflows: arrays

    ### Markdown Body
    - [ ] ## Workflow Routing section with table
    - [ ] ## Examples section (2+ examples)
    - [ ] All routing entries have matching files

    ### Structure
    - [ ] workflows/ directory exists
    - [ ] No forbidden subdirectories

    ### Registry
    - [ ] Registered in reference/SYSTEM-INDEX.md

    ### Issues Found
    [List issues with suggested fixes]

    ### Result
    [PASS | FAIL — N issues]
    ```

## Validation / Success Criteria
- Report generated covering all 5 check areas
- PASS only if all checklist items are satisfied
- FAIL with issue list and suggested fixes for each failure
