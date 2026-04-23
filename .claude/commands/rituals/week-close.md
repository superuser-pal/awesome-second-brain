---
description: "Close the active week — calculate velocity, perform analytical synthesis, handle incomplete tasks, and archive to plan/archive/."
---

Run the `weekly-closing` workflow from the `daily-rituals` skill.

1. Load the active week file from `plan/`
2. Calculate velocity (completed / planned)
3. **Weekly Synthesis**: Perform cross-session analysis (patterns, wins, North Star)
4. Handle each incomplete task: carry forward, backlog, drop, or pause
5. Gather retrospective (what went well, what to change)
6. Consolidate daily notes and archive to `plan/archive/`

## 7. Domain Cluster Detection + Pulse

After the daily-rituals workflow completes, run a condensed version of the audit cluster detection and pulse:

**Cluster Detection** (same logic as `/audit` §12a, condensed):
- For each domain, count flat pages in `02_PAGES/` by navigation type
- Report any type that has reached the ≥5 threshold since last week close
- If candidates found, present a single confirm gate: "N folders ready to emerge — run `/audit` to apply?" (do NOT auto-apply during week-close — just surface the candidates)

**Domain Pulse** (condensed format):
```
Weekly Domain Pulse:
- [DomainA]: N pages added this week (X concepts, Y decisions) | Emergence candidate: concepts/ (7 flat)
- [DomainB]: N pages added this week
- [DomainC]: no activity this week

Run /audit to create emerged folders.
```

Derive activity from git log: `git log --since="7 days ago" -- domains/`

## 8. Condensed Audit Snapshot

After the domain pulse, compute the same core metrics as `/audit` §13 and append a condensed summary to the active weekly note in `plan/`.

Metrics to compute (use data already gathered this session — do not re-scan):

| Metric | Value |
|---|---|
| Inbox age (oldest unprocessed) | N days |
| Orphan notes | N |
| Broken wikilinks | N |
| Empty brain files | N |
| Stale projects (no activity 30d+) | N |
| Tag violations | N |

Append to the weekly note under a new `## Audit Snapshot` heading:
```
## Audit Snapshot — YYYY-MM-DD

| Metric | Value |
|---|---|
| Inbox age | N days |
| Orphans | N |
| Broken links | N |
| Empty brain files | N |
| Stale projects | N |
| Tag violations | N |
```

This builds trend data over weeks without running a full `/audit`. If any metric is notably worse than last week, note it inline. Do not write to `brain/AUDIT_REPORTS/` from week-close — that is `/audit`'s responsibility.

$ARGUMENTS
