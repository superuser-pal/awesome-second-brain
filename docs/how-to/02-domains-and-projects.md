---
title: "02 - Domains & Projects"
description: "Creating domains as areas of life, optional projects, and optional agents"
tags: [guide, domains, projects, agents]
series: Awesome Second Brain Guide
order: 2
---

# 02 — Domains & Projects

> Domains are the foundation of your second brain. Start here.

---

## What Is a Domain?

A **Domain** is basically a walled-off workspace for one part of your life. In ASB, we map these to your high-level "Areas." Keeping them separate is critical—it ensures that when you're working on a client project, the AI doesn't get distracted by your personal workout routine or your personal financial goals.

Here’s how I usually break mine down:

- **Work**: Client projects, meeting notes, deliverables.
- **Personal**: Personal goals, routines, "lessons learned."
- **SideProject**: Product specs, roadmaps, research for that new app.
- **Learning**: Course notes, reading highlights, references.

The rule is simple: **One domain = one area.** Keeps the context clean and the AI focused.

---

## Creating Your First Domain

You don't need to manually create folders. Just command ASB what you want to create:

```text
Create a domain for Work
```

ASB uses the `create-domain` skill to scaffold everything for you. It builds a standard structure that you'll see in every domain you create.

---

## The 6-Folder Structure (UPDATE AND MENTION THAT BESIDES THE TEMPLATE STRUCTURE USER CAN CREATE DEDICATED FOLDERS)

Every domain looks exactly like this. Once you've seen one, you know how to navigate them all. The `INDEX.md` is the first thing an AI agent reads when it goes through a domain.

```text
Domains/Work/
├── INDEX.md              ← The Front Door (loaded first)
├── CONNECTIONS.yaml      ← Links to external docs or repos
├── 00_CONTEXT/           ← The background info that doesn't change
├── 01_PROJECTS/          ← Active initiatives with checklists
├── 02_SESSIONS/          ← Logs of what was done and when
├── 03_PAGES/             ← Loose notes and research
├── 04_WORKSPACE/         ← Drafts and temporary files
└── 05_ARCHIVE/           ← Finished work
```

If you keep that `INDEX.md` updated with your current focus, the AI will always know what's going on without you having to re-explain it every time.

---

## Optional: Projects & Agents

You don't always need a project or a specialized agent, but they're there when documentation from a domain gets dense. An specialized agent helps your interaction with the AI to be more accuarate, with less waste and to better self-organize. 

### Projects

Think of these as "sub-folders" inside `01_PROJECTS/` for specific, goal-oriented work.

```text
Create a project called "Website Redesign" in my Work domain
```

ASB creates a markdown file for the project with an objective and a task list. Use these when you have a clear "Done" state.

### Agents

An **Agent** is a specialized persona (like a "Technical Architect" or "Personal Coach") that lives inside a domain. Not really, but when loaded, is instructed to understand with more depth the context of your intent. Think of a librarian with better knowledge on where to put returned books, and even more important, where to find the next one ideal for you to read.

**You want an agent if:**

- You work in this domain every day.
- You want the context to load automatically without you saying anything.
- You want a custom set of commands (or prompts) specific to that work.

If you're just capturing occasional notes, the standard ASB Master handles it just fine. But for deep work—like coding a feature or planning a business—having a dedicated agent makes a huge difference.

---

## How to start

Don't overcomplicate it on day one. Here’s a simple path:

1. **Pick 2–3 Domains**: (e.g., Work, Personal, Learning).
2. **Create them**: Use the `Create a domain for...` command.
3. **Capture something**: Dump some initial notes into `03_PAGES/` or an `INDEX.md`.
4. **Scale up**: Add projects when you have specific goals, and create agents once you realize you're spending 2+ hours a day in a specific domain.

---

**Previous:** [01 — Welcome to ASB](01-welcome.md) | **Next:** [03 — Session Flow](03-session-flow.md)
