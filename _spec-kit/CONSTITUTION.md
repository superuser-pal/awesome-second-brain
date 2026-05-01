---
title: Spec-Kit CONSTITUTION
version: 1.0.0
layer: SPEC-KIT
description: Central CONSTITUTION for the ASB enhancement cycle — principles, phase gates, impact and testing discipline, and enforcement rules for the builder agent.
tags:
  - spec-kit
  - CONSTITUTION
  - index
last_updated: 2026-04-15
---

# Spec-Kit CONSTITUTION

Central reference for building enhancements to the Awesome Second Brain (ASB) vault. The `builder` domain agent loads this file on every activation and enforces these rules across `/spec-kit:plan`, `/spec-kit:build`, `/spec-kit:test`, `/spec-kit:ship`. See also [[README|Spec-Kit README]].

This is not software development. This is **behavior design** for an Obsidian + Claude Code vault. Keep that frame.

---

## 1. Principles

1. **Graph-first.** Folders group by purpose, links group by meaning. Every new note must link to at least one existing note. Orphans are bugs.
2. **Atomicity.** One concept per page. Split before it grows.
3. **Zero data loss.** Use `git mv` when relocating; never delete user content without explicit confirmation.
4. **Personal data separation.** The user's vault content in `plan/`, `thinking/`, `inbox/`, `work/02_1-1/`, `work/03_INCIDENTS/`, `domains/*/01_PROJECTS/`, `domains/*/02_PAGES/`, `domains/*/05_ARCHIVE/` is gitignored. Never try to commit content from these paths. Never propose schemes that require un-ignoring them.
5. **Single source of truth per concern.** Routing lives in `ROUTING-TABLE.md`. Schemas live in `ASSET-CLASSES.md`. Skill/agent logic lives in `SKILL-LOGIC.md` / `AGENT-BASE.md`. Update the authoritative file — never shadow.
6. **Docs are code.** Any change to behavior requires a corresponding update in `.claude/core/`. No exceptions.

---

## 2. When to run the cycle

Run the full `/spec-kit:*` cycle for **non-trivial** changes — defined as any change that meets **at least one** of:

- Touches more than one file in `.claude/core/`.
- Adds, removes, or renames a slash command, skill, subagent, domain agent, or hook.
- Changes a frontmatter schema in `ASSET-CLASSES.md`.
- Changes routing in `ROUTING-TABLE.md` that affects >1 asset class.
- Introduces a new folder under the repo-bound tree (`.claude/`, `bases/`, `dashboards/`, `_spec-kit/`).

**Skip the cycle** for trivial edits: typo fixes, single-line doc updates, single routing-row tweaks, formatting-only changes. Edit directly and commit.

---

## 3. The five phases

| Phase | Command | Produces | Gate |
|---|---|---|---|
| 1. Specify | `/spec-kit:specify <desc>` | `spec.md` | User reviews spec before planning |
| 2. Plan | `/spec-kit:plan` | `plan.md`, `impact.md` | User approves impact list before building |
| 3. Build | `/spec-kit:build` | `tasks.md`, repo edits | All tasks checked off + impact.md files touched |
| 4. Test | `/spec-kit:test` | `test-plan.md`, `test-artifacts.md`, `test-results.md` | Every stage scored ≥3/5 |
| 5. Ship | `/spec-kit:ship` | `ship.md`, commit | User confirms cleanup + commit |

No phase may be skipped. `/spec-kit:test` is **mandatory** — a feature is not done until the test plan is scored.

---

## 4. Impact discipline

`impact.md` must enumerate, before any edit:

- Every `.claude/core/` file that will be updated, with the section/line expected to change.
- Every command/skill/agent file to be added, modified, or removed.
- Every hook (`.claude/scripts/hooks/`) to be touched.
- Every template (`.claude/core/system/templates/`) to be touched.

If during `/spec-kit:build` you discover a new impacted file, **pause**, update `impact.md`, and confirm with the user before continuing.

---

## 5. Testing discipline

Tests follow the `TESTING_PLAN_V2.md` pattern — **progressive stages** where each stage creates vault content the next stage depends on. No isolated checks against empty state.

- Test artifacts (notes, pages, projects, daily notes) are created in **real vault paths**. They are automatically gitignored.
- Every created path is appended to `test-artifacts.md` during the test.
- `test-plan.md` only contains stages that exercise the feature being built. Don't re-run the whole V2 plan.
- Each stage has: checkbox list, `📝 Notes` block, 1–5 score.
- Cleanup is performed on user request ("clean up test artifacts for feature NNN") by reading `test-artifacts.md` and deleting those paths.

---

## 6. Repo-bound vs vault-bound

| Commits to git | Never commits (gitignored) |
|---|---|
| `.claude/**` | `plan/*.md`, `thinking/*.md` |
| `_spec-kit/**` | `inbox/**/*.md` |
| `bases/`, `dashboards/` scaffolds | `work/02_1-1/*.md`, `work/03_INCIDENTS/*.md` |
| `CLAUDE.md`, `CHANGELOG.md`, `vault-manifest.json` | `domains/*/01_PROJECTS/`, `02_PAGES/`, `05_ARCHIVE/` |
| Template scaffolds (`README.md`, `.gitkeep`) | `work/05_REVIEW/*.md`, `work/06_ORG/*.md` personal |

`/spec-kit:ship` reads `git status` and groups changes by bucket. The user commits only the repo-bound bucket.

---

## 7. Output quality rules (enforced by the builder agent)

- Every new `.md` asset uses the correct frontmatter per `ASSET-CLASSES.md`.
- Every new command `.md` file has a one-line `description` at the top of the frontmatter.
- Every new skill has `SKILL.md` with `name`, `description`, `argument-hint`, `user-invocable` fields.
- Every new agent follows `AGENT-BASE.md` — activation sequence, standard menu, context labels (`[AUTO]`/`[REF]`).
- Every behavior change updates `CLAUDE.md` **and** the relevant `.claude/core/system/*.md` file.
- `_spec-kit/features/NNN-*/` is never edited by hand during phases — only by the `/spec-kit:*` commands.

---

## 8. Builder agent enforcement contract

When any `/spec-kit:*` command is invoked, the agent must:

1. Confirm the active feature (from `_spec-kit/features/NNN-*/`). Refuse if none is selected.
2. Refuse edits that would violate §4 (impact discipline) or §5 (testing discipline).
3. Refuse to run `/spec-kit:ship` while `test-results.md` has any stage scored <3 or missing a score.
4. When proposing edits to `.claude/core/`, always cite the specific rule in this constitution that motivates the change.

---

## 9. Amendments

This file is human-edited. Updates are themselves a non-trivial change and should go through the cycle (use feature name `constitution-amendment-NNN`). Bump `version` in the frontmatter on every amendment.
