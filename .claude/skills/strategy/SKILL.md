---
name: strategy
description: Manage dormant reasoning strategy pages — search, promote to active slash commands, and demote back to dormant. USE WHEN promote strategy, activate strategy, demote strategy, search strategies, find a reasoning strategy, show me strategies, which strategy should I use.
user-invocable: true
---

# strategy

Lifecycle manager for atomic reasoning strategies. Strategies live in `docs/strategies/` until promoted. Promoted strategies move to `docs/strategies/` and get a `.claude/commands/thinking/<slug>.md` stub for explicit invocation.

One strategy — `cot` (Chain-of-Thought) — is pre-promoted at setup. All others start dormant.

## Folder layout

```
docs/strategies/
├── INDEX.md
└── <slug>.md    ← status: dormant | active in frontmatter
.claude/commands/thinking/
    ├── cot.md   ← pre-promoted (always present)
    ├── reset.md ← standing command
    ├── eval.md  ← standing command
    └── <slug>.md ← generated stub on promotion
```

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **search** | "find a strategy", "search strategies", "which strategy for X" | `workflows/search.md` |
| **promote** | "promote strategy", "activate strategy", "make X a command" | `workflows/promote.md` |
| **demote** | "demote strategy", "deactivate strategy", "remove X from commands" | `workflows/demote.md` |

## Examples

**Example 1: Search strategies**
```
User: "Which strategy is best for architectural trade-off decisions?"
→ Invokes search workflow
→ Scans both strategy folders, reads "When to apply" sections
→ Returns ranked list with rationale
→ Offers to promote the top recommendation
```

**Example 2: Promote a strategy**
```
User: "Promote reflexion"
→ Invokes promote workflow
→ Moves docs/strategies/reflexion.md → docs/strategies/reflexion.md
→ Flips status: active
→ Generates .claude/commands/thinking/reflexion.md stub
→ Reports: "/thinking:reflexion is now available"
```

**Example 3: Demote a strategy**
```
User: "Demote self-refine, I never use it"
→ Invokes demote workflow
→ Deletes .claude/commands/thinking/self-refine.md
→ Moves docs/strategies/self-refine.md → docs/strategies/self-refine.md
→ Flips status: dormant
→ Reports: "self-refine is now dormant"
```
