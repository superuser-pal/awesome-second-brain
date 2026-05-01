---
title: Awesome Second Brain Memory System
version: 1.0.0
layer: SYSTEM
purpose: Vault-first memory model, brain files, hook lifecycle, and session state
last_updated: 2026-05-01
---

## 1. Vault-First Memory Principle

All durable knowledge lives in the vault, not in `~/.claude/`. When the user says "remember X":

1. Identify the appropriate `brain/` topic note.
2. Write the knowledge there with a wikilink to the context note.
3. If a new topic note is created, add it to `MEMORIES.md` index.
4. Do NOT create files in `~/.claude/projects/.../memory/` — they are not git-tracked or Obsidian-browsable.

The `~/.claude/` MEMORY.md is a pointer index only. It points to vault brain notes.

---

## 2. Brain Files

All files live in `brain/`:

| File | Purpose |
|------|---------|
| `MEMORIES.md` | Index of memory topics — pointers to topic notes. Add new topics here. |
| `NORTH_STAR.md` | Living goals document — read at session start, update when goals shift. |
| `LOGIC.md` | Significant decisions with context and rationale. |
| `RULES.md` | Recurring behaviors, workflows, codebase patterns observed over time. |
| `CAVEATS.md` | Specific gotchas, pitfalls, "remember not to" items. |
| `SKILLS.md` | Vault-specific workflows, slash commands, and AI Agent capabilities registered here. |

**Usage rules:**
- `NORTH_STAR.md` is read at every substantial session start (injected by `session-start.sh`).
- When adding a memory, route it to the specific topic note (Gotchas, Patterns, etc.) — not to `MEMORIES.md` directly.
- `MEMORIES.md` is an index: one line per topic note with a wikilink and brief description.

---

## 3. Hook Lifecycle

Five hooks fire at defined events:

| Hook | Script | Event | Required Actions |
|------|--------|-------|-----------------|
| **SessionStart** | `session-start.sh` | On startup or resume | Inject date, North Star, active work, recent git log, open tasks, domain summary, inbox status, full file listing |
| **UserPromptSubmit** | `hooks/classify-message.ts` | Every user message | Classify content type (decision, incident, win, 1:1, architecture, person, project update) and inject domain routing hints |
| **PostToolUse** | `hooks/validate-write.ts` | After any `.md` file is written | Validate: YAML frontmatter exists, required fields present per Zod schema, at least one wikilink in content area notes, folder placement correct |
| **PreToolUse** | `hooks/pre-tool-use.ts` | Before any tool executes | Block: hardcoded credentials, restricted paths, destructive commands (rm -rf /, git push --force main, DROP TABLE). Warn: PII outside exception paths |
| **PreCompact** | `pre-compact.sh` | Before context compaction | Back up session transcript to `thinking/session-logs/` |

The Stop hook is a lightweight checklist reminder (archive, update indexes, check orphans). For thorough session close, use `/close-day` instead.

---

## 4. Frontmatter Validation Rules (PostToolUse)

`hooks/validate-write.ts` enforces these rules on write (using Zod schemas from `hooks/lib/schemas.ts`):

| File type | Required fields |
|-----------|----------------|
| Any `.md` in content areas (not thinking/, not .claude/) | `date`, `description`, `tags` |
| `domains/*/INDEX.md` | `name`, `description`, `status`, `last_updated` |
| `domains/*/01_PROJECTS/PROJECT_*.md` | `name`, `domain`, `goal`, `status`, `priority`, `tags`, `created`, `last_updated` |
| `inbox/ready/*.md` | `name`, `domain`, `origin`, `type`, `status`, `description`, `tags`, `created`, `last_updated` |

Wikilink check: every note in a content area (not thinking/, not .claude/) must contain at least one `[[wikilink]]`.

---

## 5. Session State

Awesome Second Brain does not use a `.current-session` file (unlike earlier iterations). Domain Agent sessions are informal:
- On `*dismiss`, the agent asks if a session note should be saved.
- If yes: write `thinking/sessions/YYYY-MM-DD-[domain]-[topic].md`.
- Session notes are scratchpad quality — promote durable findings to proper vault notes.

---

## 6. Short-Term vs Long-Term Memory

| Type | Location | Duration |
|------|---------|---------|
| Short-term | Active conversation transcript | Current session only |
| Long-term (vault) | `brain/` topic notes | Persistent, git-tracked |
| Long-term (domain) | `domains/[Name]/02_PAGES/` (type: reference) | Persistent, domain-scoped |
| Session notes | `thinking/sessions/` | Scratchpad — promote or delete |

---

**Related Files:** `ARCHITECTURE.md`, `ORCHESTRATION.md`, `TOOLBOX.md`
