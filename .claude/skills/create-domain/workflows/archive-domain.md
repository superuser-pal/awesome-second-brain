# archive-domain Workflow

Archive content within a domain or archive the entire domain.

## Step 1: Identify Target Domain

Ask the user which domain contains content to archive.

```bash
ls domains/
```

## Step 2: Determine Archive Scope

| Scope | User Says | Action |
|-------|-----------|--------|
| **Single File** | "archive this project" | Move one file to 05_ARCHIVE/ |
| **Multiple Files** | "archive all completed projects" | Move multiple files to 05_ARCHIVE/ |
| **Entire Domain** | "archive this domain" | Mark domain as archived |

---

## Archive Type: Single/Multiple Files

### Step A1: Identify Files to Archive

List candidates from common archive sources:

```bash
ls domains/[Name]/01_PROJECTS/    # Completed projects
ls domains/[Name]/02_PAGES/       # Old notes
```

### Step A2: Add Deprecation Header

Before moving, prepend deprecation metadata:

```yaml
---
deprecated: YYYY-MM-DD
reason: "Project completed | Superseded by [NEW_FILE] | No longer relevant | Cancelled"
original_location: "01_PROJECTS/ | 02_PAGES/"
---
```

### Step A3: Move to Archive

Always use `git mv` for zero data loss:

```bash
git mv domains/[Name]/[folder]/[file.md] domains/[Name]/05_ARCHIVE/[file.md]
```

### Step A4: Update INDEX.md

If archiving a project:
1. Remove from Active Work table
2. Note in Current State that project was archived
3. Update `updated` date

If archiving a page:
1. Remove from Pages Index table
2. Update `updated` date

---

## Archive Type: Entire Domain

### Step B1: Confirm Domain Archive

**Warning:** This marks the entire domain as archived.

Confirm with user:
- Reason for archiving
- Any active projects that need moving elsewhere first

### Step B2: Update Domain Status

Update `domains/[Name]/INDEX.md`:

```yaml
---
name: "[Name]"
description: "[description]"
status: archived
updated: [YYYY-MM-DD]
archived: [YYYY-MM-DD]
archive_reason: "[User's reason]"
---
```

### Step B3: Update Current State

```markdown
## Current State

**ARCHIVED:** This domain was archived on [YYYY-MM-DD].

**Reason:** [User's reason]
```

### Step B4: Move Active Content

If any projects were in progress:
1. Offer to move to a different domain's `01_PROJECTS/`
2. Or mark them as cancelled in `05_ARCHIVE/`

### Step B5: Update DOMAINS-REGISTRY.md

Find the domain's entry in `.claude/core/reference/DOMAINS-REGISTRY.md` and update its status:

```markdown
| **Status** | `archived` |
```

Add below the table:
```markdown
**Archived:** YYYY-MM-DD
**Archive Reason:** [User's reason]
```

---

## Step 3: Verify Archive

```bash
ls -la domains/[Name]/05_ARCHIVE/
head -10 domains/[Name]/INDEX.md
```

## Deprecation Header Template

Always use when archiving:

```yaml
---
deprecated: YYYY-MM-DD
reason: "[reason]"
original_location: "[original folder path]"
---
```

## Done

Content archived. INDEX.md updated. Archived content remains in 05_ARCHIVE/ for reference — delete only if explicitly requested.
