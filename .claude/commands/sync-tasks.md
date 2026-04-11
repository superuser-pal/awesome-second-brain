---
description: "Sync tasks between dashboards/TASKS.md and domain project files. No args or 'pull' = aggregate tasks. 'push' = push TASKS.md changes back to source files."
---

Sync tasks using the `project-management` skill.

- No argument or `pull`: run the `pull-tasks` workflow — scan all domain projects and work/01_PROJECTS/, output to `dashboards/TASKS.md`.
- `push`: run the `update-tasks` workflow — push checkbox changes from `dashboards/TASKS.md` back to source project files.

$ARGUMENTS
