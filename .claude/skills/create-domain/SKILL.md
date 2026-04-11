---
name: create-domain
description: Create and manage vault domains (organized knowledge areas). USE WHEN create domain, new domain, domain structure, validate domain, check domain, map domain, sync domain, archive domain, housekeeping.
user-invocable: false
---

# create-domain

Domain lifecycle management for the PAL Second Brain vault. Domains live under `domains/` and provide structured, isolated workspaces for distinct areas of life and work.

## Domain Structure

Every domain follows this structure:

```
domains/[DomainName]/
├── INDEX.md          # Domain entry point (MOC with wikilinks)
├── CONNECTIONS.yaml  # External integrations config (APIs, docs, data sources)
├── 01_PROJECTS/      # Active project files (PROJECT_*.md)
├── 02_PAGES/         # Knowledge processed and archived within the domain, routed from the inbox
└── 05_ARCHIVE/       # Completed/deprecated content
```

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Domain directory | `PascalCase` | `LaraLou/`, `PalFramework/` |
| Domain subfolders | `NN_ALLCAPS` | `01_PROJECTS/`, `02_PAGES/` |
| INDEX.md | `UPPERCASE.md` | `INDEX.md` |
| CONNECTIONS.yaml | `UPPERCASE.yaml` | `CONNECTIONS.yaml` |
| Project files | `PROJECT_UPPER_SNAKE.md` | `PROJECT_Q2_LAUNCH.md` |
| Page files | `kebab-case.md` | `meeting-notes-april.md` |
| Archive files | Preserve original name | No renaming |

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **create-domain** | "create domain", "new domain" | `workflows/create-domain.md` |
| **validate-domain** | "validate domain", "check domain" | `workflows/validate-domain.md` |
| **map-domain** | "map domain", "sync domain", "housekeeping" | `workflows/map-domain.md` |
| **archive-domain** | "archive domain", "deprecate domain" | `workflows/archive-domain.md` |

## Examples

**Example 1: Create a new domain**
```
User: "Create a domain for my Substack project"
-> Invokes create-domain workflow
-> Asks for name + description
-> Creates domains/Substack/ with 01_PROJECTS/, 02_PAGES/, 05_ARCHIVE/ and CONNECTIONS.yaml
-> Generates INDEX.md with frontmatter + MOC structure + wikilinks
-> Updates CLAUDE.md domain registry
```

**Example 2: Validate domain structure**
```
User: "Check my LaraLou domain"
-> Invokes validate-domain workflow
-> Verifies folder structure, naming conventions, frontmatter
-> Reports issues with suggested fixes
```

**Example 3: Sync domain after session**
```
User: "Map the Pal domain"
-> Invokes map-domain workflow
-> Scans all folders, enforces naming
-> Refreshes INDEX.md Active Work table from 01_PROJECTS/
-> Reports summary
```
