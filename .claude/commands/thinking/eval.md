---
description: Evaluate which active reasoning strategy best fits the user's stated goal. Active strategies only — no dormant peeking.
---

Evaluate which active reasoning strategy is the best fit for the user's current task.

## Steps

1. **Ask** (if not already stated): "What are you trying to accomplish in this session?" Get a one-sentence description of the task or goal.

2. **Scan active strategies**: Read all `.md` files in `docs/strategies/` (exclude `INDEX.md`), filter to those with `status: active` in frontmatter. For each, read:
   - `description` frontmatter field
   - `## When to apply` section body

3. **Match**: For each active strategy, assess fit against the user's goal. Use the "When to apply" section as the matching criterion.

4. **Recommend**: Present a ranked list (best first, max 3) in this format:
   ```
   1. /thinking:<slug> — <strategy description> — Why: <one sentence fit rationale>
   2. …
   ```
   If no active strategy fits well, say so and suggest the user promote one via the `strategy` skill.

5. **Offer to inject**: After presenting the list, ask: "Run `/thinking:<slug>` to inject the top recommendation, or pick another from the list."

## Rules

- **Active only**: Only include strategies with `status: active` in frontmatter. Never reference dormant strategies in the recommendation.
- **No auto-injection**: Do not apply any strategy without an explicit `/thinking:<slug>` invocation.
- **Strict matching**: If the `## When to apply` section doesn't clearly match the user's goal, do not recommend it.

> Related: [[docs/strategies/INDEX|Strategies Index]] · [[CLAUDE]]
