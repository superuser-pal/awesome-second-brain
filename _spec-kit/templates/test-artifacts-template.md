---
title: "Test Artifacts: {{FEATURE_NAME}}"
description: "Running list of vault paths created during testing of {{FEATURE_NAME}}. Used by /spec-kit:ship to propose cleanup."
tags:
  - spec-kit
  - test-artifacts
feature: "{{FEATURE_SLUG}}"
status: active
date: "{{DATE}}"
---

# Test Artifacts: {{FEATURE_NAME}}

> Related: [[test-plan]]
> Append every path created during testing. All paths are in gitignored locations — they stay on disk until cleaned.

## Created during testing

_Format: `- [ ] path/to/file.md — created in Stage X`_

-

## Cleanup log

_Checked off as the builder deletes each path during cleanup._

-
