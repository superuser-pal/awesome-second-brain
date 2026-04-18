# Close Day

Fast session review and consistency check before ending.

## Usage

```
/close-day
```

Triggered when the user says "close day", "wrap up", "let's wrap", "wrapping up", or similar. Claude should invoke this automatically.

## Workflow

### 1. Fast Session Review

Scan the conversation for newly created or modified notes:
- List created/modified notes with paths.
- **Sanity check**: Ensure each new note has at least one wikilink and a `description` field.
- **Project sync**: Update status fields of projects touched this session (e.g., `active` -> `completed`).

### 2. Update Critical Context

- `work/INDEX.md` — register new notes in "Recent Notes" or "Active Projects".
- `brain/MEMORIES.md` — if critical new context was learned, ensure it's linked from the "Recent Context" section.

### 3. Thinking Notes Clean-up

- Scan `thinking/` for unarchived notes with `status: thinking`. If any exist, list them and suggest running `/process` later.

### 4. Ways of Working Reflection

Briefly identify if this session revealed a major new pattern or gotcha for:
- `brain/PATTERNS.md`
- `brain/GOTCHAS.md`
- `CLAUDE.md` (e.g., new project convention)

### 5. Evening Review (evening-review)

Run the `evening-review` workflow from the `daily-rituals` skill:

- Read today's daily note from `plan/`.
- Mark accomplished tasks `[x]` in daily note and project files.
- Suggest 1 priority for tomorrow.
- Append the section to the daily note.

### 6. Report

Present a lean summary:
- **Done**: notes captured and projects updated.
- **Tomorrow**: top priority.
- **Flagged**: anything requiring immediate user action.

## Important

- This is a light consistency pass, NOT a full audit. Keep it fast.
- Deep analytical work (wins capture, orphan scans, competency mapping) is deferred to `/week-close`.
