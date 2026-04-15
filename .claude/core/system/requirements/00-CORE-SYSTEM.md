# PAL Second Brain - Core System Requirements

**Version:** 1.0.0
**Last Updated:** 2026-04-04

---

## 0.1 Vault Structure

### 0.1.1 Graph-First Organization

**Given** notes exist in the vault
**When** a user or Claude creates or edits a note
**Then** the note must contain at least one `[[wikilink]]` to another existing note — orphan notes are bugs

Category: Functional
Verification: Create a note without wikilinks and confirm PostToolUse warns about missing links
Source: [CLAUDE.md](../../../CLAUDE.md)

---

### 0.1.2 Folder Purpose Separation

**Given** the vault has distinct top-level folders (work/, thinking/, domains/, inbox/, plan/, dashboards/)
**When** a note is created
**Then** it must be placed in the folder matching its purpose — domain-scoped content in domains/, cross-domain work in work/, review/performance content in work/05_REVIEW/, daily/weekly planning in plan/, drafts in thinking/

Category: Functional
Verification: Create a domain-specific note and confirm it routes to domains/[name]/ not work/
Source: [CLAUDE.md](../../../CLAUDE.md)

---

### 0.1.3 Dashboards Folder

**Given** the vault has a `dashboards/` root folder
**When** a user or Claude looks for vault navigation entry points or the master task list
**Then** `dashboards/HOME.md` is the vault entry point (embedded Base views, quick links) and `dashboards/TASKS.md` is the aggregated task list — no user notes live at vault root

Category: Functional
Verification: Confirm `Home.md` does not exist at vault root, `dashboards/HOME.md` exists, and `dashboards/TASKS.md` exists
Source: [CLAUDE.md](../../../CLAUDE.md)

---

### 0.1.4 Plan Folder for Daily and Weekly Planning

**Given** the vault has a `plan/` root folder
**When** daily notes or weekly planning files are created
**Then** daily notes are saved as `plan/DD-MM-YY-XX.md` (day suffix: MO/TU/WE/TH/FR/SA/SU) and weekly files as `plan/W[week]_YYYY-MM-DD.md` — closed weeks are archived to `plan/archive/W[week].md`

Category: Functional
Verification: Run /open-day and confirm daily note is created in `plan/`, run /plan-week and confirm week file is created in `plan/`
Source: [.claude/skills/daily-rituals/SKILL.md](../../skills/daily-rituals/SKILL.md)

---

### 0.1.5 Review Content Under work/05_REVIEW/

**Given** the vault tracks performance, competencies, wins docs, and review cycles
**When** review-related content is created
**Then** it is placed under `work/05_REVIEW/` — competency sections in `work/05_REVIEW/COMPETENCIES.md`, PR evidence in `work/05_REVIEW/EVIDENCE.md`, wins in `work/05_REVIEW/WINS.md`, review cycle briefs as `work/05_REVIEW/<CYCLE>.md`

Category: Functional
Verification: Run /peer-scan and confirm output is appended to `work/05_REVIEW/EVIDENCE.md`, not a separate file
Source: [CLAUDE.md](../../../CLAUDE.md)

---

### 0.1.6 Atomic Notes

**Given** a note covers 3+ independent concepts
**When** Claude detects multi-topic content
**Then** the content must be split into separate atomic notes that link to each other

Category: Functional
Verification: Dump a braindump with 3 unrelated topics and confirm it splits into separate notes
Source: [CLAUDE.md](../../../CLAUDE.md)

---

### 0.1.7 YAML Frontmatter Required

**Given** a markdown file is created in a content area (not thinking/, not .claude/)
**When** the file is written
**Then** it must have YAML frontmatter with at minimum `date`, `description`, and `tags`

Category: Validation
Verification: Write a note without frontmatter and confirm PostToolUse warns
Source: [validate-write.ts](../../scripts/hooks/validate-write.ts)

---

## 0.2 Session Lifecycle

### 0.2.1 Context Injection at Session Start

**Given** a user starts a new session
**When** the SessionStart hook fires
**Then** the system injects: date, North Star goals, active work, recent git changes, open tasks, domain summary, inbox status, and vault file listing

Category: Functional
Verification: Start a session and confirm all context sections appear
Source: [session-start.sh](../../scripts/session-start.sh)

---

### 0.2.2 Content Classification Per Message

**Given** the user sends a message
**When** the UserPromptSubmit hook fires
**Then** the message is classified against known content types (decision, incident, win, 1:1, architecture, person, project update) and domain signals, with routing hints injected

Category: Functional
Verification: Send "we decided to use PostgreSQL" and confirm DECISION routing hint appears
Source: [classify-message.ts](../../scripts/hooks/classify-message.ts)

---

### 0.2.3 Close Day on Session End

**Given** the user says "close day", "wrap up", "let's wrap", or similar
**When** Claude detects the close-day signal
**Then** the /close-day command is automatically invoked to verify notes, indexes, links, and suggest improvements

Category: Functional
Verification: Say "let's wrap up" and confirm /close-day workflow starts
Source: [CLAUDE.md](../../../CLAUDE.md)

---

## 0.3 Memory System

### 0.3.1 Vault-First Memory

**Given** durable knowledge needs to be persisted
**When** the user asks Claude to remember something
**Then** the knowledge is written to the appropriate `brain/` topic note with a wikilink to context — never to `~/.claude/` memory files

