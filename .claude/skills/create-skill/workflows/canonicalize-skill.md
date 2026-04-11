---
description: Fix a skill that deviates from canonical structure — rename files, fix frontmatter, repair routing table.
---

# canonicalize-skill Workflow

## Parameters
- Skill name to canonicalize
- (Optional) specific issues to fix — or run a full audit

## Prerequisites
- Run `validate-skill` first to get the issue list before attempting fixes

## Steps

1. **Run validate-skill**
   Execute the `validate-skill` workflow on the target skill to produce a full issue list.

2. **Fix directory naming** (if needed)
   If the directory is not `lower-kebab-case`:
   ```bash
   git mv .claude/skills/[OldName]/ .claude/skills/[new-name]/
   ```
   Update any references in CLAUDE.md or SYSTEM-INDEX.md.

3. **Fix workflow file naming** (if needed)
   For each workflow file not in `kebab-case`:
   ```bash
   git mv .claude/skills/[name]/workflows/[OldName].md .claude/skills/[name]/workflows/[new_name].md
   ```
   Update the `## Workflow Routing` table in SKILL.md to match.

4. **Fix SKILL.md frontmatter** (if needed)

   | Issue | Fix |
   |-------|-----|
   | Multi-line description | Collapse to single line |
   | Missing USE WHEN | Add `USE WHEN [triggers]` to description |
   | Separate `triggers:` array | Remove — embed triggers in `description` |
   | `name:` mismatch | Update to match directory name (lower-kebab-case) |
   | Description over 1024 chars | Trim to core intent + USE WHEN |

5. **Fix markdown body** (if needed)

   | Issue | Fix |
   |-------|-----|
   | Missing `## Workflow Routing` | Add section with table |
   | Missing `## Examples` | Add 2 concrete examples |
   | Routing table missing entries | Add rows for orphan workflow files |
   | Routing table has broken paths | Fix file paths to match actual files |

6. **Remove forbidden subdirectories** (if found)
   If `tools/`, `context/`, `docs/`, `resources/`, or `backups/` subdirectories exist:
   - Move any content to the skill root or workflows/
   - Remove the subdirectory

7. **Fix registry entry** (if missing)
   If the skill is not registered in `reference/SYSTEM-INDEX.md`:
   - Add a row to the Skills table
   - Update the total count

8. **Re-run validate-skill**
   Confirm all issues are resolved. All checklist items should now be PASS.

## Validation / Success Criteria
- All renames use `git mv` (zero data loss)
- validate-skill produces PASS after canonicalization
- No forbidden subdirectories remain
- Skill registered in SYSTEM-INDEX.md
