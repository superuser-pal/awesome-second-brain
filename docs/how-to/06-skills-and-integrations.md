---
title: 06 - Skills & Integrations
description: "Supercharging your system with structural AI skills and the Obsidian CLI"
tags:
  - guide
  - skills
  - cli
  - obsidian
series: Awesome Second Brain Guide
order: 6
---

# 06 — Skills & Integrations

> 	Learn more about what I have added to this complete package, I call ASB.

---

## 1. The Obsidian CLI Integration

Given that your Second Brain is powered by Obsidian, it is crucial to establish a direct communication bridge between the AI and the software itself. This is achieved via the **Obsidian CLI**.

### Setup & Installation
Before utilizing ASB's deeper vault workflows, there is one technical prerequisite:
- Ensure the Obsidian CLI is installed and configured in your shell environment.
- You can verify the installation at any time by typing `obsidian help` in your terminal.
- **Important:** The Obsidian desktop app *must be open* when the AI executes these commands, as the CLI routes its actions directly through your running software instance.

### Why It's Crucial
Rather than the AI blindly editing text files in your background, the Obsidian CLI allows the AI to natively interact with your vault exactly as a user would. 

If you want to add customized structural features or complex automation in the future, the CLI is an absolute necessity. 

**Common Obsidian CLI Use Cases:**
- *Property Management*: The AI can run `obsidian property:set name="status" value="done" file="My Note"` to programmatically update statuses safely.
- *Vault Exploration*: Using `obsidian backlinks file="My Note"`, the AI can natively see exactly what is connected to a note.
- *Creation & Appending*: The AI can silently draft structural notes using `obsidian create name="New Note" template="Template" silent` or append tasks natively to today's note via `obsidian daily:append`.

---

## 2. Artificial Semantic Search (`qmd` skill)

If you want to pull past ideas or heavily cross-reference notes without manually scrolling through folders, ASB uses a custom semantic indexing skill called **`qmd`**. 

Instead of reading massive files line-by-line via standard Grep commands, QMD parses vector embeddings of your entire vault to intelligently rank snippets.

**Common QMD Use Cases:**
- **Pre-Creation Checks**: Before committing a new note to permanent storage, the AI runs `qmd vsearch "<topic>"` to see if similar content already exists, preventing duplicates.
- **Decision & Incident Mining**: If you ask "What did we decide about the Q3 server migrations?", the AI uses `qmd query "Q3 migration"` to semantically extract the specific decision snippets across multiple incident reports and project plans simultaneously.
- **Context Gathering**: When prepping for a meeting, you can simply tell the AI: "Gather my past 1-on-1s with Sarah" and it will batch-retrieve the exact history seamlessly.

---

## 3. Overview of System Skills

Skills are modular capabilities granted to the AI. They live as individual folders inside the `.claude/skills/` directory.

Here is a brief recollection of the other key operational skills powering your system:

### Core Operations
- **`obsidian-markdown`**: Ensures the AI strictly adheres to Obsidian syntax (`[[wikilinks]]`, callouts, specific frontmatter structures) instead of emitting generic markdown.
- **`obsidian-bases`**: Gives the AI structural context on how to parse foundational note types or templates.

### Workflow Automation
- **`daily-rituals`**: The engine behind your `/open-day`, `/week-prep`, and `/week-close` routines inside the `plan/` folder.
- **`project-management`**: Provides the structured capabilities used to create objects in `01_PROJECTS` and track objective velocity.

### Brain & Strategy
- **`prompts`** & **`strategy`**: The orchestration layers that manage the 'Dormant vs Active' library mechanics discussed in the previous chapter.
- **`product-strategy-session`**: A specialized business pathway for breaking down roadmap and product architecture decisions.
- **`defuddle`**: A cognitive clarity skill designed to help you organize chaotic, scattered concepts in your inbox.

### System Expanding
- **`create-domain`**: An instant scaffolding function to stand up the 3-folder structure and `INDEX.md` for a brand-new domain.
- **`create-agent`**: Provides instructions for quickly bootstrapping a new specialized persona explicitly bound to a domain.
- **`create-skill`**: Walks you through defining a `SKILL.md` and hook logic to design an entirely new custom skill from scratch.
- **`find-skills`**: An operational assistant to pull up cross-skill registry documentation when you ask "how do I automate X?".

---

*Because ASB is fully modular, you are not bound to these tools forever. When you discover new personal workflows, you can simply write a new folder into `.claude/skills/` to permanently teach the AI how to replicate it!*
