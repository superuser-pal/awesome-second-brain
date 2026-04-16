---
description: "Spec-Kit Step 5. Group git changes into repo-bound vs vault-only, clean up test artifacts, and propose a commit for the feature."
---

Close out the feature. Review diffs, clean test data, commit.

## Preconditions

- `/spec-kit:test` completed, ship gate passed.
- `test-results.md` overall score ≥ 3 and no stage below 3.

## Steps

1. **Create `ship.md`** from `_spec-kit/templates/ship-template.md` for this feature.

2. **Gate check** — verify in `ship.md`:
   - Test scores pass.
   - Every row in `impact.md` was touched (cross-check by reading each file).
   - No `{{placeholder}}` or `NEEDS CLARIFICATION` left in shipped files.

3. **Run `git status`** and classify each changed path:
   - **Repo-bound** (will commit): `.claude/**`, `_spec-kit/**`, `bases/`, `dashboards/`, `CLAUDE.md`, `CHANGELOG.md`, `vault-manifest.json`.
   - **Vault-only** (gitignored, excluded automatically): `plan/`, `thinking/`, `inbox/`, `work/02_1-1/`, `work/03_INCIDENTS/`, `domains/*/01_PROJECTS/`, `domains/*/02_PAGES/`, `domains/*/05_ARCHIVE/`, `work/05_REVIEW/*.md`, `work/06_ORG/*.md`.
   - Record both groups in `ship.md` §2.

4. **Test artifact cleanup**:
   - Read `test-artifacts.md` in the feature dir.
   - Ask the user: "Clean up test artifacts? (yes / keep / choose)".
   - If yes: delete each listed path, check off rows in `test-artifacts.md`.
   - If choose: go through each path interactively.
   - If keep: tell the user these will persist in their vault (which is fine — they're gitignored).

5. **Verify nothing leaks**:
   - Re-run `git status`. Confirm no vault-only paths appear in the staged/unstaged/untracked lists. If any do, the gitignore is wrong — stop and flag.

6. **Propose commit**:
   - Message format: `feat(spec-kit): <feature name>` with 2–4 bullet summary.
   - Reference the spec path.
   - Ask the user to confirm before running `git add` / `git commit`.

7. **Mark feature shipped**:
   - Set `status: shipped` in `spec.md` and `ship.md` frontmatter.
   - Feature dir stays in place (`_spec-kit/features/NNN-*/`) as permanent history.

## Rules

- Never stage or commit a vault-only path. Ever.
- Never `rm -rf` — always list files, confirm, delete one by one.
- If `impact.md` has an unchecked index (e.g. `brain/SKILLS.md`), the feature is not ready to ship.
