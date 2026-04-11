---
description: "Stage 1 capture. Dump raw thoughts, URLs, or documents into inbox/raw/ with minimal metadata. No classification yet — just get it out of your head."
---

Capture the following input into `inbox/raw/`.

1. **Determine capture type** from content:
   - **Braindump**: Free-form thoughts, ideas, observations
   - **URL**: If content contains a URL, use `defuddle parse <url> --md` to extract clean markdown
   - **Document reference**: If referencing a file in ports/In/, extract and summarize

2. **Create the capture note** at `inbox/raw/[topic]-[YYYY-MM-DD].md` using the Inbox Capture template:
   ```yaml
   ---
   date: "[today]"
   created: "[today]"
   ---
   ```

3. **Structure content with observation categories** where natural:
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

4. **Report** what was captured and where it was saved.

5. **Remind**: Run `/process` to add frontmatter and classify, then `/distribute` to route to a domain.

Content to capture:
$ARGUMENTS
