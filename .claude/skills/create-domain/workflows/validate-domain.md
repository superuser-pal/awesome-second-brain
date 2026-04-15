# validate-domain Workflow

Validate an existing domain against the canonical structure.

## Step 1: Identify Target Domain

Ask the user which domain to validate, or detect from context.

```bash
ls domains/
```

## Step 2: Check Directory Structure

Verify these components exist:

| Component | Required | Check |
|-----------|----------|-------|
| `INDEX.md` | Yes | At domain root |
| `CONNECTIONS.yaml` | Yes | At domain root |
| `01_PROJECTS/` | Yes | Directory exists |
| `02_PAGES/` | Yes | Directory exists |
| `03_ARCHIVE/` | Yes | Directory exists |

```bash
ls -la domains/[Name]/
```

## Step 3: Validate INDEX.md

### 3a. Check YAML Frontmatter

Required fields:

| Field | Required | Format |
|-------|----------|--------|
| `name` | Yes | PascalCase |
| `description` | Yes | String |
| `status` | Yes | active, paused, completed, archived |
| `created` | Yes | YYYY-MM-DD |
| `updated` | Yes | YYYY-MM-DD |

### 3b. Check Required Sections

- [ ] `## Current State`
- [ ] `## Key Facts`
- [ ] `## Knowledge Baseline`
- [ ] `## Active Work` — Table tracking 01_PROJECTS/
- [ ] `## Pages Index` — Table tracking 02_PAGES/
- [ ] `## Quick Links` — Wikilinks to all sub-folders
- [ ] `## Related` — At least one wikilink

### 3c. Check Wikilinks

INDEX.md must contain at least one `[[wikilink]]`. Orphan INDEX files are bugs.

## Step 4: Check Naming Conventions

| Location | Expected Format | Violation Example | Fix |
|----------|-----------------|-------------------|-----|
| Domain directory | `PascalCase` | `my-domain/` | `MyDomain/` |
| 01_PROJECTS/ files | `PROJECT_UPPER_SNAKE.md` | `feature_x.md` | `PROJECT_FEATURE_X.md` |
| 02_PAGES/ files | `kebab-case.md` | `MyNotes.md` | `my-notes.md` |
| 03_ARCHIVE/ files | Preserve original | — | — |

## Step 5: Check Nesting Depth

Maximum depth: 3 levels below domain root.

**Allowed:** `domains/Pal/02_PAGES/diagrams/architecture.png` (3 levels)
**Not allowed:** `domains/Pal/02_PAGES/diagrams/v1/draft/file.png` (5 levels)

## Step 6: Generate Report

```markdown
## Domain Validation Report: [Name]

### Structure Check
- [ ] INDEX.md exists
- [ ] CONNECTIONS.yaml exists
- [ ] 01_PROJECTS/ exists
- [ ] 02_PAGES/ exists
- [ ] 03_ARCHIVE/ exists

### INDEX.md Check
- [ ] Valid YAML frontmatter
- [ ] Required fields present (name, description, status, created, updated)
- [ ] Required sections present (Current State, Key Facts, Knowledge Baseline, Active Work, Pages Index, Quick Links, Related)
- [ ] Contains wikilinks

### Naming Conventions
- [ ] Domain directory: PascalCase
- [ ] Project files: PROJECT_UPPER_SNAKE.md
- [ ] Page files: kebab-case.md

### Nesting Depth
- [ ] No folder exceeds 3 levels below domain root

### Issues Found
[List any issues with suggested fixes]

### Result
[PASS | FAIL with issue count]
```

## Step 7: Offer Fixes

If issues found:

1. **Missing folders:** Create them
2. **Missing INDEX.md:** Generate from template
3. **Missing CONNECTIONS.yaml:** Generate from template
4. **Naming issues:** Suggest renames (user must approve)
5. **Missing wikilinks:** Suggest links to add

## Done

Domain validation complete.
