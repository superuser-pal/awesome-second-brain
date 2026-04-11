---
description: "Stage 2 processing. Scan inbox/raw/ for unprocessed captures, add full frontmatter (domain, type, tags, description), and move to inbox/ready/."
---

Process all unprocessed notes in `inbox/raw/`.

For each `.md` file in `inbox/raw/`:

1. **Read the content** and analyze what it contains.

2. **Detect domain** — Check if content matches any registered domain in CLAUDE.md:
   - High confidence (obvious match): suggest the domain
   - Low confidence (unclear): ask the user to choose or create a new domain
   - If no domains exist yet, ask user to create one first via the create-domain skill

3. **Classify note type** — Determine the `type` field:
   - concept, decision, reference, meeting, idea, note, belief, frame, lesson, model, goal, plan

4. **Generate frontmatter** — Add full YAML frontmatter:
   ```yaml
   ---
   name: "[descriptive_kebab-case_name]"
   domain: "[detected-domain]"
   origin: braindump
   type: "[detected-type]"
   status: ready
   description: "[~150 char summary]"
   tags: []
   created: "[original date from raw note]"
   last_updated: "[today]"
   ---
   ```

5. **Preserve original source** — Before any transformation, capture the entire raw content in a collapsible callout at the bottom of the note:

   ```markdown
   > [!quote]- Original Source
   > [verbatim raw text, exactly as captured, no formatting changes]
   ```

   The processed/transformed content lives above this callout as the main body. The callout is collapsed by default so it doesn't clutter reading, but the original is always available for reference.

6. **Preserve observation categories** — Keep any `[fact]`, `[idea]`, `[decision]`, etc. syntax from the raw capture.

7. **Move to inbox/ready/** — Use `git mv` to move the processed note:
   ```bash
   git mv inbox/raw/[filename] inbox/ready/[filename]
   ```

8. **Report** for each note:
   - Original filename
   - Detected domain + type
   - Generated description
   - New location in inbox/ready/

After processing all notes, remind: Run `/distribute` to route notes to their domain folders.
