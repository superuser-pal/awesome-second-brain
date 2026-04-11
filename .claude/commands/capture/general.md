---
description: "General Stage 1 capture. Dump raw thoughts, URLs, or documents into inbox/raw/ with minimal metadata. No classification yet — just get it out of your head."
---

Capture the following input.

1. **Determine capture type** from content:
   - **Braindump**: Free-form thoughts, ideas, observations
   - **URL**: If content contains a URL, use `defuddle parse <url> --md` to extract clean markdown
   - **Document reference**: If a file path (absolute or relative) or specific location is provided, read the file, extract its contents, and summarize into the capture note.

2. **Determine destination** — ask the user (or infer from content if obvious):
   - **Inbox** (default): ideas, facts, URLs, braindumps to be classified later → `inbox/raw/`
   - **Thinking**: reasoning, scratchpads, open questions, ongoing research → `thinking/`

3. **Create the capture note** with `status: unprocessed` (inbox) or `status: thinking` (thinking):

   Inbox (`inbox/raw/[topic]-[YYYY-MM-DD].md`):
   ```yaml
   ---
   date: "[today]"
   created: "[today]"
   status: unprocessed
   ---
   ```

   Thinking (`thinking/[YYYY-MM-DD-topic].md`):
   ```yaml
   ---
   date: "[today]"
   created: "[today]"
   status: thinking
   tags:
     - thinking
   ---
   ```

4. **Structure content with observation categories** where natural:
   - `[fact]` — Objective, verifiable information
   - `[idea]` — Subjective concepts, hypotheses
   - `[decision]` — Commitments, choices made
   - `[technique]` — Methods, processes, tactics
   - `[requirement]` — Constraints, dependencies
   - `[question]` — Open inquiries to investigate
   - `[insight]` — Realizations, pattern recognition
   - `[problem]` — Issues, pain points
   - `[solution]` — Fixes, workarounds
   - `[action]` — Task items

   Syntax: `- [category] content`

   Don't force categories — if the input is simple or short, plain text is fine.

5. **Report** what was captured and where it was saved.

6. **Remind**: For inbox captures, run `/process` to add frontmatter and classify, then `/distribute` to promote to a page. For thinking captures, use `/process` when ready to promote.

Content to capture:
$ARGUMENTS
