---
title: Spec-Kit — ASB Enhancement Workspace
description: Lean 5-phase cycle for designing, building, testing, and shipping enhancements to the Awesome Second Brain vault. Contained inside _spec-kit/. Carries requirements through the builder domain agent.
tags:
  - spec-kit
  - index
  - moc
date: 2026-04-15
---

# Spec-Kit — ASB Enhancement Workspace

This folder is the working directory for all non-trivial enhancements to the Awesome Second Brain vault. See [[CONSTITUTION|Spec-Kit Constitution]] for the rules.

## When to use

Run the cycle for **non-trivial** changes (CONSTITUTION §2):
- Touches more than one file in `.claude/core/`
- Adds, modifies, or removes a command, skill, agent, hook, or frontmatter schema
- Introduces a new folder under the repo-bound tree

Trivial edits — just edit and commit directly.

## The five phases

```
/spec-kit:specify → /spec-kit:plan → /spec-kit:build → /spec-kit:test → /spec-kit:ship
```

1. `/spec-kit:specify <description>` — creates `features/NNN-<slug>/spec.md`
2. `/agent:builder NNN-<slug>` — activates the builder agent; loads constitution + feature files into context for all remaining phases
3. `/spec-kit:plan` — produces `plan.md` + mandatory `impact.md`; gate review before build
4. `/spec-kit:build` — generates `tasks.md` and executes every impact row
5. `/spec-kit:test` — mandatory staged user-test (V2-style); ship gate at score < 3
6. `/spec-kit:ship` — classifies git changes repo-bound vs vault-only, cleans artifacts, proposes commit

## Folder layout

```
_spec-kit/
├── README.md           ← this file
├── CONSTITUTION.md     ← rules; loaded by the builder agent on every activation
├── features/
│   └── NNN-<slug>/     ← one dir per feature, kept permanently
│       ├── spec.md
│       ├── plan.md
│       ├── impact.md
│       ├── tasks.md
│       ├── test-plan.md
│       ├── test-artifacts.md
│       ├── test-results.md
│       └── ship.md
└── templates/          ← source templates for all feature files above
```

## Test data

During `/spec-kit:test`, artifacts are created in **real vault paths** (inbox/, plan/, thinking/, domains/ etc.). Those paths are already gitignored — nothing leaks to git. Every created path is listed in the feature's `test-artifacts.md`. Ask the builder to clean them before shipping.

## What commits vs what doesn't

| Commits (repo-bound) | Never commits (gitignored) |
|---|---|
| `.claude/**`, `_spec-kit/**` | `plan/`, `thinking/`, `inbox/**` |
| `bases/`, `dashboards/` scaffolds | `work/02_1-1/`, `work/03_INCIDENTS/` |
| `CLAUDE.md`, `CHANGELOG.md`, `vault-manifest.json` | `domains/*/01_PROJECTS/`, `02_PAGES/`, `05_ARCHIVE/` |

`/spec-kit:ship` groups `git status` by these buckets before proposing a commit.
