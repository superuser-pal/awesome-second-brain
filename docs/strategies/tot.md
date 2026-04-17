---
type: strategy
status: dormant
description: "Tree-of-Thought (ToT) — generate multiple brief reasoning branches and select the best one."
tags:
  - strategy
  - reasoning
  - tree-of-thought
---

# Tree-of-Thought (ToT)

## Strategy

Generate multiple reasoning paths briefly and select the best one.

## When to apply

- Problems with multiple plausible solution paths where it's unclear which is best upfront.
- Strategic decisions with branching consequences (e.g. "if we do X, then Y; if we do A, then B").
- Planning tasks where exploring alternatives before committing adds value.
- When the user wants to see trade-off comparisons between approaches before a decision.

## Trade-offs

- **Pro**: Explores the solution space before committing — catches dead-ends early.
- **Pro**: Good for communicating alternatives to stakeholders ("here are three approaches…").
- **Con**: More expensive than linear reasoning strategies.
- **Con**: Can be overwhelming for straightforward tasks — "multiple paths" feel artificial when there's one obvious answer.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[aot|Atom-of-Thought]] · [[self-consistent|Self-Consistency]]
