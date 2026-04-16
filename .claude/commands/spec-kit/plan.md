---
description: "Spec-Kit Step 2. Create plan.md + impact.md for the active feature, enumerating every file under .claude/core/ and every command/skill/agent/hook/template that will change."
---

Produce the implementation plan and impact list for the active feature.

## Preconditions

- The **builder** agent must be active on a specific feature. If not, stop and tell the user: "Activate `/agent:builder NNN-<slug>` first so requirements are loaded."
- `spec.md` must exist and be free of `{{placeholder}}` markers.

## Steps

1. **Read** `_spec-kit/constitution.md`, the active feature's `spec.md`, and any `.claude/core/` files referenced in the spec.

2. **Create `plan.md`** from `_spec-kit/templates/plan-template.md`:
   - Approach: 3–6 bullets, concrete. Name skills/agents/commands to reuse — cite existing paths.
   - Surfaces touched: commands, skills, subagents, hooks, templates, core docs.
   - Risks: cross-file assumptions that could break.
   - Dependencies: what must exist first.
   - Reuse inventory: actual filenames found in the vault that will be reused.

3. **Create `impact.md`** from `_spec-kit/templates/impact-template.md`, filling every table that applies:
   - `.claude/core/` updates — one row per file with section/change summary.
   - Commands / Skills / Subagents / Hooks / Templates — action (add/modify/remove) per row.
   - Frontmatter schemas — only if `ASSET-CLASSES.md` changes.
   - Indexes touched — tick the checklist.

   **Every row must be filled before ship.** Empty tables mean the surface isn't affected — delete the table rather than leaving it blank.

4. **Self-validate** against Constitution §4:
   - Every behavior change in `plan.md` has a corresponding row in `impact.md`.
   - Every row in `impact.md` cites a specific file path (not "the routing file" — the actual path).

5. **Gate**: display `impact.md` contents to the user and ask: "Approve impact list? (y/n)". If no, iterate.

6. **Report**:
   - Paths of `plan.md` and `impact.md`
   - Count of files under `.claude/core/` that will change
   - Next step: `/spec-kit:build`

## Rules

- No edits outside the feature dir in this step.
- If the spec has unresolved open questions, resolve them with the user before writing the plan.
- If `impact.md` implies >10 core-doc edits, flag: this may be too large for one feature — suggest splitting.
