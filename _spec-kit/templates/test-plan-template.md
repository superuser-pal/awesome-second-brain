---
title: "Test Plan: {{FEATURE_NAME}}"
description: "Progressive staged user-test for {{FEATURE_NAME}} — each stage builds vault content the next stage consumes."
tags:
  - spec-kit
  - test-plan
feature: "{{FEATURE_SLUG}}"
status: ready
date: "{{DATE}}"
---

# Test Plan: {{FEATURE_NAME}}

> Related: [[spec]] · [[plan]] · [[impact]] · [[test-artifacts]] · [[test-results]]
> **How to use**: Work through stages in order. Each stage creates real vault content the next stage depends on. Do not skip stages. Record created paths in [[test-artifacts]] as you go. Score each stage 1–5 in [[test-results]].

Only include stages that exercise the feature being built. Delete any stage below that doesn't apply.

---

## Stage 0 — Preconditions

> **Goal**: confirm the vault is in a state where the feature can be exercised.

- [ ] _Precondition 1_
- [ ] _Precondition 2_

**📝 Notes:**
>

---

## Stage 1 — {{first scenario from spec}}

> **Goal**: {{what this stage proves}}

- [ ] Step 1 — _action to take_
- [ ] Step 2 — _expected outcome_
- [ ] Verify: _what to check in Obsidian / in the file tree / in `git status`_

Artifacts created (append paths to [[test-artifacts]]):
- `inbox/raw/…`
- `domains/…`
- `plan/…`

**📝 Notes:**
>

---

## Stage 2 — {{second scenario}}

> **Goal**:

- [ ]
- [ ]
- [ ] Verify:

**📝 Notes:**
>

---

## Stage 3 — Edge cases & regressions

> **Goal**: prove we didn't break adjacent behavior.

- [ ] Adjacent command still works: _e.g. `/capture general` on an unrelated note_
- [ ] Hook still fires correctly: _e.g. frontmatter validation warns on missing field_
- [ ] No orphans introduced (`/audit` passes)

**📝 Notes:**
>

---

## Stage N — End-to-end flow

> **Goal**: full user journey, no hand-holding.

- [ ] From a clean Claude Code session, run _natural-language prompt a user would say_
- [ ] Feature triggers end-to-end without needing to know internal command names
- [ ] Output lands in the correct vault location with correct frontmatter + wikilinks

**📝 Notes:**
>

---

## Scoring

Record in [[test-results]]:

| Stage | Score (1–5) | Key friction |
|---|---|---|
| 0 — Preconditions | | |
| 1 — | | |
| 2 — | | |
| 3 — Edge cases | | |
| N — E2E | | |
| **Overall** | | |

> **1** = broken · **2** = works but confusing · **3** = works as specified · **4** = works well, minor friction · **5** = delightful

**Minimum to ship**: no stage below 3, overall ≥ 3.
