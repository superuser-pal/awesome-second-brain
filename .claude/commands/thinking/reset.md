---
description: Clear the currently-injected reasoning strategy from the active session. Returns reasoning to default mode.
---

Clear the active reasoning strategy from this session.

## Steps

1. Acknowledge that the strategy has been cleared. State which strategy was active (if known from context), or say "no strategy was active."
2. Confirm that subsequent responses will use default reasoning — no strategy instructions will be applied.
3. If the user wants to re-apply or switch strategies, suggest `/thinking:eval` to find the best active strategy for their current task.

## Notes

- This command does not modify any vault files. It only affects the current session context.
- A "strategy" here means a reasoning strategy page from `docs/strategies/` (with `status: active`) that was previously injected via a `/thinking:<slug>` command.
- Strategy injection is session-scoped — it does not persist across Claude Code sessions automatically.

> Related: [[docs/strategies/INDEX|Strategies Index]] · [[CLAUDE]]
