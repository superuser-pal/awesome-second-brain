---
name: daily-rituals
description: Structured daily and weekly planning cycle. Enhances /standup and /wrap-up with daily notes in plan/. Adds weekly planning, closing, and the full week-cycle orchestrator.
version: 1.0.0
---

# Daily Rituals Skill

Structured planning workflows that layer on top of existing PAL Second Brain commands. Adds a `plan/` folder for daily notes and weekly files, enabling a complete weekly cycle: plan → work → review → close.

## USE WHEN

- Creating or reading today's daily note
- Planning the week ahead (selecting committed tasks, setting week goal)
- Closing a week (calculating velocity, consolidating notes, archiving)
- Running the full week-cycle (close + review + plan)

## Relationship to Existing Commands

| Command | Role |
|---------|------|
| `/standup` | **Enhanced** — now also creates today's daily note in `plan/` and marks focus tasks `[/]` |
| `/wrap-up` | **Enhanced** — now also appends evening reflection to today's daily note and marks tasks done |
| `/weekly` | **Unchanged** — analytical synthesis only, no file creation |
| `/plan-week` | **New** — create weekly plan file, commit tasks |
| `/close-week` | **New** — close week, consolidate daily notes, archive |
| `/week-cycle` | **New** — orchestrates: close → weekly review → plan |

## File Paths

| Type | Path | Naming |
|------|------|--------|
| Daily notes | `plan/` | `DD-MM-YY.md` (e.g. `05-04-26.md`) |
| Weekly files | `plan/` | `W[week]_YYYY-MM-DD.md` (e.g. `W14\_2026-04-06.md`) |
| Archived weeks | `plan/archive/` | `W[week].md` (e.g. `W14.md`) |

## Day Suffix Mapping

| Day | Suffix |
|-----|--------|
| Monday | MO |
| Tuesday | TU |
| Wednesday | WE |
| Thursday | TH |
| Friday | FR |
| Saturday | SA |
| Sunday | SU |

## Workflows

| Workflow | Invoked by |
|----------|-----------|
| `morning-checkin` | `/standup` (appended steps) |
| `evening-review` | `/wrap-up` (appended steps) |
| `weekly-planning` | `/plan-week` |
| `weekly-closing` | `/close-week` |
| `week-cycle` | `/week-cycle` |
