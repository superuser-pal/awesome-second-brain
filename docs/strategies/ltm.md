---
type: strategy
status: dormant
description: "Least-to-Most (LtM) — decompose into sub-problems ordered easiest to hardest, answer each concisely before advancing."
tags:
  - strategy
  - reasoning
  - least-to-most
---

# Least-to-Most Prompting

## Strategy

Break down the problem into simpler sub-problems from easiest to hardest; answer concisely at each step.

## When to apply

- Problems with a natural difficulty progression (e.g. building from foundations).
- Teaching or explanatory tasks where scaffolding matters.
- When earlier answers are prerequisites for later ones.
- Debugging cascades where root causes are simpler than symptoms.

## Trade-offs

- **Pro**: Natural scaffolding — understanding builds incrementally.
- **Pro**: Easier to catch errors at the simpler stages before they propagate.
- **Con**: Difficulty ordering is subjective and may not always be clear.
- **Con**: Can feel redundant when problems don't have a clear difficulty gradient.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[aot|Atom-of-Thought]]
