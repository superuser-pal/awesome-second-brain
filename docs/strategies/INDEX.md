---
name: strategies-index
description: "MOC for the reasoning strategy library — 22 strategies. Status (dormant/active) stored in frontmatter. CoT is pre-promoted."
tags:
  - index
  - strategy
status: active
last_updated: 2026-04-17
---

# Strategies Index

A library of atomic reasoning strategies. Each strategy has `status: dormant` until promoted. Promotion flips the status in-place and generates a `/thinking:<slug>` command — no file moves required. CoT is pre-promoted at setup.

> Related: [[bases/Strategies.base|Strategies Base]] · [[brain/SKILLS|Skills]]

## How to use

- **Pick a strategy**: Run `/thinking:eval` — scans all active strategies and recommends the best fit for your task.
- **Inject**: Run `/thinking:<slug>` (e.g. `/thinking:cot`) to load a strategy into the session.
- **Clear**: Run `/thinking:reset` to remove the active strategy.
- **Promote / demote**: Ask the `strategy` skill to "promote `<slug>`" or "demote `<slug>`".

## Reasoning Structures

| Slug | Status | Description |
|---|---|---|
| [[cot]] | active | Chain-of-Thought — think step by step before answering |
| [[aot]] | dormant | Atom-of-Thought — decompose into independent atomic sub-problems |
| [[cod]] | dormant | Chain of Density — iterative summarisation with increasing density |
| [[ltm]] | dormant | Least-to-Most — solve simple sub-problems before the full problem |
| [[reflexion]] | dormant | Self-reflection loop — critique and revise the prior answer |
| [[self-consistent]] | dormant | Sample multiple reasoning paths, pick the most consistent answer |
| [[self-refine]] | dormant | Iterative self-improvement with explicit feedback |
| [[standard]] | dormant | Standard prompting — no explicit reasoning structure |
| [[tot]] | dormant | Tree of Thought — explore branching reasoning paths |

## Strategy & Decision-Making

| Slug | Status | Description |
|---|---|---|
| [[first-principles]] | dormant | Strip assumptions, rebuild from fundamental truths |
| [[comparative-matrix]] | dormant | Score options against weighted criteria — structured decision-making |
| [[red-team]] | dormant | Attack-defend analysis to stress-test a strategy or plan |
| [[scamper]] | dormant | Seven creativity lenses for innovation and process rethinking |
| [[stakeholder-roundtable]] | dormant | Convene competing personas to surface balanced perspectives |
| [[time-traveler]] | dormant | Past-you and future-you advise present-you on long-term decisions |

## Planning & Execution

| Slug | Status | Description |
|---|---|---|
| [[reasoning-via-planning]] | dormant | Build a goal-state model and reason backward through milestones |
| [[reverse-engineering]] | dormant | Work backwards from the desired outcome to find the path |
| [[pre-mortem]] | dormant | Imagine failure, then work backwards to prevent it |
| [[what-if]] | dormant | Explore alternative scenarios and downstream implications |

## Note Analysis & Reflection

| Slug | Status | Description |
|---|---|---|
| [[socratic]] | dormant | Targeted questions to surface hidden assumptions and guide insight |
| [[five-whys]] | dormant | Drill from symptom to root cause with iterative why-chains |
| [[lessons-learned]] | dormant | Extract what worked, what didn't, and what to do differently |
