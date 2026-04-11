---
description: "Weekly planning — select committed tasks, set week goal, create plan/W[x]_YYYY-MM-DD.md. Run at the start of a new week."
---

Run the `weekly-planning` workflow from the `daily-rituals` skill.

1. Check for any active week (warn if exists — close first with `/close-week`)
2. Calculate week number, start date, end date
3. Ask for week goal (one sentence)
4. Show open tasks from `dashboards/TASKS.md` — select 3-7 to commit
5. Create `plan/W[week]_YYYY-MM-DD.md` from the week template
6. Activate week: mark committed tasks `[/]` in source files

$ARGUMENTS
