---
title: "06 - ASB Builder"
description: "Spec-driven development for extending your second brain"
tags: [guide, asb-builder, spec-driven, development]
series: Awesome Second Brain Guide
order: 6
---

# 06 — ASB Builder

> How to build new features, skills, and agents without breaking things.

---

## What Is ASB Builder?

While the standard ASB Master is there to help you through your day, **ASB Builder** is there to help you _build the system itself_. It’s a specialized agent that knows the ASB architecture inside and out.

```text
/agent:asb-builder
```

Most AI projects get messy because it's so easy to jump straight into coding and build on top really fast. ASB Builder helps you avoid that by using a "Specify First" approach. It makes sure you and the AI are on same page before a single line of code is written.

---

## The Workflow: From Idea to Feature

We use a lean, 6-step process to build new things based on SDD (Spec Driven Development). It’s all recorded in `REQUIREMENTS.md` file so you always can refer to have you build.

1. **SPECIFY**: You explain what you want. The AI helps you pin down the details.
2. **PLAN**: The AI drafts a technical plan—no guessing.
3. **TASKS**: The plan is broken into small, doable steps.
4. **IMPLEMENT**: This is the "build" phase. The AI walks through the tasks one by one.
5. **TEST**: You verify it actually works as intended.
6. **DOCUMENT**: The AI updates the manual for your new feature.

**Why this works**: You don’t have to keep the whole system in your head. You just focus on the current task, and the system remembers the big picture.

---

## When should you use it?

You don't need ASB Builder to take a note or check a project status. You call the Builder when you're **changing how the system works**.

- **Use it for**: Adding a new skill (like a "Meditation Tracker"), creating a specialized agent, or tweaking how ASB handles your data.
- **Skip it for**: Everyday braindumps, writing notes, or updating your `ABOUTME.md`.

Rule of thumb: **If you're touching `.claude/skills` or `.claude/agents`, call the Builder.**

---

## Example: The "Meditation Tracker"

Imagine you want a new skill to log your daily meditation.

1. **The Spec**: You say "I want to track meditations." ASB Builder creates a `FEATURE.md` and helps you define the logic (What triggers it? Where does the data go?).
2. **The Blueprint**: You run `*plan` then `*tasks`. Now you have a clear roadmap.
3. **The Build**: You run `*implement`. ASB Builder creates the folders, writes the code, and sets up the skill.
4. **The Handover**: It stops and says, "Okay, try saying 'log a meditation.' Does it work?"

---

## Picking Up Where You Left Off

Development usually happens in chunks. If you start a feature on Monday and don't get back to it until Friday, just load the builder and run `*resume`.

```text
You: *resume FEAT_001
AI: "Resuming the 'Meditation Tracker' work. We were on Task 4 of 10. Ready to continue?"
```

It’s like having a co-developer who never forgets the context.

---

## Why This Matters

A second brain is only as useful as its structure. This "Specify First" approach ensures:

- **Consistency**: Every new feature follows the same clean patterns.
- **Safety**: Testing is built into the flow, not an afterthought.
- **Momentum**: One small task at a time, always resumable.

---

## Where the Work Lives

Everything the builder does is saved in the `ASBBuilder` domain. Every feature gets its own folder and its own `FEATURE.md`. Your system's history is always transparent and easy to find.

```text
Domains/ASBBuilder/
├── 01_PROJECTS/
│   ├── FEAT_001_meditation/
│   │   └── FEATURE.md          ← The entire history of the feature
```

---

**Previous:** [05 — LifeOS & Notes](05-lifeos-and-notes%20(SWITCH%20FOR%20WORK%20LOGIC).md) | **Next:** [07 — Data Privacy](./07-data-privacy.md)
