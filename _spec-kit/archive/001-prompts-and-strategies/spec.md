---
title: "Spec: Dormant Prompts & Strategic Reasoning (Pattern Library Integration)"
description: "Spec for a dual-flow pattern library integration — a dormant-prompt library with on-demand promotion to slash commands, and a strategic-reasoning layer that injects framework prompts (CoT, ToT, Reflexion, etc.) into the active session via explicit user invocation."
tags:
  - spec-kit
  - spec
feature: "001-prompts-and-strategies"
status: shipped
date: "2026-04-16"
---

# Spec: Dormant Prompts & Strategic Reasoning (Pattern Library Integration)

> Related: [[CONSTITUTION|Spec-Kit Constitution]]

## Goal

Give the user two complementary atomic capabilities inside the vault: (1) a searchable library of 240+ dormant prompts that can be promoted to first-class slash commands on demand, and (2) a set of reasoning strategies (CoT, ToT, Reflexion, …) that the assistant can inject into the active session on explicit user request — without bloating `.claude/commands/` or the system prompt by default.

## Why

The library ships 252 pattern prompts and 9 reasoning strategies. Importing all 252 patterns as slash commands would pollute `/` autocomplete and the command menu to the point of unusability. Today there is no vault-native mechanism to:

- Browse/search patterns from inside Obsidian.
- Promote a pattern to a `/command` only when it's actually useful for the user's current work.
- Attach a reasoning framework (e.g. Chain-of-Thought) to a session deliberately when the task's complexity warrants it.

The user needs the *optionality* of 240+ prompts without the *cost* of always-loaded commands, and needs strategies to be applied deliberately — never silently.

## Current behavior

- `.claude/commands/` contains ~27 slash commands covering capture, processing, review, rituals, spec-kit, etc.
- There is no vault prompt library. The source content lives outside the vault and is untracked.
- `docs/` exists with a `01_PROMPTS/` subfolder (currently empty) and a `docs/CHANGELOG.md`.
- No mechanism exists to discover, preview, or activate a pattern.
- Strategies are JSON blobs in the source directory with no Obsidian rendering and no way for the assistant to load them into a session.
- `brain/` holds operational knowledge (`MEMORIES.md`, `KEY_DECISIONS.md`, `PATTERNS.md`, `GOTCHAS.md`, `NORTH_STAR.md`) but has no prompt or strategy pages.

## New behavior

### Flow A — Prompt Promotion (Dormant → Active)

1. **Storage (Dormant).** Each prompt pattern is placed as an atomic vault page: `docs/prompts/dormant-prompts/<category>/<slug>.md`. Each page has frontmatter:
   - `type: prompt`
   - `status: dormant` (or `active` once promoted)
   - `category: <category>`
   - `description: <one-line summary>`
   - `tags: [prompt, <category>]`
   - Body: the original pattern content, plus `## Usage` and `## Related` sections.

2. **Discovery.** Two entry points:
   - A `bases/Prompts.base` view, groupable by category / status / tag.
   - The `prompts` skill's `search` workflow — runs QMD semantic search scoped to `docs/prompts/dormant-prompts/` and `docs/prompts/active-prompts/` and returns top 5 candidates with a one-line summary each, plus a prompt to promote.

3. **Promotion.** The `prompts` skill's `promote` workflow:
   - Moves the page from `docs/prompts/dormant-prompts/<cat>/<slug>.md` to `docs/prompts/active-prompts/<cat>/<slug>.md`.
   - Flips `status: dormant` → `status: active`.
   - Generates a command stub at `.claude/commands/prompts/<slug>.md` that references the active page (does not copy the prompt text).
   - Runs `qmd refresh` on the affected folders.

4. **Demotion.** The `prompts` skill's `demote` workflow reverses promotion: deletes the command stub, moves the file back, flips status to `dormant`.

5. **Menu hygiene.** Only promoted prompts appear under `/prompts:*` autocomplete. Dormant prompts remain searchable but invisible to the command menu.

### Flow B — Strategic Reasoning (Explicit Invocation)

1. **Storage.** Each reasoning strategy is placed as a vault page:
   - **Dormant** (8 strategies): `docs/strategies/dormant-strategies/<slug>.md`
   - **Active** (1 pre-promoted, CoT): `docs/strategies/active-strategies/cot.md`
   
   Each page has:
   - `type: strategy`
   - `status: dormant` or `active`
   - `description: <one-line>`
   - `tags: [strategy, reasoning, <technique>]`
   - Body: human-readable instruction text, plus `## When to apply`, `## Trade-offs`, and wikilinks.

2. **Explicit invocation.** Users invoke strategies via commands under `.claude/commands/thinking/`:
   - `/thinking:reset` — clears the currently-injected strategy from session context.
   - `/thinking:eval` — evaluates which **active** strategy best fits the user's stated goal (active-only; no dormant peeking).
   - `/thinking:cot` — pre-promoted CoT stub (created at setup).
   - `/thinking:<slug>` — generated at promotion time for each additional strategy promoted.

