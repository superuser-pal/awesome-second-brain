# PAL Second Brain - Requirements Documentation

**Version:** 1.1.0
**Last Updated:** 2026-04-05

---

## Overview

Functional requirements for the PAL Second Brain vault system. Written for developers extending the system and users understanding expected behavior.

All requirements use the **Given-When-Then** format (BDD/Gherkin style).

---

## Document Index

| Document | ID Range | Purpose |
|----------|----------|---------|
| [00_CORE_SYSTEM.md](00_CORE_SYSTEM.md) | `0.X.Y` | Core architecture, vault structure, session lifecycle |
| [01_DOMAINS.md](01_DOMAINS.md) | `1.X.Y` | Domain creation, validation, mapping, archiving |
| [02_INBOX.md](02_INBOX.md) | `2.X.Y` | Inbox capture flow (capture, process, distribute) |
| [03_HOOKS.md](03_HOOKS.md) | `3.X.Y` | Hooks (SessionStart, UserPromptSubmit, PostToolUse, PreToolUse, PreCompact, Stop) |
| [04_COMMANDS.md](04_COMMANDS.md) | `4.X.Y` | Slash commands (open-day, close-day, weekly, week-prep, week-close, week-cycle, project-create, task-sync, etc.) |

---

## Requirement ID System

```
[DOCUMENT].[SECTION].[REQUIREMENT]
```

| Prefix | Document |
|--------|----------|
| `0` | Core System |
| `1` | Domains |
| `2` | Inbox |
| `3` | Hooks |
| `4` | Commands |

---

## Requirement Format

```markdown
### X.Y.Z Requirement Name

**Given** [a starting condition or context]
**When** [an action or event occurs]
**Then** [the expected outcome]

Category: [Functional | Validation | Security | UI]
Verification: [How to test this requirement]
Source: [Link to the implementation file]
```

### Categories

| Category | Description |
|----------|-------------|
| **Functional** | Core behavior the system must perform |
| **Validation** | Checks, verification, error prevention |
| **Security** | Safety, guardrails, access control |
| **UI** | User interface, display formatting |

---

## Requirements Summary

| Document | Sections | Requirements |
|----------|----------|--------------|
| Core System | 6 | 26 (+3 naming, +2 agent system) |
| Domains | 4 | 16 |
| Inbox | 3 | 12 |
| Hooks | 6 | 14 |
| Commands | 6 | 22 (+3 domain agent commands) |
| **Total** | **25** | **90** |
