---
description: "Spec-Kit Step 4. Generate the staged test-plan.md from spec+plan, then walk the user through it — recording artifacts and scores."
---

Run the staged user-test for the active feature. Mandatory gate before ship.

## Preconditions

- `builder` agent active on feature.
- `tasks.md` is fully checked off.
- All files in `impact.md` have been touched.

## Steps

1. **Generate `test-plan.md`** from `_spec-kit/templates/test-plan-template.md`:
   - Pull scenarios from `spec.md` into stages.
   - Include a Stage 0 (Preconditions), an Edge-cases/Regressions stage, and an E2E stage.
   - Only include stages that exercise *this* feature. Don't clone the full V2 plan.
   - Each stage gets concrete steps referencing the real commands/skills/agents affected.

2. **Create empty `test-artifacts.md`** and `test-results.md` from their templates.

3. **Walk the user through stages in order**:
   - For each stage, present the steps, wait for the user to execute them in Obsidian / Claude Code.
   - Test artifacts are created in **real vault paths** (already gitignored). Append each created path to `test-artifacts.md` as it's produced.
   - After each stage, prompt for a 1–5 score and a friction note. Record in `test-results.md`.
   - If a stage scores below 3, pause and ask: "Fix now before continuing, or log as follow-up?"

4. **Regression sweep** (always, even on small features):
   - Run `/core:audit` — no new orphans or broken wikilinks.
   - Spot-check at least one adjacent command still behaves correctly.

5. **Ship gate**:
   - Read `test-results.md` — confirm no stage < 3 and overall ≥ 3.
   - If not, stop and tell the user: "Feature fails ship gate — fix issues or lower scope."

6. **Report**:
   - Scores table
   - Artifacts created (count + paths)
   - Issues logged
   - Next step: `/spec-kit:ship`

## Rules

- Test data is always created in real vault paths. Never use `sandbox/` folders or special tagging.
- Rely on `.gitignore` for separation.
- If the test would require writing to a repo-bound path, that's a bug — flag it.
