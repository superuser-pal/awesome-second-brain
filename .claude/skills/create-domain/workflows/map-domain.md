# map-domain Workflow

End-of-session housekeeping: scan domain folders, enforce naming conventions, synchronize INDEX.md.

## Step 1: Identify Target Domain

Ask the user which domain to map, or detect from context.

```bash
ls domains/
```

## Step 2: Scan Domain Folders

Scan all content folders for files:

```bash
ls domains/[Name]/01_PROJECTS/
ls domains/[Name]/02_PAGES/
ls domains/[Name]/05_ARCHIVE/
```

## Step 3: Check Naming Conventions

For each file found, check against expected format:

| Location | Expected Format | Violation Example | Auto-Fix To |
|----------|-----------------|-------------------|-------------|
| 01_PROJECTS/ | `PROJECT_UPPER_SNAKE.md` | `feature_x.md` | `PROJECT_FEATURE_X.md` |
| 02_PAGES/ | `kebab-case.md` | `MyDoc.md` | `my-doc.md` |
| 05_ARCHIVE/ | Preserve original | — | — |

## Step 4: Apply Fixes (With Confirmation)

For each violation:

1. Show the proposed rename
2. Ask user to confirm
3. Execute: `git mv domains/[Name]/[folder]/[old] domains/[Name]/[folder]/[new]`

Always use `git mv` for zero data loss.

## Step 5: Update INDEX.md

### 5a. Refresh Active Work Table

Scan 01_PROJECTS/ and rebuild the Active Work table:

```markdown
## Active Work

| Project | Status | Last Updated |
|---------|--------|--------------|
| PROJECT_FEATURE_X | in_progress | 2026-04-04 |
| PROJECT_MIGRATION | blocked | 2026-03-28 |
```

Read each project's YAML frontmatter for `status:` field. Default to "Unknown" if missing.

### 5b. Refresh Pages Index Table

Scan 02_PAGES/ and rebuild the Pages Index table:

```markdown
## Pages Index

| Page | Description (AI Context) | Focus/Tags | Last Updated |
|:---|:---|:---|:---|
| [[page-name]] | Brief description | tag1, tag2 | YYYY-MM-DD |
```

Read each page's `description` and `tags` frontmatter fields where available.

### 5c. Update Metadata

Set `updated:` to today's date in INDEX.md frontmatter.

## Step 6: Check CONNECTIONS.yaml

Verify `CONNECTIONS.yaml` exists at `domains/[Name]/CONNECTIONS.yaml`.

- **If present:** Note it in the report.
- **If missing:** Flag as issue and offer to create from template (`.claude/skills/create-domain/templates/CONNECTIONS.template.yaml`).

## Step 7: Check Wikilinks

Verify:
- INDEX.md links to at least one note outside the domain (e.g., [[dashboards/HOME]])
- Pages and output files contain at least one wikilink each
- Flag orphan notes (no inbound or outbound links)

## Step 8: Report Summary

```markdown
## Domain Map Complete: [Name]

### Files Scanned
- 01_PROJECTS/: [X] files
- 02_PAGES/: [X] files
- 05_ARCHIVE/: [X] files

### CONNECTIONS.yaml
- [present | MISSING — flagged]

### Naming Fixes Applied
- [old_name] -> [new_name]

### INDEX.md Updates
- Active Work table refreshed ([X] projects)
- Pages Index table refreshed ([X] pages)
- Updated date: [YYYY-MM-DD]

### Link Health
- Orphan notes: [list or "none"]

### Domain Health
[HEALTHY | X issues remaining]
```

## Done

Domain mapped and synchronized. INDEX.md reflects current state.
