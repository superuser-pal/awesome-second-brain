---
description: "Quick task capture. Add a task without needing to know which project or domain it belongs to — the system routes it to the right place."
---

Create a task from the following input.

1. **Parse the task** — extract the action item from the user's text. Keep it concise but complete.

2. **Route to the best location**:
   - Use `qmd vsearch` (or `obsidian search`) to find if an existing project matches the task's context
   - **If obvious project match**: append the task to that project file (e.g., `domains/[Name]/01_PROJECTS/PROJECT_*.md` or `work/01_PROJECTS/PROJECT_*.md`)
   - **If domain match but no project**: append to `domains/[Name]/01_PROJECTS/AD_HOC_TASKS.md` (create it if it doesn't exist, using standard frontmatter)
   - **If cross-domain or no match**: append to `work/01_PROJECTS/AD_HOC_TASKS.md`

3. **Format the task** as a checkbox line:
   ```
   - [ ] Task description
   ```
   If the user mentioned a deadline, include it: `- [ ] Task description (due YYYY-MM-DD)`

4. **Update dashboards/TASKS.md** — add the task to the appropriate section so it's immediately visible without needing `/sync-tasks`.

5. **Report** briefly:
   - Task text
   - Where it was added
   - "View all tasks: [[TASKS]]"

Task to create:
$ARGUMENTS
