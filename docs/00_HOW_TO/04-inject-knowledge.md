---
title: 04 - Inject-Knowledge
description: "The knowledge pipeline: capture, process, distribute, and contextualize"
tags:
  - guide
  - note-taking
  - knowledge
  - inbox
series: Awesome Second Brain Guide
order: 4
---

# 04 — Injecting-Knowledge

> Here's how information flows through your second brain, from a random thought to permanent knowledge.

---

## The Knowledge Pipeline

In most productivity systems, the moment you have an idea, you have to decide where it "belongs." This is a flow-killer. In ASB, we use a simple three-stage pipeline so you can focus on the thinking, not the filing.

1. **CAPTURE**: Dump raw thoughts, links, or documents into the Inbox.
2. **PROCESS**: ASB adds structure (tags, categories, and "what is this?").
3. **DISTRIBUTE**: Notes move to their actual home in a Domain.

**The Golden Rule: Capture first, organize later.**

---

## Step 1: Capture

Everything you capture lands in `Inbox/Notes/`. You don't need to name the files or pick a folder.

### The Braindump (My favorite)

This is the core of the system. Run the command `braindump` and just start talking. It’s stream-of-consciousness mode.

```text
You: braindump
ASB: Go ahead, I'm listening.
You: "I've been thinking about the pricing for the new app. Maybe freemium?
      Also, I need to remember to email Sarah about the logo. And I'm
      wondering if we should use Postgres or something else..."
```

ASB doesn't just save the text. It analyzes it for themes, extracts action items (like emailing Sarah), and flags questions you need to answer.

### URL Dumps

"Save this link: [URL]"
ASB fetches the content, summarizes it, and extracts the key insights so you don't have to re-read the whole thing later.

### Direct Notes

If you’re in Obsidian, just create a new `.md` file in `Inbox/Notes/`. ASB will find it when you’re ready to process.

---

## Step 2: Process

Once your Inbox has a few raw thoughts in it, it’s time to give them some shape. Run:
`"Process my inbox notes"`

ASB scans every file in `Inbox/Notes/` and suggests how to structure them. It will:

- **Add metadata**: (which domain it belongs to, what type of note it is).
- **Categorize**: Is this a _Fact_, an _Idea_, a _Decision_, or an _Action_?
- **Link**: It looks for similar notes already in your vault and suggests connections.

**You’re always in control.** ASB will propose these changes, and you just say "Yes" or "No" to each one.

---

## Step 3: Distribute

After the notes are processed and ready, just say:
`"Distribute my notes"`

ASB moves the files from the Inbox into the right Domain folders (usually under `02_PAGES/`). But it does one more thing: **it extracts the work.**

If it found an `[action]` (like "email Sarah"), it automatically adds that task to your project file and leaves a link back to the original note. No more copy-pasting tasks between files.

---

## Step 4: Closing the Loop

After distribution, two things happen:

1. **Your Agent grows**: The next time you load a specialized agent, it has that new knowledge loaded in its context.
2. **Your System stays clean**: The Inbox is empty, your projects are updated, and everything is exactly where it should be.

---

**Previous:** [03 — Session Flow](./03-session-flow.md) | **Next:** [05 — LifeOS & Notes](05-lifeos-and-notes%20(SWITCH%20FOR%20WORK%20LOGIC).md)
