---
title: "Tasks: {{FEATURE_NAME}}"
description: "Executable checklist for building {{FEATURE_NAME}}, derived from plan and impact."
tags:
  - spec-kit
  - tasks
feature: "{{FEATURE_SLUG}}"
status: in-progress
date: "{{DATE}}"
---

# Tasks: {{FEATURE_NAME}}

> Related: [[plan]] · [[impact]]

Each task maps to one row in [[impact]]. Check off as you complete. If a new task appears, amend [[impact]] first.

## Build tasks

- [ ] **T1** —
- [ ] **T2** —
- [ ] **T3** —

## Doc sync tasks

- [ ] Update `.claude/CLAUDE.md` per [[impact]]
- [ ] Update relevant `.claude/core/` files per [[impact]]
- [ ] Update `brain/SKILLS.md` if commands/skills changed

## Ready-for-test checks

- [ ] All files in [[impact]] touched
- [ ] All new frontmatter validates (PostToolUse hook passes)
- [ ] No orphan notes introduced
- [ ] [[test-plan]] drafted
