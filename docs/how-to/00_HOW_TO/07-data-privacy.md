---
title: "07 - Data Privacy"
description: "What data Claude Code sends and how to protect sensitive information"
tags: [privacy, security, guide]
series: Awesome Second Brain Guide
order: 7
---

# 07 — Data Privacy

> Everything you share with Claude Code is sent to Anthropic servers. Here's the 30-second guide to keeping your private data private.

---

## The "Must-Do" (Start Here)

If you take only one thing from this guide, let it be this: **Go to [claude.ai/settings](https://claude.ai/settings/data-privacy-controls) and toggle OFF "Allow model training" right now.**

By default, Anthropic can keep your data for 5 years and use it to train future models. If you toggle that switch, they only keep it for 30 days and _won’t_ use it for training. It’s the single biggest win for your privacy.

---

## What actually gets sent?

When you’re chatting with ASB, Anthropic receives:

- **Everything you type** in the prompt.
- **Any file the AI reads** (this includes your `ABOUTME.md`, your notes, and your project plans).
- **The output of any commands** the AI runs on your machine.

Basically, if the AI "knows" it, Anthropic "has" it. This is why we need to be smart about what we put in our vault and what we let the AI see.

---

## How to Stay Safe

### 1. Guarding the "Crown Jewels"

If you have sensitive files (like `.env` files with API keys or personal certificates), you should explicitly tell Claude to stay out. You can do this in `.claude/settings.json`:

```json
{
  "permissions": {
    "deny": ["Read(./.env*)", "Read(./secrets/**)", "Read(./**/*.pem)"]
  }
}
```

### 2. Turning off Chat Telemetry

If you don't want Anthropic to track _how_ you're using the tool (errors, usage stats, etc.), add these to your `~/.zshrc`:

```bash
export DISABLE_TELEMETRY=1
export DISABLE_ERROR_REPORTING=1
```

---

## ASB’s Built-in Safety

I’ve built a few "guardrails" into ASB that run automatically to help protect you:

- **Key Blocking**: If ASB sees you’re about to accidentally write something that looks like an API key or password to a file, it will block it.
- **Sensitive Folder Block**: By default, ASB won't look into your `.ssh` or system directories.
- **Environment References**: ASB is trained to use `process.env.KEY` rather than hard-coding secrets into your code files.

---

## The "Common Sense" List

- **No Medical/Financial Data**: Just don't put it in the vault. If you need to track it, keep it in a separate, encrypted system that isn't connected to an AI agent.
- **Use Initials or Code Names**: In your `CONTACTS.md` or session notes, you don't need to put every friend's full name and address. "S.J." is plenty of context for the AI to know who you're talking about.
- **Check Your Session**: Every now and then, run `*context` to see exactly what files the AI has loaded. If you see something that shouldn't be there, check your domain's `INDEX.md`.

---

**Previous:** [06 — ASB Builder](06-asb-builder%20(NOT%20YET%20IN%20THE%20SYSTEM.%20SWITCH%20FOR%20ADDING%20FUNCTIONS).md) | **Next:** [08 — Cheatsheet](08-cheatsheet%20(NO%20NEED%20FOR%20THIS.%20WE%20HAVE%20REF%20IN%20ROOT).md)
