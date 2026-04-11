# Archive Project Workflow

Archive a completed domain-scoped project. For cross-domain `work/01_PROJECTS/` projects, use `/project-archive` instead.

## Trigger

"archive project", "close project", "complete project" (when referring to a domain project in `domains/*/01_PROJECTS/`)

## Steps

### 1. Identify the Project

Ask user which project to archive, or accept project name as argument. Search `domains/*/01_PROJECTS/PROJECT_*.md`.

Confirm with user before proceeding.

### 2. Warn if Not Completed

If project `status` is not `completed` or `cancelled`, warn:
> "This project status is [status]. Archive anyway?"

### 3. Collect Archive Reason

- completed — delivered as planned
- cancelled — no longer relevant
- superseded — replaced by another project
- custom — ask for text

### 4. Update Frontmatter

In the project file, set:
```yaml
status: completed    # or cancelled
last_updated: [today]
```

Add deprecation header below frontmatter:
```markdown
> [!note] Archived [YYYY-MM-DD]
> **Reason**: [reason]
> **Original location**: `domains/[name]/01_PROJECTS/PROJECT_[NAME].md`
```

### 5. Move the File

```bash
git mv domains/[name]/01_PROJECTS/PROJECT_[NAME].md domains/[name]/05_ARCHIVE/PROJECT_[NAME].md
```

### 6. Update Domain INDEX.md

Remove from the Projects section. Add to an Archive section:
```
- [[PROJECT_[NAME]]] — [goal] *(archived [date])*
```

### 7. Update TASKS.md

Run `pull-tasks` to remove the project's tasks from the dashboard.

### 8. Verify

Confirm no broken wikilinks — Obsidian resolves by filename, so moves generally preserve links.
