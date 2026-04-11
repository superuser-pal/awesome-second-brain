# Update Tasks Workflow

Push task status changes from `dashboards/TASKS.md` back to source project files.

## Trigger

"update tasks", "push tasks", "sync back", "update projects", `/sync-tasks push`

## Steps

### 1. Read TASKS.md

Read `dashboards/TASKS.md`. For each task, note:
- Current checkbox symbol
- Source tag (`#Domain/ProjectName` or `#work/01_PROJECTS/filename`)
- Task text

### 2. Read Source Files

For each unique source tag found in TASKS.md, read the corresponding project file.

### 3. Detect Changes

Compare task checkbox symbols between TASKS.md and source files. A change is detected when:
- Symbol in TASKS.md differs from symbol in source file
- Task exists in TASKS.md but not in source (newly added)

### 4. Detect Conflicts

A conflict exists if:
- Source file `last_updated` is newer than TASKS.md `last_pulled`
- AND the same task has different symbols in both

For each conflict, present the user with options:
- **Force update**: use TASKS.md version
- **Skip**: keep source version, discard TASKS.md change
- **Review**: show side-by-side and ask

### 5. Apply Changes

For non-conflicting changes, update the source file:
- Update checkbox symbol in the task line
- Update `last_updated` in frontmatter to today
- If all tasks in a project are `[x]`, suggest changing `status: completed`

### 6. Update TASKS.md Metadata

Update `last_updated` in TASKS.md frontmatter.

### 7. Report

List all files modified and the changes applied. Flag any conflicts that were skipped.
