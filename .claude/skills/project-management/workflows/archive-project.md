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
completion_date: YYYY-MM-DD
last_updated: YYYY-MM-DD
```

Add deprecation header below frontmatter:
```markdown
> [!note] Archived [YYYY-MM-DD]
> **Reason**: [reason]
> **Original location**: `domains/[name]/01_PROJECTS/PROJECT_[NAME].md`
```

### 5. Move the File

Ensure destination folder exists, then move:
```bash
mkdir -p brain/MASTER_ARCHIVE/projects
git mv domains/[name]/01_PROJECTS/PROJECT_[NAME].md brain/MASTER_ARCHIVE/projects/PROJECT_[NAME].md
```

### 6. Capture Wins & Evidence

Read the archived project file. Scan for completed tasks (`[x]`), shipped features, and key decisions.

Ask: *"Any wins or evidence worth adding to your review files from this project?"*

If the user confirms (or if there are clear wins):
- Append entries to `work/05_REVIEW/WINS.md` under the current quarter section, linking back to the archived project:
  ```markdown
  - [Win title] — [[brain/MASTER_ARCHIVE/projects/PROJECT_[NAME]]] (Impact / Collaboration / Technical Growth)
  ```
- If the project had strong outcomes (shipped, significant decisions led, cross-team impact), also add a summary to `work/05_REVIEW/EVIDENCE.md` under the relevant period section.

If `work/05_REVIEW/WINS.md` has no section for the current quarter yet, create one:
```markdown
## Q[N] YYYY
```

Only write entries the user explicitly approves. Skip if the project was cancelled with no notable output.

### 7. Update Domain INDEX.md

Remove from the Projects section. Add to an Archive section:
```
- [[PROJECT_[NAME]]] — [goal] *(archived [date])*
```

### 8. Update TASKS.md

Run `pull-tasks` workflow to remove the project's tasks from the dashboard.

### 9. Verify

Confirm no broken wikilinks — Obsidian resolves by filename, so moves generally preserve links.
