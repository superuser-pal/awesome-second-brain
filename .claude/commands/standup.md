---
description: "Morning kickoff. Load today's context, review yesterday, surface open tasks, identify priorities, and create today's daily note in plan/."
---

Run the morning standup:

1. Read `dashboards/HOME.md` for current dashboard state
2. Read `brain/NORTH_STAR.md` for current goals
3. Check `work/INDEX.md` for active projects
4. Read yesterday's and today's daily notes if they exist: `obsidian daily:read`
5. List open tasks: `obsidian tasks daily todo`
6. Check recent git activity: `git log --oneline --since="24 hours ago" --no-merges`
7. Check for any unlinked notes or inbox items needing processing

Present a structured standup summary:
- **Yesterday**: What got done (from git log and daily note)
- **Active Work**: Current projects in work/01_PROJECTS/ with their status
- **Open Tasks**: Pending items
- **North Star Alignment**: How active work maps to current goals
- **Suggested Focus**: What to prioritize today based on goals + open items

Keep it concise. This is a quick orientation, not a deep dive.

---

## Daily Note (morning-checkin)

After the standup summary, run the `morning-checkin` workflow from the `daily-rituals` skill:

8. Check for an active week in `plan/` (show week goal + progress if found)
9. Check if today's daily note exists (`plan/DD-MM-YY-XX.md`) — create from template if not
10. Ask for today's top 1-3 focus areas
11. Mark selected tasks `[/]` in source project files and active week file
12. Fill "Today's Focus" section in the daily note
