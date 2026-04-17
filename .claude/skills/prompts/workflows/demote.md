# Workflow: Demote Prompt

Flip a prompt's status back to `dormant` in-place and delete its command stub. The file stays in `docs/prompts/` — no move required.

## Preconditions

- `docs/prompts/<slug>.md` must exist with `status: active`.
- `.claude/commands/prompts/<slug>.md` should exist (warn if missing, continue anyway).

## Steps

1. **Resolve the file**: Find `docs/prompts/<slug>.md`. If not found, report: "No prompt named `<slug>` found. Use the search workflow to confirm the slug."

2. **Check current status**: Read the frontmatter. If `status: dormant` already → report "`<slug>` is already dormant." and stop.

3. **Delete the command stub**:
   ```bash
   rm .claude/commands/prompts/<slug>.md
   ```
   If the stub doesn't exist, warn: "Command stub was missing — continuing demote." Do not abort.

4. **Flip status in-place**: Edit `docs/prompts/<slug>.md` — change `status: active` → `status: dormant`.

5. **Assert post-conditions**:
   - `docs/prompts/<slug>.md` exists with `status: dormant`.
   - `.claude/commands/prompts/<slug>.md` no longer exists.

6. **Refresh QMD index**:
   ```bash
   qmd refresh docs/prompts
   ```
   (Skip silently if QMD not available.)

7. **Report**: "`<slug>` is now dormant. The `/prompts:<slug>` command has been removed."

## Notes

- Demotion is non-destructive: the prompt page is preserved in `docs/prompts/`. Re-promote at any time using the `promote` workflow.
- The `category` frontmatter is unchanged throughout the lifecycle.
