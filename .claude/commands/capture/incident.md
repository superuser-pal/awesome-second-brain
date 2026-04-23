# Incident Capture

Capture an incident from raw text transcripts, meeting notes, emails, or Slack URLs into structured vault notes. Produces a complete incident work note with timeline, people, analysis, and wins doc entry.

## Usage

```
/incident <slack-urls> OR <raw-text-transcript>
```

Provide Slack URLs (channels, threads, DMs) or paste a raw transcript/notes summary.

## Workflow

### 1. Gather Raw Data

- **If Input is URL**: Use `slack-archaeologist` and `contact-importer` subagents to read channels/threads, fetch profiles, and build the initial timeline.
- **If Input is Text**: AI parses the provided content directly to extract the timeline, events, and personnel involved.

### 2. Identify People

For every person involved:
- Check if they have a section in `work/06_ORG/PEOPLE.md`.
- Note their role, team, and contribution to the incident.
- If not present and input was Slack, fetch profile; otherwise, use context from text.

### 3. Create the Work Note

Create `work/03_INCIDENTS/<Incident Name>.md` using the **`templates/Incident Note.md`** structure. Ensure high-fidelity extraction of:
- **Root Cause**: What went wrong and why.
- **Resolution**: How it was fixed.
- **Timeline**: A precise table of events.
- **Impact**: Business and user impact.

### 4. Update References & People

- Update key personnel sections in `work/06_ORG/PEOPLE.md` with incident context.
- Update `brain/MEMORIES.md`, `brain/RULES.md`, and `brain/CAVEATS.md` if new lessons emerged.
- Add to `work/05_REVIEW/WINS.md` if applicable.

## Important

- **Timeline Precision**: If timestamps are missing in raw text, order events logically based on the narrative.
- **Blamelessness**: Keep public-facing logic blameless; use private sections for honest analysis if needed.
- **Wikilinks**: Ensure all people and projects are correctly wikilinked.
