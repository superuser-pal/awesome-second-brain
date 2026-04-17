# Week Cycle Workflow

Invoked by `/week-cycle`. Orchestrates the full weekly transition: close current week → weekly analysis → plan next week.

## When to Use

Run this at the end of a week (typically Sunday) to cleanly transition from one week to the next.

## Steps

### 1. Check Context

Detect:
- Is there an active week? (grep `plan/W*.md` for `status: active`)
- Today's date — warn if it's not Friday-Sunday (not a blocker, just a heads-up)

### 2. Close Current Week (if active)

If an active week exists, run `weekly-closing` workflow (which now includes `weekly-synthesis`).

If no active week, skip closing — move to step 3.

### 3. Plan Next Week

Run `weekly-planning` workflow to set up the next week.

### 5. Summary

Present a compact summary:
- Week W[x] closed (velocity: N%)
- Key themes from `/weekly` analysis (2-3 bullets)
- Week W[x+1] created with [N] committed tasks and goal: "[goal]"