3. **Injection.** On invocation, the assistant reads the strategy page body and applies its instructions as a session-level addendum for the remainder of the session (or until `/thinking:reset`).

4. **No auto-suggestion.** The `UserPromptSubmit` hook (`classify-message.ts`) is **not modified**. Detection of "when should I use a strategy?" is entirely user-driven via `/thinking:eval`. No automatic complexity detection, no hook-injected suggestions.

5. **Promotion / demotion.** The `strategy` skill's `promote` workflow moves a strategy from `docs/strategies/dormant-strategies/` to `docs/strategies/active-strategies/`, flips status, and generates a `/thinking:<slug>` command stub. Demotion reverses this.

### Structural additions to `docs/`

```
docs/
├── (existing: 00_HOW_TO/, 01_PROMPTS/, CHANGELOG.md, …)
├── dormant-prompts/
│   ├── INDEX.md              # MOC grouping by category
│   └── <category>/<slug>.md  # 240+ dormant prompt pages
├── active-prompts/
│   └── INDEX.md              # MOC of currently-promoted prompts (empty at setup)
├── dormant-strategies/
│   ├── INDEX.md              # MOC of dormant strategies — 8 entries at setup
│   └── <slug>.md             # 8 non-cot strategy pages
└── active-strategies/
    ├── INDEX.md              # MOC of active strategies — 1 entry at setup
    └── cot.md                # Chain-of-Thought (pre-promoted)
```

Both INDEX pages link back to [[MEMORIES]] and are referenced from [[CLAUDE]] under a new "Prompts & Strategies" section.

## User scenarios

- **Scenario A** — Promote a frequently-used pattern
  - Given: The user writes a weekly review and notices they keep re-typing a wisdom-extraction prompt.
  - When: The user asks the `prompts` skill to "find a prompt about extracting wisdom", sees `docs/prompts/dormant-prompts/analysis/extract-wisdom.md` at the top of results, and says "promote it".
  - Then: The file moves to `docs/prompts/active-prompts/analysis/extract-wisdom.md`, `status` flips to `active`, `.claude/commands/prompts/extract-wisdom.md` is created, and `/prompts:extract-wisdom` appears in autocomplete.

- **Scenario B** — Strategy invocation during a key-decision draft
  - Given: The user opens `brain/KEY_DECISIONS.md` to log a new decision.
  - When: The user runs `/thinking:eval` and describes their task.
  - Then: The assistant reads all active strategy pages, recommends the best fit, and the user runs the corresponding `/thinking:<slug>` command to inject it.

- **Scenario C** — Reset strategy after session
  - Given: The user had CoT active during a planning session.
  - When: The user runs `/thinking:reset`.
  - Then: The assistant acknowledges the strategy has been cleared; subsequent responses return to default reasoning.

## Out of scope

- Importing or rewriting the source framework's CLI or its web UI. One-way import of text content only.
- Multi-strategy stacking in a single session. One strategy per session; `/thinking:reset` clears it.
- Automatic complexity detection or hook-based strategy suggestions. User-driven only.
- Syncing changes back upstream. One-way import.
- The source framework's location is never referenced in any skill, command, page, or frontmatter. It is a build-time detail only.
- The existing `docs/01_PROMPTS/` subfolder is left as-is; new prompt content goes under `docs/prompts/dormant-prompts/`.

## Resolved questions

1. **Where do dormant prompt pages live?** → `docs/prompts/dormant-prompts/` (repo-bound, committed). Strategies (~9, small) are in `docs/strategies/dormant-strategies/` + `docs/strategies/active-strategies/`. Prompts (~240, large) are in `docs/prompts/dormant-prompts/` and `docs/prompts/active-prompts/`.

2. **How aggressive should complexity detection be?** → Not applicable. Detection is removed from scope. Strategy selection is fully user-driven via `/thinking:eval`.

3. **Session-sticky or single-turn injection?** → Session-sticky until `/thinking:reset` or a new strategy is applied.

## Assumptions

- The source directory is available locally during build and is the source of truth for content import. It is never committed to this repo.
- Patterns and strategies are under compatible licenses — suitable for redistribution in a personal vault.
- `qmd` is installed and can be refreshed to index `docs/prompts/dormant-prompts/` and `docs/prompts/active-prompts/`.
- Slash commands nested inside folders (`commands/prompts/*.md`, `commands/thinking/*.md`) surface as `/prompts:*` and `/thinking:*` — consistent with existing `spec-kit/`, `capture/`, `rituals/` patterns.
- "Strategy injection" is achieved by the assistant reading the strategy page into its context and honoring its instructions; it does not modify Claude Code's system prompt at the harness level.
