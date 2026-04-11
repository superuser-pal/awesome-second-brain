---
title: PAL Second Brain Domains System
version: 1.0.0
layer: SYSTEM
purpose: Domain structure, INDEX.md format, frontmatter schemas, and Domain vs Work rules
last_updated: 2026-04-05
---

## 1. Domain Definition

A Domain is an isolated knowledge area under `domains/`. It MUST contain a valid `INDEX.md` at its root.

- **Directory naming:** `PascalCase` (e.g., `LaraLou/`, `PalFramework/`)
- **Subfolders:** Numbered ALL CAPS (`01_PROJECTS/`, `02_PAGES/`, `05_ARCHIVE/`)

---

## 2. Core Directory Structure

```text
domains/[Name]/
├── INDEX.md          # MOC — source of truth for the domain
├── CONNECTIONS.yaml  # External integrations config
├── 01_PROJECTS/      # Active project files (PROJECT_UPPER_SNAKE.md)
├── 02_PAGES/         # General notes routed from inbox
└── 05_ARCHIVE/       # Completed or deprecated content
```

---

## 3. INDEX.md as MOC

`INDEX.md` is the domain's map of content (MOC). It MUST:

1. Have YAML frontmatter (see schema below).
2. Have a `## Current State` section — brief status of the domain.
3. Have an `## Active Work` table — rows pulled from `01_PROJECTS/` frontmatter.
4. Have a `## Quick Links` section — wikilinks to sub-areas and key notes.
5. Contain at least one wikilink to an external note (e.g., `[[HOME]]`).

```markdown
---
name: "DomainName"
description: "What this domain covers."
status: active
last_updated: YYYY-MM-DD
---

# DomainName

## Current State
Brief description of what's active and what the focus is.

## Active Work
| Project | Status | Last Updated |
|---------|--------|-------------|
| [[PROJECT_NAME]] | in_progress | YYYY-MM-DD |

## Quick Links
- [[01_PROJECTS/]] — active projects
- [[02_PAGES/]] — domain pages
- [[HOME]] — vault entry point
```

---

## 4. Frontmatter Schemas

### Domain INDEX (`domains/*/INDEX.md`)
```yaml
name: "DomainName"
description: "..."
status: active          # active | paused | completed | archived
last_updated: YYYY-MM-DD
```

### Domain Project (`domains/*/01_PROJECTS/PROJECT_*.md`)
```yaml
name: "PROJECT_NAME"
domain: "DomainName"
goal: "..."
status: planning        # planning | in_progress | blocked | completed | cancelled
priority: medium        # low | medium | high | critical
tags: []
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
```

### Domain Page (`domains/*/02_PAGES/*.md`)
```yaml
name: "page-name"
domain: "DomainName"
origin: manual          # braindump | ai-output | manual
type: note              # concept | decision | reference | meeting | idea | note | belief | frame | lesson | model | goal | plan
status: processed       # unprocessed | ready | processed
description: "~150 char summary"
tags: []
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
```

---

## 5. File Naming Per Subfolder

| Subfolder | File naming |
|-----------|------------|
| `01_PROJECTS/` | `PROJECT_UPPER_SNAKE.md` |
| `02_PAGES/` | `kebab-case.md` |
| `05_ARCHIVE/` | Preserve original name |

---

## 6. Domain vs work/

| Content | Goes in |
|---------|---------|
| Project scoped to one domain | `domains/[Name]/01_PROJECTS/` |
| Pages/knowledge for one domain | `domains/[Name]/02_PAGES/` |
| Work notes spanning multiple domains | `work/01_PROJECTS/` |
| Incidents (cross-domain by nature) | `work/03_INCIDENTS/` |
| 1:1 meetings | `work/02_1-1/` |
| Performance content | `work/05_REVIEW/` |
| People and teams | `work/06_ORG/` |

When unsure, default to the domain. Move to `work/` only if the content genuinely spans domains.

---

## 7. Domain Lifecycle

1. **Create:** Use the `create-domain` skill → `create-domain.md` workflow.
2. **Validate:** Use the `create-domain` skill → `validate-domain.md` workflow.
3. **Map (refresh INDEX):** Use the `create-domain` skill → `map-domain.md` workflow.
4. **Archive:** Use the `create-domain` skill → `archive-domain.md` workflow.

**Registration:** After creation, the domain MUST be added to `CLAUDE.md`'s Domains section with name, scope, and detection signals.

---

## 8. Constraint Rules

1. **INDEX.md first:** When loading domain context, always read `INDEX.md` first. Only dive into subfolders listed in the index.
2. **Agent binding:** A Domain Agent's `domain:` YAML field MUST match an existing domain directory name.
3. **No cross-domain reads:** A Domain Agent cannot load context from a different domain unless the user explicitly requests it.
4. **Nesting limit:** No folder more than 3 levels below the domain root.
5. **Orphan = bug:** Every note in a domain must have at least one wikilink.

---

**Related Files:** `ARCHITECTURE.md`, `AGENTS-LOGIC.md`, `MEMORY-LOGIC.md`
