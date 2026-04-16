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

ASB (Patterned Agentic Logic) is basically how I handle context. I got tired of repeating myself to Claude every single session—re-explaining my details, the latest progress, and what I was working on ten minutes ago.

So I built ASB on top of Claude Code and Obsidian. It’s a framework that ensures the AI **remembers who you are**, **knows your projects**, and **picks up exactly where you left off**. No more starting from scratch every morning.

When you start a session, ASB automatically loads your identity and project context. You just capture ideas, notes and tasks, and ASB handles the distribution to your second brain.

---

## The PADA Method: Domains First

ASB uses the **PADA method** to keep things organized. The core idea is simple:

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

You'll learn how to create all three in the [next guide](./02-domains-and-projects.md).

---

## How ASB Is Built (NEEDS UPDATE)

Everything in ASB runs on three layers inside `.claude/`:

| Layer        | Purpose                       | Key Files                              |
| ------------ | ----------------------------- | -------------------------------------- |
| **USER**     | Your identity and preferences | ABOUTME.md, DIRECTIVES.md, CONTACTS.md |
| **SYSTEM**   | How ASB processes requests    | Skills, agents, orchestration          |
| **SECURITY** | What ASB will never do        | GUARDRAILS.md, REPOS_RULES.md          |

### The Three System Blocks (ADD COMMANDS)

**Skills** — Reusable capabilities that activate automatically based on your intent.
Say "I want to capture some thoughts" → the note-taking skill activates. No commands to memorize.

**Agents** — Specialized AI personas for focused domain work.
Load with `/agent-name` (e.g., `/life-coach`). Each agent has deep context about its domain.

**Domains** — Siloed project workspaces with a standard 6-folder structure.
Every domain has an `INDEX.md` — the source of truth loaded first when entering that domain.

### Hooks: 

ASB uses four automated hooks that run without you doing anything:

| Hook             | When             | What                                              |
| ---------------- | ---------------- | ------------------------------------------------- |
| **SessionStart** | Session begins   | Loads your identity, preferences, security rules  |
| **PreToolUse**   | Before any tool  | Validates against guardrails — blocks or allows   |
| **PostToolUse**  | After Write/Edit | Validates and auto-heals YAML frontmatter schemas |
| **Stop**         | Session ends     | Saves transcript, sends notification              |

This is why ASB "remembers" you. Before you type anything, the AI already knows your name, style, and rules.

---

## Getting Started (NEEDS UPDATE)

### 1. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

> Requires an Anthropic subscription. See [claude.com/pricing](https://claude.com/pricing).

### 2. Open Obsidian

1. Download [Obsidian](https://obsidian.md)
2. Open folder as vault → select your `awesome-second-brain` folder
3. Trust the author when prompted

### 3. Run Your First Session

```bash
cd ~/path/to/awesome-second-brain
claude
```

Then run the setup command:

```
/setup-context
```

ASB will walk you through questions to populate your identity and preferences. Once complete, your context loads automatically every session.

### 4. Explore

| Command    | What It Does                 |
| ---------- | ---------------------------- |
| `*menu`    | Display available commands   |
| `*skills`  | List all skills              |
| `*agents`  | Show domain agents           |
| `*context` | See what's loaded in context |

---

**Next:** [02 — Domains & Projects](./02-domains-and-projects.md)
