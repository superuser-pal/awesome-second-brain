---
title: PAL Second Brain Architecture
version: 1.0.0
layer: SYSTEM
purpose: System layers, vault map, and extension points
last_updated: 2026-04-05
---

## 1. System Layers

PAL Second Brain operates across 3 layers:

| Layer | Purpose | Key Paths |
|-------|---------|-----------|
| **VAULT** | User content — notes, projects, decisions, reviews | `work/`, `plan/`, `domains/`, `inbox/`, `thinking/`, `dashboards/`, `bases/` |
| **CLAUDE** | Behavior layer — agents, skills, commands, scripts, core docs | `.claude/agents/`, `.claude/skills/`, `.claude/commands/`, `.claude/scripts/`, `.claude/core/` |
| **HOOK** | Automation layer — lifecycle scripts that fire at events | `.claude/scripts/` (session-start, classify-message, validate-write, pre-tool-use, pre-compact) |

---

## 2. System Map

```text
┌─────────────────────────────────────────────────────────────────────┐
│                          USER INPUT                                 │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                     UserPromptSubmit Hook                           │
│         classify-message.py — content type + domain routing hints  │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         CLAUDE ROUTING                              │
│  Intent → Command / Skill / Domain Agent / Direct Response          │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
          ┌───────────────────────┼───────────────────────┐
          ↓                       ↓                       ↓
    ┌───────────┐           ┌───────────┐         ┌───────────────┐
    │  COMMANDS │           │  SKILLS   │         │ DOMAIN AGENTS │
    │ /standup  │           │ create-   │         │ /agent:[name] │
    │ /dump     │           │ domain    │         │ (interactive) │
    │ /wrap-up  │           │ daily-    │         └───────────────┘
    │ etc.      │           │ rituals   │
    └───────────┘           └───────────┘
          ↓                       ↓
    ┌────────────────────────────────────────────────────────┐
    │                   PreToolUse Hook                       │
    │         pre-tool-use.py — security validation          │
    └────────────────────────────────────────────────────────┘
                                  ↓
                           [ WRITE / EDIT ]
                                  ↓
    ┌────────────────────────────────────────────────────────┐
    │                  PostToolUse Hook                       │
    │   validate-write.py — frontmatter + wikilink checks   │
    └────────────────────────────────────────────────────────┘
                                  ↓
    ┌────────────────────────────────────────────────────────┐
    │                  SessionStart Hook                      │
    │   session-start.sh — context injection at startup      │
    └────────────────────────────────────────────────────────┘
```

---

## 3. Vault Structure

```text
PAL Second Brain vault/
├── dashboards/          # Navigation (HOME.md, TASKS.md)
├── inbox/               # Capture entry point
│   ├── raw/             # Stage 1 — unprocessed captures
│   └── ready/           # Stage 2 — processed, awaiting distribution
├── work/                # Cross-domain work content
│   ├── active/          # Current work notes (1-3 files max)
│   ├── 07_ARCHIVE/YYYY/    # Completed work by year
│   ├── incidents/       # Incident docs
│   ├── 1-1/             # 1:1 meeting notes
│   ├── review/          # Performance framework, wins doc, evidence
│   └── org/             # People and teams
├── domains/             # Isolated knowledge areas
│   └── [Name]/          # PascalCase (INDEX.md + 01_PROJECTS, 02_PAGES, 05_ARCHIVE)
├── plan/                # Daily notes + weekly planning files
├── thinking/            # Scratchpad — drafts, reasoning
├── bases/               # Obsidian Bases views
└── .claude/             # Claude behavior layer
```

---

## 4. Extension Points

- **Skills** (`.claude/skills/`): Add new skills per `SKILL-LOGIC.md`. Must have `SKILL.md` + `workflows/`.
- **Domain Agents** (`.claude/agents/`): Create per `AGENTS-LOGIC.md`. Inherit from `AGENT-BASE.md`. Conversational, no `maxTurns`.
- **Subagents** (`.claude/agents/`): Task-bound, invoked by commands. Must declare `maxTurns` in frontmatter.
- **Commands** (`.claude/commands/`): Slash commands, each a single markdown file with numbered steps.
- **Scripts** (`.claude/scripts/`): Hook scripts in shell or Python. See `TOOLBOX.md`.

---

**Related Files:** `ORCHESTRATION.md`, `AGENTS-LOGIC.md`, `SKILL-LOGIC.md`, `DOMAINS-LOGIC.md`, `MEMORY-LOGIC.md`, `TOOLBOX.md`
