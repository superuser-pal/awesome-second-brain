---
name: project-management
description: Create, track, and archive projects across domains. Aggregates tasks from all sources (projects, ad-hoc files, plan notes) into dashboards/TASKS.md with bidirectional sync back to source files.
version: 1.0.0
---

# Project Management Skill

Centralized project and task management across PAL Second Brain domains. Complements the existing `/project-archive` command (which handles `work/01_PROJECTS/` cross-domain work) by managing domain-scoped projects in `domains/*/01_PROJECTS/`.

## USE WHEN

- Create a new project in a domain
- List or review all projects (dashboard)
- Pull tasks from all sources into TASKS.md
- Sync TASKS.md changes back to source files
- Archive a domain-scoped project

## Workflows

| Workflow | Trigger phrases |
|----------|----------------|
| `project-create` | "create project", "new project", "start project" |
| `task-sync` | "pull tasks", "sync tasks", "aggregate tasks", "show tasks" |
| `update-tasks` | "update tasks", "push tasks", "sync back", "update projects" |
| `project_dashboard` | "project dashboard", "list projects", "project status", "show projects" |
| `archive-project` | "archive project", "close project", "complete project" |

## File Paths

| Type | Path |
|------|------|
| Ad-hoc tasks | `domains/[name]/01_PROJECTS/AD_HOC_TASKS.md` or `work/01_PROJECTS/AD_HOC_TASKS.md` |
| Master task list | `dashboards/TASKS.md` |
| Plan files | `plan/*.md` |
| Domain archive | `domains/[name]/05_ARCHIVE/PROJECT_*.md` |
| Domain index | `domains/[name]/INDEX.md` |

## Task Status Symbols

| Symbol | Status |
|--------|--------|
| `[ ]` | To Do |
| `[/]` | In Progress |
| `[!]` | Blocked |
| `[?]` | Paused |
| `[I]` | Backlog |
| `[-]` | Not Doing |
| `[x]` | Done |

## Relationship to Existing Commands

- `/project-archive` — handles `work/01_PROJECTS/` cross-domain work. Do NOT use this skill to archive those.
- `Work Dashboard.base` — dynamic Obsidian Base view of projects. TASKS.md is the text-based complement for task-level tracking.
- `/standup` — reads TASKS.md as part of context loading.
