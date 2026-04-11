# Weekly Planning Workflow

Invoked by `/plan-week`. Creates a weekly plan file, selects committed tasks, and activates the week.

## Steps

### 1. Check for Active Week

Scan `plan/` for any file with `status: active`:
```bash
grep -l "status: active" plan/W*.md 2>/dev/null
```

If one exists, warn:
> "Week W[x] is still active. Close it first with `/close-week`, or continue planning without closing?"

### 2. Calculate Week Dates

From today's date:
- ISO week number (e.g. 14)
- Week start (Monday) and end (Sunday)
- Year

### 3. Set Week Goal

Ask: "What's the one-sentence goal for this week?" (theme, not a task list)

### 4. Select Committed Tasks

Read `dashboards/TASKS.md` — show all open tasks (`[ ]`, `[!]`, `[?]`) grouped by domain/project.

Ask user to select 3-7 tasks to commit to this week.

If user selects > 7, warn: "More than 7 tasks risks overcommitment. Proceed?"

Optionally collect stretch goals (tasks to attempt if time allows).

### 5. Create Week File

Write `plan/W[week]_YYYY-MM-DD.md` from `templates/week_template.md`.

Fill:
- `week_number`, `year`, `start_date`, `end_date`
- `week_goal`
- `planned_capacity`: count of committed tasks
- `status: planning`

Populate "Committed Tasks — Active" section with selected tasks.

### 6. Activate Week

Ask: "Activate this week now?"

If yes:
- Set `status: active` in week file
- Mark each committed task `[/]` in its source project file
- Run `update-tasks` to sync to `dashboards/TASKS.md`

### 7. Confirm

Report: Week W[x] created with [N] committed tasks and goal: "[goal]".
