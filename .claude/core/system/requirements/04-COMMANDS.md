# Awesome Second Brain - Command Requirements

**Version:** 1.0.0
**Last Updated:** 2026-05-01

---

## 4.1 Daily Workflow Commands

### 4.1.1 Open Day Morning Kickoff

**Given** the user invokes /open-day
**When** the command executes
**Then** it reads dashboards/HOME.md, North Star, work/INDEX.md, daily notes, open tasks, and recent git activity — presents a structured summary — then runs the morning-checkin workflow: checks active week in plan/, creates today's daily note (plan/DD-MM-YY-XX.md) if absent, asks for top 1-3 focus areas, and marks selected tasks [/] in source files

Category: Functional
Verification: Run /open-day and confirm all open-day sections appear, then confirm today's daily note is created in plan/ and focus tasks are marked [/]
Source: [open-day.md](../../commands/rituals/open-day.md)

---

### 4.1.2 Dump as Power Shortcut

**Given** the user invokes /dump with freeform content
**When** the command processes the input
**Then** each piece of information is classified, existing notes are searched for duplicates (QMD/obsidian search), notes are created or updated in correct folders with full frontmatter and wikilinks, and indexes are updated

Category: Functional
Verification: Run /dump with mixed content and confirm proper routing
Source: [quick-dump.md](../../commands/capture/quick-dump.md)

---

### 4.1.3 Close Day Session Review

**Given** the user invokes /close-day (or says "wrap up", "close day")
**When** the command executes
**Then** it verifies all notes have frontmatter, links are complete, indexes are updated, wins-capture agent runs — then runs the evening-review workflow: prompts for accomplishments and learnings, marks done tasks [x] in source files and active week file, suggests tomorrow's priorities, and appends the evening review section to today's daily note in plan/

Category: Functional
Verification: Run /close-day and confirm full review output, then confirm evening section is appended to today's plan/DD-MM-YY-XX.md
Source: [close-day.md](../../commands/rituals/close-day.md)

---

### 4.1.4 Weekly Synthesis

**Given** the user invokes /weekly
**When** the command executes
**Then** it performs cross-session synthesis: North Star alignment check, pattern detection, uncaptured wins, and priority suggestions for next week

Category: Functional
Verification: Run /weekly and confirm synthesis output with North Star alignment
Source: [weekly.md](../../commands/rituals/weekly.md)

---

## 4.2 Capture Commands

### 4.2.1 Capture Stage 1

**Given** the user invokes /general
**When** content is provided
**Then** a raw note is created in inbox/raw/ with date frontmatter and optional observation categories

Category: Functional
Verification: Run /general and confirm note in inbox/raw/
Source: [general.md](../../commands/capture/general.md)

---

### 4.2.2 Process Stage 2

**Given** the user invokes /process
**When** unprocessed notes exist in inbox/raw/
**Then** each note gets full frontmatter (domain, type, tags, description), observation categories are preserved, and notes are moved to inbox/ready/

Category: Functional
Verification: Run /process with raw notes and confirm they move to inbox/ready/ with frontmatter
Source: [process.md](../../commands/process.md)

---

### 4.2.3 Distribute Stage 3

**Given** the user invokes /distribute
**When** processed notes exist in inbox/ready/
**Then** a routing plan is shown, user confirms, notes are moved to domains/[name]/02_PAGES/, wikilinks are added, indexes are updated, and actions are extracted

Category: Functional
Verification: Run /distribute and confirm plan + execution
Source: [distribute.md](../../commands/distribute.md)

---

## 4.3 Review Commands

### 4.3.1 Review Brief Generation

**Given** the user invokes /brief with "manager" or "peers"
**When** the command executes
**Then** all performance evidence (wins doc, work notes, decisions, incidents, 1:1 feedback, competency backlinks) is aggregated into a structured review brief

Category: Functional
Verification: Run /brief manager and confirm structured output
Source: [brief.md](../../commands/review/brief.md)

---

### 4.3.2 Vault Audit

**Given** the user invokes /audit
**When** the command executes
**Then** indexes are checked for consistency, orphan notes are found, frontmatter is validated, stale notes are flagged, folder placement is verified, and thinking/ is checked for leftover drafts

Category: Functional
Verification: Run /audit and confirm comprehensive audit report
Source: [audit.md](../../commands/core/audit.md)

---

### 4.3.3 Project Archive

**Given** the user invokes /project-archive
**When** the command executes
**Then** the completed project is moved from work/01_PROJECTS/ to work/07_ARCHIVE/YYYY/, status is set to completed, and work/INDEX.md is updated

Category: Functional
Verification: Run /project-archive on an active project and confirm it moves to 03_ARCHIVE/
Source: [project-archive.md](../../commands/manage/project-archive.md)

---

## 4.4 Weekly Planning Commands

### 4.4.1 Plan Week

