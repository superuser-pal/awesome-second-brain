---
description: "Quick power-user capture. Dump anything — conversations, decisions, incidents, wins, thoughts — and I'll route it all directly to the right notes with templates and links."
---

# Quick Dump

Process the following freeform dump.

## Usage

```
/quick-dump <content>
```

**Routing note:** This command is for high-confidence routing. It bypasses the three-stage inbox pipeline and routes directly to final destinations (domains, work pages, or thinking notes).

For each distinct piece of information:

1. **Classify** it: decision, incident, 1-on-1 content, win/achievement, architecture, project update, person context, or general work note.

2. **Check for split-worthy content** — If the dump covers 3+ independently page-worthy topics (each self-contained and useful on its own), offer to split before routing:
   ```
   This dump covers [N] independent topics:
     1. [Topic A] → suggested page: `topic-a.md`
     2. [Topic B] → suggested page: `topic-b.md`
   Split into separate pages, or route as one?
   ```
   Only split if topics are genuinely separable — not if they build on each other.

3. **Search first**: Use `qmd` semantic search (or `obsidian search`) to check if a related page already exists. Prefer appending to existing pages over creating new ones for small updates.

4. **Preserve original source** — When creating a new page, include the verbatim raw input in a collapsible callout at the bottom:
   ```markdown
   > [!quote]- Original Source
   > [raw input exactly as provided, no formatting changes]
   ```

5. **Create or update** the appropriate page following CLAUDE.md conventions:
   - Correct folder placement: `domains/[Name]/02_PAGES/` or `work/04_PAGES/` → becomes a **page**; `thinking/` → remains a **note** with `status: thinking`
   - Full YAML frontmatter with date, description, tags, and type-specific fields
   - All relevant [[wikilinks]] to people, projects, teams, competencies

6. **Update indexes** as needed (work/INDEX.md, work/05_REVIEW/WINS.md, work/06_ORG/PEOPLE.md)

7. **Cross-link**: Ensure every new page links to at least one existing page or note and is linked FROM at least one existing page.

8. **Cascade updates** — After the primary page is placed, enrich related existing pages:
   - Use `qmd` to find 3-5 most related existing pages.
   - For each related page: wikilink additions, content appends (on confirmation), or contradiction flags.

9. **Extract observation categories**:
   - `[action]` → Create task in project or AD_HOC_TASKS.md
   - `[decision]` → Decisions Log
   - `[question]` → Open Questions
   - `[fact]` → Cascade enrichment
   - `[idea]` → Route to thinking/ or domain page
   - `[insight]` → PATTERNS.md
   - `[problem]` + `[solution]` → Pair in note

After processing everything, provide a summary:
- What was captured and where each piece was filed
- Any new notes created (with paths)
- Any existing notes updated
- Any items you weren't sure how to classify (ask the user)

Content to process:
$ARGUMENTS
