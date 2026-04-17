---
type: prompt
status: dormant
category: analysis
description: "Deep scan a peer's work artifacts for performance review prep — output volume, quality signals, collaboration, growth — saved to EVIDENCE.md."
tags:
  - prompt
  - analysis
  - review
---

## Prompt

# Peer Work Scan

Deep scan a peer's work output for performance review preparation. Accepts documents, reports, presentations, designs, case studies, or any readable work artifact. Produces a structured analysis appended to `work/05_REVIEW/EVIDENCE.md`.

## Usage

```
/prompts:analyze_peer_work <name> <doc-url-or-path> [<doc-url-or-path>...]
```

Example: `/prompts:analyze_peer_work "Jane Doe" https://docs.company.com/jane-q2-report path/to/design-spec.pdf`

Provide one or more URLs or local file paths to the peer's work artifacts. The more context, the better.

## Workflow

1. **Read all provided documents** — use `defuddle parse <url> --md` for URLs, Read tool for local files. Extract full content.

2. **Produce structured analysis** with these sections:
   - **Output volume by month** — table showing delivery trends across the period
   - **Projects/themes** — group work by project area with descriptions of what was contributed
   - **Quality signals** — depth of thinking, clarity of communication, revision patterns, scope handled
   - **Notable contributions** — decisions made, cross-team impact, initiatives taken, complexity handled
   - **Collaboration signals** — how they work with others, feedback given/received, leadership evidence
   - **Growth signals** — scope expansion over time, new areas tackled, increasing ownership

3. **Save to vault** — append a new `## <Name> Work Analysis — <Period>` section to `work/05_REVIEW/EVIDENCE.md` with this header:
   ```yaml
   ---
   date: "<today>"
   description: "<one-line summary of findings>"
   person: "<Full Name>"
   cycle: "<e.g. h1-2026>"
   tags:
     - review
     - evidence
   ---
   ```

## Important

- Be thorough — this feeds into performance reviews
- Note work that was revised, abandoned, or course-corrected (quality signal)
- Look for patterns in how they communicate and structure their work
- Identify cross-team or cross-functional contributions (collaboration evidence)
- Map work artifacts to projects you have context on

## Related

> [[docs/prompts/INDEX|Prompts Index]]
