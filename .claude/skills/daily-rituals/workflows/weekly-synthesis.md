# Weekly Synthesis Workflow

Perform a cross-session synthesis of vault activity, North Star alignment, and patterns from the past 7 days.

## Workflow

### 1. Gather Week's Activity

Automated — no user input needed:
- `git log --since="7 days ago" --oneline --no-merges` — all vault changes
- List all notes modified in the past 7 days (git + filesystem)
- Read any `work/02_1-1/*.md` notes from this week
- Check `work/01_PROJECTS/` for status changes
- Check `work/03_INCIDENTS/` for new or updated incidents

### 2. North Star Alignment

Read `brain/NORTH_STAR.md` and compare actual activity against stated focus:
- **Aligned work**: which Current Focus items got attention this week?
- **Drift**: work that doesn't map to any stated goal (flag it)
- **Silent goals**: focus items with zero activity this week
- **Emerging themes**: patterns suggesting a focus shift

### 3. Cross-Day Patterns

Look across the week's notes for:
- Recurring themes (same topic in multiple notes or days)
- Multiple issues touching the same system/component
- Topics appearing in BOTH work notes and 1:1s (strong signals)
- Evolving context (decisions that shifted, deepening understanding)

### 4. Uncaptured Win Detection

Invoke the `wins-capture` subagent with a weekly scope.
- Identify achievements/evidence not yet in `WINS.md`
- Identify 1:1 feedback or kudos
- Identify incident contributions

### 5. Competency Signal Mapping

Check usage of competencies from `work/05_REVIEW/COMPETENCIES.md`:
- Which competencies were exercised? (based on note links/content)
- Is current evidence correctly linked?

Present as a compact table: Competency, Exercised (Y/N), Linked (Y/N).

### 6. Forward Look

Identify upcoming priorities:
- Blocked items from active work notes
- Deadline-driven tasks
- North Star goals needing immediate attention

### 7. Outcome

Present the synthesis to the user before proceeding to the retrospective or planning stages.
Include suggested priority ordering for the next week.