**Given** the user invokes /week-prep
**When** the command executes
**Then** it warns if an active week already exists, calculates the ISO week number and dates, asks for a week goal, shows open tasks from dashboards/TASKS.md for selection (3-7 tasks), creates plan/W[week]_YYYY-MM-DD.md, and activates the week by marking committed tasks [/] in source files

Category: Functional
Verification: Run /week-prep and confirm week file created in plan/, committed tasks marked [/] in source project files
Source: [week-prep.md](../../commands/rituals/week-prep.md)

---

### 4.4.2 Close Week

**Given** the user invokes /week-close
**When** the command executes
**Then** it loads the active week from plan/, calculates velocity (completed/planned), prompts to handle each incomplete task (carry forward/backlog/drop/pause), gathers a retrospective, consolidates daily notes from plan/ into the week file, deletes the individual daily notes, and archives the week file to plan/archive/W[week].md

Category: Functional
Verification: Run /week-close with an active week and confirm: velocity calculated, daily notes removed, week file archived to plan/archive/
Source: [week-close.md](../../commands/rituals/week-close.md)

---

### 4.4.3 Week Cycle Orchestrator

**Given** the user invokes /week-cycle
**When** the command executes
**Then** it closes the active week if one exists (weekly-closing), runs /weekly for cross-session analysis, and then runs weekly-planning to set up the next week — presenting a compact summary of all three phases

Category: Functional
Verification: Run /week-cycle with an active week and confirm all three phases execute in sequence
Source: [week-cycle.md](../../commands/rituals/week-cycle.md)

---

## 4.5 Project Management Commands

### 4.5.1 Create Domain Project

**Given** the user invokes /project-create
**When** the command executes
**Then** it lists available domains, collects project name, goal, priority, and initial tasks, creates domains/[name]/02_PROJECTS/PROJECT_[NAME].md with correct frontmatter, adds the project to the domain's INDEX.md, and updates dashboards/TASKS.md

Category: Functional
Verification: Run /project-create, confirm project file exists in domains/[name]/02_PROJECTS/, domain INDEX.md is updated, and TASKS.md reflects the new project
Source: [project-create.md](../../commands/manage/project-create.md)

---

### 4.5.2 Sync Tasks — Pull

**Given** the user invokes /task-sync (no argument or "pull")
**When** the command executes
**Then** it scans all domains/*/01_PROJECTS/PROJECT_*.md and work/01_PROJECTS/, extracts tasks by status, tags each task with its source, and writes the aggregated result to dashboards/TASKS.md with updated metadata (last_pulled, total counts, alerts)

Category: Functional
Verification: Add a task to a domain project, run /task-sync, confirm the task appears in dashboards/TASKS.md under the correct domain
Source: [task-sync.md](../../commands/manage/task-sync.md)

---

### 4.5.3 Sync Tasks — Push

**Given** the user invokes /task-sync push
**When** the command executes
**Then** it reads dashboards/TASKS.md, detects checkbox changes compared to source files, prompts on conflicts (source newer than last_pulled), applies non-conflicting changes to source project files, and updates last_updated frontmatter in modified files

Category: Functional
Verification: Change a task checkbox in TASKS.md, run /task-sync push, confirm the change is reflected in the source project file
Source: [task-sync.md](../../commands/manage/task-sync.md)

---

## 4.6 Domain Agent Commands

### 4.6.1 Domain Agent Activation

**Given** the user invokes `/agent:[name]` (e.g., `/agent:laralou-agent`)
**When** the command executes
**Then** it reads the agent file from `.claude/agents/[name].md`, loads all `[AUTO]` files from §2 Activation Context, indexes `[REF]` paths, displays the agent greeting with role and command menu, and waits for user input

Category: Functional
Verification: Create a domain agent, invoke its command, confirm INDEX.md is loaded, confirm *menu shows 3 base items (plus any custom items)
Source: [.claude/commands/agent/](../../commands/agent/)

---

### 4.6.2 Domain Agent Dismissal

**Given** the user issues `*dismiss` within a Domain Agent session
**When** the command executes
**Then** the agent asks if a session note should be saved to `thinking/sessions/YYYY-MM-DD-[domain]-[topic].md`, creates it if confirmed, then clears the agent persona and returns to normal vault mode

Category: Functional
Verification: Run *dismiss, confirm session note option is presented, confirm agent persona is cleared
Source: [.claude/core/system/AGENT-BASE.md](../AGENT-BASE.md)

---

### 4.6.3 Domain Agent Scope Confinement

**Given** a user sends a request outside the Domain Agent's domain while in an agent session
**When** the AI Agent detects the out-of-scope request
**Then** the agent declines to handle it, states it's outside the domain scope, and suggests issuing `*dismiss` to return to normal vault mode

Category: Functional
Verification: Load a domain agent, request work from a different domain, confirm refusal and *dismiss suggestion
Source: [.claude/core/system/AGENT-BASE.md](../AGENT-BASE.md)
