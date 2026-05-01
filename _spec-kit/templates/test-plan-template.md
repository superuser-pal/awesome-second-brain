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

Only include stages that exercise this feature. Delete any stage that doesn't apply.

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

- [ ] Step 1 — _action_
- [ ] Step 2 — _expected outcome_
- [ ] Verify: _what to check in Obsidian / file tree / git status_

Artifacts created (append to [[test-artifacts]]):
- `inbox/raw/…`

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

> **Goal**: prove adjacent behavior wasn't broken.

- [ ] Adjacent command still works: _e.g. `/capture:general` on an unrelated note_
- [ ] Hook still fires: _e.g. frontmatter validation warns on missing field_
- [ ] No orphans introduced (`/core:audit` passes)

**📝 Notes:**
>

---

## Stage N — End-to-end flow

> **Goal**: full user journey, no hand-holding.

- [ ] Natural-language prompt a real user would type
- [ ] Feature triggers end-to-end without knowing internal command names
- [ ] Output lands in correct vault location with correct frontmatter + wikilinks

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
