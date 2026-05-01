---
title: "Ship: Dormant Prompts & Strategic Reasoning"
description: "Final shipping manifest for 001-prompts-and-strategies — feature shipped across multiple prior commits; spec-kit tracking closed 2026-04-22."
tags:
  - spec-kit
  - ship
feature: "001-prompts-and-strategies"
status: shipped
date: "2026-04-22"
---

# Ship: Dormant Prompts & Strategies

> Related: [[spec]] · [[plan]] · [[impact]] · [[test-results]]

## 1. Gate check

- [x] [[test-results|Test results]] overall score ≥ 3, no stage < 3 — overall 4/5, all stages ≥ 4
- [x] Every row in [[impact]] touched — verified 2026-04-22 via impact-check
- [x] [[test-artifacts|Test artifacts]] cleaned — test gate waived; no artifacts created

## 2. Git diff — repo-bound (committed)

Feature content was committed across several prior commits, not in a single feature commit. Key commits:

- `0984034` — `feat: reorganize prompts/strategies, update onboarding, and clean up legacy files` — core feature content
- `1ab48ae` — `Find-skill included + how-to extended` — CHANGELOG + how-to updates

Repo-bound paths committed:
- `.claude/commands/thinking/reset.md`, `eval.md`, `cot.md`
- `.claude/skills/prompts/` (SKILL.md + 3 workflows + references/)
- `.claude/skills/strategy/` (SKILL.md + 3 workflows)
- `.claude/scripts/hooks/lib/schemas.ts` — PromptSchema + StrategySchema
- `.claude/core/reference/ASSET-CLASSES.md` — sections 11 + 12
- `.claude/core/reference/ROUTING-TABLE.md` — prompt/strategy rows
- `.claude/core/reference/SYSTEM-INDEX.md` — prompts, strategy, /thinking:* entries
- `.claude/core/system/SKILL-LOGIC.md` — prompts + strategy rows
- `bases/Prompts.base`, `bases/Strategies.base`
- `docs/prompts/` — 256 prompt pages + INDEX.md
- `docs/strategies/` — 23 strategy pages + INDEX.md
- `CLAUDE.md` — "Prompts & Strategies" section
- `CHANGELOG.md` — v2.0.0 entry
- `vault-manifest.json` — v2.0.0, docs paths registered
- `brain/SKILLS.md` — prompts + strategy registered

## 3. Git diff — vault-only (gitignored, not committed)

- `_spec-kit/features/001-prompts-and-strategies/` — all spec-kit tracking files are gitignored via `.git/info/exclude`

## 4. Cleanup

- [x] No test artifacts to clean — gate waived
- [x] No `{{placeholder}}` markers remain in shipped files

## 5. Implementation note

The feature shipped with a **flat folder structure** (`docs/prompts/`, `docs/strategies/`) instead of the `dormant-prompts/active-prompts` split described in the original spec. Promotion/demotion is tracked via `status` frontmatter in-place. Skills, schemas, bases, and commands all reflect this flat structure. This is the canonical final shape.
