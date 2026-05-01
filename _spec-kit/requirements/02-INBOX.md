# Awesome Second Brain - Inbox Requirements

**Version:** 1.0.0
**Last Updated:** 2026-05-01

---

## 2.1 Capture (Stage 1)

### 2.1.0 Initial Status Assignment

**Given** any capture command creates a new note
**When** the note is written to disk
**Then** `status: unprocessed` MUST be set in the frontmatter (for inbox captures) or `status: thinking` (for thinking captures)

Category: Validation
Verification: Run `/general` and confirm `status: unprocessed` appears in the created file
Source: [general.md](../../commands/capture/general.md)

---

### 2.1.1 Raw Capture to Inbox

**Given** the user invokes /general with content
**When** the capture command processes the input
**Then** a note is created at `inbox/raw/[topic]-[YYYY-MM-DD].md` with minimal frontmatter (date, created, status: unprocessed)

Category: Functional
Verification: Run `/general some thoughts about X` and confirm file appears in inbox/raw/
Source: [general.md](../../commands/capture/general.md)

---

### 2.1.2 Observation Category Syntax

**Given** the user provides structured content
**When** the capture command creates the note
**Then** content is optionally structured with observation categories: `- [fact]`, `- [idea]`, `- [decision]`, `- [technique]`, `- [requirement]`, `- [question]`, `- [insight]`, `- [problem]`, `- [solution]`, `- [action]`

Category: Functional
Verification: Capture a braindump with mixed content and confirm categories are applied
Source: [general.md](../../commands/capture/general.md)

---

### 2.1.3 URL Capture with Defuddle

**Given** the captured content contains a URL
**When** the capture command detects it
**Then** `defuddle parse <url> --md` is used to extract clean markdown, which is included in the capture note

Category: Functional
Verification: Run `/general https://example.com/article` and confirm extracted content appears
Source: [general.md](../../commands/capture/general.md)

---

### 2.1.4 Inbox Raw Minimal Schema

**Given** a file is written to inbox/raw/
**When** PostToolUse validates it
**Then** only `date` and `created` fields are required

Category: Validation
Verification: Write a raw capture without `date` and confirm warning
Source: [validate-write.ts](../../scripts/hooks/validate-write.ts)

---

## 2.2 Process (Stage 2)

### 2.2.0 Thinking Content Routing

**Given** a raw note is being processed by /process
**When** the content is primarily reasoning, a scratchpad, an open question, or ongoing research
**Then** /process MUST offer to move it to `thinking/` with `status: thinking` instead of `inbox/ready/`

Category: Functional
Verification: Create a raw note with reasoning content and confirm thinking/ route is offered
Source: [process.md](../../commands/process.md)

---

### 2.2.0b Thinking Notes Reminder

**Given** /process has finished processing inbox/raw/ files
**When** there are notes in `thinking/` with `status: thinking`
**Then** /process MUST display a passive reminder listing those notes with last_updated dates and instructions for promoting or archiving them — without interactive prompts

Category: Functional
Verification: Create a thinking/ note and run /process; confirm reminder block appears
Source: [process.md](../../commands/process.md)

---

### 2.2.1 Scan and Classify

**Given** unprocessed notes exist in inbox/raw/
**When** the user invokes /process
**Then** each note is read, its domain is detected (from content + CLAUDE.md domain signals), and its type is classified (concept, decision, reference, meeting, idea, note, etc.)

Category: Functional
Verification: Create a raw note mentioning "substack newsletter" and confirm laralou domain is detected
Source: [process.md](../../commands/process.md)

---

### 2.2.2 Full Frontmatter Generation

**Given** a raw note is being processed
**When** domain and type are determined
**Then** full YAML frontmatter is added: name, domain, origin, type, status (set to "unprocessed"), description (~150 chars), tags, date, created, last_updated (date strings must be quoted)

Category: Functional
Verification: Process a raw note and confirm all frontmatter fields are present
Source: [process.md](../../commands/process.md)

---

### 2.2.3 Move to Ready

**Given** a note has been processed
**When** frontmatter is complete
**Then** the note is moved from inbox/raw/ to inbox/ready/ using a two-step process (`mv` then edit `status: ready`)

