---
title: PAL Second Brain Agents System
version: 1.0.0
layer: SYSTEM
purpose: Agent types, naming conventions, schemas, and lifecycle rules
last_updated: 2026-04-05
---

## 1. Two Agent Types

All agents live in `.claude/agents/`. The **presence or absence of `maxTurns`** in frontmatter is the definitive signal:

| Type | `maxTurns` | Invocation | Purpose |
|------|-----------|-----------|---------|
| **Subagent** | Yes (required) | By commands (e.g., `/wrap-up` calls `wins-capture`) | Task-bound, isolated context window, bounded turns |
| **Domain Agent** | No (prohibited) | By user via `/agent:[name]` command | Conversational, domain-bound, interactive sessions |

---

## 2. Naming Conventions

| Entity | Pattern | Example |
|--------|---------|---------|
| Agent file | `kebab-case.md` | `wins-capture.md` |
| `name:` YAML field | `kebab-case` | `name: wins-capture` |
| `domain:` YAML field | `PascalCase` matching directory | `domain: LaraLou` |
| Invocation command | `.claude/commands/agent/kebab-case.md` | `laralou-agent.md` |

---

## 3. Subagent Schema

```markdown
---
name: agent-name
description: One-line description of what this agent does.
maxTurns: 10
---

# Agent Name

## Role
What this agent is and what it specializes in.

## Inputs
- What data or context this agent expects to receive.

## Steps
1. First action.
2. Second action.
3. Third action.

## Outputs
- What the agent produces (file paths, reports, summaries).

## Constraints
- Any behavioral limits (e.g., read-only, domain-scoped, do not modify X).
```

**Rules:**
- `maxTurns` MUST be set. Choose a value appropriate to task complexity (5–20).
- Subagents are invoked programmatically by commands — they do not greet the user.
- Subagents MUST stay within their defined scope. If inputs are missing, halt and report.

---

## 4. Domain Agent Schema

Domain Agents inherit base behavior from `.claude/core/system/AGENT-BASE.md`. Only domain-specific content goes in the agent file.

```markdown
---
name: agent-name
description: One-line description of the domain and this agent's focus.
domain: DomainName
---

# Agent Name
> Inherits shared behavior from `.claude/core/system/AGENT-BASE.md`

## 1. Identity & Persona
- Role in this domain.
- Communication style and constraints.

## 2. Activation Context
- [AUTO] `domains/[Name]/INDEX.md`
- [REF] `domains/[Name]/01_PROJECTS/`
- [REF] `domains/[Name]/02_PAGES/`
- [REF] `domains/[Name]/05_ARCHIVE/`

## 3. Custom Commands
4. `*custom` — description → action

## 4. Routing Rules
- Edge cases or exceptions specific to this domain.

## 5. Custom Behavior
- Any overrides to standard AGENT-BASE behavior.
```

**Rules:**
- `domain:` field MUST match an existing `domains/[Name]/` directory (PascalCase).
- `maxTurns` MUST NOT be set — these are open-ended sessions.
- Sections 1–5 are the only content. Do not add extra sections.

---

## 5. Context Loading Labels

Use these labels in Domain Agent `## 2. Activation Context`:

| Label | Behavior |
|-------|---------|
| `[AUTO]` | Load the file immediately at activation |
| `[REF]` | Index the path only — load on demand when user requests it |

---

## 6. Current Agents

### Subagents (invoked by commands)

| File | `maxTurns` | Purpose | Invoked by |
|------|-----------|---------|-----------|
| `wins-capture.md` | — | Finds uncaptured wins and competency gaps | `/wrap-up`, `/weekly` |
| `context-loader.md` | — | Loads vault context about a person, project, or concept | Direct |
| `cross-linker.md` | — | Finds missing wikilinks, orphans, broken backlinks | `/vault-audit` |
| `contact-importer.md` | — | Bulk creates/updates person notes from Slack profiles | `/incident-capture` |
| `review-fact-checker.md` | — | Verifies review draft claims against vault sources | `/self-review`, `/review-peer` |
| `review-prep.md` | — | Aggregates performance evidence for a review period | `/review-brief` |
| `slack-archaeologist.md` | — | Full Slack reconstruction (messages, threads, profiles) | `/incident-capture` |
| `vault-librarian.md` | — | Deep vault maintenance — orphans, broken links, stale notes | `/vault-audit` |
| `vault-migrator.md` | — | Classifies and migrates content from a source vault | `/vault-upgrade` |

### Domain Agents

None yet. Create with the `create-agent` skill.

---

**Related Files:** `AGENT-BASE.md`, `ORCHESTRATION.md`, `DOMAINS-LOGIC.md`
