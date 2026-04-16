---
description: "Activate the builder domain agent on a spec-kit feature. Loads constitution + feature files so /spec-kit:plan, /spec-kit:build, /spec-kit:test, /spec-kit:ship run with full context."
---

Activate the `builder` agent.

## Arguments

`$ARGUMENTS` — feature slug or NNN (e.g. `voice-capture` or `001` or `001-voice-capture`).

## Steps

1. **Resolve the feature directory** in `_spec-kit/features/`:
   - If `$ARGUMENTS` matches `NNN-*` exactly → use it.
   - If it matches just `NNN` → find the directory starting with that prefix.
   - If it matches just a slug → find the directory ending with `-<slug>`.
   - If no match → list existing features and ask the user to pick.
   - If `$ARGUMENTS` empty → list existing features.

2. **Load the agent persona** from `.claude/agents/builder.md`.

3. **Follow the activation sequence** from `.claude/core/system/AGENT-BASE.md §1`:
   - Read builder.md completely.
   - Read all `[AUTO]` files listed in its §2 (constitution + all feature files that exist).
   - Index the `[REF]` folders without reading.
   - Display the greeting from builder.md §3.

4. **Stop and wait** for the next user command. Do not proactively run any `/spec-kit:*` command.

## Rules

- Only one feature active at a time. If another builder session is already active, confirm switch.
- Do not preload `[REF]` content. Load on demand.
- If the feature dir is missing any expected files (e.g. plan.md), don't error — just note which phase we're in and wait.
