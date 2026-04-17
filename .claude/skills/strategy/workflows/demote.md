# Workflow: Demote Strategy

Flip a strategy's status back to `dormant` in-place and delete its command stub. The file stays in `docs/strategies/` — no move required.

## Preconditions

- `docs/strategies/<slug>.md` must exist with `status: active`.
- Do not demote `cot` unless the user explicitly confirms — it is the pre-promoted default.

## Steps

1. **Resolve the file**: Find `docs/strategies/<slug>.md`. If not found, report: "No strategy named `<slug>`. Use the search workflow to check the status."

2. **Safety gate for `cot`**: If `<slug>` is `cot`, ask: "CoT is the pre-promoted default strategy. Are you sure you want to demote it? (Y/N)" Do not proceed until user confirms.

3. **Check current status**: Read the frontmatter. If `status: dormant` already → report "`<slug>` is already dormant." and stop.

4. **Delete the command stub**:
   ```bash
   rm .claude/commands/thinking/<slug>.md
   ```
   If the stub doesn't exist (e.g. for `cot`), warn and continue.

5. **Flip status in-place**: Edit `docs/strategies/<slug>.md` — change `status: active` → `status: dormant`.

6. **Assert post-conditions**:
   - `docs/strategies/<slug>.md` exists with `status: dormant`.
   - `.claude/commands/thinking/<slug>.md` no longer exists.

7. **Refresh QMD index**:
   ```bash
   qmd refresh docs/strategies
   ```
   (Skip silently if QMD not available.)

8. **Report**: "`<slug>` is now dormant. The `/thinking:<slug>` command has been removed."

## Notes

- `reset` and `eval` are standing commands (not strategy stubs). Do not demote them — they are always present.
- Demotion is non-destructive: the strategy page is preserved in `docs/strategies/`. Re-promote at any time.
