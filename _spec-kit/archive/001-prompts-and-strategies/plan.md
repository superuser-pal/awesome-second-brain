---
title: "Plan: Dormant Prompts & Strategies"
description: "Implementation plan for a dual-lifecycle system — dormant/active folders for prompts and strategies under docs/, two user-invocable skills (prompts, strategy), stubbed-on-promotion slash commands, and two standing /thinking:* commands. No hook changes. No source-framework references."
tags:
  - spec-kit
  - plan
feature: "001-prompts-and-strategies"
status: draft
date: "2026-04-16"
---

# Plan: Dormant Prompts & Strategies

> Related: [[spec|Feature Spec]] · [[CONSTITUTION|Spec-Kit Constitution]]

## Approach

Two parallel lifecycles, one shape. Each asset class (prompt, strategy) has a **dormant** folder and an **active** folder under `docs/`. Entries move between them via plain `mv`. Only entries in the active folder surface as slash commands; dormant entries remain searchable but invisible in `/` autocomplete.

- **Prompts** (~240): categorized by verb-prefix (`analyze_* → analysis`, `extract_* → extraction`, `summarize_* → synthesis`, …). Live at `docs/prompts/dormant-prompts/<category>/<slug>.md` and `docs/prompts/active-prompts/<category>/<slug>.md`.
- **Strategies** (9): flat, no category. Live at `docs/strategies/dormant-strategies/<slug>.md` and `docs/strategies/active-strategies/<slug>.md`. One strategy — **Chain-of-Thought (`cot`)** — is pre-promoted at setup; the other 8 start dormant.

Lifecycle operations (promote, demote, search) are handled by two new user-invocable skills — `prompts` and `strategy`. The user invokes them via natural-language intent ("promote extract-wisdom", "find a prompt about synthesis"); no lifecycle slash commands exist. Promotion generates a command stub that references the active page; demotion deletes the stub and moves the file back to dormant.

Strategy management adds exactly two standing commands under `.claude/commands/thinking/`: `reset.md` (clears the currently-injected strategy from the session) and `eval.md` (evaluates which **active** strategy best fits the user's stated goal — active-only, strict; no dormant peeking). Promoted strategies each get their own `.claude/commands/thinking/<slug>.md` stub generated at promotion time.

No hooks are touched. `classify-message.ts` and `signals.ts` stay as-is. Detection of "when should I use a strategy" is user-driven via `/thinking:eval`, not automatic.

Two new asset-class schemas (`type: prompt`, `type: strategy`) are added to `ASSET-CLASSES.md` and to the Zod map in `.claude/scripts/hooks/lib/schemas.ts`. The existing `validate-write.ts` hook picks them up via the extended `resolveSchema()` path matcher — no hook code changes, only the schema data.

Two Bases (`bases/Prompts.base`, `bases/Strategies.base`) provide visual navigation grouped by status and category.

## Surfaces touched

- **Commands**:
  - **Add (standing)**: `.claude/commands/thinking/reset.md`, `.claude/commands/thinking/eval.md`
  - **Add (pre-promoted at setup)**: `.claude/commands/thinking/cot.md`
  - **Add dynamically on promotion**: `.claude/commands/prompts/<slug>.md`, `.claude/commands/thinking/<slug>.md`
- **Skills**:
  - **Add**: `.claude/skills/prompts/` (3 workflows + 1 reference)
  - **Add**: `.claude/skills/strategy/` (3 workflows)
- **Subagents / Domain agents**: none changed.
- **Hooks**: none changed. Schema data in `.claude/scripts/hooks/lib/schemas.ts` is extended (data, not behavior).
- **Templates**: none added. The command-stub template lives inside the `promote` workflow as a heredoc.
- **Core docs (`.claude/core/`)**: `ASSET-CLASSES.md` gains two asset-class entries; `ROUTING-TABLE.md` gains four rows. Detailed list in [[impact]].

## Risks

- **Schema-path collision**: `docs/` is currently not covered by any schema in `resolveSchema()`. Adding four `docs/*` matchers must not accidentally match the existing docs pages (`docs/00_HOW_TO/*`, `docs/CHANGELOG.md`, etc.). Mitigation: match exact subfolder prefixes (`docs/prompts/dormant-prompts/`, `docs/prompts/active-prompts/`, `docs/strategies/dormant-strategies/`, `docs/strategies/active-strategies/`) rather than `docs/**`.
- **Autocomplete explosion safeguard**: a bug in `promote` that copies instead of moves would double-surface entries in both `/prompts:<slug>` and searchability. Mitigation: the `promote` workflow asserts post-conditions (source path no longer exists, destination path does).
- **Category drift**: patterns that don't match a verb-prefix rule fall to `utility/`. If too many land there, the Prompts Base becomes a haystack. Mitigation: during the one-time content placement, log unroutable slugs and review before accepting.
- **QMD index staleness**: promoted files move, and QMD may return stale paths until re-indexed. Mitigation: the `promote` and `demote` workflows end with a `qmd refresh` step on the affected folders.
- **Spec drift**: `spec.md` currently describes `brain/PROMPTS/` + hook auto-suggestion, which contradicts this plan. Task 0 of `/spec-kit:build` is to rewrite `spec.md` — everything else is blocked until that's done.

## Dependencies

- `qmd` CLI must be installed and indexing `docs/`. Already assumed by [[CLAUDE]].
- `gray-matter` npm dep (already present via `validate-write.ts`) used during the one-time content placement for frontmatter generation.
- Source material (pattern bodies and strategy texts) must be available locally at build time. The source location is a build-step implementation detail — **never referenced in any skill, command, page, or frontmatter**.

## Reuse inventory

- `.claude/scripts/hooks/lib/schemas.ts` — `resolveSchema()` path dispatch. Extend, don't rewrite.
- `.claude/scripts/hooks/lib/io.ts` — `readStdin()`, `emitAdditionalContext()`. Not called directly by this feature; mentioned only to confirm hooks remain untouched.
- `.claude/skills/create-domain/` — shape reference for a multi-workflow skill (SKILL.md + workflows/ + references/).
- `.claude/skills/project-management/SKILL.md` — pattern for routing-table inside SKILL.md.
- `.claude/commands/capture/` and `.claude/commands/spec-kit/` — nested-command convention (folder → `/folder:name`).
- `bases/Templates.base` — shape reference for the two new `.base` files.
- `gray-matter` — frontmatter read/write during promotion and one-time content placement.
- `qmd` — semantic search for both skills' `search` workflow; `qmd refresh` for cache invalidation post-move.
