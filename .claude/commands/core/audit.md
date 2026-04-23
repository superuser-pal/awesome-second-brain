# Vault Audit

Deep structural audit of the vault. Checks indexes, folder placement, frontmatter, links, Bases, and consistency. Fix what can be fixed, flag what needs user input.

**When to use**: After substantial sessions, after reorganization, or periodically to maintain vault health. For lighter end-of-session checks, use `/close-day` instead.

## Usage

```
/audit
```

## Subagents

This command orchestrates two subagents for deep analysis:
- **`vault-librarian`** — orphan detection, broken links, frontmatter validation, stale notes, index consistency
- **`cross-linker`** — finds missing wikilinks, orphan notes, broken backlinks

Launch `vault-librarian` first for the structural audit, then `cross-linker` for link quality.

## Workflow

### 1. Check Folder Structure

Verify the vault matches the expected layout:
- `dashboards/HOME.md` exists
- `bases/` contains all `.base` files (none scattered elsewhere)
- `work/01_PROJECTS/` contains only notes with `status: active`
- `work/07_ARCHIVE/2025/` and `work/07_ARCHIVE/2026/` contain only `status: completed` notes
- `work/03_INCIDENTS/` contains only notes tagged `incident`
- `work/02_1-1/` contains only 1:1 meeting notes
- `work/06_ORG/PEOPLE.md` has a `## [Name]` section for each known person
- `work/06_ORG/TEAMS.md` has a `## [Name]` section for each known team
- `templates/` contains only template files (with `{{placeholders}}`)
- `thinking/` is clean (no leftover drafts that should have been promoted)
- Nothing unexpected at vault root (allowed: `CLAUDE.md`, `vault-manifest.json`, `CHANGELOG.md`, `CONTRIBUTING.md`, `README.md`, `LICENSE`, `.gitignore` — no user notes; `Home.md` lives in `dashboards/`)

### 2. Check Indexes

Read and verify each index file:
- `dashboards/HOME.md` — do embedded Base views reference existing Bases? Are quick links valid?
- `work/INDEX.md` — are active projects still active? Are completed items in the right section? Any missing notes?
- `brain/MEMORIES.md` — is the "Recent Context" section current? Any stale claims?
- `work/06_ORG/PEOPLE.md` — are roles and project assignments current?
- `work/05_REVIEW/WINS.md` — do PR counts and project descriptions match reality?
- `brain/SKILLS.md` — are all slash commands registered? Workflows still valid?

### 3. Check Frontmatter Completeness

For each note type, verify required properties:

**Work notes** (`work/01_PROJECTS/`, `work/07_ARCHIVE/`):
- Required: `date`, `quarter`, `description`, `status`, `tags: [work-note]`
- Optional: `project`, `team`

**Incident notes** (`work/03_INCIDENTS/`):
- Required: `date`, `quarter`, `description`, `tags: [work-note, incident]`
- Required for main incident notes: `ticket`, `severity`, `role`, `status`

**Person sections** (`work/06_ORG/PEOPLE.md`):
- Each `## [Name]` section must have: Role, Team, Context lines

**Team sections** (`work/06_ORG/TEAMS.md`):
- Each `## [Team Name]` section must have: Members, Scope, Notes lines

**Brain notes** (`brain/`):
- Required: `description`, `tags: [brain]`

**1:1 notes** (`work/02_1-1/`):
- Required: `date`, `quarter`, `description`, `tags: [work-note]`

### 4. Check for Duplicate Tags

Scan all notes for duplicate entries in the `tags` array (e.g., `tags: [person, person]`). This is a known issue — fix any found.

### 5. Check Status/Folder Alignment

- Notes in `work/01_PROJECTS/` must have `status: active`
- Notes in `work/07_ARCHIVE/` must have `status: completed`
- No `status: active` notes in archive, no `status: completed` notes in active

### 6. Check Bases

For each `.base` file in `bases/`:
- Do filters still match the expected notes?
- Are templates excluded? (filters should include `!file.inFolder(".claude/core/system/templates")` where relevant)
- Do referenced properties exist in the target notes?
- Do formula references exist?

### 7. Check for Orphans

- Are there notes in `work/01_PROJECTS/` or `work/07_ARCHIVE/` not linked from `work/INDEX.md`?
- Are there incident notes not linked from `work/INDEX.md` Incidents section?
- Are there people or teams missing from `work/06_ORG/PEOPLE.md` or `work/06_ORG/TEAMS.md`?
- Are there notes without any inbound links at all? (Use `obsidian orphans` if available, or grep for `[[NoteName]]` references)
- Are there thinking notes that should have been promoted or deleted?

### 8. Check Links

- Scan for wikilinks that reference notes that don't exist (broken links)
- Check that bidirectional links exist where expected (work note ↔ person, work note ↔ competency)
- Verify `## Related` sections aren't empty on work notes

### 9. Check for Stale Context

