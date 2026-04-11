---
description: "Freeform capture mode. Dump anything — conversations, decisions, incidents, wins, thoughts — and I'll route it all to the right notes with proper templates, frontmatter, and wikilinks."
---

Process the following freeform dump. For each distinct piece of information:

1. **Classify** it: decision, incident, 1-on-1 content, win/achievement, architecture, project update, person context, or general work note.
2. **Search first**: Use `qmd vsearch` (or `obsidian search` if QMD unavailable) to check if a related note already exists. Prefer appending to existing notes over creating new ones for small updates.
3. **Preserve original source** — When creating a new note, include the verbatim raw input in a collapsible callout at the bottom:
   ```markdown
   > [!quote]- Original Source
   > [raw input exactly as provided, no formatting changes]
   ```
4. **Create or update** the appropriate note following CLAUDE.md conventions:
   - Correct folder placement (work/01_PROJECTS/, work/03_INCIDENTS/, work/02_1-1/, work/06_ORG/PEOPLE.md, etc.)
   - Full YAML frontmatter with date, description, tags, and type-specific fields
   - All relevant [[wikilinks]] to people, projects, teams, competencies
5. **Update indexes** as needed (work/INDEX.md, work/05_REVIEW/WINS.md, work/06_ORG/PEOPLE.md)
6. **Cross-link**: Ensure every new note links to at least one existing note and is linked FROM at least one existing note.

7. **Cascade updates** — After the primary note is placed, enrich related existing pages:
   - Use `qmd vsearch` to find 3-5 most related existing pages in the target domain + `work/`
   - For each related page:
     - **Wikilink additions**: Add cross-references automatically (low risk, high value)
     - **Content appends**: If new facts supplement an existing page, show the proposed addition to the user for confirmation before writing
     - **Contradiction flags**: If the new content contradicts an existing page, add a non-destructive callout: `> [!warning] Potential contradiction — see [[new note]]`
   - Skip this step if the vault has fewer than 5 notes (not enough context to cascade)

8. **Extract observation categories** — Go beyond just `[action]`:
   - `[action]` → Create task in the relevant project or AD_HOC_TASKS.md
   - `[decision]` → Create or update a decision record in work/INDEX.md Decisions Log
   - `[question]` → Add to "Open Questions" in the relevant domain INDEX.md or work/INDEX.md
   - `[fact]` → Use in cascade step to enrich related existing pages
   - `[idea]` → Route to thinking/ or to a domain page with `type: idea`
   - `[insight]` → Add to brain/PATTERNS.md if it's a meta-pattern about how things work
   - `[problem]` + `[solution]` → Pair together in the note; link to existing problem notes if found

After processing everything, provide a summary:
- What was captured and where each piece was filed
- Any new notes created (with paths)
- Any existing notes updated
- Any items you weren't sure how to classify (ask the user)

Content to process:
$ARGUMENTS
