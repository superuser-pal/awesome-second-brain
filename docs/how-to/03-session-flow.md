---
title: "03 - Session Flow"
description: "The ideal workflow: agent, context, and dedicated work sessions"
tags: [guide, session, agents, context]
series: Awesome Second Brain Guide
order: 3
---

# 03 — Session Flow

> The better your session setup, the better the results. Here's how to actually use ASB Session Logic.

---

## Getting in the Zone

Every time I sit down to work with ASB, I follow a simple ritual. It’s not just about opening the terminal—it’s about making sure the AI has exactly what it needs to be useful.

Think of it like setting up your physical desk before a deep work session. You clear the clutter, grab the documents you need, and lay out the specific tools for the task at hand.

Here is the flow:

1. **Fire up Claude Code**: ASB automatically recognizes you (via the `SessionStart` hook).
2. **Load your Agent**: If you’re working in a specific domain, load the specialist (e.g., `/personal-coach`).
3. **Drop in extra context**: If you need to reference specific files, use `@` to pull them in.
4. **Work**: Braindump, plan, or execute.

**Why bother?** If you just start typing without setup, the AI is guessing. If you set the stage, it becomes a context loaded assistant.

---

## Step 1: Session Start (The silent part) (UPDATE WIHT THE LATEST HOOKS FROM THE SYSTEM)

When you run `claude`, a few things happen in the background before you even see the prompt. ASB loads your identity (`ABOUTME.md`), your specific styling preferences (`DIRECTIVES.md`), and your safety rules (`GUARDRAILS.md`).

You don’t have to do anything. ASB already knows who you are and how you like to work from the second you start.

---

## Step 2: Load Your Agent

If you’re stepping into a Domain (like Work or side projects), load the agent for that area.

```text
/product-manager       → Product strategy
/life-coach            → Personal life management
/pal-builder           → Build a new feature for your second brain
```

**What this actually does:**
It’s like switching hats. The agent persona loads its specific "knowledge" and rules, but most importantly, it auto-loads the domain’s `INDEX.md`. It greets you with a specialized menu so you don't have to remember where you left off. The context that is loaded, can be configured easily via the .claude/agents.

_If you don't have an agent yet, just stay with ASB Master. It can still do everything, you'll just have to be a bit more specific about what files you want it to look at._

---

## Step 3: Giving the AI "Eyes"

Sometimes the agent needs more than just the domain index. If you’re working on a specific file or project, pull it in manually:

```text
"Hey, look at @Domains/Work/01_PROJECTS/PROJECT_REDESIGN.md for where we're at."
```

Using `@` references is the best way to keep the AI sharp. It’s better to give it exactly the two files it needs than to make it search through twenty.

---

## Step 4: Doing the Work

Now you’re set up. My typical sessions usually look like one of these:

- **The Braindump**: "I’ve been thinking about this new feature..." ASB captures the notes and organizes them for me.
- **The Structured Session**: "What’s next on the Website Redesign project?" ASB looks at the project file and gives me the next three tasks.
- **The Big Thinking**: "/life-coach, I’m feeling stuck on my goals." This kicks off a deeper, more conversational strategy session.

### Pro Tips:

- **One domain at a time**: Don't try to plan your vacation and your product roadmap in the same session. Context bleed is real.
- **Use `*compact`**: If the conversation gets long and the AI starts getting "fuzzy," run `*compact` to clean up its memory (best around 70% to 80%)
- **Commit your work**: Before you close the terminal, run a quick git commit. ASB records what you did, but you still want to version control it.

---

**Previous:** [02 — Domains & Projects](02-domains-and-projects.md) | **Next:** [04 — Note-Taking](04-inject-knowledge.md)
