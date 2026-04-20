---
title: 04 - Knowledge Flow
description: "The knowledge pipeline: capture, process, distribute, and contextualize"
tags:
  - guide
  - note-taking
  - knowledge
  - inbox
series: Awesome Second Brain Guide
order: 4
---

# 04 — Knowledge Flow

> Here's how information flows through your second brain, from a random thought to permanent knowledge.

---

## The Knowledge Pipeline

In most productivity systems, the moment you have an idea, you have to decide where it "belongs." This is a flow-killer. In ASB, we use a simple three-stage pipeline so you can focus on the thinking, not the filing.

1. **CAPTURE**: Dump raw thoughts, links, or documents into the `inbox/raw/` holding pen.
2. **PROCESS**: ASB adds strict structure (schemas, tags, types) and moves to `inbox/ready/`.
3. **DISTRIBUTE**: Notes move out of the inbox and seamlessly into their permanent Domain homes.

**The Golden Rule: Capture first, organize later.**

---

## Step 1: Capture

Everything you capture intentionally, or even just say to the AI without a specific command, lands in `inbox/raw/`. You don't need to name the files or pick a folder. 

*Pro Tip: you can configure Obsidian to have any new nodes land in this folder.*

### The General Capture (`/general`)

This is the core entry point. Run `/general` or simply start dropping information. It’s perfect for stream-of-consciousness capture:

```text
You: /general
ASB: Go ahead, I'm listening.
You: "I've been thinking about the pricing for the new app. Maybe freemium?
      Also, I need to remember to email Sarah about the logo..."
```
The text is saved exactly as it is, with the frontmatter setting `status: unprocessed`.

### The Power Move: `/dump`

If you already know exactly what you're stating and just want it filed away permanently immediately, use `/dump`. This is a one-shot shortcut that skips the holding pens and executes the Capture, Process, and Distribute stages all at once.

*Pro Tip: It helps to mention in the prompt to which domain or which location you want the note to be stored and located.*

### Direct Notes

If you’re working inside Obsidian, just create a new `.md` file inside `inbox/raw/` or `thinking/`. ASB will find it when you’re ready to process.

---

## The "Thinking" Path

While the standard `inbox/raw/` → `inbox/ready/` → `02_PAGES/` pipeline is explicitly designed for agility—managing notes so they don't linger without distribution—some ideas simply need more time to marinate.

**The `thinking/` Folder**
When you are cooking an idea that you still need to develop further, you or the AI can apply `status: thinking`. These files are routed to the `thinking/` folder. This is a dedicated scratchpad where your complex ideas can land without cluttering your formal domains. You can iterate on these concepts over multiple sessions, and once they are fully formed, they drop back into the standard `/process` pipeline to be distributed as permanent knowledge.

To distribute the idea once it is fully cooked, change `status: ready`, and run the `/process` command.

---

## Step 2: Process (`/process`)

Once your `inbox/raw/` has a few notes in it, it’s time to give them shape. Run:
```text
/process
```

ASB scans every file in `inbox/raw/` (and drafts living in `thinking/`) and restructures them. It will:

- **Add frontmatter**: Apply strict schema fields like `domain`, `type`, and `description`.
- **Flag Multi-topic**: Detect if the note actually covers three different, distinct thoughts that should be separated.
- **Move**: Shift the file from `inbox/raw/` to `inbox/ready/` with the status `ready`.

**You’re always in control.** ASB will ask if you want to classify these as final pages or temporary drafts.

---

## Step 3: Distribute (`/distribute`)

After the notes are sitting in `inbox/ready/` with full metadata, just run:
```text
/distribute
```

ASB moves the files from the Inbox into the right locations (like `domains/[Name]/02_PAGES/` or `work/04_PAGES/`). At this stage, ASB handles the routing intelligently:

- **Simple**: 1 note → 1 new page.
- **Split**: 1 note → multiple pages (if the content covers too many independent concepts).
- **Absorb**: 1 note → merges directly into an existing page (to prevent duplicate concepts).
- **Wikilinks**: It automatically adds the required `[[wikilinks]]` so no note remains an orphan.

---

## Step 4: Closing the Loop

After distribution, three things happen:

1. **Your Knowledge Compounds**: The next time you load a specialized agent or run a search, this permanent page is available as a source of truth.
2. **Your System Stays Clean**: The `inbox/raw/` and `inbox/ready/` folders are emptied out, and everything is exactly where it should be.
3. **Your Original Thoughts Are Preserved**: Even though your notes are processed and distributed, you can still find them exactly as they were, without changes, just how you dropped them. This unedited history is perfectly preserved in the master archive.

---

**Previous:** [03 — Session Flow](03-session-flow.md) | **Next:** [05 — LifeOS & Notes](05-lifeos-and-notes%20(SWITCH%20FOR%20WORK%20LOGIC).md)
