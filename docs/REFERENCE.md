# 🧠 Awesome Second Brain: System Reference

> [!ABSTRACT] Quick Reference
> This guide provides a high-level overview of the Awesome Second Brain architecture, core workflows, and command palette. It is designed for rapid orientation within Obsidian.

---

## Foundational Principles

| Principle            | Core Mantra           | Key Action                                                       |
| :------------------- | :-------------------- | :--------------------------------------------------------------- |
| **Graph-First**      | Links > Folders       | Every content note must have at least one `[[wikilink]]`.        |
| **Atomicity**        | One Concept per Note  | Split notes that cover multiple independent ideas.               |
| **Capture First**    | All Input via Inbox   | Never skip the raw stage for unclassified data.                  |
| **Domain Isolation** | Contextual Boundaries | Keep `domains/` clean; use `work/` only for cross-domain.        |
| **Vault Memory**     | Local Knowledge       | Log decisions/gotchas in `brain/`, not Claude's internal memory. |

---

## Core Operational Flows

### The Inbox Pipeline

The primary way external information is metabolized into the vault.

| Stage             | Command       | Logic                                            | Final Destination          |
| :---------------- | :------------ | :----------------------------------------------- | :------------------------- |
| **1. Capture**    | `/general`    | Raw dump of text/audio/emails                    | `inbox/raw/`               |
| **2. Process**    | `/process`    | Add frontmatter, tags, and domain classification | `inbox/ready/`             |
| **3. Distribute** | `/distribute` | Route to domain, add links, update indexes       | `domains/[Name]/02_PAGES/` |
| **Power User**    | `/quick-dump` | Executes all 3 stages in a single pass           | Automated Routing          |

### Habitual Cycles

Standard procedures for daily and weekly alignment.

| Cycle             | Trigger       | Primary Outcome                                             |
| :---------------- | :------------ | :---------------------------------------------------------- |
| **Morning Start** | `/standup`    | Loads North Star, tasks, and sets today's focus in `plan/`. |
| **Session Wrap**  | `/wrap-up`    | Audits session notes, captures wins, and commits changes.   |
| **Weekly Sync**   | `/week-cycle` | Closes previous week's velocity and plans the next sprint.  |
| **Maintenance**   | `/audit`      | Repairs broken links, identifies orphans, and updates MOCs. |

---

## Command Palette (Slash Commands)

| Command           | Purpose        | Best Used When...                                             |
| :---------------- | :------------- | :------------------------------------------------------------ |
| `/1-1`            | Meeting Logs   | You are starting or finishing a meeting with a person.        |
| `/incident`       | Triage         | A Slack thread or bug needs to be documented as an incident.  |
| `/project-create` | Scaffolding    | Initiating a new body of work within a specific domain.       |
| `/onboard`        | Initialization | Interactive setup workflow to configure your second brain.    |
| `/task-sync`      | Aggregation    | You need a global view of all tasks in `dashboards/TASKS.md`. |
| `/humanize`       | Refining       | You want Claude to polish technical drafts into your voice.   |
| `/brief`          | Performance    | Aggregating evidence for manager or peer reviews.             |
| `/self`           | Performance    | Drafting your end-of-cycle self-assessment.                   |

| `/brain-dump` | Capturing | Atomic extraction of facts/ideas/decisions with tags. |
| `/quick-dump` | Shortcut | High-confidence routing directly to domain notes. |

---

## System Capabilities

### Skills & Toolkits

Skills are background capabilities Claude uses to interact with your vault and the web.

| Skill                  | Category     | Primary Function                                               |
| :--------------------- | :----------- | :------------------------------------------------------------- |
| **daily-rituals**      | Planning     | Manages the `plan/` directory and weekly files.                |
| **project-management** | Work         | Handles task bidirectional sync and project states.            |
| **qmd / defuddle**     | Search/Web   | Semantic vault search and clean markdown extraction from URLs. |
| **create-domain**      | Architecture | Standardizes the creation of new `domains/[Name]` folders.     |
| **obsidian-cli**       | Integration  | Runs vault operations directly through the Obsidian app.       |

### Specialized Subagents

Autonomous "bots" triggered by commands to perform complex background tasks.

| Agent                   | Responsibility                                        | Associated Command    |
| :---------------------- | :---------------------------------------------------- | :-------------------- |
| **wins-capture**        | Scans notes for achievements/competency evidence.     | `/wrap-up`, `/weekly` |
| **vault-librarian**     | Deep maintenance: orphans, broken links, stale notes. | `/audit`              |
| **slack-archaeologist** | Reconstructs full contexts from Slack threads.        | `/incident`           |
| **review-fact-checker** | Validates claims in review drafts against vault data. | `/self`               |
| **contact-importer**    | Building rich profiles for People notes.              | `/incident`           |

---

## 🗺️ Vault Navigation

| Directory     | Purpose               | Primary Content                                     |
| :------------ | :-------------------- | :-------------------------------------------------- |
| `dashboards/` | **Navigation**        | `HOME.md`, `TASKS.md` (Master task list).           |
| `domains/`    | **Knowledge Areas**   | Isolated business areas (PascalCase).               |
| `work/`       | **Shared Operations** | Cross-domain 1-1s, incidents, and reviews.          |
| `inbox/`      | **Entry Point**       | Unprocessed (`raw`) and classified (`ready`) notes. |
| `brain/`      | **Operating System**  | Memories, Patterns, Gotchas, and the `NORTH_STAR`.  |
| `plan/`       | **Time & Rhythm**     | Daily notes and Weekly goals.                       |
| `thinking/`   | **Scratchpad**        | Session logs and temporary reasoning drafts.        |

---

> [!TIP] Pro Tip: Session Kickoff
> The system auto-loads your `NORTH_STAR.md` at the start of every session. Keep it updated with your highest-leverage priorities to keep the AI focused.
