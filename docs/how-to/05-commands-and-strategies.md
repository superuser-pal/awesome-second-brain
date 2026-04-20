---
title: 05 - Commands & Strategies
description: "How to manage dormant prompt libraries and reasoning strategies"
tags:
  - guide
  - prompts
  - strategies
  - commands
series: Awesome Second Brain Guide
order: 5
---

# 05 — Commands & Strategies

> Keep your slash menu clean while maintaining a massive library of specialized tools. Here's how the dormant library system works for Prompts and Strategies.

---

## 1. The "Dormant" Philosophy

ASB can do hundreds of specialized tasks—from extracting wisdom from meeting notes to running a Chain-of-Thought trade-off analysis. But if all of these were available in your `/` slash menu at all times, the system would become intensely cluttered. 

To solve this, ASB relies on a **Dormant Library System**. 
Both Prompts and Reasoning Strategies sit quietly in flat markdown files in their respective folders (`docs/prompts/` and `docs/strategies/`). They have a frontmatter property called `status: dormant`.

When you discover you need one of these tools for a project, you **Promote** it. This temporarily makes it an active command in your system. When you are done with the project or no longer need the tool regularly, you **Demote** it, tucking it neatly back away.

---

## 2. Managing Prompts (`prompts` skill)

The prompt library is an extensive collection of task-specific instructions. 

### When to use it:
Use the prompt library when you have a specific, repeatable task (like cleaning up meeting notes, formatting a blog post, or synthesizing research) and you want guaranteed, high-quality AI output without having to write a massive custom prompt yourself every time.

### The Workflow:

1. **Search**: 
   Ask the AI to find a tool for your specific need.
   ```text
   You: "Find a prompt for extracting wisdom from documents."
   ASB: *Surfaces 5 relevant dormant prompts from the library, including `extract-wisdom`.*
   ```

2. **Promote**: 
   Tell the AI to make it available.
   ```text
   You: "Promote extract-wisdom."
   ASB: *Activates it. `/prompts:extract-wisdom` is now available!*
   ```

3. **Execute**: 
   Now you can use the slash command against your active context.
   ```text
   You: "/prompts:extract-wisdom @domains/Work/02_PAGES/Meeting-Notes.md"
   ASB: *Follows the exact rules in the prompt to extract the wisdom.*
   ```

4. **Demote**: 
   If you no longer need this prompt clogging up your autocomplete menu.
   ```text
   You: "Demote extract-wisdom."
   ASB: *Tucks it back into the library.*
   ```

---

## 3. Managing Strategies (`strategy` skill)

While Prompts are designed for formatting and generating standard outputs, **Reasoning Strategies are designed for deep thinking**. 

When you capture a difficult idea (often placed in your `thinking/` folder) and realize you need a methodical way to break it down, you don't just "think harder." ASB includes a comprehensive intelligence framework managed by the `strategy` skill. This library contains advanced mental models (like Chain-of-Thought, Reflexion, Trade-Off Analysis, and Cognitive Reframing) that sit dormant in `docs/strategies/`.

### When to use it:
Use strategies when you are stuck on a problem, making a complex architectural or life decision, attempting to unblock yourself, or when you need ASB to rigorously critique an idea from a specific structural angle.

### The Workflow:

**1. Search**: 
You can simply converse with the AI to find the right mental model for your problem.
```text
You: "Which strategy is best for resolving an architectural decision?"
ASB: *Scans the library and suggests the `trade-off-analysis` model, explaining why it fits.*
```

**2. Promote**:
Tell the AI to wake the strategy up.
```text
You: "Promote trade-off-analysis."
ASB: *Moves it to active status and generates the `/thinking:trade-off-analysis` slash command.*
```

**3. Execute**:
Now you can rigorously run your problem through the framework.
```text
You: "/thinking:trade-off-analysis Let's review our database options."
ASB: *Guides you step-by-step through the exact constraints and variables defined by the strategy.*
```

**4. Demote**:
Once your problem is solved and your decision is finalized, you can remove the strategy from your active palette.
```text
You: "Demote trade-off-analysis."
ASB: *Tucks the reasoning model back into the dormant library.*
```

---

## What Happens Behind the Scenes?

Whether you are promoting a prompt or a strategy, the exact same `dormant` vs `active` mechanics govern both libraries to prevent system bloat. Right now, there are exactly **257 atomic prompts** and **22 reasoning strategies** sitting quietly in your vault.

When you run a **Promote** workflow, the AI doesn't just memorize the file. It executes a clear, auditable logic sequence:

1. It searches the target library (e.g., `docs/prompts/` or `docs/strategies/`).
2. It edits the file's frontmatter to flip the status from `status: dormant` to `status: active`.
3. It creates a brand-new "stub" file inside `.claude/commands/prompts/` (or `.claude/commands/thinking/`). The system registry automatically detects this stub, making the command instantly available across your workspace in native Claude Code slash autocomplete menus.

When you run a **Demote** workflow, the exact opposite happens. The stub inside `.claude/commands/` is deleted (purging it from your active autocomplete menu), and the source file in your `docs/` library is reverted back to `status: dormant`.

**Pro Tip: Categorized Commands via Subfolders**
Notice how promoting creates the stub in `.claude/commands/prompts/`, turning it into a slash command like `/prompts:[slug]`? Creating nested subfolders for commands will help you organize them systematically based on actions. For example, if you create tools specifically for ingesting or capturing knowledge, you can save their stubs inside a `.claude/commands/capture/` subfolder. They will then all neatly autocomplete together as `/capture:xyz`. 

**The result:** You have the power of a massive AI tooling repository at your fingertips, but a minimalist command palette curated exactly to what you are actually using *this week*.

---

**Previous:** [04 — Knowledge Flow](04-knowledge-flow.md) | **Next:** [06 — Work & Operations](06-work-and-operations.md)
