---
name: daily-rituals
description: Structured daily and weekly planning cycle. Enhances /open-day and /close-day with daily notes in plan/. Adds weekly planning, closing, and the full week-cycle orchestrator.
version: 1.0.0
---

# Daily Rituals Skill

Structured planning workflows that layer on top of existing Awesome Second Brain commands. Adds a `plan/` folder for daily notes and weekly files, enabling a complete weekly cycle: plan → work → review → close.

## USE WHEN

- Creating or reading today's daily note
- Planning the week ahead (selecting committed tasks, setting week goal)
- Closing a week (calculating velocity, consolidating notes, archiving)
- Running the full week-cycle (close + review + plan)

## Relationship to Existing Commands

| Command | Role |
|---------|------|
| `/open-day` | **Enhanced** — now also creates today's daily note in `plan/` and marks focus tasks `[/]` |
| `/close-day` | **Enhanced** — now also appends evening reflection to today's daily note and marks tasks done |
| `/weekly` | **Deprecated** — consolidated into `/week-close` and `/week-cycle` |
| `/week-prep` | **New** — create weekly plan file, commit tasks |
| `/week-close` | **Enhanced** — now includes metrics, analytical synthesis, and archiving |
| `/week-cycle` | **Enhanced** — orchestrates: close (with synthesis) → plan |

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
| `morning-checkin` | `/open-day` (appended steps) |
| `evening-review` | `/close-day` (appended steps) |
| `week-prep` | `/week-prep` |
| `week-close` | `/week-close` |
| `weekly-synthesis` | Internal (called by `week-close`) |
| `week-cycle` | `/week-cycle` |
