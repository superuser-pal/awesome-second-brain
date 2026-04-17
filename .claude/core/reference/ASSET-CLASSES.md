---
title: PAL Second Brain Asset Classes
version: 1.0.0
layer: REFERENCE
purpose: Canonical frontmatter schemas for all vault file types — authoritative source for validate-write.ts and hooks/lib/schemas.ts
last_updated: 2026-04-05
---

# Asset Classes

Every file type in the vault has a strict frontmatter schema. Properties must appear in the order listed. `hooks/validate-write.ts` uses this file as its authoritative reference — schemas are implemented as Zod objects in `hooks/lib/schemas.ts`.

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
due_date: YYYY-MM-DD        # optional — target delivery date
completion_date: YYYY-MM-DD # set when archiving; omit if not completed
tags: []
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
```

**Task format:** All open and in-progress tasks must use `#todo` tag (the Tasks plugin global filter). Optional inline due date with `📅 YYYY-MM-DD`.

```markdown
### To Do
- [ ] Task description #todo
- [ ] Task with due date #todo 📅 2026-04-30

### In Progress
- [/] Task currently being worked on #todo

### Done
- [x] Completed task ✅ 2026-04-13
```

**Status symbol → Tasks plugin type mapping:**

| Symbol | Meaning | Tasks plugin type |
|--------|---------|-------------------|
| `[ ]` | To Do | `TODO` |
| `[/]` | In Progress | `IN_PROGRESS` |
| `[!]` | Blocked | `ON_HOLD` *(must be registered as custom status in plugin settings)* |
| `[?]` | Paused | `ON_HOLD` |
| `[I]` | Backlog | `TODO` |
| `[-]` | Not Doing | `CANCELLED` |
| `[x]` | Done | `DONE` |

**`completion_date` vs task-level done date:**
- `completion_date` (frontmatter) = when the **project** was completed — set during archive
- `✅ YYYY-MM-DD` (inline on task line) = when an individual **task** was completed — appended automatically by the Tasks plugin on toggle. Do not set manually.

**Archived projects** move to `brain/MASTER_ARCHIVE/projects/` (not `domains/[Name]/03_ARCHIVE/`).

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

## 8. 1:1 Meeting Note

**Location:** `work/02_1-1/<Person>.md`

One file per person. Meetings accumulate newest-first under `## Meetings` as `### YYYY-MM-DD — Topic` sections. The `date` field always reflects the most recent meeting.

```yaml
person: "Full Name"          # who the 1:1 is with
date: YYYY-MM-DD             # most recent meeting date
description: "..."           # ~150 char rolling summary (updated each session)
tags:
  - 1-1
  - work-note
status: active               # active | archived
```

**Body requirements:**
- `## Latest Summary` — one-paragraph rolling summary, updated each meeting
- `## Meetings` — reverse-chronological `### YYYY-MM-DD — Topic` sections
- `## Related` — wikilinks to PEOPLE.md entry and relevant work notes

**Promotion rule (via `/distribute`):** Never create a new file per meeting. Instead, prepend a new `### YYYY-MM-DD — Topic` section to the existing person file, update `## Latest Summary`, and update the `date` frontmatter field.

---

## 9. Plan — Daily Note

**Location:** `plan/DD-MM-YY-XX.md`

*(XX = day suffix: MO/TU/WE/TH/FR/SA/SU)*

```yaml
date: YYYY-MM-DD
tags:
  - daily
```

---

## 10. Plan — Weekly File

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

## 11. Prompt (Dormant or Active)

**Location:** `docs/prompts/<category>/<slug>.md` | `docs/prompts/<category>/<slug>.md`

Atomic pattern pages. Dormant prompts are searchable but invisible in `/` autocomplete. Promoting a prompt flips `status: active` in-place and generates a command stub.

```yaml
type: prompt
status: dormant             # dormant | active
category: "<category>"      # verb-prefix category (analysis, extraction, synthesis, etc.)
description: "..."          # ~150 char one-line summary of what this prompt does
tags:
  - prompt
  - <category>
```

**Body requirements:**
- Original pattern content under `## Prompt`
- `## Usage` section explaining when to use
- `## Related` section with `[[wikilinks]]` to related prompts or strategies

**Status lifecycle:**
- `dormant` — in library, searchable, no command stub
- `active` — promoted; a matching `.claude/commands/prompts/<slug>.md` stub exists

---

## 12. Strategy (Dormant or Active)

**Location:** `docs/strategies/<slug>.md` | `docs/strategies/<slug>.md`

Atomic reasoning strategy pages. Active strategies have a matching `/thinking:<slug>` command stub. One strategy — `cot` — is pre-promoted at setup.

```yaml
type: strategy
status: dormant             # dormant | active
description: "..."          # ~150 char one-line summary of the strategy
tags:
  - strategy
  - reasoning
  - <technique>             # e.g. chain-of-thought, reflexion, tree-of-thought
```

**Body requirements:**
- Strategy instruction text under `## Strategy`
- `## When to apply` section
- `## Trade-offs` section
- `## Related` section with `[[wikilinks]]`

**Status lifecycle:**
- `dormant` — in library, searchable, no command stub
- `active` — promoted; a matching `.claude/commands/thinking/<slug>.md` stub exists

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

**Related Files:** `DOMAINS-LOGIC.md`, `.claude/scripts/hooks/validate-write.ts`, `.claude/scripts/hooks/lib/schemas.ts`, `.claude/core/system/templates/`
