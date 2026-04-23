---
type: strategy
status: active
description: "Chain-of-Thought (CoT) — think step by step before arriving at a final answer. Pre-promoted at setup."
tags:
  - strategy
  - reasoning
  - chain-of-thought
---

# Chain-of-Thought (CoT)

## Strategy

Think step by step to answer the question. Return the final answer in the required format.

## When to apply

- Multi-step reasoning tasks — math, logic, planning, debugging.
- Architectural or design decisions where the reasoning path matters as much as the conclusion.
- Any task where showing your work increases trust or helps the user follow along.
- When drafting `brain/LOGIC.md` entries and you want the reasoning to be auditable.

## Trade-offs

- **Pro**: Transparent reasoning — errors are visible and correctable.
- **Pro**: Often improves accuracy on complex tasks by forcing intermediate verification.
- **Con**: Verbose — not suitable for quick lookups or simple factual questions.
- **Con**: Can over-explain when the answer is obvious, adding noise.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[cod|Chain-of-Draft]] · [[tot|Tree-of-Thought]]
