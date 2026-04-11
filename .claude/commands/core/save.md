---
description: "Save information to the vault. Give it order and readability without over-formatting — structure content cleanly, preserve the user's voice, and route to the right place."
---

Process the following input and save it to the vault.

**Routing note:** Content saved to `domains/[Name]/02_PAGES/` or `work/04_PAGES/` becomes a permanent **page**. Content saved to `thinking/` is a temporary **note** with `status: thinking` (promote via `/process` when ready).

1. **Read the content** — understand what the user is sharing. Don't over-interpret or add structure that isn't there.

2. **Give it order** — clean up the content so it's readable and well-organized:
   - Fix obvious typos and formatting issues
   - Add light structure (headings, bullets) where it helps readability
   - Preserve the user's voice and phrasing — don't rewrite into formal language
   - Tag with observation categories (`[fact]`, `[decision]`, `[action]`, etc.) only where they naturally fit

3. **Classify** it: decision, incident, 1-on-1 content, win/achievement, architecture, project update, person context, or general work note.

4. **Search first**: Use `qmd vsearch` (or `obsidian search` if QMD unavailable) to check if a related note already exists. Prefer appending to existing notes over creating new ones for small updates.

5. **Create or update** the appropriate note following CLAUDE.md conventions:
   - Correct folder placement (work/01_PROJECTS/, work/03_INCIDENTS/, work/02_1-1/, work/06_ORG/PEOPLE.md, domains/[Name]/02_PAGES/, etc.)
   - Full YAML frontmatter with date, description, tags, and type-specific fields
   - All relevant [[wikilinks]] to people, projects, teams, competencies

6. **Update indexes** as needed (work/INDEX.md, work/05_REVIEW/WINS.md, work/06_ORG/PEOPLE.md)

7. **Cross-link**: Ensure every new page links to at least one existing page or note and is linked FROM at least one existing page.

After processing, provide a brief summary:
- What was captured and where
- Any notes created or updated (with paths)
- Any items you weren't sure how to classify (ask the user)

Content to save:
$ARGUMENTS
