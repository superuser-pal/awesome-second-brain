# Weekly Closing Workflow

Invoked by `/week-close`. Closes the active week, calculates velocity, consolidates daily notes, and archives.

## Steps

### 1. Load Active Week

Find the active week file in `plan/`:
```bash
grep -l "status: active" plan/W*.md 2>/dev/null
```

If none found, ask user to specify which week to close.

### 2. Calculate Metrics

From the week file:
- `planned_capacity`: committed task count
- `completed_count`: count of `[x]` tasks in Committed Tasks section
- `velocity`: completed_count / planned_capacity (as percentage)

Compare to previous week's velocity if available in `plan/archive/`.

### 3. Present Week Summary

Show:
- Week goal and whether it was met
- Task breakdown: [N] done / [N] planned ([velocity]%)
- Incomplete tasks: list all non-`[x]` committed tasks, grouped by status

### 4. Weekly Synthesis

Run the `weekly-synthesis` workflow to:
- Detect patterns and themes across the week
- Check North Star alignment and drift
- Map competency signals
- Draft forward-looking priorities

### 5. Handle Incomplete Tasks

For each incomplete task, offer these options based on its current status:

| Current status | Options |
|---|---|
| `[ ]` To Do (not started) | Carry forward `[ ]` · Backlog `[I]` · Drop `[-]` · Pause `[?]` |
| `[/]` In Progress | Carry forward `[/]` · Pause `[?]` · Drop `[-]` |
| `[!]` ON_HOLD / Blocked | Carry forward as blocked `[!]` · Reset to `[ ]` if unblocked · Drop `[-]` |
| `[?]` Paused | Carry forward `[?]` · Reset to `[ ]` · Drop `[-]` |

All carried-forward tasks must preserve their `#todo` tag in the source file.

Run `update-tasks` to sync all changes to `dashboards/TASKS.md`.

### 6. Gather Retrospective

Ask (can be brief):
- "What went well this week?"
- "What would you change?"
- "Any action items for how you work?"

### 7. Update Week File

Set in frontmatter:
```yaml
status: closed
closed: YYYY-MM-DD
completed_count: N
velocity: N%
```

Append retrospective to "Retrospective" section.

### 8. Consolidate Daily Notes

Find all daily notes for this week: `plan/[DD-MM-YY]*.md`

For each daily note:
1. Extract the **Close** section (skip if absent — note was morning-only)
2. Append a summary row to the "Daily Progress" table in the week file
3. Extract the **Notes** section content verbatim — preserve for the Daily Notes Log (Step 8b)

Delete each daily note after extracting: `git rm plan/DD-MM-YY*.md`

### 9. Archive Week File

**8a. Filename convention**

Archive filename format is always: `W[week]_YYYY.md` (year only — no date suffix)

```bash
git mv plan/W[week]_YYYY-MM-DD.md plan/archive/W[week]_YYYY.md
```

Example: `plan/W16_2026-04-13.md` → `plan/archive/W16_2026.md`

**8b. Append Daily Notes Log**

After all other sections in the archive file, append a `## Daily Notes Log` section with the raw Notes content from each daily note, exactly as written by the user — no editing, no summarizing:

```markdown
---

## Daily Notes Log

*Raw notes written by the user each day, preserved as written.*

### [Weekday DD Mon]

- note line 1
- note line 2

### [Weekday DD Mon]

*(no notes)*
```

Include every day of the week. Use `*(no notes)*` for days with no Notes content.

**8c. Delete root week file**

After archiving, delete the original root file:
```bash
git rm plan/W[week]_YYYY-MM-DD.md
```

The only remaining copy must be `plan/archive/W[week]_YYYY.md`.

### 10. Confirm

Report: Week W[x] closed. Velocity: [N]%. [N] tasks carried forward, [N] dropped. Archived to `plan/archive/W[week]_YYYY.md`.
