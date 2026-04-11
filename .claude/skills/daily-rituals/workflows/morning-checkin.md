# Morning Check-in Workflow

Invoked as the final steps of `/standup`, after the existing context-loading flow.

## Steps (appended to /standup)

### 1. Check Active Week

Look for a week file in `plan/` with `status: active`:
```bash
grep -l "status: active" plan/W*.md 2>/dev/null
```

If found, read it and display:
- Week goal
- Committed tasks (Active section)
- Progress: N done / N total

### 2. Check Today's Daily Note

Calculate today's filename: `DD-MM-YY.md` (e.g. `05-04-26.md`).

If it already exists, read and display the morning section.

If it does NOT exist, create it from `templates/daily_template.md`:
- Fill `date` with today
- Fill `week_ref` with active week number (e.g. W14) or null
- Fill inbox count: `ls inbox/raw/ | wc -l`
- Leave Today's Focus empty — ask user

### 3. Ask for Today's Focus

Present the active week's committed tasks (those still `[ ]` or `[/]`), plus any blocked tasks from `dashboards/TASKS.md`.

Ask: "What are your top 1-3 focus areas today?"

### 4. Mark Focus Tasks In Progress

For each selected focus task:
- Update its checkbox to `[/]` in the source project file
- Update its checkbox to `[/]` in the active week file (if it's a committed task)
- Update `dashboards/TASKS.md` accordingly (run `update-tasks` for the changed items)

### 5. Update Daily Note

Fill in the "Today's Focus" section with the selected tasks.
Update the "Week Progress" section with current done/total count.
