---
title: "Test Plan: Dormant Prompts & Strategic Reasoning"
description: "Progressive staged user-test for 001-prompts-and-strategies — each stage builds vault content the next stage consumes."
tags:
  - spec-kit
  - test-plan
feature: "001-prompts-and-strategies"
status: ready
date: "2026-04-16"
---

# Test Plan: Dormant Prompts & Strategies

> Related: [[spec]] · [[plan]] · [[impact]] · [[test-artifacts]] · [[test-results]]
> **How to use**: Work through stages in order. Each stage creates real vault content the next stage depends on. Do not skip stages. Record created paths in [[test-artifacts]] as you go. Score each stage 1–5 in [[test-results]].

---

## Stage 0 — Preconditions

> **Goal**: confirm the vault and filesystem are in the expected state before exercising the feature.

- [ ] Verify `docs/strategies/active-strategies/cot.md` exists with `status: active`
- [ ] Verify `docs/strategies/dormant-strategies/` has 8 strategy files (aot, cod, ltm, reflexion, self-consistent, self-refine, standard, tot) + INDEX.md
- [ ] Verify `.claude/commands/thinking/` has `reset.md`, `eval.md`, `cot.md`
- [ ] Verify `.claude/skills/prompts/SKILL.md` and `.claude/skills/strategy/SKILL.md` exist
- [ ] Verify `bases/Prompts.base` and `bases/Strategies.base` exist
- [ ] Verify `docs/prompts/dormant-prompts/INDEX.md` and `docs/prompts/active-prompts/INDEX.md` exist
- [ ] Verify `docs/prompts/active-prompts/` is empty (no promoted prompts at setup — correct state)

**📝 Notes:**
>

---

## Stage 1 — Prompt library population (one-time import)

> **Goal**: populate `docs/prompts/dormant-prompts/` with patterns so the search and promotion workflows have content to operate on. This is the one-time import step.
>
> **⚠️ Note**: This step generates ~240 repo-bound files. Run it once and commit the result. The source pattern directory must be available locally.

- [ ] Run the import script below in a Claude Code session to generate the prompt pages:

  ```
  For each folder in the source pattern directory:
  1. Read system.md from that folder
  2. Determine category using the rules in .claude/skills/prompts/references/category-rules.md
  3. Write docs/prompts/dormant-prompts/<category>/<slug>.md with frontmatter:
     type: prompt
     status: dormant
     category: <category>
     description: <one-line summary of what the pattern does, ~150 chars>
     tags:
       - prompt
       - <category>
  4. Body: ## Prompt\n<system.md content>\n\n## Usage\n<when to use>\n\n## Related\n> [[dormant-prompts/INDEX|Dormant Prompts]]
  ```

- [ ] After generation, verify: `ls docs/prompts/dormant-prompts/analysis/ | head -5` shows files
- [ ] Spot-check one file (e.g. `docs/prompts/dormant-prompts/analysis/analyze_paper.md`) — confirm frontmatter is valid
- [ ] Check that no files landed in unexpected locations outside `docs/prompts/dormant-prompts/`

Artifacts created (append paths to [[test-artifacts]]):
- `docs/prompts/dormant-prompts/<category>/<slug>.md` — ~240 files across ~15 category folders

**📝 Notes:**
>

---

## Stage 2 — Strategy injection: CoT (Spec Scenario C)

> **Goal**: `/thinking:cot` injects Chain-of-Thought reasoning and the session responds step-by-step. `/thinking:reset` clears it.

- [ ] In a new Claude Code session, ask: "What should I prioritize between shipping a new feature vs fixing tech debt?" (without any strategy active)
  - Note the response style — direct answer, no visible step-by-step reasoning

- [ ] Run `/thinking:cot`
  - Expected: assistant reads `docs/strategies/active-strategies/cot.md` and acknowledges CoT is active

- [ ] Ask the same question again: "What should I prioritize between shipping a new feature vs fixing tech debt?"
  - Expected: assistant reasons step-by-step before concluding

- [ ] Run `/thinking:reset`
  - Expected: assistant confirms CoT is cleared

- [ ] Ask a simple factual question (e.g. "What day is today?")
  - Expected: direct answer, no step-by-step reasoning — confirms reset worked

**📝 Notes:**
>

---

## Stage 3 — Strategy evaluation: `/thinking:eval` (Spec Scenario B)

> **Goal**: `/thinking:eval` scans `docs/strategies/active-strategies/` (active-only) and recommends the best strategy for the user's task. Does NOT peek at dormant strategies.

- [ ] Run `/thinking:eval`
  - Expected: assistant asks "What are you trying to accomplish?"

- [ ] Reply: "I need to decide between three queue architectures for a new ingestion pipeline"
  - Expected: assistant reads all active strategies, recommends CoT as best fit (only cot is active at this point), shows rationale, offers to inject

- [ ] Verify: only active strategies are mentioned (cot). Dormant ones (reflexion, tot, etc.) should NOT appear in the recommendation.

- [ ] Accept the recommendation — run `/thinking:cot`
  - Expected: CoT injected, assistant confirms

- [ ] Run `/thinking:reset` to clean up session state

**📝 Notes:**
>

---

## Stage 4 — Strategy promotion/demotion (strategy skill)

> **Goal**: the `strategy` skill moves a strategy from dormant to active, generates a command stub, and the reverse on demotion.

- [ ] Ask the `strategy` skill to "promote reflexion"
  - Expected: `docs/strategies/dormant-strategies/reflexion.md` → `docs/strategies/active-strategies/reflexion.md`
  - Expected: `.claude/commands/thinking/reflexion.md` created
  - Expected: `status: active` in the moved file

