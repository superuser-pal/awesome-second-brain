---
title: 01 - Welcome to ASB
description: What ASB is, the PADA method, how it's built, and getting started
tags:
  - guide
  - getting-started
  - pal
series: Awesome Second Brain Guide
order: 1
---

# 01 — Welcome to ASB

> Your AI-powered second brain — organized, persistent, and built to improve how you give and store knowledge to AI

---

## What is ASB?

ASB is basically how I handle context and make it useful in subsequent sessions. ions. I got tired of repeating myself to Claude in every session—re-explaining my details, the latest progress, and what I had worked on the previous day. Moreover, all the valuable content generated through my LLM interactions seemed scattered, with no reference to it and no organized place to store it.

So I built ASB on top of Claude Code and Obsidian. It’s a framework that ensures the AI **remembers what you are working on**, **knows your projects, and **organizes the output from your AI sparring sessions**. 

When you start a session, ASB automatically loads your preferences and project context. You just capture ideas, notes, and tasks, and ASB handles distributing and organizing them in your second brain.

---

## The PADA Method: Domains First

ASB uses the **PADA method** (avoiding TM infringment here) to keep things organized. The core idea is simple:

> **Start with a Domain.**

A **Domain** is just a workspace for one specific part of your life. It's a folder with its own context and, if you want, its own specialized AI agent.

```
Examples:
  Work/         → Client work, meetings, projects
  Personal/     → Personal goals, routines, "lessons learned"
  SideProject/  → That app idea you're hacking on
  Learning/     → Courses, research, reading notes
```

**Why domains first?** Because the AI performs best when the context is focused. A domain keeps one area's information isolated from everything else — no bleed, no confusion.

From there:

- **Projects** are optional — create them inside a domain when you have specific initiatives to track
- **Agents** are optional — create one when you want a specialized AI persona for extended work in that domain

You'll learn how to create all three in the [next guide](02-domains-and-projects.md).

---

## How ASB Is Built

Awesome Second Brain operates across three distinct layers, organized to keep your data safe and the AI focused:

| Layer      | Purpose                               | Key Paths                                                                                      |
|------------|---------------------------------------|------------------------------------------------------------------------------------------------ |
| **VAULT**  | User content — your actual knowledge  | `work/`, `plan/`, `domains/`, `inbox/`, `thinking/`                                             |
| **CLAUDE** | Behavior layer — how the AI acts      | `.claude/agents/`, `.claude/skills/`, `.claude/commands/`, `.claude/scripts/`, `.claude/core/` |
| **HOOK**   | Automation layer — lifecycle events   | `session-start.sh`, `classify-message.ts`, `validate-write.ts`, `pre-tool-use.ts`                |

### The Four System Blocks

**Commands** — Slash commands to trigger specific workflows instantly (e.g., `/open-day`, `/dump`, `/close-day`). Defined in `.claude/commands/`.

**Skills** — Reusable capabilities the AI leverages automatically or when commanded (e.g., `obsidian-markdown` to format notes, `qmd` for semantic search, or `create-domain` to scaffold folders).

**Agents** — Broken down into two types:
- **Subagents**: Task-bound agents that run silently in the background (like `wins-capture` finding your uncaptured achievements).
- **Domain Agents**: Interactive personas bounding the AI to a specific domain context (loaded via `/agent:[name]`).

**Domains & Work** — Information is split between siloed workspaces for specific topics (`domains/`) and cross-domain operational notes for day-to-day business (`work/`). Every domain has an `INDEX.md` mapping its contents, and the standard structure is always `01_PROJECTS/`, `02_PAGES/`, `03_ARCHIVE/`.

### The Core Hooks

ASB uses an automation layer running quietly in the background:

| Hook                  | Trigger           | Purpose                                                                               |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `session-start.sh`    | Session begins    | Injects today's context, your North Star goals, open tasks, and recent notes history. |
| `classify-message.ts` | On prompting      | Evaluates your message for capture intents and hints routing.                         |
| `pre-tool-use.ts`     | Before any action | Ensures the AI follows Guardrails (doesn't modify settings/secrets).                  |
| `validate-write.ts`   | After saving      | Automatically enforces correct YAML front matter and alerts for missing wikilinks.    |

---

## Getting Started

### 1. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

> Requires an Anthropic subscription. See [claude.com/pricing](https://claude.com/pricing).

### 2. Open Obsidian

1. Download [Obsidian](https://obsidian.md)
2. Open folder as vault → select your `awesome-second-brain` folder
3. Trust the author when prompted. The vault has bases and canvas skills ready.

### 3. Run Your First Session

Open your terminal and navigate to your vault folder, then start Claude:

```bash
cd ~/path/to/awesome-second-brain
claude
```

Because of `session-start.sh`, Claude already has the context of your vault loaded. Try starting your day with the opening ritual:

```
/open-day
```

### 4. Explore

The old `*command` syntax is gone. You now interact via natural language or defined slash commands. Try some of the core capabilities:

| Command        | What It Does                                                               |
|----------------|----------------------------------------------------------------------------|
| `/dump`        | The ultimate quick-capture: takes your raw thought, classifies and routes. |
| `/close-day`   | Finishes your session, verifies links, updates indexes and logs wins.      |
| `/week-cycle`  | Full weekly review and planning logic in one shot.                         |
| `/project-create` | Scaffolds a new standard project in a domain.                            |

For a complete list of commands and system capabilities, tell Claude to read the writable registry located at `.claude/core/reference/SYSTEM-INDEX.md`.

---

**Next:** [02 — Domains & Projects](02-domains-and-projects.md)
