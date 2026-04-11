# 🧠 PAL Second Brain: System Reference

> [!ABSTRACT] Quick Reference
> This guide provides a high-level overview of the PAL Second Brain architecture, core workflows, and command palette. It is designed for rapid orientation within Obsidian.

---

##  Foundational Principles

| Principle | Core Mantra | Key Action |
| :--- | :--- | :--- |
| **Graph-First** | Links > Folders | Every content note must have at least one `[[wikilink]]`. |
| **Atomicity** | One Concept per Note | Split notes that cover multiple independent ideas. |
| **Capture First** | All Input via Inbox | Never skip the raw stage for unclassified data. |
| **Domain Isolation** | Contextual Boundaries | Keep `domains/` clean; use `work/` only for cross-domain. |
| **Vault Memory** | Local Knowledge | Log decisions/gotchas in `brain/`, not Claude's internal memory. |

---

## Core Operational Flows

### The Inbox Pipeline
The primary way external information is metabolized into the vault.

| Stage | Command | Logic | Final Destination |
| :--- | :--- | :--- | :--- |
| **1. Capture** | `/capture` | Raw dump of text/audio/emails | `inbox/raw/` |
| **2. Process** | `/process` | Add frontmatter, tags, and domain classification | `inbox/ready/` |
| **3. Distribute** | `/distribute` | Route to domain, add links, update indexes | `domains/[Name]/02_PAGES/` |
| **Power User** | `/dump` | Executes all 3 stages in a single pass | Automated Routing |

### Habitual Cycles
Standard procedures for daily and weekly alignment.

| Cycle | Trigger | Primary Outcome |
| :--- | :--- | :--- |
| **Morning Start** | `/standup` | Loads North Star, tasks, and sets today's focus in `plan/`. |
| **Session Wrap** | `/wrap-up` | Audits session notes, captures wins, and commits changes. |
| **Weekly Sync** | `/weeks-cycle` | Closes previous week's velocity and plans the next sprint. |
| **Maintenance** | `/vault-audit` | Repairs broken links, identifies orphans, and updates MOCs. |

---

## Command Palette (Slash Commands)

| Command | Purpose | Best Used When... |
| :--- | :--- | :--- |
| `/capture-1on1` | Meeting Logs | You are starting or finishing a meeting with a person. |
| `/incident-capture`| Triage | A Slack thread or bug needs to be documented as an incident. |
| `/create-project` | Scaffolding | Initiating a new body of work within a specific domain. |
| `/onboard` | Initialization | Interactive setup workflow to configure your second brain. |
| `/sync-tasks` | Aggregation | You need a global view of all tasks in `dashboards/TASKS.md`. |
| `/humanize` | Refining | You want Claude to polish technical drafts into your voice. |
| `/review-brief` | Performance | Aggregating evidence for manager or peer reviews. |
| `/self-review` | Performance | Drafting your end-of-cycle self-assessment. |

> [!INFO] Total Commands
> There are over 15+ specialized commands. For the full technical spec, see: `.claude/core/system/WORKFLOWS.md`

---

## 🛠️ System Capabilities

### Skills & Toolkits
Skills are background capabilities Claude uses to interact with your vault and the web.

| Skill | Category | Primary Function |
| :--- | :--- | :--- |
| **daily-rituals** | Planning | Manages the `plan/` directory and weekly files. |
| **project-management**| Work | Handles task bidirectional sync and project states. |
| **qmd / defuddle** | Search/Web | Semantic vault search and clean markdown extraction from URLs. |
| **create-domain** | Architecture | Standardizes the creation of new `domains/[Name]` folders. |
| **obsidian-cli** | Integration | Runs vault operations directly through the Obsidian app. |

### Specialized Subagents
Autonomous "bots" triggered by commands to perform complex background tasks.

| Agent | Responsibility | Associated Command |
| :--- | :--- | :--- |
| **wins-capture** | Scans notes for achievements/competency evidence. | `/wrap-up`, `/weekly` |
| **vault-librarian** | Deep maintenance: orphans, broken links, stale notes. | `/vault-audit` |
| **slack-archaeologist**| Reconstructs full contexts from Slack threads. | `/incident-capture` |
| **review-fact-checker**| Validates claims in review drafts against vault data. | `/self-review` |
| **contact-importer** | Building rich profiles for People notes. | `/incident-capture` |

---

## 🗺️ Vault Navigation (Mental Map)

| Directory | Purpose | Primary Content |
| :--- | :--- | :--- |
| `dashboards/` | **Navigation** | `HOME.md`, `TASKS.md` (Master task list). |
| `domains/` | **Knowledge Areas**| Isolated business areas (PascalCase). |
| `work/` | **Shared Operations**| Cross-domain 1-1s, incidents, and reviews. |
| `inbox/` | **Entry Point** | Unprocessed (`raw`) and classified (`ready`) notes. |
| `brain/` | **Operating System**| Memories, Patterns, Gotchas, and the `NORTH_STAR`. |
| `plan/` | **Time & Rhythm** | Daily notes and Weekly goals. |
| `thinking/` | **Scratchpad** | Session logs and temporary reasoning drafts. |

---

## 📋 Asset Schemas & Constraints

| Asset Type | Location | Convention | Required Fields |
| :--- | :--- | :--- | :--- |
| **Domain INDEX** | `domains/*/` | `INDEX.md` | `status`, `last_updated` |
| **Domain Project**| `01_PROJECTS/` | `PROJECT_NAME.md` | `goal`, `status`, `priority` |
| **Domain Page** | `02_PAGES/` | `kebab-case.md` | `origin`, `type`, `description`|
| **1:1 Note** | `work/02_1-1/` | `Person YYYY-MM-DD`| `tags`, `attendees` |
| **Incident** | `work/03_INCIDENTS/`| `DESCRIPTIVE_TITLE`| `status`, `severity` |

---

## ⚠️ The Golden Rules

> [!CAUTION] Critical Workflow Constraints
> 1. **Orphan = Bug**: Every new content note MUST have a `[[wikilink]]`. If it's floating, it's lost.
> 2. **Vault-First Memory**: Never tell Claude to "remember" in its internal metadata. Use `brain/GOTCHAS.md` or `brain/PATTERNS.md`.
> 3. **Description Mandatory**: Every note needs a `description: ~150 char` field for the semantic search to function optimally.
> 4. **Git over Obsidian**: For operations involving 4+ file moves or renames, favor the CLI (`git mv`) to maintain history integrity.
> 5. **Atomicity Rule**: If you find yourself scrolling 3+ times to read a note, it’s probably too big. Split it.

---

> [!TIP] Pro Tip: Session Kickoff
> The system auto-loads your `NORTH_STAR.md` at the start of every session. Keep it updated with your highest-leverage priorities to keep the AI focused.
