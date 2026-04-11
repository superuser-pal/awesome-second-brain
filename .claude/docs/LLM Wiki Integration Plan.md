---
date: 2026-04-07
description: Architecture gap analysis between PAL Second Brain and Karpathy's LLM Wiki pattern, with small-to-medium changes to close the gaps.
tags: [architecture, planning, llm-wiki, knowledge-base]
status: active
---

# LLM Wiki Architecture Review & Integration Plan

## Context

**What prompted this:** The user read Andrej Karpathy's viral LLM Wiki concept (April 2026 tweet + GitHub gist) about building persistent, compounding knowledge bases using LLMs. The goal is to review what the current `my-second-brain` vault already does, identify alignment gaps, and propose small-to-medium changes to better embody the wiki-compiler pattern.

**The article in one sentence:** Instead of RAG (re-deriving knowledge on every query), drop raw sources into `raw/`, have an LLM compile them into a structured wiki with cross-references, contradictions flagged, and 10-15 cascading page updates per ingest. Knowledge compounds; the LLM is a wiki maintainer, not a chatbot.

---

## Current Architecture: What's Already There

The vault already implements most of Karpathy's pattern. This is the honest alignment map:

| Karpathy Concept | Current Implementation | Status |
|---|---|---|
| `raw/` sources directory | `inbox/raw/` | ✅ Aligned |
| Compiled wiki (`wiki/`) | `domains/[Name]/03_PAGES/` + `01_MEMORY/` | ✅ Mostly aligned |
| Schema file (CLAUDE.md) | `.claude/CLAUDE.md` | ✅ Exact match |
| Ingest operation | `/capture` → `/process` → `/distribute` | ✅ Three-stage flow |
| Query + file back answers | `/dump` | Partial — dumps don't explicitly file synthesis |
| Lint / health check | `/vault-audit` (cross-linker, vault-librarian) | ✅ Aligned |
| Semantic search | QMD (hybrid BM25 + vector) | ✅ Aligned |
| Obsidian as wiki viewer | Already in use | ✅ Aligned |
| Compounding brain notes | `.claude/core/user/` topic notes | ✅ Aligned |
| Append-only ingest log | Nothing | ❌ Missing |
| Raw source immutability | Raw files are consumed and moved | ❌ Missing |
| Cascading updates on ingest | Only one note created per source | ❌ Missing |
| Contradiction detection | No check against existing domain knowledge | ❌ Missing |
| Source synopsis vs concept page | Everything lands in 03_PAGES/ undifferentiated | ❌ Missing |

**Verdict:** The architecture is 70% aligned. The vault already has the right skeleton. The gaps are in the _ingest depth_ (cascading updates), _page type differentiation_, and _source immutability_.

---

## What Karpathy Does That the Vault Doesn't

### 1. Cascading Updates Per Ingest
When a new source is ingested, Karpathy's system updates **10-15 existing wiki pages** — not just creates one new note. `/distribute` today only routes one note to a domain folder and adds a wikilink to INDEX.md. It doesn't enrich related existing pages.

### 2. Source Synopsis as Permanent Artifact
The raw source stays immutable. The LLM creates a **source synopsis** (origin, key claims, when ingested) that persists alongside the concept pages it spawned. Currently, `inbox/raw/` files are moved and lost — only the derived note survives.

### 3. Append-Only Ingest Log
A `log.md` file records every ingest event: what source, what date, what pages were created/updated. Useful for auditing and grep-ing history. The vault relies on git history for this, which is harder to query by content.

### 4. "File Back" Synthesis Loop
When a user asks a question, the synthesized answer gets filed back as a new wiki page (creating compounding knowledge). `/dump` does one-shot capture but doesn't have an explicit "synthesis → file back" pattern.

### 5. Contradiction Detection
During ingest, new claims are checked against existing domain knowledge. If a new source contradicts an existing page, it's flagged. The vault has no equivalent.

---

## Proposed Changes

### Small Changes (Low effort, high alignment value)

**S1. Add `source-synopsis` as a note type in ASSET-CLASSES.md**
- New frontmatter type: `type: source-synopsis`
- Required fields: `origin` (URL/file), `date`, `domain`, `description`, `tags`, `derived-pages` (list of wikilinks to pages spawned from this source)
- Location: `domains/[Name]/03_PAGES/` (same folder, just a new type)
- This preserves the audit trail: what source spawned what knowledge

