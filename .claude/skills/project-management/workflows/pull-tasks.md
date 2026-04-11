# Pull Tasks Workflow

Aggregate tasks from all project sources into `dashboards/TASKS.md`.

## Trigger

"pull tasks", "sync tasks", "aggregate tasks", "show tasks", `/sync-tasks pull`

## Sources to Scan

1. **Domain projects**: `domains/*/01_PROJECTS/PROJECT_*.md`
2. **Ad-hoc tasks**: `domains/*/01_PROJECTS/AD_HOC_TASKS.md` and `work/01_PROJECTS/AD_HOC_TASKS.md`
3. **Cross-domain work**: `work/01_PROJECTS/*.md`
4. **Plan files**: `plan/*.md` (all active daily/weekly plans)

## Steps

### 1. Discover All Projects

```bash
find domains/ \( -name "PROJECT_*.md" -o -name "AD_HOC_TASKS.md" \) -not -path "*/05_ARCHIVE/*"
```

Also list `work/01_PROJECTS/*.md` and `plan/*.md` (excluding `plan/archive/*`).

### 2. Extract Tasks Per Source

For each project file, extract:
- Active tasks: lines matching `- [ ]`, `- [/]`
- Inactive tasks: lines matching `- [!]`, `- [?]`, `- [I]`, `- [-]`
- Done tasks: lines matching `- [x]` (recent only — last 7 days by `last_updated`)

Tag each task with its source: `#Domain/ProjectName` or `#work/01_PROJECTS/filename`.

### 3. Build TASKS.md

Write to `dashboards/TASKS.md` using this structure:

```markdown
---
last_pulled: [YYYY-MM-DD HH:MM]
last_updated: [YYYY-MM-DD HH:MM]
domains_scanned: [list]
total_projects: N
total_tasks: N
open_tasks: N
in_progress_tasks: N
blocked_tasks: N
---

# Tasks Dashboard

> Last pulled: [date] | [N] projects | [N] open tasks

## Alerts
[list any blocked or stale items]

## By Domain

### [Domain Name]

**[Project Name]** `#Domain/ProjectName`
- [/] Task in progress
- [ ] Task to do
- [!] Blocked task

### work/01_PROJECTS/

**[Note Name]**
- [ ] Task from cross-domain note

## Done (recent)
[x] tasks completed in last 7 days

---
*Pull with `/sync-tasks` | Update with `/sync-tasks push`*
```

### 4. Report

Show summary: N domains scanned, N projects found, N open tasks, N blocked.