- [ ] Verify: `ls docs/strategies/active-strategies/` now shows `cot.md` and `reflexion.md`
- [ ] Verify: `.claude/commands/thinking/reflexion.md` exists with correct content (references `docs/strategies/active-strategies/reflexion.md`)

- [ ] Run `/thinking:eval` again with the same ingestion pipeline task
  - Expected: now shows BOTH `cot` and `reflexion` as candidates (reflexion is now active)

- [ ] Ask the `strategy` skill to "demote reflexion"
  - Expected: `.claude/commands/thinking/reflexion.md` deleted
  - Expected: `docs/strategies/active-strategies/reflexion.md` → `docs/strategies/dormant-strategies/reflexion.md`
  - Expected: `status: dormant` in the file

- [ ] Verify: `ls docs/strategies/active-strategies/` shows only `cot.md` again
- [ ] Verify: `.claude/commands/thinking/reflexion.md` is gone

Artifacts created during stage (will be cleaned on demotion):
- `docs/strategies/active-strategies/reflexion.md` (temporary — demoted at end of stage)
- `.claude/commands/thinking/reflexion.md` (temporary — deleted on demotion)

**📝 Notes:**
>

---

## Stage 5 — Prompt search and promotion (prompts skill, Spec Scenario A)

> **Goal**: the `prompts` skill searches the dormant library and promotes a pattern to a slash command.
>
> **Depends on Stage 1** (prompt library populated).

- [ ] Ask the `prompts` skill to "find a prompt for extracting wisdom from content"
  - Expected: QMD or grep search across `docs/prompts/dormant-prompts/`; returns top 5 with slug, category, description, and status

- [ ] Ask to "promote extract-wisdom" (or whichever slug appears at top of results)
  - Expected: file moves from `docs/prompts/dormant-prompts/<cat>/extract-wisdom.md` → `docs/prompts/active-prompts/<cat>/extract-wisdom.md`
  - Expected: `status: active` in the moved file
  - Expected: `.claude/commands/prompts/extract-wisdom.md` created

- [ ] Verify the generated command stub references the active page (not a hardcoded copy of the prompt body)

- [ ] Run `/prompts:extract-wisdom` in a new message
  - Expected: assistant reads `docs/prompts/active-prompts/<cat>/extract-wisdom.md` and applies the pattern

- [ ] Ask the `prompts` skill to "demote extract-wisdom" to restore clean state
  - Expected: command stub deleted, file moved back to dormant

Artifacts created (append to [[test-artifacts]] — cleaned on demotion):
- `docs/prompts/active-prompts/<cat>/extract-wisdom.md` (temporary)
- `.claude/commands/prompts/extract-wisdom.md` (temporary)

**📝 Notes:**
>

---

## Stage 6 — Edge cases & regressions

> **Goal**: prove the feature doesn't break adjacent behavior and handles edge inputs gracefully.

**Schema validation**
- [ ] Write a test note to `docs/strategies/dormant-strategies/test-bad.md` with missing `type` field
  - Expected: PostToolUse hook warns: "Strategy schema error: type — Required"
  - Delete the test file after confirming the warning appears

**INDEX.md not validated as strategy**
- [ ] Confirm `docs/strategies/dormant-strategies/INDEX.md` does NOT trigger a schema validation error (it has no `type: strategy` field)
  - If the hook fires on it, that's a bug in the `resolveSchema()` INDEX exclusion guard

**Adjacent command regression**
- [ ] Run `/core:save` on any note — verify it still works correctly
- [ ] Run `/open-day` — verify daily note creation is unaffected

**`/audit` regression**
- [ ] Run `/core:audit` — confirm no new orphans or broken wikilinks from the newly created files
  - All new INDEX.md files must have at least one wikilink (already included in content)
  - Strategy pages must link to INDEX files (already included)

Artifacts created (append to [[test-artifacts]] if test-bad.md is written):
- `docs/strategies/dormant-strategies/test-bad.md` — temporary, delete after hook fires

**📝 Notes:**
>

---

## Stage 7 — End-to-end flow

> **Goal**: full user journey from natural-language intent to injected strategy, no hand-holding.

- [ ] In a fresh Claude Code session, say: "I'm about to write a new decision record in KEY_DECISIONS.md. What reasoning approach should I use?"
  - Expected: assistant recognizes this as a complex decision task, suggests running `/thinking:eval`

- [ ] Say: "Yes, help me pick a strategy"
  - Expected: `/thinking:eval` flow — assistant asks for task description or uses the stated context

- [ ] Respond with context, accept recommendation, run `/thinking:cot`
  - Expected: CoT injected; assistant confirms

- [ ] Start drafting a decision entry: "We need to choose between Postgres and DynamoDB for the session store"
  - Expected: assistant reasons step-by-step (CoT active), not just giving a direct answer

- [ ] Run `/thinking:reset`
  - Expected: CoT cleared; subsequent response is direct

**📝 Notes:**
>

---

## Scoring

Record in [[test-results]]:

| Stage | Score (1–5) | Key friction |
|---|---|---|
| 0 — Preconditions | | |
| 1 — Prompt import | | |
| 2 — CoT inject + reset | | |
| 3 — Strategy eval | | |
| 4 — Strategy promote/demote | | |
| 5 — Prompt search + promote | | |
| 6 — Edge cases & regressions | | |
| 7 — E2E | | |
| **Overall** | | |

> **1** = broken · **2** = works but confusing · **3** = works as specified · **4** = works well, minor friction · **5** = delightful

**Minimum to ship**: no stage below 3, overall ≥ 3.
