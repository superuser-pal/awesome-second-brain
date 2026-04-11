---
description: "Full weekly lifecycle — close current week (if active), run weekly analysis, plan next week. Run at end of week to transition cleanly."
---

Run the `week-cycle` workflow from the `daily-rituals` skill.

Sequence:
1. Close current week if active (`weekly-closing`)
2. Run weekly synthesis (`/weekly`)
3. Plan next week (`weekly-planning`)

Typically run on Friday or Sunday. Can run any day — closing and planning steps handle missing state gracefully.

$ARGUMENTS
