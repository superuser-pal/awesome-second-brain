# PAL Second Brain - Hook Requirements

**Version:** 1.0.0
**Last Updated:** 2026-04-04

---

## 3.1 SessionStart

### 3.1.1 QMD Re-Index

**Given** a session starts
**When** the SessionStart hook fires
**Then** `qmd update` runs for incremental semantic index refresh (non-blocking if QMD not installed)

Category: Functional
Verification: Start a session and confirm QMD updates or gracefully skips
Source: [session-start.sh](../../scripts/session-start.sh)

---

### 3.1.2 Context Injection

**Given** a session starts
**When** the SessionStart hook fires
**Then** the following context is injected: date, North Star (first 30 lines), recent git changes (48h), open tasks, active work, domain summary, inbox pending count, vault file listing

Category: Functional
Verification: Start a session and confirm all sections appear in output
Source: [session-start.sh](../../scripts/session-start.sh)

---

## 3.2 UserPromptSubmit

### 3.2.1 Content Type Classification

**Given** a user sends a message
**When** the UserPromptSubmit hook fires
**Then** the message is checked against signal patterns for: decision, incident, 1:1, win, architecture, person context, project update — matching signals inject routing hints

Category: Functional
Verification: Send "we decided to go with option B" and confirm DECISION hint appears
Source: [classify-message.ts](../../scripts/hooks/classify-message.ts)

---

### 3.2.2 Domain Detection

**Given** domains are registered in classify-message.ts's signal patterns (via `hooks/lib/signals.ts`)
**When** a message matches domain signal words
**Then** a DOMAIN routing hint is injected (e.g., "DOMAIN: laralou detected — route to domains/laralou/")

Category: Functional
Verification: Register a domain's signals, send a matching message, confirm domain hint
Source: [classify-message.ts](../../scripts/hooks/classify-message.ts)

---

## 3.3 PostToolUse

### 3.3.1 Global Frontmatter Validation

**Given** a .md file is written or edited (not in .claude/, .obsidian/, thinking/)
**When** the PostToolUse hook fires
**Then** the file is checked for: YAML frontmatter presence, `date` field, `description` field, `tags` field

Category: Validation
Verification: Write a note without description and confirm warning appears
Source: [validate-write.ts](../../scripts/hooks/validate-write.ts)

---

### 3.3.2 Domain Schema Validation

**Given** a .md file is written in domains/ or inbox/
**When** the PostToolUse hook fires
**Then** the file is validated against its type-specific schema (Domain INDEX, Project, Memory, Page, Inbox Raw, Inbox Ready) — missing fields are reported

Category: Validation
Verification: Write a domain project without `priority` field and confirm specific warning
Source: [validate-write.ts](../../scripts/hooks/validate-write.ts)

---

### 3.3.3 Wikilink Presence Check

**Given** a .md file longer than 300 characters is written
**When** PostToolUse validates it
**Then** the file is checked for at least one `[[wikilink]]` — missing links trigger a warning

Category: Validation
Verification: Write a long note without wikilinks and confirm warning
Source: [validate-write.ts](../../scripts/hooks/validate-write.ts)

---

## 3.4 PreToolUse

### 3.4.1 Credential Detection

**Given** content is being written via Write/Edit
**When** the PreToolUse hook scans the content
**Then** patterns matching API keys, AWS AKIA, Stripe sk_live_, GitHub ghp_, private keys, and DB connection strings are blocked (exit code 2)

Category: Security
Verification: Attempt to write `ghp_abcdefghijklmnopqrstuvwxyz012345678` and confirm block
Source: [pre-tool-use.ts](../../scripts/hooks/pre-tool-use.ts)

---

### 3.4.2 Destructive Command Detection

**Given** a Bash command is being executed
**When** the PreToolUse hook scans the command
**Then** patterns like `rm -rf /`, `git push --force main`, `DROP TABLE`, `chmod 777` are blocked

Category: Security
Verification: Attempt `rm -rf ~/` and confirm block
Source: [pre-tool-use.ts](../../scripts/hooks/pre-tool-use.ts)

---

### 3.4.3 Path Restriction

**Given** a Write/Edit operation targets a file path
**When** the path matches restricted patterns (/etc/, /usr/, ~/.ssh/, ~/.aws/, .env)
**Then** the operation is blocked

Category: Security
Verification: Attempt to write to `/etc/test.md` and confirm block
Source: [pre-tool-use.ts](../../scripts/hooks/pre-tool-use.ts)

---

## 3.5 PreCompact

### 3.5.1 Session Transcript Backup

**Given** context compaction is about to occur
**When** the PreCompact hook fires
**Then** the current session transcript is backed up to `thinking/session-logs/`

Category: Functional
Verification: Trigger compaction and confirm backup file appears
Source: [pre-compact.sh](../../scripts/pre-compact.sh)

---

## 3.6 Stop

### 3.6.1 End-of-Session Checklist

**Given** a session ends
**When** the Stop hook fires
**Then** a checklist reminder is printed: archive completed projects, update indexes, check orphans, check inbox, run /audit if many notes created

Category: UI
Verification: End a session and confirm checklist appears
Source: [settings.json](../../settings.json)
