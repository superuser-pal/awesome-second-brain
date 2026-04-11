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
- Incomplete tasks: list all non-`[x]` committed tasks

### 4. Handle Incomplete Tasks

For each incomplete task, ask:
- **Carry forward** — move to next week's backlog (mark `[ ]` in source)
- **Move to backlog** — mark `[I]` in source
- **Drop** — mark `[-]` in source
- **Pause** — mark `[?]` in source

Run `update-tasks` to sync all changes.

### 5. Gather Retrospective

Ask (can be brief):
- "What went well this week?"
- "What would you change?"
- "Any action items for how you work?"

### 6. Update Week File

Set in frontmatter:
```yaml
status: closed
closed: YYYY-MM-DD
completed_count: N
velocity: N%
```

Append retrospective to "Retrospective" section.

### 7. Consolidate Daily Notes

Find all daily notes for this week: `plan/[DD-MM-YY].md`

For each, extract the Evening Review section (skip if no evening section — note was morning-only).

Append to week file under "Daily Progress":
```markdown
### DD-MM-YY

**Accomplished:** ...
**Learnings:** ...
**Blockers:** ...
```

Delete each daily note after extracting: `git rm plan/DD-MM-YY.md`

### 8. Archive Week File

```bash
git mv plan/W[week]_YYYY-MM-DD.md plan/archive/W[week].md
```

### 9. Confirm

Report: Week W[x] closed. Velocity: [N]%. [N] tasks carried forward, [N] dropped. Archived to `plan/archive/W[week].md`.
