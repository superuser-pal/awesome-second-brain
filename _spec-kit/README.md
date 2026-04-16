---
title: Spec-Kit — ASB Enhancement Workspace
description: Lean 5-phase cycle for designing, building, testing, and shipping enhancements to the Awesome Second Brain vault. Contained inside _spec-kit/. Carries requirements through a domain agent (builder).
tags:
  - spec-kit
  - index
  - moc
date: 2026-04-15
---

# Spec-Kit — ASB Enhancement Workspace

This folder is the working directory for all non-trivial enhancements to the Awesome Second Brain vault. It replaces the vendored GitHub spec-kit with a lean cycle tailored to ASB's reality: behavior design for an Obsidian + Claude Code vault, not software engineering.

> Start here: [[constitution|Spec-Kit Constitution]]

## When to use

Run the cycle only for **non-trivial** changes (see [[constitution|Constitution §2]]):
- Touches more than one file in `.claude/core/`
- Adds, modifies, or removes a command, skill, agent, hook, or frontmatter schema
- Introduces a new folder under the repo-bound tree

Trivial edits (typo fix, single-line doc tweak, single routing-row change) — just edit and commit.

## The five phases

```
/spec-kit:specify → /spec-kit:plan → /spec-kit:build → /spec-kit:test → /spec-kit:ship
```

1. **Specify** (`/spec-kit:specify <description>`) — creates `features/NNN-<slug>/spec.md`.
2. **Activate builder**: `/agent:builder NNN-<slug>` — loads constitution + feature files into context and keeps them loaded across the next three phases.
3. **Plan** (`/spec-kit:plan`) — produces `plan.md` and the mandatory `impact.md`. Gate review before build.
4. **Build** (`/spec-kit:build`) — generates `tasks.md` and executes every impact row.
5. **Test** (`/spec-kit:test`) — mandatory staged user-test (`TESTING_PLAN_V2`-style). Scores stages 1–5. Ship gate: no stage < 3.
6. **Ship** (`/spec-kit:ship`) — classifies git changes into repo-bound vs vault-only, cleans test artifacts, proposes a commit.

## Folder layout

```
_spec-kit/
├── README.md                   ← this file
├── constitution.md             ← rules; loaded by the builder agent
├── features/
│   └── NNN-<slug>/             ← one dir per feature, kept forever
│       ├── spec.md
│       ├── plan.md
│       ├── impact.md
│       ├── tasks.md
│       ├── test-plan.md
│       ├── test-artifacts.md
│       ├── test-results.md
│       └── ship.md
└── templates/
    ├── spec-template.md
    ├── plan-template.md
    ├── impact-template.md
    ├── tasks-template.md
    ├── test-plan-template.md
    ├── test-artifacts-template.md
    ├── test-results-template.md
    └── ship-template.md
```

## Test data — how it stays out of the repo

During `/spec-kit:test`, artifacts are created in **real vault paths** (`inbox/`, `plan/`, `thinking/`, `domains/*/02_PAGES/`, etc.). Those paths are **already gitignored** in the repo root `.gitignore`, so nothing leaks to git.

Every created path is appended to the feature's `test-artifacts.md`. Before `/spec-kit:ship`, ask the builder to "clean up test artifacts for feature NNN" and it walks the list deleting each path. If you want to keep some as long-lived fixtures, just skip them — the gitignore handles the rest.

## The builder agent

Activation: `/agent:builder <feature>`. The agent loads:

- `constitution.md` (authoring rules)
- The feature's `spec.md`, `plan.md`, `impact.md`, `test-plan.md`, `test-results.md` (whichever exist)

It keeps those in context across `/spec-kit:plan`, `/spec-kit:build`, `/spec-kit:test`, `/spec-kit:ship`. It enforces:

- No edit outside `impact.md`
- No ship while test gate fails
- Frontmatter compliance per `ASSET-CLASSES.md`
- Wikilinks on every new note
- Doc sync (CLAUDE.md + `.claude/core/`) alongside every behavior change

Dismiss with `*dismiss`. Offers to save a session note to `thinking/sessions/`.

## What's in git and what isn't

| Commits (repo-bound) | Gitignored (vault-only) |
|---|---|
| `.claude/**`, `_spec-kit/**` | `plan/*.md`, `thinking/*.md`, `inbox/**/*.md` |
| `bases/`, `dashboards/` scaffolds | `work/02_1-1/`, `work/03_INCIDENTS/` |
| `CLAUDE.md`, `CHANGELOG.md`, `vault-manifest.json` | `domains/*/01_PROJECTS/`, `02_PAGES/`, `05_ARCHIVE/` |
| Template scaffolds (`README.md`, `.gitkeep`) | `work/05_REVIEW/*.md`, `work/06_ORG/*.md` personal content |

`/spec-kit:ship` always groups `git status` by these buckets before proposing a commit.

## Amending the constitution

The constitution itself is a non-trivial change. Run it through the cycle with feature name `constitution-amendment-NNN` and bump `version` in the frontmatter.
