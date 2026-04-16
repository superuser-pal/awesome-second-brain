---
description: "Spec-Kit Step 3. Generate tasks.md and execute every edit required by the impact list. Must run inside the active builder agent."
---

Build the feature. Runs inside the active `builder` agent — all requirements are already in context.

## Preconditions

- `builder` agent must be active on the feature. If not: stop and instruct the user to activate it.
- `spec.md`, `plan.md`, `impact.md` all present and free of placeholders.
- User approved the impact list in Step 2.

## Steps

1. **Generate `tasks.md`** from `_spec-kit/templates/tasks-template.md`:
   - One task per row in `impact.md` (build tasks + doc-sync tasks).
   - Include ready-for-test checks at the bottom.

2. **Execute tasks in order**:
   - Mark `in_progress` → make edits → mark `done`.
   - Use the TodoWrite tool to track live progress.
   - For every file write, confirm it corresponds to a row in `impact.md`.
   - If a new impact is discovered (missing from `impact.md`):
     - **Pause.**
     - Add the row to `impact.md`.
     - Ask the user to re-approve.
     - Then continue.

3. **Doc sync**:
   - Update `.claude/CLAUDE.md` to reflect new commands/skills/agents if `impact.md` listed it.
   - Update `.claude/core/system/*.md` files per `impact.md`.
   - Update `brain/SKILLS.md` if commands/skills changed (remember `brain/` is user-local — the file exists in vault, update it).

4. **Quality gates** before handing off to test:
   - All frontmatter validates (PostToolUse hook passes silently on every new `.md`).
   - Every new note has at least one `[[wikilink]]`.
   - No placeholder markers (`{{…}}`, `NEEDS CLARIFICATION`) remain.

5. **Report**:
   - Files modified (grouped: repo-bound vs vault-only)
   - Any impact drift (rows added to `impact.md` during build)
   - Next step: `/spec-kit:test`

## Rules (Constitution §8)

- Refuse any edit that doesn't map to `impact.md`.
- Refuse to proceed if `impact.md` still has empty mandatory rows.
- Cite the constitution rule motivating each `.claude/core/` edit in the commit-ready summary.
