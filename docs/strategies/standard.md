---
type: strategy
status: dormant
description: "Standard Prompting — direct answer with no explanation or visible reasoning. Fastest, most concise output."
tags:
  - strategy
  - reasoning
  - standard
---

# Standard Prompting

## Strategy

Answer the question directly without any explanation or reasoning.

## When to apply

- Simple factual lookups where explanation adds no value.
- When the user has explicitly asked for a short, direct answer.
- High-frequency, low-stakes tasks where reasoning overhead would slow things down.
- As a reset after using a heavier strategy (e.g. after CoT on a complex decision, switching back to Standard for follow-up clarifications).

## Trade-offs

- **Pro**: Fastest, most concise — no cognitive overhead.
- **Pro**: Avoids over-explaining obvious answers.
- **Con**: Provides no reasoning transparency — errors are harder to detect.
- **Con**: Wrong choice for ambiguous or high-stakes tasks.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[docs/strategies/cot|Chain-of-Thought]]
