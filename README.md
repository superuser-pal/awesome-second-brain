# 🧠 Awesome Second Brain

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](docs/CHANGELOG.md)
[![Claude Code](https://img.shields.io/badge/powered%20by-Claude%20Code-orange.svg)](https://docs.anthropic.com/en/docs/claude-code)
[![Gemini CLI](https://img.shields.io/badge/gemini%20cli-supported-4285F4)](https://github.com/google-gemini/gemini-cli)
[![Obsidian](https://img.shields.io/badge/obsidian-1.12%2B-7C3AED)](https://obsidian.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **The AI-assisted second brain that connects your notes, ideas, and tasks into persistent context for agentic workflows.**

> [!IMPORTANT]
> Awesome Second Brain is currently at v1.0.0. We’re moving fast, so expect frequent updates and some breaking changes as the project evolves. If you’re into AI-assisted productivity, we’d love your feedback.

---

## 🌪️ The Problem

Every time you open an AI chat, it feels like you start from zero or with outdated context. You re-explain your instructions, the latest key details of what you're working on, what you've already tried, and how you want things done. Your projects live in scattered notes, random folders, and half-remembered conversations that need constant updates.

## 💡 The Solution

Give your agent an **Awesome Second Brain**.

Awesome Second Brain (ASB) is an open-source framework that gives your AI **a spotless context layer**, **organized knowledge**, and **automated processing pipelines** — so your AI operates with the same goals, history, and strategic intent as you do.

### Before ASB vs After ASB

| Without Awesome Second Brain                                                        | With Awesome Second Brain                                                                     |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| "I'm working on the following project, here are the latest tasks. I want you to..." | "Present the latest ideas and open tasks from my project."                                    |
| Notes scattered across apps, folders, and bookmarks.                                | One knowledge pipeline: Inbox → Process → Domain → Context.                                   |
| Every session starts cold — no memory of past decisions.                            | Session hooks load your identity, preferences, and context automatically.                     |
| "Here are my ideas for Project A, and here are my ideas for Project B..."           | Executes `/brain-dump` workflow; AI automatically sorts details to the corresponding project. |
| Generic AI responses with no understanding of your specific goals and patterns.     | AI that knows your very last intent, progress on goals, and patterns of your ideas.           |

---

## ⚡ See It In Action

**Morning kickoff:**

```bash
/standup
# → Loads North Star, active projects, open tasks, recent git changes.
# → "You have 2 active projects. The auth refactor is blocked on API contract.
#    Your 1:1 with Sarah is at 2pm — last time she flagged observability."
```

**Capture any raw input:**

```bash
/brain-dump "I've been thinking about using Redis for caching. The API is rate limited to 1000 calls/hour."
# → Extracts atomic observations: [idea] Use Redis, [fact] API limit.
# → Suggests tags: #infrastructure #caching #api
# → Stages in inbox/raw/ for later processing.
```

---

## 🚀 Quick Start

1. **Clone this repo**:

   ```bash
   git clone https://github.com/superuser-pal/awesome-second-brain
   cd awesome-second-brain
   ```

2. **Open the folder as an Obsidian vault**.

3. **Install dependencies**:

   ```bash
   bun install
   ```

   _(Required for system hooks and scripts)_

4. **Enable the Obsidian CLI** in Settings → General (requires Obsidian 1.12+).

5. **Run your agent** in the vault directory: **`claude`** or **`gemini`**.

   ```bash
   /setup-context
   ```

6. **Fill in `brain/North Star.md`** with your goals — this grounds every session.

### Optional: QMD Semantic Search

For semantic search across the vault:

```bash
npm install -g @tobilu/qmd
qmd collection add . --name vault --mask "**/*.md"
qmd context add qmd://vault "Engineer's work vault: projects, decisions, incidents, people, reviews, architecture"
qmd update && qmd embed
```

> [!NOTE]
> If QMD isn't installed, everything still works — the agent falls back to the Obsidian CLI and grep.

---

## 📋 Prerequisites

- [Obsidian](https://obsidian.md) 1.12+ (for CLI support)
- An AI coding agent: [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (full support), or [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Python 3.8+](https://python.org/downloads) (for hook scripts)
- Git (for version history)
- [QMD](https://github.com/tobi/qmd) (optional, for semantic search)

---

## 📂 Vault Structure

Awesome Second Brain's workspace is organized to keep focus sharp and context contained:

- **`dashboards/`**: Navigation hub, `HOME.md`, and `TASKS.md` (Master task list).
- **`domains/`**: Your high-level workspaces (e.g., `Work`, `Personal`). Each domain is a siloed environment.
- **`work/`**: Cross-domain shared operations — 1:1s, incidents, and reviews.
- **`inbox/`**: The entry point. Drop raw thoughts or quick tasks here to be processed.
- **`brain/`**: The "Operating System" — `North Star.md`, `Memories.md`, `Patterns.md`, and `Key Decisions.md`.
- **`plan/`**: Your daily and weekly rhythm files.
- **`.claude/`**: The **configuration layer** containing system logic, commands, and subagents.

---

## 🛠️ How It Works

### The Knowledge Pipeline

Capture raw information and transform it into structured knowledge automatically.

| Stage             | Activity                       | Command        | Result                              |
| :---------------- | :----------------------------- | :------------- | :---------------------------------- |
| **1. Ingest**     | Drop notes/tasks into `/inbox` | (Frictionless) | Raw capture                         |
| **2. Process**    | AI applies structure/tags      | `/process`     | Categorized and structured markdown |
| **3. Distribute** | Move to correct `/domain`      | `/distribute`  | Contextually relevant persistence   |

### Lifecycle Hooks

Five automated hooks handle setting up your session context:

| Hook                | When                      | What                                                                          |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------- |
| 🚀 SessionStart     | On startup/resume         | Injects North Star, active work, recent changes, tasks, and file listing.     |
| 💬 UserPromptSubmit | Every message             | Classifies content (decision, incident, win, etc.) and injects routing hints. |
| ✍️ PostToolUse      | After writing `.md`       | Validates frontmatter and checks for wikilinks.                               |
| 💾 PreCompact       | Before context compaction | Backs up session transcript to `thinking/session-logs/`.                      |
| 🏁 Stop             | End of session            | Checklist: archive completed projects, update indexes, check orphans.         |

---

## ⌨️ Command Palette

Defined in `.claude/commands/`. Run these directly in your AI agent.

| Command           | Purpose                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| `/standup`        | Morning kickoff — reviews tasks and surfaces today's priorities.           |
| `/brain-dump`     | Reflective capture — atomic extraction of facts/ideas/decisions with tags. |
| `/quick-dump`     | Power shortcut — high-confidence routing directly to domain notes.         |
| `/wrap-up`        | Session review — verify notes, indexes, links, and suggest improvements.   |
| `/1-1`            | Capture a meeting transcript into a structured vault note.                 |
| `/project-create` | Create a new domain project, update `INDEX.md` and `TASKS.md`.             |
| `/task-sync`      | Aggregate all tasks into `dashboards/TASKS.md`.                            |
| `/humanize`       | Voice-calibrated editing — makes AI-drafted text sound like you.           |
| `/brief`          | Generate a performance review brief (manager or peer version).             |
| `/audit`          | Deep vault maintenance — repair broken links and identify orphans.         |

---

## 🤖 Specialized Subagents

Autonomous "bots" triggered by commands to perform complex background tasks.

| Agent                 | Responsibility                                        | Invoked by            |
| --------------------- | ----------------------------------------------------- | --------------------- |
| `wins-capture`        | Scans notes for achievements/competency evidence.     | `/wrap-up`, `/weekly` |
| `vault-librarian`     | Deep maintenance: orphans, broken links, stale notes. | `/audit`              |
| `slack-archaeologist` | Reconstructs full contexts from Slack threads.        | `/incident`           |
| `review-fact-checker` | Validates claims in review drafts against vault data. | `/self`, `/peer`      |
| `vault-migrator`      | Classify and migrate content from an existing vault.  | `/upgrade`            |

---

## 📊 Features at a Glance

> ASB v1.0 — Core features are stable; workflows and documentation are maturing.

| Component     | Count | What They Do                                             |
| ------------- | ----- | -------------------------------------------------------- |
| **Commands**  | 27    | Slash commands for structured interactions               |
| **Workflows** | 38+   | Step-by-step processes within skills                     |
| **Agents**    | 9     | Specialized AI personas for focused work                 |
| **Hooks**     | 5     | Automated lifecycle actions (security, context, logging) |

---

## 🎯 Why Awesome Second Brain?

1.  **Context Engineering, Not Prompt Engineering**: The best results come from organized context. ASB structures your identity and projects so the AI is ready before you are.
2.  **Built for Performance**: Obsidian handles the UI/reading, while your AI Agent handles the execution. No complex IDE knowledge required.
3.  **Your Data, Your Control**: Everything is local markdown. No vendor lock-in, no cloud dependency.
4.  **Token Efficiency**: ASB uses tiered loading (North Star, active tasks, git status) to keep costs low while maintaining high awareness.

---

## 📝 Author & License

Created by Rodrigo Cano Teran — Senior Product Manager in Brussels, building agentic workflows with Claude Code.
Released under the [MIT License](LICENSE).

---

**Version:** 1.0.0 | **Last Updated:** 2026-04-12
