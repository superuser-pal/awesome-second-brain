---
title: "05 - LifeOS & Notes"
description: "How the LifeOS domain and life-management skill work with note-taking"
tags: [guide, lifeos, life-management, notes]
series: Awesome Second Brain Guide
order: 5
---

# 05 — LifeOS & Notes

> Your personal operating system—where raw notes turn into self-knowledge.

---

## What Is LifeOS?

LifeOS is a built-in domain meant for "the project of you." While a work domain might track spreadsheets and code, LifeOS tracks how you think, what you believe, and what you’ve learned from your mistakes.

It’s the place where your "Second Brain" actually starts to feel like a brain, rather than just a filing cabinet.

---

## Your Internal Compass (The 7 Files)

LifeOS organizes your personal growth into 7 key files inside `00_CONTEXT/`. These aren't just static docs—they're the foundation your Life Coach agent uses to understand who you are and where you're going.

- **Mission**: Why are you doing any of this?
- **Beliefs**: The core values you won't compromise on.
- **Frames**: Mental frameworks for how you make decisions.
- **Models**: Mental models you use to understand the world (e.g., First Principles).
- **Learned**: The "Lessons Learned" from your life experiments.
- **Goals**: What you're actively chasing right now.
- **Projects**: Personal stuff—hobbies, home improvements, health.

---

## The Life Coach Agent

When you're ready to do some deep thinking or personal planning, load the specialist:

```text
/life-coach
```

**Why use the Life Coach?**
Unlike the general ASB Master, the Life Coach has all seven of those life files loaded into its "working memory" at all times. It doesn't just know your name; it knows your mission.

It comes with a few specific tricks:

- `*update`: Quickly edit any of your life files.
- `*extract`: The heavy lifter—it finds personal insights hidden in your notes and suggests adding them to your life context.
- `*status`: A quick check on how much "life data" you've collected.

---

## Making the Connection: Notes → LifeOS

This is the "secret sauce" of the system. You don't have to manually update your mission statement every time you have an epiphany.

1. **You Braindump**: "I learned today that I work better in the mornings..."
2. **ASB Detects**: It sees the "I learned" and identifies it as potential LifeOS data.
3. **Draft Note**: The note is saved to your Inbox.
4. **The Extraction**: Next time you chat with `/life-coach`, run `*extract`.

The AI will say: _"I found a lesson in your notes about morning work. Should I add it to your Learned.md file?"_

You say "Yes," and your internal compass gets a little bit sharper.

---

## A Real Example

**Morning Braindump**:

> "I've been thinking about focus. I'm realizing that if I don't look at my phone before 10 AM, I'm 2x more productive. I want to make this a hard rule."

**Later, with the Life Coach**:

> **You**: `/life-coach` then `*extract`
>
> **AI**: "I found a new rule in your notes: 'No phone before 10 AM for 2x productivity.' Should I add this to your `beliefs.md`?"
>
> **You**: "Actually, let's put it in `frames.md` as a productivity frame."
>
> **AI**: "Done. I've updated your frames. I'll remember this next time we plan your day."

---

## The "Big Picture"

If you ever want to see your progress, run `*export`. It generates a structured report of your entire LifeOS—all your goals, missions, and lessons in one place. It's a great way to do a weekly or monthly review and see how far you've come.

---

**Previous:** [04 — Note-Taking](04-inject-knowledge.md) | **Next:** [06 — ASB Builder](06-asb-builder%20(NOT%20YET%20IN%20THE%20SYSTEM.%20SWITCH%20FOR%20ADDING%20FUNCTIONS).md)
