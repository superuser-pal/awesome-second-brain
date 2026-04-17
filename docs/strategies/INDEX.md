---
name: strategies-index
description: "MOC for the reasoning strategy library — 9 strategies. Status (dormant/active) stored in frontmatter. CoT is pre-promoted."
tags:
  - index
  - strategy
status: active
last_updated: 2026-04-16
---

# Strategies Index

A library of atomic reasoning strategies. Each strategy has `status: dormant` until promoted. Promotion flips the status in-place and generates a `/thinking:<slug>` command — no file moves required. CoT is pre-promoted at setup.

> Related: [[bases/Strategies.base|Strategies Base]] · [[brain/SKILLS|Skills]]

## How to use

- **Pick a strategy**: Run `/thinking:eval` — scans all active strategies and recommends the best fit for your task.
- **Inject**: Run `/thinking:<slug>` (e.g. `/thinking:cot`) to load a strategy into the session.
- **Clear**: Run `/thinking:reset` to remove the active strategy.
- **Promote / demote**: Ask the `strategy` skill to "promote `<slug>`" or "demote `<slug>`".

## Strategies

| Slug | Status | Description |
|---|---|---|
| [[cot]] | active | Chain-of-Thought — think step by step before answering |
| [[aot]] | dormant | Algorithm of Thought — decompose into algorithmic sub-steps |
| [[cod]] | dormant | Chain of Density — iterative summarisation with increasing density |
| [[ltm]] | dormant | Least-to-Most — solve simple sub-problems before the full problem |
| [[reflexion]] | dormant | Self-reflection loop — critique and revise the prior answer |
| [[self-consistent]] | dormant | Sample multiple reasoning paths, pick the most consistent answer |
| [[self-refine]] | dormant | Iterative self-improvement with explicit feedback |
| [[standard]] | dormant | Standard prompting — no explicit reasoning structure |
| [[tot]] | dormant | Tree of Thought — explore branching reasoning paths |
