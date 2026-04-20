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

Every time I sit down to work with ASB, I follow a simple ritual. I know my intention, I know how the AI will help me, and I open the terminal to get ready to work. Trust me, it’s not just about opening the terminal—it’s about making sure the AI has exactly what it needs to be useful.

Think of it like setting up your physical desk before a deep work session. You clear the clutter, grab the documents you need, get out the tools for the task at hand, and grab tortilla chips with hummus to get ready to work.

Here is the flow:

1. **Fire up Claude Code**: ASB automatically injects background context (via the `session-start.sh` hook).
2. **Start the Ritual (Optional but Recommended)**: Run `/open-day` to align on your tasks and generate a daily planning note.
3. **Load your Agent / Context**: Load a domain agent (e.g., `/agent:[name]`) or use `@` references to pull in specific projects.
4. **Work**: Dump ideas, update projects, or execute tasks.
5. **Close the Ritual**: Run `/close-day` to log wins, verify links, and cleanly wrap up.

**Why bother?** If you just start typing without setup, the AI is guessing. If you set the stage, it becomes a deeply integrated assistant.

---

## Step 1: Session Start (The silent part)

When you run `claude`, a few things happen in the background before you even see the prompt. ASB's `session-start.sh` hook automatically loads your operational baseline:

- Today's date and day of the week.
- Your North Star goals (`brain/NORTH_STAR.md`).
- A summary of active work (`work/01_PROJECTS/` and `dashboards/TASKS.md`).
- Recent git changes and active domains.

You don’t have to do anything. ASB already knows your broader priorities from the second you start.

---

## Step 2: The Planning Cycle (Weekly & Daily)

To transition from "broad priorities" to executable action, ASB relies on a nested planning cycle located entirely within your `plan/` folder.

**1. The Weekly Plan (`/week-prep`)**
At the start of the week, running `/week-prep` creates a weekly master file in the `plan/` folder. You set a single primary goal for the week and select 3–7 priority tasks from your project backlogs to commit to. These become your main goals.

**2. The Daily Plan (`/open-day`)**
Each morning, you start your session with `/open-day`. The system reviews your weekly commitments and creates an atomic daily note (e.g., `plan/DD-MM-YY.md`). It asks you what your specific focus is for *today*. During the day, you can capture your raw notes and ideas directly inside this daily note.

**3. The Weekly Close (`/week-close`)**
When the week ends, you use `/week-close` to wrap up. This uses the `daily-rituals` skill to do some heavy lifting:
- It calculates your week's velocity (how many priority tasks you actually finished).
- It extracts and compacts all the scattered daily notes and thoughts from your `plan/DD-MM-YY.md` files into a clean "Daily Notes Log" inside the weekly master file.
- Finally, it archives the whole synthesized week into the `plan/archive/` folder and cleans up the raw daily files to keep your vault perfectly clean.

*(Pro Tip: You can run `/week-cycle` to do the `/week-close` and the `/week-prep` workflows back-to-back).*

---

## Step 3: Giving the AI the Right Context

If you're working within a specific domain, now is the time to load that context. You can do this in two ways:

**1. Load a Domain Agent**
If you have configured a specialized persona, load it using:
```text
/agent:[name]
```
*Example: When configuring a "Writer" agent for a book domain, you can set it to automatically read your specific `StyleGuide.md` and load the latest `Chapter_Drafts` index every time you invoke the agent. This ensures you always start with the exact context needed. Context configuration can be found within each Agent.md file*

**2. Direct Selection (Most Common)**
If you are just doing normal task work, explicitly pull in the file you need manually using the `@` symbol:
```text
"Hey, look at @domains/MySideProject/01_PROJECTS/PROJECT_REDESIGN.md. Let's finish the next task."
```
Using `@` references is the best way to keep the AI sharp. It’s better to give it exactly the two files it needs than to make it search through twenty.

---

## Step 4: Doing the Work

Now you’re set up. My typical sessions usually look like one of these:

- **Executing the Plan**: I look at my daily or weekly plan in the `plan/` folder and execute the tasks listed. As I work, I capture any notes or ideas related to those tasks directly within my plan file. (We'll see how these notes get distributed back into the second brain in a later guide).
- **Capturing Ideas and Notes**: You can simply feed the AI raw thoughts, links, or documents using a capture command. Their type will depend on my intent. Everything you capture will land safely in your inbox, so it doesn't interrupt your flow. (We'll cover exactly how the inbox works in the next guide).
- **Pulling Details from Previous Sessions**: "Let's review the notes from yesterday's incident." ASB looks at `work/03_INCIDENTS/` and helps you extract tasks or draft documentation without touching your specialized domains.

---

## Step 5: Wrapping Up

When you're done, don't just close the terminal. End the session cleanly by running:

```text
/close-day
```

This runs a background subagent (`wins-capture`) to log any uncaptured achievements from your session into your performance review files, checks for any broken wikilinks or orphaned notes, and commits the final state.

### Pro Tips:

- **One domain at a time**: Don't try to plan your fitness regimen and your product roadmap in the same prompt. 
- **Use `/compact`**: If the conversation gets long and the AI starts getting "fuzzy", run `/compact` to summarize its memory and keep the session fast.
- **Link everything**: ASB considers an unlinked note a "bug". However, you don't need to do this manually—the AI is instructed to automatically maintain `[[wikilinks]]` for everything you capture so your graph stays connected.

---

**Previous:** [02 — Domains & Projects](02-domains-and-projects.md) | **Next:** [04 — Note-Taking](04-knowledge-flow.md)
