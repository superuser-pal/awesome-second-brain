---
title: "Ship: {{FEATURE_NAME}}"
description: "Final shipping manifest — diff review, cleanup confirmation, commit proposal for {{FEATURE_NAME}}."
tags:
  - spec-kit
  - ship
feature: "{{FEATURE_SLUG}}"
status: pending
date: "{{DATE}}"
---

# Ship: {{FEATURE_NAME}}

> Related: [[spec]] · [[plan]] · [[impact]] · [[test-results]]

## 1. Gate check

- [ ] [[test-results|Test results]] overall score ≥ 3, no stage < 3
- [ ] Every row in [[impact]] touched
- [ ] [[test-artifacts|Test artifacts]] cleaned or intentionally retained

## 2. Git diff — repo-bound (will commit)

_Paths under `.claude/**`, `_spec-kit/**`, `bases/`, `dashboards/`, `CLAUDE.md`, `CHANGELOG.md`, `vault-manifest.json`._

-

## 3. Git diff — vault-only (gitignored, will NOT commit)

_Paths under `plan/`, `thinking/`, `inbox/`, `work/02_1-1/`, `work/03_INCIDENTS/`, `domains/*/01_PROJECTS/`, `domains/*/02_PAGES/`, `domains/*/05_ARCHIVE/`, `work/05_REVIEW/`, `work/06_ORG/`._

-

## 4. Cleanup

- [ ] Test artifacts cleaned per [[test-artifacts]]
- [ ] No leftover `[NEEDS CLARIFICATION]` or `{{placeholder}}` markers in shipped files

## 5. Commit

```
feat(spec-kit): {{FEATURE_NAME}}

- <bullet>
- <bullet>

Spec: _spec-kit/features/{{FEATURE_DIR}}/spec.md
```

- [ ] Commit created
- [ ] `status: shipped` set in frontmatter
