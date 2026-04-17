---
type: strategy
status: dormant
description: "Reverse Engineering — start from the desired end state and reason backwards step by step to find the implementation path."
tags:
  - strategy
  - reasoning
  - reverse-engineering
  - backplanning
---

# Reverse Engineering

## Strategy

Define the desired outcome in concrete terms. Then reason backwards: what is the step immediately before the outcome is achieved? What is the step before that? Continue backwards until you reach the current state. Validate that the path is traversable in the forward direction. Return the goal, the backwards-derived path, and the forward execution sequence.

## When to apply

- Goal-setting work where the outcome is known but the path is unclear.
- Backplanning from a deadline or launch date to identify start conditions.
- Understanding how a result was produced (reverse-engineering a document, decision, or system).
- Any time the user has a clear "what" but no "how."

## Trade-offs

- **Pro**: Working backwards from a concrete goal prevents vague, meandering plans.
- **Pro**: Naturally uncovers dependencies and prerequisites that forward planning misses.
- **Con**: Assumes the end state is well-defined — works poorly with fuzzy goals.
- **Con**: May produce a locally optimal path that ignores better routes not visible from the endpoint.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[reasoning-via-planning|Reasoning via Planning]] · [[first-principles|First Principles Analysis]]
