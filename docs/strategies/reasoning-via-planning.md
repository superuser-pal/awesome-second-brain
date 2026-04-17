---
type: strategy
status: dormant
description: "Reasoning via Planning — build an explicit goal-state model and reason backward through milestones before producing any output."
tags:
  - strategy
  - reasoning
  - planning
  - goal-state
---

# Reasoning via Planning

## Strategy

Before responding, define: (1) the desired end state, (2) the current state, and (3) the gap between them. Construct a milestone sequence from current state to goal state. Reason through each milestone — what is required, what are the blockers, what is the order of dependencies? Only after the plan is mapped, produce the output. Return the goal model and the structured plan.

## When to apply

- Project planning sessions where sequencing and dependencies matter.
- Strategic roadmap work where the destination is clear but the path is not.
- Complex tasks with multiple phases (e.g. onboarding a new domain in ASB).
- Any time the user asks "how do I get from here to there?"

## Trade-offs

- **Pro**: Prevents diving into execution before the plan is coherent — catches missing steps early.
- **Pro**: Makes dependencies explicit; identifies blockers before they become problems.
- **Con**: Adds planning overhead — unnecessary for simple, well-understood tasks.
- **Con**: The plan can become a constraint rather than a guide if followed too rigidly.

## Related

> [[docs/strategies/INDEX|Strategies Index]] · [[aot|Atom-of-Thought]] · [[reverse-engineering|Reverse Engineering]]
