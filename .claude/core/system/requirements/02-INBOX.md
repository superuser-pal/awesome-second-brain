# PAL Second Brain - Inbox Requirements

**Version:** 1.0.0
**Last Updated:** 2026-04-04

---

## 2.1 Capture (Stage 1)

### 2.1.1 Raw Capture to Inbox

**Given** the user invokes /capture with content
**When** the capture command processes the input
**Then** a note is created at `inbox/raw/[topic]-[YYYY-MM-DD].md` with minimal frontmatter (date, created)

Category: Functional
Verification: Run `/capture some thoughts about X` and confirm file appears in inbox/raw/
Source: [capture.md](../../commands/capture.md)

---

### 2.1.2 Observation Category Syntax

**Given** the user provides structured content
**When** the capture command creates the note
**Then** content is optionally structured with observation categories: `- [fact]`, `- [idea]`, `- [decision]`, `- [technique]`, `- [requirement]`, `- [question]`, `- [insight]`, `- [problem]`, `- [solution]`, `- [action]`

Category: Functional
Verification: Capture a braindump with mixed content and confirm categories are applied
Source: [capture.md](../../commands/capture.md)

---

### 2.1.3 URL Capture with Defuddle

**Given** the captured content contains a URL
**When** the capture command detects it
**Then** `defuddle parse <url> --md` is used to extract clean markdown, which is included in the capture note

Category: Functional
Verification: Run `/capture https://example.com/article` and confirm extracted content appears
Source: [capture.md](../../commands/capture.md)

---

### 2.1.4 Inbox Raw Minimal Schema

**Given** a file is written to inbox/raw/
**When** PostToolUse validates it
**Then** only `date` and `created` fields are required

Category: Validation
Verification: Write a raw capture without `date` and confirm warning
Source: [validate-write.py](../../scripts/validate-write.py)

---

## 2.2 Process (Stage 2)

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
**Then** full YAML frontmatter is added: name, domain, origin, type, status (set to "ready"), description (~150 chars), tags, created, last_updated

Category: Functional
Verification: Process a raw note and confirm all frontmatter fields are present
Source: [process.md](../../commands/process.md)

---

### 2.2.3 Move to Ready

**Given** a note has been processed
**When** frontmatter is complete
**Then** the note is moved from inbox/raw/ to inbox/ready/ using `git mv`

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

**Given** processed notes exist in inbox/ready/
**When** the user invokes /distribute
**Then** each note is routed to `domains/[domain]/02_PAGES/` based on its frontmatter `domain` field

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
