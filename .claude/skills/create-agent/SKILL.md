---
name: create-agent
description: Create and validate Domain Agents for PAL Second Brain. USE WHEN create agent, new agent, domain agent, validate agent, check agent.
user-invocable: false
---

# create-agent

Creates Domain Agents — interactive, domain-bound agents that load domain context and maintain focus within a single knowledge area. Distinct from Subagents (which are task-specific and invoked by commands).

## Authoritative Sources

Read these before creating any agent:
- `.claude/core/system/AGENT-BASE.md` — shared behavioral constraints
- This SKILL.md — naming conventions and creation checklist

## Two Agent Types in PAL Second Brain

| Type | Format | Invoked by | Purpose |
|------|--------|-----------|---------|
| **Subagents** | `tools/model/maxTurns/skills` | Slash commands | Isolated tasks: scanning, migrating, auditing |
| **Domain Agents** | `domain/tools/model/skills` (no maxTurns) | User via `/agent:[name]` | Interactive domain context |

This skill creates **Domain Agents** only. Do not modify Subagents.

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Agent file | `kebab-case.md` | `laralou-agent.md` |
| Agent `name:` YAML field | `kebab-case` | `name: laralou-agent` |
| Agent `domain:` YAML field | `PascalCase` | `domain: LaraLou` |
| Activation command | `.claude/commands/agent/kebab-case.md` | `laralou-agent.md` |

## Pre-Creation Checks

Before creating:
1. Domain `domains/[Name]/` must exist with `INDEX.md`
2. No existing agent with the same name in `.claude/agents/`
3. No existing command file at `.claude/commands/agent/[name].md`

## Workflow Routing

| Workflow | Trigger |
|----------|---------|
| `create-agent` | "create agent", "new agent", "domain agent" |
| `validate-agent` | "validate agent", "check agent" |

## Quick Reference

- Agent file: `.claude/agents/kebab-case.md`
- Command file: `.claude/commands/agent/kebab-case.md`
- AGENT-BASE.md path: `.claude/core/system/AGENT-BASE.md`
- 5-section structure (see `agent_template.md`)
- Post-creation: Register in CLAUDE.md Domain Agents section + Skills.md
