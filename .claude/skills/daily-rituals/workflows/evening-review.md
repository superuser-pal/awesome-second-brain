# Close Workflow

Invoked as the final steps of `/close-day`, after the existing session quality check.

## Important: Notes Section is Read-Only

Never modify the **## Notes** section of the daily note. It belongs to the user and persists as written. The only actions allowed on Notes are:
- Reading it to detect open tasks (Step 3)
- Reading it to synthesize Insights (Step 6)

---

## Steps (appended to /close-day)

### 1. Read Today's Daily Note

Find today's daily note in `plan/` (filename: `DD-MM-YY.md`).

If it doesn't exist (/open-day wasn't run today), create a minimal one now.

Read the **Tasks → Open** section to understand what was planned.

### 2. Gather Accomplishments

Ask: "What did you get done today?" (or infer from git log and conversation context).

For each accomplished task:
- Move it from **Tasks → Open** to **Tasks → Closed** in the daily note (change `[/]` → `[x]`, add `✅ YYYY-MM-DD`)
- Mark `[x]` in the source project file (add `✅ YYYY-MM-DD` to the task line)
- Mark `[x]` in the active week file (if committed)
- Update `dashboards/TASKS.md`

Tasks that remain `[/]` in Open stay there — they carry forward to tomorrow.

### 3. Scan Notes for Open Tasks

Read the **Notes** section. If any `[ ]` or `[/]` tasks are found there:
- List them and ask: "Route to source files, or keep as daily-note-only tasks?"
- If routing: add to the appropriate project file or `AD_HOC_TASKS.md`
- Do NOT remove or edit anything from the Notes section itself

### 4. Capture Learnings and Blockers

Ask (can be empty):
- "Any learnings or insights from today?"
- "Any blockers heading into tomorrow?"

For any new blockers: mark the relevant task `[!]` (ON_HOLD) in the source project file and sync to TASKS.md.

### 5. Set Tomorrow's Priority

Based on:
- Remaining `[/]` tasks still in **Tasks → Open**
- `[!]` ON_HOLD tasks in TASKS.md that need unblocking
- Active week's committed tasks not yet started

Suggest 1-2 priorities for tomorrow. Confirm with user.

### 6. Synthesize Insights from Notes

Read the **Notes** section and look for:
- Recurring themes or topics
- Decisions made or deferred
- Signals worth tracking (people mentioned, risks surfaced, ideas flagged)
- Anything that connects to active projects or North Star goals

If the Notes section is empty or has nothing worth synthesizing, skip this section entirely — do not force it.

### 7. Calculate System Delta

Check inbox growth:
- Morning count (from daily note "Inbox Health" field)
- Current count: `ls inbox/raw/ | wc -l`
- Delta: +N or -N

### 8. Append Close Section to Daily Note

Append after the Notes section in today's `plan/DD-MM-YY.md`:

```markdown
---

## Close

**Accomplished:**
- [list]

**Learnings:**
- [list or "none"]

**Blockers:**
- [list or "none"]

**Inbox delta:** [morning count] → [current count] ([+/-N])

**Tomorrow's priority:** [1-2 items]

### Insights

- [bullet points synthesized from Notes — omit section entirely if nothing to surface]
```
