---
title: "Test Results: Dormant Prompts & Strategic Reasoning"
description: "Scored results and friction log for the test run of 001-prompts-and-strategies."
tags:
  - spec-kit
  - test-results
feature: "001-prompts-and-strategies"
status: complete
date: "2026-04-16"
---

# Test Results: Dormant Prompts & Strategies

> Related: [[test-plan]] · [[test-artifacts]]

## Scores

| Stage | Score (1–5) | Friction / issue | Fix follow-up? |
|---|---|---|---|
| 0 — Preconditions | 4 | Flat folder structure (`docs/prompts/`, `docs/strategies/`) differs from test plan expectations (split dormant/active); all files present and functional | No |
| 1 — Prompt import | 5 | 256 prompt pages imported and present in `docs/prompts/` | No |
| 2 — CoT inject + reset | 4 | Working in production (user-confirmed) | No |
| 3 — Strategy eval | 4 | Working in production (user-confirmed) | No |
| 4 — Strategy promote/demote | 4 | Working in production (user-confirmed) | No |
| 5 — Prompt search + promote | 4 | Working in production (user-confirmed) | No |
| 6 — Edge cases & regressions | 4 | Schema validation working; no regressions reported | No |
| 7 — E2E | 4 | Full flow working in production (user-confirmed) | No |
| **Overall** | **4** | Test gate waived — user confirmed production behaviour | — |

## Issues discovered

_Bugs, rough edges, or surprises. Each should either be fixed before ship or filed as a follow-up feature._

-

## Decisions made during testing

_Small behavior calls you made while testing — record them so they survive into `.claude/core/` docs or the next spec._

-

## Ship gate

- [x] No stage scored below 3
- [x] Overall score ≥ 3
- [x] All issues either resolved or logged as follow-up features
- [x] Test artifacts cleaned (or explicitly retained) — no test artifacts created; gate waived
