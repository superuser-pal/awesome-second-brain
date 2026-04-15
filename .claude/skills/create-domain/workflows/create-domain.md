# create-domain Workflow

Create a new domain in the PAL Second Brain vault.

## Step 1: Gather Requirements

Ask the user:

1. What is the domain name? (will be converted to PascalCase)
2. Brief description of the domain's purpose

## Step 2: Validate Domain Name

Convert user input to `PascalCase`:

| User Input | Converted Name |
|------------|---------------|
| "project alpha" | `ProjectAlpha` |
| "LaraLou Substack" | `LaraLouSubstack` |
| "PAL Framework" | `PalFramework` |

Check that `domains/[Name]/` does not already exist.

## Step 3: Create Directory Structure

```bash
mkdir -p domains/[Name]/01_PROJECTS
mkdir -p domains/[Name]/02_PAGES
mkdir -p domains/[Name]/03_ARCHIVE
```
### Step 3a: Create AD_HOC_TASKS.md

Create `domains/[Name]/01_PROJECTS/AD_HOC_TASKS.md` using the template at `.claude/skills/create-domain/templates/AD_HOC_TASKS.template.md`. Replace `{{DomainName}}` with the PascalCase domain name.

## Step 4: Create INDEX.md

Create `domains/[Name]/INDEX.md` using the Domain INDEX template at `.claude/skills/create-domain/templates/INDEX.template.md`:

```markdown
---
name: "[Name]"
description: "[User's description]"
status: active
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
---

# [Domain Name Title Case]

[User's description expanded into overview paragraph]

## Current State

Domain created. Ready for planning.

## Key Facts

- **Created:** [YYYY-MM-DD]
- **Purpose:** [Brief purpose]
- **Status:** Active

## Knowledge Baseline

* **Vital Context:** [The fundamental truths of this domain that do not change].
* **Key Definitions:** [List any specific terms and exactly what they mean in this context].

## Active Work

| Project | Status | Last Updated |
|---------|--------|--------------|
| _No active projects yet_ | - | - |

## Pages Index

| Page | Description (AI Context) | Focus/Tags | Last Updated |
|:---|:---|:---|:---|
| _No pages indexed yet_ | - | - | - |

## Quick Links

- [Projects](01_PROJECTS/) - Active project files
- [Pages](02_PAGES/) - Knowledge processed and archived within the domain, routed from the inbox
- [Archive](03_ARCHIVE/) - Deprecated content

## Related
- [[dashboards/HOME|Home]]
```

INDEX.md MUST contain at least one wikilink (to Home or another existing note).

## Step 5: Create CONNECTIONS.yaml

Create `domains/[Name]/CONNECTIONS.yaml` from the template at `.claude/skills/create-domain/templates/CONNECTIONS.template.yaml`.

Replace `{{YYYY-MM-DD}}` with today's date. Leave all example entries commented out — the user fills these in as connections are established.

```yaml
# CONNECTIONS.yaml - External Integration Configuration
# This file tracks all external dependencies for the domain
# Updated: [YYYY-MM-DD]

apis:
  # Add entries as APIs are integrated

documentation:
  # Add entries as documentation sources are identified

data_sources:
  # Add entries as data connections are established
```

## Step 6: Verify Structure

```bash
ls -la domains/[Name]/
ls domains/[Name]/*/
```

Expected:
- `INDEX.md`
- `CONNECTIONS.yaml`
- `01_PROJECTS/`
- `02_PAGES/`
- `03_ARCHIVE/`

## Step 7: Register Domain

### 7a: Update CLAUDE.md

Add a new row to the **Domains** section in `CLAUDE.md`:

```markdown
| [Name] | [Brief scope] | [primary detection signals] |
```

### 7b: Register in DOMAINS-REGISTRY.md

Append a new domain entry to the **Domains** section in `.claude/core/reference/DOMAINS-REGISTRY.md`:

```markdown
### [DomainName]

| Field | Value |
|-------|-------|
| **Name** | `DomainName` |
| **Path** | `domains/DomainName/` |
| **Agent** | `null` |
| **Status** | `active` |

**Primary Signals:** (ask the user: "What phrases strongly indicate content belongs to this domain?")

**Secondary Signals:** (infer from domain description, or ask)

**Exclude Patterns:** (leave empty by default)
```

### 7c: Remind About classify-message.ts

Print reminder:

> To enable automatic domain detection in future messages, add signal patterns for this domain to `.claude/scripts/hooks/lib/signals.ts` (the `SIGNALS` array).

## Step 8: Final Checklist

- [ ] Domain directory uses PascalCase
- [ ] INDEX.md exists with valid frontmatter (name, description, status, created, updated)
- [ ] INDEX.md has at least one wikilink
- [ ] INDEX.md has Knowledge Baseline, Active Work, Pages Index, Quick Links, and Related sections
- [ ] CONNECTIONS.yaml exists at domain root
- [ ] 01_PROJECTS/, 02_PAGES/, 03_ARCHIVE/ directories exist
- [ ] Domain registered in CLAUDE.md

## Done

Domain created. Ready for use.

**Next steps:**
1. Create project files in `01_PROJECTS/` as needed
2. Notes routed from inbox will land in `02_PAGES/`
3. Fill in `CONNECTIONS.yaml` as external integrations are established
