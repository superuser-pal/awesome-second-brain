# Morning Check-in Workflow

Invoked as the final steps of `/open-day`, after the existing context-loading flow.

## Steps (appended to /open-day)

### 1. Check Active Week

Look for a week file in `plan/` with `status: active`:
```bash
grep -l "status: active" plan/W*.md 2>/dev/null
```

If found, read it and display:
- Week goal
- Committed tasks (To Do and In Progress sections)
- Progress: N done / N total

### 2. Check Today's Daily Note

Calculate today's filename: `DD-MM-YY.md` (e.g. `05-04-26.md`).

If it already exists, read and display the morning section.

If it does NOT exist, create it from `templates/daily-template.md`:
- Fill `date` with today
- Fill `week_ref` with active week number (e.g. W14) or null
- Fill inbox count: `ls inbox/raw/ | wc -l`
- Leave Tasks → Open empty — ask user

### 3. Ask for Today's Focus

Present open tasks in this order:
1. `[!]` blocked tasks from `dashboards/TASKS.md` (surface first — these need decisions)
2. `[ ]` To Do tasks from the active week's committed list
3. `[/]` In Progress tasks already underway

Ask: "What are your top 1-3 focus areas today?"

### 4. Mark Focus Tasks In Progress

For each selected focus task:
- Update its checkbox to `[/]` in the source project file — preserve the `#todo` tag
- Update its checkbox to `[/]` in the active week file (if it's a committed task) — preserve the `#todo` tag
- Update `dashboards/TASKS.md` accordingly (run `update-tasks` for the changed items)

### 5. Update Daily Note

Fill in the **Tasks → Open** section with the selected tasks (each as `- [/] task description #todo`).
Leave **Tasks → Closed** empty — it fills during `/close-day`.
Update the **Week Progress** field in the **Check-in** section with current done/total count.
