# Workflow: Promote Strategy

Flip a strategy's status to `active` in-place and generate a `/thinking:<slug>` command stub. The file stays in `docs/strategies/` — no move required.

## Preconditions

- `docs/strategies/<slug>.md` must exist with `status: dormant`.
- `.claude/commands/thinking/<slug>.md` must NOT already exist (except for pre-promoted `cot`, `reset`, `eval`).

## Steps

1. **Resolve the file**: Find `docs/strategies/<slug>.md`. If not found, report: "No strategy named `<slug>`. Use the search workflow to find the correct slug."

2. **Safety check**: If `<slug>` is `reset` or `eval` → report: "These are standing commands, not promotable strategies." and stop.

3. **Check current status**: Read the frontmatter. If `status: active` already → report "`<slug>` is already active — inject it with `/thinking:<slug>`." and stop.

4. **Flip status in-place**: Edit `docs/strategies/<slug>.md` — change `status: dormant` → `status: active`.

5. **Read `description` frontmatter** for use in the command stub.

6. **Generate command stub** at `.claude/commands/thinking/<slug>.md`:
   ```markdown
   ---
   description: Inject <description> into the active session.
   ---

   Inject the **<slug>** reasoning strategy into this session.

   ## Steps

   1. Read `docs/strategies/<slug>.md` to load the strategy instructions.
   2. Acknowledge the injection: "<slug> strategy is now active. I'll apply it for the remainder of this session."
   3. Apply the strategy's instruction text to all subsequent reasoning responses.
   4. The strategy remains active until `/thinking:reset` or another strategy is activated.

   > Source: [[docs/strategies/<slug>|<slug>]] · [[docs/strategies/INDEX|Strategies Index]]
   ```

7. **Assert post-conditions**:
   - `docs/strategies/<slug>.md` exists with `status: active`.
   - `.claude/commands/thinking/<slug>.md` exists.

8. **Refresh QMD index**:
   ```bash
   qmd refresh docs/strategies
   ```
   (Skip silently if QMD not available.)

9. **Report**: "`<slug>` is now active. Inject it with `/thinking:<slug>`."

## Notes

- The file is never moved. Status is the only thing that changes.
- Strategy instruction text is NOT copied into the command stub. The stub references the source page.
- Do not generate stubs for `reset`, `eval`, or `cot` — these are standing commands.
