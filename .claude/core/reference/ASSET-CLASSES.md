---
title: PAL Second Brain Asset Classes
version: 1.0.0
layer: REFERENCE
purpose: Canonical frontmatter schemas for all vault file types — authoritative source for validate-write.py
last_updated: 2026-04-05
---

# Asset Classes

Every file type in the vault has a strict frontmatter schema. Properties must appear in the order listed. `validate-write.py` uses this file as its authoritative reference.

---

## 0. Note (Temporary Capture)

**Location:** `inbox/raw/*.md` | `inbox/ready/*.md` | `thinking/*.md`

Notes are temporary. They are created by capture commands and promoted to pages via `/distribute`. Asset class changes when the file moves — the `type` field stays the same throughout.

```yaml
date: YYYY-MM-DD
created: YYYY-MM-DD
status: unprocessed         # unprocessed | thinking | ready | processed
```

After `/process` adds full frontmatter:

```yaml
name: "kebab-case-topic"    # descriptive slug
date: YYYY-MM-DD
created: YYYY-MM-DD
status: ready               # ready after /process; processed after /distribute
origin: braindump           # braindump | url | doc | manual
type: note                  # concept | decision | reference | meeting | idea | note | belief | frame | lesson | model | goal | plan | research
domain: "DomainName"        # target domain; 'work' for cross-domain content
description: "..."          # ~150 char summary
tags: []
last_updated: YYYY-MM-DD
synthesized-from: []        # filled on split pages: wikilinks to source note(s)
```

**Status lifecycle:**
- `unprocessed` — just captured, no domain or classification yet
- `thinking` — moved to `thinking/`; reasoning, scratchpad, or ongoing research
- `ready` — processed by `/process`, awaiting `/distribute`
- `processed` — promoted to a page (kept on source note for provenance)

---

## 1. Domain INDEX

**Location:** `domains/[Name]/INDEX.md`

```yaml
name: "DomainName"          # PascalCase, matches directory
description: "..."          # Purpose/scope of this domain
status: active              # active | paused | completed | archived
last_updated: YYYY-MM-DD
```

**Body requirements:** Must contain a `## Current State` section, a `## Active Work` table, and at least one `[[wikilink]]` to an external note.

---

## 2. Domain Project

**Location:** `domains/[Name]/01_PROJECTS/PROJECT_*.md`

```yaml
name: "PROJECT_NAME"        # UPPER_SNAKE_CASE
domain: "DomainName"        # PascalCase, matches parent directory
goal: "..."                 # What success looks like
status: planning            # planning | in_progress | blocked | completed | cancelled
priority: medium            # low | medium | high | critical
tags: []
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
```

---

## 3. Domain Page

**Location:** `domains/[Name]/02_PAGES/*.md`

> **Asset class vs content type:** Asset class is determined by WHERE a file lives, NOT by the `type` field. A Domain Page with `type: note` is still a **page** (permanent). The `type` field describes what the page is about. It does NOT change when a note is promoted — a note of `type: concept` becomes a page of `type: concept`.

```yaml
name: "page_name"           # kebab-case
domain: "DomainName"        # PascalCase, matches parent directory
origin: manual              # braindump | ai-output | manual
type: note                  # concept | decision | reference | meeting | idea | note | belief | frame | lesson | model | goal | plan | research
# When type is "concept", also include: synthesized-from: []
status: processed           # processed | archived
description: "..."          # ~150 char summary of content and key value
tags: []
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
```

---

## 4. Domain Concept Page

**Location:** `domains/[Name]/02_PAGES/*.md` (with `type: concept`)

LLM-synthesized concept articles — compiled from multiple sources via the synthesis file-back pattern. These are the "compiled wiki articles" from Karpathy's LLM Wiki pattern.

```yaml
name: "concept_name"        # kebab-case
domain: "DomainName"        # PascalCase, matches parent directory
origin: ai-output           # always ai-output for synthesis
type: concept               # distinguishes from other domain pages
status: processed           # processed | archived
description: "..."          # ~150 char summary
synthesized-from: []        # list of wikilinks to source notes, e.g. ["[[source1]]", "[[source2]]"]
tags: []
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
```

---

## 5. Inbox Raw

**Location:** `inbox/raw/*.md`

Minimal schema — raw capture, no classification yet.

```yaml
date: YYYY-MM-DD
created: YYYY-MM-DD
status: unprocessed
```

---

## 6. Inbox Ready

**Location:** `inbox/ready/*.md`

Full schema — processed and awaiting distribution to a domain.

```yaml
name: "descriptive_name"    # kebab-case
domain: "target-domain"     # PascalCase — destination domain
origin: braindump           # braindump | ai-output | manual
type: note                  # see Domain Page type enum
status: ready               # unprocessed | thinking | ready | processed
description: "..."          # ~150 char summary
tags: []
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
```

---

## 7. Work Note

**Location:** `work/01_PROJECTS/*.md` (then `work/07_ARCHIVE/YYYY/` when completed)

```yaml
title: "Descriptive Note Title"
date: YYYY-MM-DD
quarter: Q1-2026            # QN-YYYY — required
description: "..."          # ~150 char summary
tags: []
```

**Optional fields (add when applicable):**
```yaml
ticket: TICKET-123          # Incident ticket number
severity: high              # low | medium | high | critical (incidents)
role: incident-lead         # Your role in the incident
cycle: h1-2026              # Review cycle (review-related notes)
person: "Full Name"         # Person this evidence relates to
team: Backend               # Team name
```

---

## 8. Plan — Daily Note

**Location:** `plan/DD-MM-YY-XX.md`

*(XX = day suffix: MO/TU/WE/TH/FR/SA/SU)*

```yaml
date: YYYY-MM-DD
tags:
  - daily
```

---

## 9. Plan — Weekly File

**Location:** `plan/W[x]_YYYY-MM-DD.md`

*(Closed weeks archived to `plan/archive/W[x].md`)*

```yaml
week: W14                   # W[week number]
date: YYYY-MM-DD            # Monday of the week
goal: "..."                 # One sentence week goal
tags:
  - weekly
```

---

## Validation Rules

- Property order must match schemas above
- `status` values must use listed enums exactly (case-sensitive)
- `type` (Domain Page) must use listed enum exactly
- `origin` must use listed enum exactly: `braindump | ai-output | manual`
- Empty arrays use `[]` — not `null`
- Missing optional fields: omit entirely — do not include with `null` value
- Dates use ISO format: `YYYY-MM-DD`
- `description` fields should be ~150 characters — not empty strings

---

**Related Files:** `DOMAINS-LOGIC.md`, `.claude/scripts/validate-write.py`, `.claude/core/system/templates/`