**S2. Add an ingest log per domain**
- File: `domains/[Name]/01_MEMORY/ingest-log.md`
- Format: append-only table (date | source | pages-created | pages-updated)
- `/distribute` writes one line per ingest event
- Light grep target for "what did I ingest about X and when?"

**S3. Enhance /dump to prompt "file synthesis?"**
- After answering a question via /dump, ask: "This synthesis worth filing as a permanent page?"
- If yes, create a concept page in the relevant domain with `type: concept-page`
- This closes the "query → file back" loop Karpathy emphasizes as the compounding mechanism

**S4. Add `concept-page` note type to ASSET-CLASSES.md**
- Differentiates LLM-synthesized concept articles from raw-derived notes
- Frontmatter: `type: concept-page`, `synthesized-from` (list of wikilinks to source-synopses)
- These are the "compiled wiki articles" — Karpathy's core output

---

### Medium Changes (More work, higher architectural value)

**M1. Cascading update step in /distribute**
- After routing a new note to a domain, run a QMD query to find the 3-5 most related existing pages
- Present them to the user: "These pages may need updating given this new source"
- Optionally auto-append a cross-reference section to each found page
- This is the most impactful Karpathy concept to implement

**M2. Contradiction detection in /process**
- During stage 2 processing, run a QMD semantic search against existing domain notes
- Flag if any existing note makes claims that the new source contradicts
- Output a warning block in the processed note: `> ⚠️ Possible contradiction with [[Existing Note]]`
- Non-blocking — user decides how to resolve

**M3. Source immutability: archive raw to a `sources/` area**
- Instead of moving raw files through the pipeline and losing them, archive the original to `work/sources/` or `domains/[Name]/04_ARCHIVE/sources/`
- The processed + distributed note links back to the archived raw source
- Raw source becomes an immutable reference; derived notes are the compiled wiki
- Mirrors Karpathy's explicit `raw/` vs `wiki/` separation

**M4. New `/ingest` command as a wiki-first shortcut**
- Combines: capture → process → distribute + cascade update + source-synopsis creation + ingest log entry
- Single command for the full Karpathy ingest pattern
- The current three commands still exist for granular control; `/ingest` is the fast path
- Could invoke a new `ingest-coordinator` subagent for the cascade logic

---

## What NOT to Change

- The three-stage inbox flow is good — it maps exactly to Karpathy's ingest pattern
- Domain structure (INDEX + 01-04 subfolders) is solid wiki architecture
- Brain topic notes are Karpathy's "personal knowledge wiki" applied to meta-knowledge
- `/vault-audit` as lint is the right pattern
- QMD integration is exactly what Karpathy recommends for local search
- CLAUDE.md as schema file is the exact pattern Karpathy names

---

## Recommended Execution Order

1. **Start with S1 + S4** — add `source-synopsis` and `concept-page` types to ASSET-CLASSES.md. Pure schema change, no workflow impact yet.
2. **Then S2** — add ingest-log.md template to 01_MEMORY/ and update /distribute to write to it. Low risk.
3. **Then S3** — add "file synthesis?" prompt to /dump. Small enhancement to an existing command.
4. **Then M1** — cascading update step in /distribute. Highest value, needs QMD integration testing.
5. **Then M2** — contradiction detection. Depends on QMD working well for semantic comparison.
6. **Then M3** — source immutability / `sources/` archive. Requires migrating existing workflow expectations.
7. **Then M4** — `/ingest` command as orchestrator. Do this last, after the pieces exist.

---

## Files That Would Change

| Change | Files |
|---|---|
| S1 + S4 | `.claude/core/reference/ASSET-CLASSES.md` |
| S2 | `.claude/commands/distribute.md`, add template `domains/[Name]/01_MEMORY/ingest-log.md` |
| S3 | `.claude/commands/dump.md` |
| M1 | `.claude/commands/distribute.md` |
| M2 | `.claude/commands/process.md` |
| M3 | `.claude/commands/distribute.md`, `.claude/commands/capture.md` |
| M4 | `.claude/commands/ingest.md` (new), possibly new subagent in `.claude/agents/` |

---

## Verification

After implementing:
- Drop a URL into `/capture`, run through `/process` + `/distribute`, verify a `source-synopsis` note is created and ingest-log.md is updated
- Run `/dump "what do I know about X?"`, verify the synthesis prompt appears and files back correctly
- Run `/vault-audit`, verify orphan detection and cross-reference checking still work
- Check that `source-synopsis` and `concept-page` types pass frontmatter validation in `validate-write.py`
