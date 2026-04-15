# Create Project Workflow

Create a new project file in a domain.

## Trigger

"create project", "new project", "start project", `/project-create`

## Steps

### 1. Select Domain

List available domains:
```bash
ls domains/
```
Ask user which domain this project belongs to. If none exist yet, offer to create one with the `create-domain` skill.

### 2. Gather Project Info

Collect from user:
- **Name** — short identifier, will become `PROJECT_[NAME].md` in UPPER_SNAKE_CASE
- **Goal** — one sentence describing the objective
- **Priority** — low | medium | high | critical (default: medium)
- **Initial tasks** — optional list of first tasks
- **Deadline** — optional target date

### 3. Create Project File

Write to `domains/[name]/01_PROJECTS/PROJECT_[NAME].md` using the project template from `templates/project_template.md`. (Note: Ensure the target folder is `01_PROJECTS` as per the system manifest).

Also, check if `domains/[name]/01_PROJECTS/AD_HOC_TASKS.md` exists. If not, create it:
```markdown
# Ad-hoc Tasks: [Domain Name]

Tasks not associated with a specific project in this domain.

## Active
- [ ] 
```

Fill project frontmatter:
```yaml
name: PROJECT_[NAME]
domain: [domain-name]
goal: "[goal text]"
status: planning
priority: [priority]
due_date:              # optional — ask user if they have a target date
completion_date:       # leave blank; set on archive
tags: []
created: [today YYYY-MM-DD]
last_updated: [today YYYY-MM-DD]
```

All open tasks in the `### To Do` section must include the `#todo` tag:
```markdown
### To Do
- [ ] Task description #todo

### In Progress

### Done
```

### 4. Update Domain INDEX.md

Open `domains/[name]/INDEX.md` and add the project to the Projects section:
```
- [[PROJECT_[NAME]]] — [goal text]
```

### 5. Update TASKS.md

Run `pull-tasks` workflow to include the new project in `dashboards/TASKS.md`.

### 6. Confirm

Report the created file path and the first tasks added.
