---
type: strategy
status: dormant
description: "Self-Consistency — generate multiple independent reasoning paths and select the most consistent final answer."
tags:
  - strategy
  - reasoning
  - self-consistency
---

# Self-Consistency

## Strategy

Provide multiple reasoning paths and select the most consistent answer.

## When to apply

- Questions with high uncertainty or ambiguity where a single reasoning path may be unreliable.
- Factual recall tasks where consistency across paths increases confidence.
- Classification or categorization tasks where multiple framings are possible.
- When the user explicitly wants to see alternative interpretations compared.

## Trade-offs

- **Pro**: Reduces variance — majority-vote logic filters out outlier reasoning paths.
- **Pro**: Good for tasks where there's a definite correct answer that can be triangulated.
- **Con**: Expensive — generates N responses internally before synthesizing.
- **Con**: Poor fit for creative or open-ended tasks where "consistency" isn't a useful signal.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[tot|Tree-of-Thought]]
