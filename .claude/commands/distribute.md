---
description: "Stage 3 distribution. Route processed notes from inbox/ready/ to their domain folders, add wikilinks, and update domain indexes."
---

Distribute all processed notes from `inbox/ready/` to their final domain locations.

For each `.md` file in `inbox/ready/`:

1. **Read frontmatter** — Extract `domain`, `type`, `name`, and `project` fields.

2. **Validate domain exists** — Check that `domains/[domain]/` exists. If not, ask user to create it first.

3. **Determine destination folder** within the domain:
   - Default: `domains/[domain]/02_PAGES/`
   - If `type` is belief, frame, lesson, model, or goal and the domain has relevant memory files: offer to append to existing memory file instead of creating a new page
   - If `project` field is set: link from the project file

4. **Search for duplicates** — Use `qmd vsearch` (or `obsidian search` if QMD unavailable) to check if a similar note already exists in the target domain. If found, offer to merge instead of creating a new file.

5. **Present routing plan** to user before executing:
   ```
   inbox/ready/[filename] -> domains/[domain]/02_PAGES/[filename]
   ```
   Wait for user confirmation.

6. **On confirmation, move the file**:
   ```bash
   git mv inbox/ready/[filename] domains/[domain]/02_PAGES/[filename]
   ```

7. **Add wikilinks**:
   - Add `[[domains/[domain]/INDEX|[domain]]]` link to the note's `## Related` section
   - If the note mentions people, projects, or concepts that exist as vault notes, add those wikilinks too
   - Update the domain's INDEX.md if significant (new project reference, key knowledge)

8. **Update frontmatter status**: Change `status: ready` to `status: processed`.

9. **Extract actions** — If the note contains `[action]` observations, offer to create tasks in the relevant project file or the domain's pages.

10. **Cascade updates** — After placing the note, find related pages and enrich them:
    - Use `qmd vsearch` to find 3-5 related existing pages in the target domain + `work/`
    - Add wikilinks to related pages automatically
    - For content appends or contradiction flags, show proposed changes to user for confirmation
    - Skip if the vault has fewer than 5 notes

11. **Report** for each note:
    - Source path -> Destination path
    - Wikilinks added
    - Actions extracted (if any)
    - INDEX.md updated (if applicable)

After distributing all notes, show summary of what moved where.