Category: Functional
Verification: Ask "remember that deploy windows are Tuesdays" and confirm it goes to user/GOTCHAS.md
Source: [CLAUDE.md](../../../CLAUDE.md)

---

### 0.3.2 North Star as Living Goals Document

**Given** `brain/NORTH_STAR.md` exists
**When** a substantial session starts
**Then** North Star is read and used to ground priority suggestions and trade-off decisions

Category: Functional
Verification: Start a session and confirm North Star content appears in context
Source: [session-start.sh](../../scripts/session-start.sh)

---

## 0.4 Security

### 0.4.1 Credential Blocking

**Given** content is being written to a file
**When** the PreToolUse hook detects hardcoded API keys, AWS keys, Stripe keys, GitHub tokens, private keys, or database connection strings with passwords
**Then** the operation is blocked with an error message suggesting environment variables

Category: Security
Verification: Attempt to write a file containing `sk_live_test1234567890abcdef` and confirm it's blocked
Source: [pre-tool-use.ts](../../scripts/hooks/pre-tool-use.ts)

---

### 0.4.2 Destructive Command Blocking

**Given** a bash command is being executed
**When** the PreToolUse hook detects patterns like `rm -rf /`, `git push --force main`, `DROP TABLE`, or `DELETE FROM` without WHERE
**Then** the operation is blocked

Category: Security
Verification: Attempt `rm -rf /tmp/test` and confirm it's blocked
Source: [pre-tool-use.ts](../../scripts/hooks/pre-tool-use.ts)

---

### 0.4.3 Restricted Path Blocking

**Given** a write or edit operation targets a file
**When** the file path matches restricted patterns (/etc/, /usr/, ~/.ssh/, ~/.aws/, .env files)
**Then** the operation is blocked

Category: Security
Verification: Attempt to write to `~/.ssh/test.md` and confirm it's blocked
Source: [pre-tool-use.ts](../../scripts/hooks/pre-tool-use.ts)

---

### 0.4.4 PII Warning

**Given** content contains patterns matching email, phone, SSN, or credit card numbers
**When** the file is not in a PII-exception path (work/06_ORG/PEOPLE.md, work/06_ORG/TEAMS.md)
**Then** a warning is emitted but the operation is allowed

Category: Security
Verification: Write an email address to a work note and confirm warning appears
Source: [pre-tool-use.ts](../../scripts/hooks/pre-tool-use.ts)

---

### 0.4.5 Zero Data Loss

**Given** files are being reorganized or moved
**When** Claude moves or renames files
**Then** `git mv` must be used — never raw delete + recreate

Category: Functional
Verification: Move a file and confirm git tracks it as a rename, not delete+add
Source: [CLAUDE.md](../../../CLAUDE.md)

---

## 0.5 Naming Conventions

### 0.5.1 Root Folder Capitalization

**Given** content is being placed in a root-level vault folder
**When** the path is constructed
**Then** root folders use PascalCase: `work/`, `plan/`, `dashboards/`, `inbox/`, `thinking/`, `bases/`, `domains/` — not lowercase

Category: Validation
Verification: Attempt to create a note at `work/01_PROJECTS/` and confirm PostToolUse places it correctly
Source: [CLAUDE.md](../../../CLAUDE.md)

---

### 0.5.2 Domain Directory Naming

**Given** a new domain is being created
**When** the domain directory is named
**Then** domain directories use PascalCase (e.g., `domains/LaraLou/`, `domains/PalFramework/`) and internal subfolders use numbered ALL CAPS (`01_PROJECTS/`, `02_PAGES/`, `03_ARCHIVE/`)

Category: Validation
Verification: Run create-domain skill and confirm PascalCase directory is created with numbered subfolders
Source: [.claude/skills/create-domain/SKILL.md](../../skills/create-domain/SKILL.md)

---

### 0.5.3 Agent File Naming

**Given** a Domain Agent or Subagent file is being created
**When** the file is named
**Then** agent files use `kebab-case.md` (e.g., `wins-capture.md`, `laralou-agent.md`) in `.claude/agents/`; Domain Agent activation commands use the same convention in `.claude/commands/agent/`; the `domain:` YAML field uses PascalCase matching the directory name

Category: Validation
Verification: Create a domain agent and confirm filename is kebab-case.md, domain: field is PascalCase
Source: [.claude/skills/create-agent/SKILL.md](../../skills/create-agent/SKILL.md)

---

## 0.6 Agent System

### 0.6.1 Two Agent Type Distinction

**Given** the vault has both Subagents and Domain Agents in `.claude/agents/`
**When** an agent is created
**Then** Subagents have `maxTurns` in frontmatter and are invoked by slash commands; Domain Agents have NO `maxTurns` and are invoked by the user via `/agent:[name]` commands — the presence or absence of `maxTurns` is the distinguishing signal

Category: Functional
Verification: Inspect agent files — confirm all 9 Subagents have maxTurns, confirm any Domain Agents do not
Source: [CLAUDE.md](../../../CLAUDE.md)

---

### 0.6.2 Domain Agent Context Loading

**Given** a Domain Agent is activated
**When** the activation sequence runs
**Then** only files marked `[AUTO]` in §2 Activation Context are loaded immediately; files marked `[REF]` are indexed but not read until the user requests them

Category: Functional
Verification: Activate a domain agent and confirm only [AUTO] files are loaded (Zero Trust respected)
Source: [.claude/core/system/AGENT-BASE.md](../AGENT-BASE.md)