Category: Functional
Verification: Process a note and confirm it moves to inbox/ready/
Source: [process.md](../../commands/process.md)

---

### 2.2.4 User Confirmation for Domain

**Given** domain detection has low confidence
**When** the process workflow can't determine the domain
**Then** the user is asked to choose a domain or create a new one

Category: Functional
Verification: Create an ambiguous note and confirm domain selection prompt appears
Source: [process.md](../../commands/process.md)

---

## 2.3 Distribute (Stage 3)

### 2.3.1 Route to Domain

**Given** processed notes exist in inbox/ready/ or thinking/ (with status: ready)
**When** the user invokes /distribute
**Then** any note in inbox/ready/ with `status: thinking` is moved to `thinking/` and skipped. Each ready note is then routed to `domains/[domain]/02_PAGES/` based on its frontmatter `domain` field

Category: Functional
Verification: Distribute a note with domain: laralou and confirm it moves to domains/laralou/02_PAGES/
Source: [distribute.md](../../commands/distribute.md)

---

### 2.3.2 User Confirmation Before Moving

**Given** the distribute command has determined destinations
**When** it presents the routing plan
**Then** the user must confirm before any files are moved

Category: Functional
Verification: Run /distribute and confirm plan is shown before execution
Source: [distribute.md](../../commands/distribute.md)

---

### 2.3.3 Wikilink Addition

**Given** a note is distributed to its domain
**When** the file lands in its final location
**Then** wikilinks are added: link to domain INDEX.md, links to mentioned people/projects/concepts

Category: Functional
Verification: Distribute a note and confirm [[domain INDEX]] link is added
Source: [distribute.md](../../commands/distribute.md)

---

### 2.3.4 Action Extraction

**Given** a distributed note contains `[action]` observations
**When** distribution completes
**Then** the user is offered to create tasks in the relevant project file

Category: Functional
Verification: Distribute a note with [action] items and confirm task creation prompt
Source: [distribute.md](../../commands/distribute.md)

---

### 2.3.5 Note → Page Transformation

**Given** a note is successfully distributed to `domains/[domain]/02_PAGES/` or `work/04_PAGES/`
**When** the file move completes
**Then** the source note MUST have `status: processed` set, and the resulting file is considered a **page** (permanent). The source note is retained for provenance — not deleted.

Category: Functional
Verification: Distribute a note and confirm source gets `status: processed` and page appears in domain folder
Source: [distribute.md](../../commands/distribute.md)

---

### 2.3.6 Split Promotion

**Given** a note in `inbox/ready/` covers 3+ independently page-worthy topics (each self-contained and useful on its own)
**When** /distribute processes it
**Then** /distribute MUST detect this and offer to split into separate pages, each with:

- `synthesized-from: ["[[source-note]]"]` in frontmatter
- Bidirectional `## Related` cross-links between all split pages
- `status: processed` on the source note

Category: Functional
Verification: Create a multi-topic note and run /distribute; confirm split offer appears
Source: [distribute.md](../../commands/distribute.md)

---

### 2.3.7 Absorb Promotion

**Given** a note in `inbox/ready/` closely duplicates or extends an existing page in the target domain
**When** /distribute finds a duplicate via semantic search
**Then** /distribute MUST present an explicit absorb option showing the user:
  - The existing page title
  - The specific content that would be appended
  - Which section it goes under
Upon execution, it must copy the source to `brain/MASTER_ARCHIVE/`, delete the original from `inbox/ready/`, and log to `brain/INGEST_LOG.md`.

Category: Functional
Verification: Create a note that duplicates existing page content and run /distribute; confirm absorb offer
Source: [distribute.md](../../commands/distribute.md)

---

### 2.3.8 Status Enum (canonical)

**Given** any inbox or thinking note
**When** its `status` field is set
**Then** only these values are valid: `unprocessed | thinking | ready | processed | archived`

Category: Validation
Verification: validate-write.ts should warn on any other status value in inbox/ or thinking/
Source: [ASSET-CLASSES.md](../../core/reference/ASSET-CLASSES.md)
