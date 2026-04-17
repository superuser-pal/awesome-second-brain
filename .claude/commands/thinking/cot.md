---
description: Inject Chain-of-Thought reasoning into the active session. Think step by step for the remainder of the session until /thinking:reset.
---

Inject Chain-of-Thought (CoT) reasoning into this session.

## Steps

1. Read `docs/strategies/cot.md` to load the strategy instructions.
2. Acknowledge the injection: "CoT strategy is now active. I'll think step by step for the remainder of this session."
3. Apply the strategy's instruction text as a session-level addendum: for all subsequent responses that involve reasoning, analysis, or multi-step problem solving, think step by step before arriving at an answer.
4. The strategy remains active until the user runs `/thinking:reset` or activates a different strategy.

## Notes

- CoT is the pre-promoted strategy — it is always available without needing to promote first.
- For other strategies, first run `/thinking:eval` to see which active strategies fit your goal, then run `/thinking:<slug>` to inject one.
- To clear: `/thinking:reset`.

> Source: [[docs/strategies/cot|Chain-of-Thought]] · [[docs/strategies/INDEX|Strategies Index]]
