---
type: strategy
status: dormant
description: "Atom-of-Thought (AoT) — decompose a problem into the smallest independent sub-problems, solve each atomically, then synthesize."
tags:
  - strategy
  - reasoning
  - atom-of-thought
---

# Atom-of-Thought (AoT)

## Strategy

To solve this problem, break it down into the smallest independent 'atomic' sub-problems. For each atomic sub-problem: 1. Label it as 'Atom X: [brief description]' 2. Solve that specific sub-problem completely 3. Make sure each atom can be solved independently. After solving all atomic sub-problems, provide a synthesis that combines them into a final answer. Return the final answer in the required format.

## When to apply

- Complex problems with clearly separable components.
- Tasks where parallel reasoning is beneficial (e.g. analyzing multiple independent trade-offs).
- When you want to show granular, auditable reasoning steps.
- Large architectural decisions with many independent sub-decisions.

## Trade-offs

- **Pro**: Highly auditable — each atom is independently verifiable.
- **Pro**: Prevents compound reasoning errors from cascading.
- **Con**: Verbose — overhead is high for simple questions.
- **Con**: Some problems aren't cleanly atomic; forced decomposition can feel artificial.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[docs/strategies/cot|Chain-of-Thought]]
