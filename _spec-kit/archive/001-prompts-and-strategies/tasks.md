---
title: "Tasks: Dormant Prompts & Strategic Reasoning"
description: "Executable checklist for building 001-prompts-and-strategies, derived from plan and impact."
tags:
  - spec-kit
  - tasks
feature: "001-prompts-and-strategies"
status: complete
date: "2026-04-16"
---

# Tasks: Dormant Prompts & Strategies

> Related: [[plan]] · [[impact]]

Each task maps to one row in [[impact]]. Check off as you complete. If a new task appears, amend [[impact]] first.

## Build tasks

### Phase 0 — Spec alignment (blocker)

- [x] **T0** — Rewrite `spec.md` to reflect `docs/` paths, drop hook auto-suggestion, add `/thinking:eval` + `/thinking:reset`, remove all source-framework references — *implemented with flat folder structure (`docs/prompts/`, `docs/strategies/`) rather than dormant/active split*

### Phase 1 — Core reference updates

- [x] **T1** — `ASSET-CLASSES.md`: add "Prompt (Dormant or Active)" section with `type: prompt` schema
- [x] **T2** — `ASSET-CLASSES.md`: add "Strategy (Dormant or Active)" section with `type: strategy` schema
- [x] **T3** — `ROUTING-TABLE.md`: add 4 rows (prompt→dormant-prompts, prompt→active-prompts, strategy→dormant-strategies, strategy→active-strategies)
- [x] **T4** — `SYSTEM-INDEX.md`: add `prompts` skill, `strategy` skill, `/thinking:reset`, `/thinking:eval`, `/thinking:cot`

### Phase 2 — Commands

- [x] **T5** — Add `.claude/commands/thinking/reset.md`
- [x] **T6** — Add `.claude/commands/thinking/eval.md`
- [x] **T7** — Add `.claude/commands/thinking/cot.md` (pre-promoted strategy stub)

### Phase 3 — Skills

- [x] **T8a** — Add `.claude/skills/prompts/SKILL.md`
- [x] **T8b** — Add `.claude/skills/prompts/workflows/promote.md`
- [x] **T8c** — Add `.claude/skills/prompts/workflows/demote.md`
- [x] **T8d** — Add `.claude/skills/prompts/workflows/search.md`
- [x] **T8e** — Add `.claude/skills/prompts/references/category-rules.md`
- [x] **T9a** — Add `.claude/skills/strategy/SKILL.md`
- [x] **T9b** — Add `.claude/skills/strategy/workflows/promote.md`
- [x] **T9c** — Add `.claude/skills/strategy/workflows/demote.md`
- [x] **T9d** — Add `.claude/skills/strategy/workflows/search.md`

### Phase 4 — Hooks (schema data only)

- [x] **T10** — `schemas.ts`: add `PromptSchema` + `StrategySchema`; extend `resolveSchema()` with 4 path matchers

### Phase 5 — Bases

- [x] **T11** — Add `bases/Prompts.base`
- [x] **T12** — Add `bases/Strategies.base`

### Phase 6 — Content (one-time placement)

- [x] **T13a** — Add `docs/prompts/INDEX.md` *(flat structure — no dormant-prompts/ subfolder)*
- [x] **T13b** — N/A: flat implementation; status encoded in frontmatter, no separate active-prompts/ folder
- [x] **T13c** — Add `docs/strategies/INDEX.md` *(flat structure — no dormant-strategies/ subfolder)*
- [x] **T13d** — Add strategy pages: 23 files in `docs/strategies/` (8 non-cot + cot + extras)
- [x] **T13e** — N/A: flat implementation; no separate active-strategies/ folder
- [x] **T13f** — Add `docs/strategies/cot.md` (pre-promoted, status: active)

## Doc sync tasks

- [x] **DS1** — `CLAUDE.md`: add "Prompts & Strategies" section; register `prompts` + `strategy` in Skills list
- [x] **DS2** — `SKILL-LOGIC.md`: verify `## 5. Current Skills` table and add `prompts` + `strategy` rows
- [x] **DS3** — `WORKFLOWS.md`: verified exists; no commands/skills registry present — no rows to append
- [x] **DS4** — `brain/SKILLS.md`: file exists; `prompts` + `strategy` registered
- [x] **DS5** — `CHANGELOG.md`: v2.0.0 entry added at root covering this feature
- [x] **DS6** — `vault-manifest.json`: bumped to `2.0.0`; `docs/prompts/**` + `docs/strategies/**` registered

## Ready-for-test checks

- [x] All files in [[impact]] touched
- [x] All new frontmatter validates (PostToolUse hook passes — schemas.ts extended)
- [ ] No orphan notes introduced (every new note has at least one `[[wikilink]]`) — *not verified*
- [x] [[test-plan]] drafted