- Read `brain/MEMORIES.md` "Recent Context" — is anything outdated?
- Read `work/06_ORG/PEOPLE.md` — any roles or relationships that changed?
- Check `brain/LOGIC.md`, `brain/RULES.md`, `brain/CAVEATS.md` for outdated claims
- Check `brain/NORTH_STAR.md` — does Current Focus reflect reality?

### 10. Check for Mixed Context

Per vault rules, each note should cover ONE concept. Flag notes that:
- Mix project work with review prep
- Mix personal conversations with project evidence
- Have 3+ independent sections that don't need each other

### 11. Check Claude Config

- `.claude/settings.json` — are hooks well-formed and referencing correct paths?
- `.claude/commands/` — do all commands reference correct folder structure?
- `CLAUDE.md` — any stale instructions that contradict current vault state?

### 12a. Domain Cluster Detection

For each domain in `domains/`:

1. **Count pages by `type`** in `domains/[Name]/02_PAGES/` root (flat only, not sub-folders):
   ```bash
   grep -rl "^type:" domains/[Name]/02_PAGES/*.md 2>/dev/null | xargs grep "^type:" | sed 's/.*type: //'
   ```

2. **Threshold check**: if any navigation type (`concept | source | decision | output | question | report`) reaches ≥5 flat pages, propose creating the typed sub-folder.

3. **Report proposals** before acting:
   ```
   Cluster Detection — [DomainName]:
   - "concept": 7 flat pages → propose: 02_PAGES/concepts/ (move 7 files)
   - "decision": 5 flat pages → propose: 02_PAGES/decisions/ (move 5 files)

   Confirm to create sub-folders and move files? (Y/N)
   ```

4. **On confirm (single gate covers all proposals)**:
   - `mkdir -p domains/[Name]/02_PAGES/{type_plural}/`
   - `git mv` each matching file into the new sub-folder
   - Update `domains/[Name]/INDEX.md` Pages Index: switch from flat table to grouped sections (one `### Concepts`, `### Decisions`, etc. per type with sub-tables)

5. **Skip non-navigation types** (`goal | plan | research | idea | meeting`) — they do not trigger cluster detection and stay flat.

6. **Custom topic cluster scan**: also check for 5+ flat pages sharing a common tag that is not already a navigation type value. Propose a kebab-case topic folder (e.g., `api-patterns/`). Topic folders contain mixed types — their INDEX section shows a Type column. Apply same ≥5 threshold, same confirm gate.

### 12b. Project Pulse

After cluster detection, append a domain activity summary to the report:

```
Domain Pulse (since last audit):
- [DomainA]: N new pages (X concepts, Y decisions, Z outputs) | Last activity: YYYY-MM-DD
- [DomainB]: no new pages in 14+ days
- [DomainC]: N pages flagged for type compliance (legacy values detected)

Emergence candidates:
- [DomainA]/02_PAGES/: "concept" has 7 flat pages → ready for concepts/ folder
- [DomainB]/02_PAGES/: no clusters yet
```

Derive activity from git log (`git log --since="14 days ago" -- domains/`) or file modification dates. "New pages" = files added since last audit or in the past 14 days.

### 12c. Fix and Report

- Fix what's clearly wrong (broken links, missing frontmatter, duplicate tags, wrong folder)
- For ambiguous issues, list them and ask the user
- Summarize:
  - **Fixed**: issues resolved
  - **Flagged**: needs user input
  - **Suggested**: improvements for the vault
  - **Pulse**: domain activity summary (from §12b)

### 13. Generate Audit Report

After completing all steps above, write a timestamped report to `brain/AUDIT_REPORTS/YYYY-MM-DD.md`.

Report structure:
```markdown
---
title: "Audit Report YYYY-MM-DD"
description: "Vault health snapshot for YYYY-MM-DD."
type: brain
tags:
  - brain
  - audit-report
date: "YYYY-MM-DD"
---

# Audit Report — YYYY-MM-DD

## Metrics

| Metric | Value |
|---|---|
| Inbox age (oldest unprocessed) | N days |
| Orphan notes | N |
| Broken wikilinks | N |
| Empty brain files | N |
| Stale projects (no activity 30d+) | N |
| Tag violations | N |

## Issues Fixed

- [list]

## Issues Flagged (user input needed)

- [list]

## Domain Pulse

[paste §12b pulse summary]
```

Use the metrics gathered during this audit run. Do not re-scan — extract from steps already completed. If a metric was not checked this run, write `N/A`.

## Important

- Don't delete anything without asking
- Don't create new notes during audit — just fix existing ones
- Preserve existing frontmatter when editing
- If a note is in the wrong folder, move it with `git mv`
- Update `brain/MEMORIES.md` index if memory topics changed
- Use parallel agents for large audits (e.g., one checking work/01_PROJECTS/ + work/07_ARCHIVE/, one checking work/06_ORG/, one checking work/05_REVIEW/)
