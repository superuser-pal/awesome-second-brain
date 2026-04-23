---
description: "Stage 3 distribution. Promote processed notes from inbox/ready/ to permanent pages in domain or work folders. Supports simple promotion, split into multiple pages, and absorb into existing pages."
---

Promote all processed notes from `inbox/ready/` to their final locations as permanent **pages**.

For each `.md` file in `inbox/ready/`:

1. **Read frontmatter** — Extract `domain`, `type`, `name`, and `project` fields.

2. **Validate domain exists** — Check that `domains/[domain]/` exists. If domain is missing or `domain: work` (cross-domain), route to `work/04_PAGES/` instead. If domain does not exist and is not "work", ask user to create it first.

   Use the user context loaded at session start (from USER.md) to determine whether ambiguous content is work-related vs domain-specific. If content is professional/work-related and no domain clearly fits, offer `work/04_PAGES/` as the default.

3. **Determine destination**:
   - Default: `domains/[domain]/02_PAGES/` (or `work/04_PAGES/` for cross-domain content)
   - If `type` is belief, frame, lesson, model, or goal and the domain has relevant memory files: offer to append to existing memory file instead of creating a new page
   - If `project` field is set: link from the project file after placement
   - **If `type: 1-1`**: route to `work/02_1-1/` using the per-person accumulating pattern — see step 3a below.
   - **For domain pages**: apply steps 3b and 3c to assign a navigation type and sub-folder route.

   **3b. Assign navigation `type` from content analysis**

   If the note is routing to a domain (not `work/`), assign one of the six navigation type values by content analysis:

   | Signals | `type` |
   |---|---|
   | "we decided", rationale, trade-offs, outcome | `decision` |
   | reference material, external source, processed URL | `source` |
   | idea, framework, mental model, definition | `concept` |
   | AI brief, synthesis, session output, generated report | `output` |
   | filed question, answered query, Q&A | `question` |
   | audit, analysis, health check, status report | `report` |

   If the note already has a valid navigation type set by `/process`, use it (the AI may refine it if the content analysis strongly suggests otherwise). Non-navigation types (`goal | plan | research | idea | meeting`) pass through unchanged and land flat in `02_PAGES/`.

   **3c. Route to typed sub-folder (if exists)**

   Map the assigned `type` to its plural folder name:

   | `type` | Sub-folder |
   |---|---|
   | `concept` | `concepts/` |
   | `source` | `sources/` |
   | `decision` | `decisions/` |
   | `output` | `outputs/` |
   | `question` | `questions/` |
   | `report` | `reports/` |

   - If `domains/[domain]/02_PAGES/{type_plural}/` **exists** → route there.
   - If it **does not exist** → land flat in `domains/[domain]/02_PAGES/` (sub-folder emerges later via `/audit` cluster detection).
   - Non-navigation types always land flat in `02_PAGES/`.

   **3a. 1:1 routing (accumulating file pattern)**

   1-1 notes do NOT create a new file per meeting. Instead:

   a. Extract `person` field from frontmatter (e.g., `"Babis Pagonis"`).
   b. Check if `work/02_1-1/[Person].md` already exists.
   c. If the file **exists** — absorb mode:
      - Extract the meeting date and topic from the note content
      - Prepend a new `### [date] — [topic]` section immediately after `## Meetings` heading
      - Update `## Latest Summary` with the new meeting context
      - Update the `date` frontmatter field to the new meeting date
      - Update `description` frontmatter with a fresh ~150-char rolling summary
      - Mark source note `status: processed`
      - Archive source to `brain/MASTER_ARCHIVE/` and log to `brain/INGEST_LOG.md` with destination `[[work/02_1-1/[Person]|[Person]]] ([date] section)`
      - Skip the file-move steps (file already exists at destination)
   d. If the file **does not exist** — create mode:
      - Create `work/02_1-1/[Person].md` using the 1:1 Note schema from ASSET-CLASSES.md
      - Structure: `## Latest Summary` + `## Meetings` with the first `### [date] — [topic]` section + `## Related` with PEOPLE.md wikilink
      - Proceed with normal archive + log steps

