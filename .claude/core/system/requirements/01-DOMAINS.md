# PAL Second Brain - Domain Requirements

**Version:** 1.0.0
**Last Updated:** 2026-04-04

---

## 1.1 Domain Creation

### 1.1.1 Create Domain Structure

**Given** the user requests a new domain
**When** the create-domain workflow executes
**Then** a directory `domains/[name]/` is created with: INDEX.md, CONNECTIONS.yaml, 01_PROJECTS/, 02_PAGES/, 05_ARCHIVE/

Category: Functional
Verification: Run create-domain skill and confirm all 4 sub-folders + INDEX.md exist
Source: [create-domain.md](../../skills/create-domain/workflows/create-domain.md)

---

### 1.1.2 Domain Naming Convention

**Given** a user provides a domain name
**When** the name is processed
**Then** it is converted to `lower-kebab-case` (e.g., "LaraLou Substack" → `laralou-substack`)

Category: Validation
Verification: Create a domain with mixed-case input and confirm directory uses kebab-case
Source: [create-domain.md](../../skills/create-domain/workflows/create-domain.md)

---

### 1.1.3 INDEX.md as MOC

**Given** a domain is created
**When** INDEX.md is generated
**Then** it contains: YAML frontmatter (name, description, status, last_updated), Current State section, Active Work table, Quick Links with wikilinks to all sub-areas, and at least one wikilink to an external note (e.g., [[Home]])

Category: Functional
Verification: Create a domain and confirm INDEX.md has all required sections and wikilinks
Source: [create-domain.md](../../skills/create-domain/workflows/create-domain.md)

---

### 1.1.4 Domain Registration

**Given** a domain is created
**When** the creation completes
**Then** the domain is registered in CLAUDE.md's Domains section with name, scope, and detection signals

Category: Functional
Verification: Create a domain and confirm it appears in CLAUDE.md
Source: [create-domain.md](../../skills/create-domain/workflows/create-domain.md)

---

## 1.2 Domain Validation

### 1.2.1 Structure Completeness Check

**Given** a domain exists
**When** the validate-domain workflow runs
**Then** it checks for: INDEX.md, CONNECTIONS.yaml, 01_PROJECTS/, 02_PAGES/, 05_ARCHIVE/ — and reports missing components

Category: Validation
Verification: Delete a sub-folder and run validate, confirm it's flagged
Source: [validate-domain.md](../../skills/create-domain/workflows/validate-domain.md)

---

### 1.2.2 Naming Convention Enforcement

**Given** files exist in a domain
**When** the validate-domain workflow scans them
**Then** it checks: 01_PROJECTS/ files are PROJECT_UPPER_SNAKE.md, 02_PAGES/ files are kebab-case.md

Category: Validation
Verification: Create a file with wrong naming and confirm validation flags it
Source: [validate-domain.md](../../skills/create-domain/workflows/validate-domain.md)

---

### 1.2.3 Wikilink Requirement

**Given** a domain note exists
**When** validation runs
**Then** every note must contain at least one wikilink — orphans are flagged

Category: Validation
Verification: Create a note without wikilinks and confirm validation flags it
Source: [validate-domain.md](../../skills/create-domain/workflows/validate-domain.md)

---

### 1.2.4 Nesting Depth Limit

**Given** files exist in a domain
**When** validation checks folder depth
**Then** no folder exceeds 3 levels below the domain root

Category: Validation
Verification: Create a deeply nested folder and confirm validation flags it
Source: [validate-domain.md](../../skills/create-domain/workflows/validate-domain.md)

---

## 1.3 Domain Mapping

### 1.3.1 INDEX.md Active Work Refresh

**Given** a domain is being mapped
**When** the map-domain workflow scans 02_PROJECTS/
**Then** the Active Work table in INDEX.md is rebuilt from project file frontmatter (name, status, last_updated)

Category: Functional
Verification: Add a project file and run map-domain, confirm INDEX.md table updates
Source: [map-domain.md](../../skills/create-domain/workflows/map-domain.md)

---

### 1.3.2 Naming Auto-Fix

**Given** files have naming violations
**When** the map workflow detects them
**Then** renames are proposed (not auto-applied) — user must confirm. Renames use `git mv`.

Category: Functional
Verification: Create a wrongly-named file, run map, confirm rename suggestion appears
Source: [map-domain.md](../../skills/create-domain/workflows/map-domain.md)

---

### 1.3.3 Orphan Detection

**Given** a domain is being mapped
**When** the workflow checks wikilinks
**Then** notes with zero inbound or outbound links are flagged as orphans

Category: Validation
Verification: Create an unlinked note and run map-domain, confirm orphan warning
Source: [map-domain.md](../../skills/create-domain/workflows/map-domain.md)

---

## 1.4 Domain Archiving

### 1.4.1 Single File Archive

**Given** a file in a domain needs archiving
**When** the archive-domain workflow runs for a single file
**Then** a deprecation header (deprecated date, reason, original_location) is added and the file is moved to 05_ARCHIVE/ via `git mv`

Category: Functional
Verification: Archive a project file and confirm deprecation header + 05_ARCHIVE/ location
Source: [archive-domain.md](../../skills/create-domain/workflows/archive-domain.md)

---

### 1.4.2 Domain Archive

**Given** an entire domain is being archived
**When** the user confirms domain archival
**Then** INDEX.md status is set to `archived`, archived date and reason are added, Current State section is updated with archive notice

Category: Functional
Verification: Archive a domain and confirm INDEX.md frontmatter shows status: archived
Source: [archive-domain.md](../../skills/create-domain/workflows/archive-domain.md)

---

### 1.4.3 Active Content Protection

**Given** a domain is being archived
**And given** it has in-progress projects
**When** the archive workflow runs
**Then** the user is prompted to move active projects to another domain or mark them as cancelled before archiving

Category: Functional
Verification: Try to archive a domain with active projects and confirm the prompt
Source: [archive-domain.md](../../skills/create-domain/workflows/archive-domain.md)

---

## 1.5 Domain Schema Validation

### 1.5.1 INDEX.md Schema

**Given** a domain INDEX.md is written or edited
**When** the PostToolUse hook fires
**Then** frontmatter is validated for: name, description, status, last_updated

Category: Validation
Verification: Write INDEX.md missing `status` and confirm warning
Source: [validate-write.py](../../scripts/validate-write.py)

---

### 1.5.2 Project Schema

**Given** a PROJECT\__.md file in domains/_/02_PROJECTS/ is written
**When** the PostToolUse hook fires
**Then** frontmatter is validated for: name, domain, goal, status, priority, tags, created, last_updated

Category: Validation
Verification: Write a project file missing `priority` and confirm warning
Source: [validate-write.py](../../scripts/validate-write.py)
