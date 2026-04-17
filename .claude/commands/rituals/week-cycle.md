---
# Week Cycle

Full weekly lifecycle — close current week (including analytical synthesis) and plan the next week. Run at the end of a week to transition cleanly.

## Usage

```
/week-cycle
```

## Workflow

Run the `week-cycle` workflow from the `daily-rituals` skill:

1. Close current week if active (`weekly-closing` which includes `weekly-synthesis`)
2. Plan next week (`weekly-planning`)

Typically run on Friday or Sunday. Can run any day — closing and planning steps handle missing state gracefully.

$ARGUMENTS
