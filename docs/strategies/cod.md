---
type: strategy
status: dormant
description: "Chain-of-Draft (CoD) — think step by step but keep each draft step to 5 words max. Compact reasoning with minimal verbosity."
tags:
  - strategy
  - reasoning
  - chain-of-draft
---

# Chain-of-Draft (CoD)

## Strategy

Think step by step, keeping a minimal draft (5 words max) for each step. Return the final answer in the required format.

## When to apply

- When you want step-by-step reasoning but need compact output.
- Analytical tasks where full CoT would be verbose.
- Situations where the user wants to see the reasoning skeleton without full prose.
- Good balance between no-reasoning (Standard) and full reasoning (CoT).

## Trade-offs

- **Pro**: Much more concise than CoT — readable at a glance.
- **Pro**: Still provides reasoning transparency.
- **Con**: 5-word constraint can oversimplify complex steps.
- **Con**: Less helpful when the user needs detailed explanation.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[docs/strategies/cot|Chain-of-Thought]]
