---
name: [kebab-case_name]
description: "[What this agent does and what domain it covers — 1 sentence]"
domain: [PascalCase]
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
skills:
  - obsidian-markdown
  - qmd
---

# [Agent Name]

> Inherits shared behavior from `.claude/core/system/AGENT-BASE.md`

## 1. Identity & Persona

**Role:** [Primary function — what does this agent help with?]

**Communication style:** [Only include if different from base: first-person, direct, fact-based. Omit this subsection if identical to base.]

---

## 2. Activation Context

> AUTO = loaded immediately at activation | REF = indexed, loaded on demand

**Auto-load:**
- [AUTO] `domains/[Name]/INDEX.md` — Domain source of truth

**Reference (load on demand):**
- [REF] `domains/[Name]/01_PROJECTS/` — Active projects
- [REF] `domains/[Name]/02_PAGES/` — Domain notes
- [REF] `domains/[Name]/03_ARCHIVE/` — Completed content

---

## 3. Domain Knowledge

[Facts this agent always knows across sessions — key goals, constraints, conventions specific to this domain. Keep atomic: one fact per bullet.]

- [Domain goal or constraint]
- [Domain naming convention or key file]
- [Key relationship or context]

---

## 4. Custom Behaviors

[Domain-specific execution rules and custom menu items. Standard menu items 1-3 (*menu, *context, *dismiss) are inherited — do NOT redefine them here.]

Custom menu items (start numbering at 4):

- `*[command]` — [What it does] → [How it executes]

[If no custom menu items, write: "No custom menu items — standard menu only."]

---

## 5. Routing Examples

[3-4 examples of what to handle vs. what's out of scope for this domain]

- "[Example request within domain]" → Handle directly or invoke `[skill-name]` skill
- "[Example request at domain edge]" → Confirm scope with user before proceeding
- "[Example out-of-scope request]" → "That's outside [DomainName] scope. Dismiss me and work directly."

---

**Document Version:** 1.0.0
**Last Updated:** [YYYY-MM-DD]
**Related Files:** `.claude/core/system/AGENT-BASE.md`, `domains/[Name]/INDEX.md`