4. **Check for split-worthy content** — Scan the note for 3+ independent H2 sections or clearly unrelated topic blocks. Only offer to split if each topic is independently page-worthy (self-contained, atomic, useful on its own without the others). Tightly related sections that build on each other should stay as one page.

   If split-worthy topics detected, present:
   ```
   This note covers [N] independent topics — each could be its own page:
     1. [Topic A] → suggested page: `topic-a.md`
     2. [Topic B] → suggested page: `topic-b.md`
     3. [Topic C] → suggested page: `topic-c.md`

   Options:
     a) Split into [N] separate pages (recommended — preserves atomicity)
     b) Promote as a single page
     c) Manually choose which sections go to which pages
   ```

   If split confirmed:
   - Create each page in the destination folder with proper frontmatter
   - Add `synthesized-from: ["[[original-note-name]]"]` to each page's frontmatter
   - Add bidirectional `## Related` cross-links between all split pages
   - Mark source note `status: processed` — do NOT delete (zero data loss)
   - Skip steps 6–8 (movement already handled per page)

5. **Search for duplicates** — Use `qmd vsearch` (or `obsidian search` if QMD unavailable) to check if a closely related page already exists in the target domain.

   If a duplicate is found, present explicitly:
   ```
   Similar page found: [[existing-page-name]]

   Options:
     a) Absorb — append new content to the existing page
     b) Create a new linked page
     c) Skip this note
   ```

   If absorb confirmed:
   - Show the user what content will be appended and which section it goes under
   - Use `obsidian append` to add the content
   - Add a `## Related` backlink in the existing page to the source note
   - Mark source note `status: processed`
   - Skip steps 6–8

6. **Present routing plan** to user before executing:
   ```
   inbox/ready/[filename] (note) → domains/[domain]/02_PAGES/[sub-folder/][filename] (page)
   type: [assigned-type] | sub-folder: [concepts/ | flat]
   ```
   Wait for user confirmation.

7. **On confirmation, promote and archive**:

   a. **Copy source to archive** — preserve the processed note as provenance:
      ```bash
      cp inbox/ready/[filename] brain/MASTER_ARCHIVE/[filename]
      ```
      Add `distributed_to` and `distributed_at` fields to the archive copy's frontmatter.

   b. **Move file to destination** — this is when the note becomes a page:
      ```bash
      git mv inbox/ready/[filename] domains/[domain]/02_PAGES/[filename]
      ```
      (or `work/04_PAGES/[filename]`, `work/02_1-1/`, `work/03_INCIDENTS/` as appropriate)

   c. **Log to ingest log** — prepend a new row (newest first) to the table in `brain/INGEST_LOG.md`:
      ```
      | [date] | [type] | [domain] | [source filename] | [[destination|Display Name]] | |
      ```
      The `Notes` column is always left blank — it is reserved for user input only.

8. **Add wikilinks** to the new page:
   - Add `[[domains/[domain]/INDEX|[domain]]]` link to the page's `## Related` section
   - If the page mentions people, projects, or concepts that exist as vault notes, add those wikilinks too
   - Update the domain's INDEX.md if significant (new project reference, key knowledge)

9. **Update frontmatter status**: Change `status: ready` to `status: processed`.

10. **Extract actions** — If the page contains `[action]` observations, offer to create tasks in the relevant project file.

11. **Cascade updates** — After placing the page, find related pages and enrich them:
    - Use `qmd vsearch` to find 3-5 related existing pages in the target domain + `work/`
    - Add wikilinks to related pages automatically (low risk)
    - For content appends or contradiction flags, show proposed changes to user for confirmation
    - Skip if the vault has fewer than 5 notes

12. **Update brain/QUEUE.md** — Set the note's Stage to `distributed`:
    - Find the row matching the note path (may be `inbox/ready/[filename]` or original raw path)
    - Update Stage to `distributed`, update Last touched to today
    - If no row exists, add one now with Stage `distributed`

13. **Report** for each note:
    - Source path (note) → Destination path (page)
    - Promotion type: simple | split | absorb
    - Wikilinks added
    - Actions extracted (if any)
    - INDEX.md updated (if applicable)

After distributing all notes, show summary of what moved where and how (simple, split, or absorb).
