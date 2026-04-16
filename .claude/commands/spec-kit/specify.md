---
description: "Spec-Kit Step 1. Create a new feature spec under _spec-kit/features/NNN-<slug>/spec.md from a natural-language description."
---

Create a new ASB feature specification.

## Arguments

`$ARGUMENTS` — the natural-language description of the feature to build.

If empty, ask the user: "What feature do you want to specify?"

## Preflight

1. Read `_spec-kit/constitution.md` to align with current rules.
2. Check that `$ARGUMENTS` describes a **non-trivial** change per Constitution §2. If it's a typo fix or single-line edit, stop and tell the user: "This looks like a trivial change — edit directly and commit without running the cycle."

## Steps

1. **Generate a short slug** (2–4 words, kebab-case) from the description.
   - Examples: "add voice capture" → `voice-capture`, "refactor routing table" → `routing-refactor`.

2. **Assign a feature number**:
   - Scan `_spec-kit/features/` for existing `NNN-*` directories.
   - Next number = max existing + 1, zero-padded to 3 digits (`001`, `002`, …).

3. **Create the feature directory**: `_spec-kit/features/NNN-<slug>/`.

4. **Create `spec.md`** by copying `_spec-kit/templates/spec-template.md` into the new directory and replacing placeholders:
   - `{{FEATURE_NAME}}` → human-readable feature name (title case)
   - `{{FEATURE_SLUG}}` → `NNN-<slug>`
   - `{{DATE}}` → today (`YYYY-MM-DD`)

5. **Fill the spec** from `$ARGUMENTS`:
   - Extract goal, why, current vs new behavior, user scenarios.
   - Write 2–3 concrete scenarios (Given/When/Then).
   - Mark up to 3 genuine open questions. Don't invent questions to fill quota.
   - Record assumptions in the Assumptions section rather than asking.

6. **Self-validate** the spec against Constitution §7:
   - No implementation details in spec — that's what `plan.md` is for.
   - Every scenario is concrete and testable in Obsidian.
   - All placeholders replaced.

7. **Report** to the user:
   - Path of the created spec
   - Summary of scenarios
   - Any open questions needing their input
   - Next step: activate the builder agent with `/agent:builder NNN-<slug>`, then run `/spec-kit:plan`

## Rules

- Only one feature per invocation.
- Never write outside `_spec-kit/features/NNN-<slug>/` in this step.
- Don't start editing `.claude/**` yet — that's Step 3 (`/spec-kit:build`).
