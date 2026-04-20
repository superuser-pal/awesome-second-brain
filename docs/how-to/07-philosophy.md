---
title: 07 - Philosophy
description: The core principles and architectural philosophy behind the ASB system
tags:
  - guide
  - philosophy
series: Awesome Second Brain Guide
order: 0
---

# 07 — System Philosophy & Core Concepts

> If you made it this far, I just want to close by giving the pillars that are managing my every. If you've read this far, I want to conclude by sharing the core principles guiding all my decisions, on which I continue to build.  

---

## The 12 Pillars of ASB

ASB's architecture is built on twelve foundational principles to guide how you interact with AI:

1. **Context engineering beats prompt engineering.** If you put the right files in the right folders, the AI naturally understands what to do, drastically reducing the need to write complex prompts.
2. **Domain-Driven Design.** You separate your life into explicit Domains (e.g., Work, Health, Personal Projects) to prevent context bleed and keep operations structured.
3. **We are transparent about the logic and the requirements.** The system's rules are open and editable, not hidden in black-box code.
4. **The less time we spend with the AI, the better.** Let's avoid the trap of endless chat; execute the task and get back to living.
5. **Deterministic rails** to predictably pull and push information from other systems.
6. **You don't replace thinking, you augment it.** AI is a reasoning engine, not an autopilot.
7. **The Inbox is the primary friction-free entry point for all raw data.** Rapid capture is prioritized over immediate organization so you don't break your creative flow.
8. **Spec-driven development to build on top of ASB.** You don't just "hack" new features; you write a specification, and the AI helps you build structural skills predictably.
9. **We get comfortable with the Terminal and how to use it.** Command-line interfaces like the Obsidian CLI give the AI raw, uncompromising power.
10. **Spec / Test and Eval.** Changes are systematically evaluated before being fully committed to the vault.
11. **Aim to remove the friction in input and output.** The pipeline (`inbox/` → `process` → `distribute`) exists specifically to eliminate cognitive load.
12. **Start little and keep building.** You aren't bound to a rigid system. ASB is modular, allowing you to add new personal workflows (`.claude/skills/`) as you discover them over operations.

---

## How ASB "Thinks" (Intent-Based Routing)

ASB does not just run brute-force keyword searches. It uses **conceptual matching** to route your intent to the correct automated skill or subsystem.

1. **You provide an intent:** "I want to visualize our new server setup."
2. **ASB interprets the concept:** It knows "visualize server setup" means architectural diagramming.
3. **Execution:** It routes the request seamlessly to the `architecture-diagram` skill without you needing to manually wire anything together.

---

## Agents vs. Skills

It’s important to distinguish between tools and personas:

| Aspect         | System Skills                               | Domain Agents (`/agent:[name]`)              |
| -------------- | ------------------------------------------- | -------------------------------------------- |
| **Duration**   | Fast, operational, one-off tasks            | Extended deep-work sessions                  |
| **Invocation** | Automatic intent matching or slash commands | Manual loading (e.g., `/agent:writer`)       |
| **Focus**      | System manipulation (processing, CLI, etc.) | Domain-specific expertise and context        |

---

