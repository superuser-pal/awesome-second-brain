---
name: prompts
description: Manage dormant atomic prompt pages — search, promote to active slash commands, and demote back to dormant. USE WHEN search prompts, find a prompt, promote prompt, activate prompt, demote prompt, deactivate prompt, browse prompt library, show me prompts.
user-invocable: true
---

# prompts

Lifecycle manager for the atomic prompt library. All prompts live in `docs/prompts/` as flat files. Status (`dormant`/`active`) is encoded in frontmatter. Promotion flips the status in-place and generates a `.claude/commands/prompts/<slug>.md` stub so the prompt appears in `/` autocomplete.

## Folder layout

```
docs/prompts/
├── INDEX.md
└── <slug>.md    ← status: dormant | active, category in frontmatter
.claude/commands/prompts/
└── <slug>.md    ← generated stub (exists only when status: active)
```

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **search** | "find a prompt", "search prompts", "show me prompts about X" | `workflows/search.md` |
| **promote** | "promote prompt", "activate prompt", "make X a command" | `workflows/promote.md` |
| **demote** | "demote prompt", "deactivate prompt", "remove X command" | `workflows/demote.md` |

## Examples

**Example 1: Search the library**
```
User: "Find a prompt for extracting wisdom from documents"
→ Invokes search workflow
→ Runs QMD query against docs/prompts/
→ Returns top 5 with one-line description and current status
→ Offers to promote if desired
```

**Example 2: Promote a prompt**
```
User: "Promote extract-wisdom"
→ Invokes promote workflow
→ Verifies docs/prompts/*/extract-wisdom.md exists
→ Moves file to docs/prompts/<cat>/extract-wisdom.md
→ Flips status: active
→ Generates .claude/commands/prompts/extract-wisdom.md stub
→ Runs qmd refresh on both folders
→ Reports: "/prompts:extract-wisdom is now available"
```

**Example 3: Demote a prompt**
```
User: "Deactivate extract-wisdom, I don't use it anymore"
→ Invokes demote workflow
→ Verifies docs/prompts/*/extract-wisdom.md and command stub exist
→ Deletes .claude/commands/prompts/extract-wisdom.md
→ Moves file back to docs/prompts/<cat>/extract-wisdom.md
→ Flips status: dormant
→ Runs qmd refresh
→ Reports: "extract-wisdom is now dormant — removed from /prompts: commands"
```
