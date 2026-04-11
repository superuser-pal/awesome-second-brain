---
description: "Stage 2 processing. Scan inbox/raw/ for unprocessed captures, add full frontmatter (domain, type, tags, description), and move to inbox/ready/. Also scans thinking/ and shows a promotion reminder."
---

Process all unprocessed notes in `inbox/raw/`, then scan `thinking/` for any notes ready to promote.

## Part 1: inbox/raw/

For each `.md` file in `inbox/raw/`:

1. **Read the content** and analyze what it contains.

2. **Detect domain** — Check if content matches any registered domain in CLAUDE.md:
   - High confidence (obvious match): suggest the domain
   - Low confidence (unclear): ask the user to choose or create a new domain
   - If no domains exist yet, ask user to create one first via the create-domain skill

3. **Classify note type** — Determine the `type` field:
   - concept, decision, reference, meeting, idea, note, belief, frame, lesson, model, goal, plan, research

4. **Check for thinking content** — If the content is primarily reasoning, a scratchpad, an open question, or ongoing research, offer to route to `thinking/` instead of `inbox/ready/`:
   - "This looks like a thinking note (reasoning/research/scratchpad). Move to thinking/ with `status: thinking`?"
   - If yes: `git mv inbox/raw/[file] thinking/[YYYY-MM-DD-topic].md`, set `status: thinking`, skip remaining steps for this file
   - If no: continue to step 5

5. **Check for multi-topic content** — Scan for structural signals that the note covers 3+ independently page-worthy topics (each self-contained and useful on its own without the others):
   - 3+ H2 (`##`) sections with clearly different subjects
   - `[fact]`/`[idea]` blocks that are clearly unrelated and independently meaningful

   Only flag if topics are genuinely separable — not if sections are tightly related and better understood together. If detected, add a visible notice:
   > "This note covers [N] independently page-worthy topics. When you run `/distribute`, you'll be offered to split it into separate pages."

6. **Generate frontmatter** — Add full YAML frontmatter:
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

7. **Preserve original source** — Before any transformation, capture the entire raw content in a collapsible callout at the bottom of the note:

   ```markdown
   > [!quote]- Original Source
   > [verbatim raw text, exactly as captured, no formatting changes]
   ```

   The processed/transformed content lives above this callout as the main body. The callout is collapsed by default so it doesn't clutter reading, but the original is always available for reference.

8. **Preserve observation categories** — Keep any `[fact]`, `[idea]`, `[decision]`, etc. syntax from the raw capture.

9. **Move to inbox/ready/** — Use `git mv` to move the processed note:
   ```bash
   git mv inbox/raw/[filename] inbox/ready/[filename]
   ```

10. **Report** for each note:
    - Original filename
    - Detected domain + type
    - Generated description
    - New location in `inbox/ready/` (or `thinking/` if rerouted)

---

## Part 2: thinking/ reminder

After processing all inbox/raw/ files, scan `thinking/` for notes with `status: thinking` (excluding `thinking/archive/`).

If any are found, show a single reminder block — do NOT ask about each one interactively:

```
### Thinking Notes (unreviewed)
You have [N] thinking notes:
  - thinking/YYYY-MM-DD-topic-a.md  (last updated: X days ago)
  - thinking/YYYY-MM-DD-topic-b.md  (last updated: Y days ago)

To promote a thinking note to a page:
  1. Set status: ready and move to inbox/ready/
  2. Run /distribute

To archive: move to thinking/archive/[filename]
```

---

After processing, remind: Run `/distribute` to promote notes to pages in their domains.
