# Evening Review Workflow

Invoked as the final steps of `/wrap-up`, after the existing session quality check.

## Steps (appended to /wrap-up)

### 1. Read Today's Daily Note

Find today's daily note in `plan/` (filename: `DD-MM-YY.md`).

If it doesn't exist (standup wasn't run today), create a minimal one now.

Read the "Today's Focus" section from this morning to understand what was intended.

### 2. Gather Accomplishments

Ask: "What did you get done today?" (or infer from git log and conversation context).

For each accomplished task that matches a focused task:
- Mark `[x]` in the source project file
- Mark `[x]` in the active week file (if committed)
- Update `dashboards/TASKS.md`

### 3. Capture Learnings and Blockers

Ask (can be empty):
- "Any learnings or insights from today?"
- "Any blockers heading into tomorrow?"

### 4. Set Tomorrow's Priority

Based on:
- Remaining `[ ]` tasks from today's focus
- Blocked items (`[!]`) in TASKS.md
- Active week's committed tasks not yet started

Suggest 1-2 priorities for tomorrow. Confirm with user.

### 5. Calculate System Delta

Check inbox growth:
- Morning count (from daily note "Inbox Health" field)
- Current count: `ls inbox/raw/ | wc -l`
- Delta: +N or -N

### 6. Append Evening Section to Daily Note

Append to today's `plan/DD-MM-YY.md`:

```markdown
## Evening Review

**Accomplished:**
- [list]

**Learnings:**
- [list or "none"]

**Blockers:**
- [list or "none"]

**Inbox delta:** [morning count] → [current count] ([+/-N])

**Tomorrow's priority:** [1-2 items]
```
