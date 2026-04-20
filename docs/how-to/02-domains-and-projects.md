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

A **Domain** is basically a walled-off workspace for one part of your life. In ASB, we map these to your high-level "Areas." Keeping them separate is critical—it ensures that when you're working on a side project, the AI doesn't get distracted by your personal workout routine or your financial goals.

**Important Note on `work/` vs `domains/`**
In ASB, cross-domain operational notes (like weekly 1:1s, generic incidents, or performance reviews) live in the `work/` folder. A **Domain** (inside the `domains/` folder) is for completely isolated topics.

Here’s how I usually break mine down:

- **ClientAcme**: Client projects, meeting notes, deliverables specific to Acme.
- **Fitness**: Personal fitness goals, routines, "lessons learned."
- **SideProject**: Product specs, roadmaps, research for that new app.
- **Learning**: Course notes, reading highlights, references.

The rule is simple: **One domain = one area.** Keeps the context clean and the AI focused.

---

## Creating Your First Domain

You don't need to manually create folders. Just ask ASB what you want to create:

```text
Create a domain for Writing
```

ASB uses the `create-domain` skill to scaffold everything for you. It builds a standard structure that you'll see in every domain you create.

---

## The 3-Folder Structure

Every domain looks exactly like this. Once you've seen one, you know how to navigate them all. The `INDEX.md` is the first thing an AI agent reads when it goes through a domain.

```text
domains/[Name]/
├── INDEX.md              ← The Front Door (loaded first, source of truth)
├── CONNECTIONS.yaml      ← Links to external docs or repos
├── 01_PROJECTS/          ← Active initiatives
├── 02_PAGES/             ← Permanent domain pages (promoted from notes)
└── 03_ARCHIVE/           ← Completed or deprecated content
```

*(Note: While this is the template structure, you can always create your own dedicated folders inside a domain. Just keep the top-level clean so the AI always knows where to look!)*

If you keep that `INDEX.md` updated with your current focus, the AI will always know what's going on without you having to re-explain it every time.

---

## Optional: Projects & Agents

You don't always need a project or a specialized agent, but they're there when documentation from a domain gets dense. A specialized agent helps your interaction with the AI be more accurate, prevents context waste, and self-organizes better.

### Projects

Think of these as specific, goal-oriented work files inside `01_PROJECTS/`.

```text
/project-create
```
(Or just say "Create a new project for the redesign in the MySideProject domain").

ASB creates a markdown file for the project with an objective, priority, and standard frontmatter. Use these when you have a clear "Done" state.

**Ad-Hoc Tasks**
Not every task needs a full-blown project. For those quick, standalone to-dos that belong to a domain but don't fit into a specific project, ASB uses a dedicated `AD_HOC_TASKS.md` file inside the `01_PROJECTS/` folder. This gives all your loose tasks a proper home so they never get lost.

### Agents

A **Domain Agent** is a specialized persona that lives inside `.claude/agents/` but is bound to a specific domain. Think of a librarian with deep knowledge on where to put returned books, and even more important, where to find the next one ideal for you to read within that specific section.

**You want an agent if:**
- You work in this domain every day.
- You want the context to load automatically without you saying anything.
- You want a custom set of commands (or prompts) specific to that work.

If you're just capturing occasional notes, the standard ASB behavior handles it just fine. But for deep work—like coding a feature or planning a business—having a dedicated agent makes a huge difference.

---

## How to start

Don't overcomplicate it on day one. Here’s a simple path:

1. **Pick 2–3 Domains**: (e.g., ClientProjects, Fitness, Learning).
2. **Create them**: Use the "Create a domain for X" command.
3. **Capture something**: Using `/dump`, capture thoughts and route them to your domain's `02_PAGES/`.
4. **Scale up**: Add projects inside `01_PROJECTS/` when you have specific goals, and create agents once you realize you're spending 2+ hours a day in a specific domain.

---

**Previous:** [01 — Welcome to ASB](01-welcome.md) | **Next:** [03 — Session Flow](03-session-flow.md)
