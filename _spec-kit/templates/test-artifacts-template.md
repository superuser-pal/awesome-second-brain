---
title: "Test Artifacts: {{FEATURE_NAME}}"
description: "Running list of vault paths created during testing of {{FEATURE_NAME}}. Used by /asb-ship to propose cleanup."
tags:
  - spec-kit
  - test-artifacts
feature: "{{FEATURE_SLUG}}"
status: active
date: "{{DATE}}"
---

# Test Artifacts: {{FEATURE_NAME}}

> Related: [[test-plan]]
> Append every path created during testing. All paths below are in gitignored locations — they stay on disk until cleaned.

## Created during testing

_Append rows as stages run. Format: `- [ ] path/to/file.md — created in Stage X`_

-

## Cleanup log

_When the user runs "clean up test artifacts for feature NNN", the builder checks each box above as it deletes._

-
