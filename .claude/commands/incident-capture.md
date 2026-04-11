# Incident Capture

Capture an incident from Slack channels, DMs, and threads into structured vault notes. Produces a complete incident work note with timeline, people, analysis, and wins doc entry. Covers all incident types: system failures, project failures, process breakdowns, client escalations, data issues, and launch failures.

## Usage

```
/incident-capture <slack-urls>
```

Provide one or more Slack URLs: incident channels, DM conversations, threads. The more context, the better.

## Subagents

This command orchestrates two subagents for heavy lifting:
- **`slack-archaeologist`** — reads all Slack sources, builds unified timeline with attribution
- **`contact-importer`** — bulk creates/updates person entries for everyone involved

Launch both in parallel when starting the capture.

## Workflow

### 1. Gather Raw Data

For each Slack URL provided:
- Read the full channel/DM/thread using `slack_read_channel` or `slack_read_thread`
- Read ALL sub-threads within the channel (check for "Thread: N replies" indicators)
- Note every timestamp, person, and message — nothing is too small
- Download and examine any shared images or files

### 2. Identify People

For every person who posted or was mentioned:
- Fetch their Slack profile (`slack_read_user_profile`)
- Check if they have a section in `work/06_ORG/PEOPLE.md`
- Note their role, team, and title
- Track who did what (reported, investigated, fixed, confirmed, etc.)

### 3. Build the Timeline

Reconstruct a detailed timeline from all sources:
- Every message with exact timestamp (CET)
- Attribution: who said/did what
- Cross-reference between channels (same person posting in incident channel + DMs)
- Key moments: first report, incident declared, root cause identified, fix created, fix merged, resolution confirmed

### 4. Create the Work Note

Create `work/03_INCIDENTS/<Incident Name>.md` with:

```yaml
---
date: "YYYY-MM-DD"
quarter: QN-YYYY
description: "~150 chars"
project: <relevant project>
status: active
ticket: TICKET-XXXX  # optional — your team's tracking system ID
severity: high/medium/low
role: <your role>
tags:
  - work-note
  - incident
---
```

Sections:
- **Context** — what happened, what triggered it, who was involved
- **Root Cause** — what went wrong and why
- **Resolution** — what changed, how it was fixed or resolved
- **Timeline** — full detailed table with timestamps
- **Impact** — users affected, business impact
- **Involved Personnel** — with wikilinks to `[[work/06_ORG/PEOPLE#Name]]` sections
- **Notes** — key actions by the user, analysis
- **Analysis** — what this means strategically (pattern, visibility, competencies)
- **Related** — wikilinks to all related notes, competencies

### 5. Create/Update People Entries

For key people involved who don't have a section in `work/06_ORG/PEOPLE.md`:
- Append a new `## <Name>` section with role, team, and context

For existing entries:
- Add the incident to their `**Context:**` notes

### 6. Update Indexes

- `work/INDEX.md` — add to Incidents section
- `brain/MEMORIES.md` — add incident summary to Recent Context
- `brain/PATTERNS.md` — if this reveals a recurring pattern
- `brain/GOTCHAS.md` — if this reveals a professional gotcha or lesson
- `work/05_REVIEW/WINS.md` — add to relevant quarter section with competency links

### 7. Prepare Incident Report Draft (if applicable)

If you are or may lead the post-mortem:
- Check your org's post-mortem template (add it to `brain/` if you have one)
- Create `work/03_INCIDENTS/TICKET-XXXX Post-Mortem Draft.md` following your org's post-mortem template
- Include: Executive Summary, Narrative Timeline (4-column), 5 Whys analysis, Action Items table

### 8. Offer Next Steps

After capturing, suggest:
- "Want me to prepare the incident ticket fields?" (Points of Time, Impact, RCA)
- "Want me to draft a message for the incident channel?"
- "Want me to create a root cause analysis document?"
- "Should I run `/vault-audit` to verify everything links properly?"

## Important

- **Read every message** — don't skim or summarize prematurely
- **Preserve exact timestamps** — incident timelines need precision
- **Attribute everything** — who said what, who did what
- **Cross-reference** — the same event may be described differently in DMs vs incident channel
- **Check Slack profiles** — roles and teams matter for the story
- **Be blameless in public docs** — use commit SHAs, not names, in shareable documents
- **Private analysis is honest** — the vault work note can include strategic analysis about credit, visibility, etc.
