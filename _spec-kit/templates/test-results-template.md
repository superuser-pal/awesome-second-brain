---
title: "Test Results: {{FEATURE_NAME}}"
description: "Scored results and friction log for the test run of {{FEATURE_NAME}}."
tags:
  - spec-kit
  - test-results
feature: "{{FEATURE_SLUG}}"
status: in-progress
date: "{{DATE}}"
---

# Test Results: {{FEATURE_NAME}}

> Related: [[test-plan]] · [[test-artifacts]]

## Scores

| Stage | Score (1–5) | Friction / issue | Fix follow-up? |
|---|---|---|---|
| 0 — Preconditions | | | |
| 1 — | | | |
| 2 — | | | |
| 3 — Edge cases | | | |
| N — E2E | | | |
| **Overall** | | | |

## Issues discovered

_Bugs, rough edges, or surprises. Each should either be fixed before ship or filed as a follow-up feature._

-

## Decisions made during testing

_Small behavior calls you made while testing — record them so they survive into `.claude/core/` docs or the next spec._

-

## Ship gate

- [ ] No stage scored below 3
- [ ] Overall score ≥ 3
- [ ] All issues either resolved or logged as follow-up features
- [ ] Test artifacts cleaned (or explicitly retained)
