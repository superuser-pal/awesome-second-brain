---
title: PAL Second Brain Toolbox
version: 1.0.0
layer: SYSTEM
purpose: Scripts inventory, hook responsibilities, and tool creation rules
last_updated: 2026-04-05
---

## 1. Scripts Location

All scripts live in `.claude/scripts/`. No global tools directory. Scripts are shell (`.sh`) or Python (`.py`) — no TypeScript/Bun tools.

---

## 2. Hook Scripts

These scripts are wired to lifecycle events in `.claude/settings.json`:

| Script | Hook Event | Responsibility |
|--------|-----------|---------------|
| `session-start.sh` | SessionStart | Inject date, North Star, active work, git log, open tasks, domain list, inbox status, full file listing. Trigger QMD re-index. |
| `classify-message.py` | UserPromptSubmit | Classify message against known content types (decision, incident, win, 1:1, architecture, person, project update) and known domain signals. Inject routing hints as system context. |
| `validate-write.py` | PostToolUse (Write/Edit) | Check written `.md` files for: required YAML frontmatter fields, at least one `[[wikilink]]` in content-area notes, correct folder placement. Emit warnings — do not block. |
| `pre-tool-use.py` | PreToolUse | Security validation. **Block** on: hardcoded credentials (API keys, AWS AKIA*, Stripe sk_live_*, GitHub ghp_*, private keys, DB connection strings with passwords), restricted paths (`/etc/`, `/usr/`, `~/.ssh/`, `~/.aws/`, `.env`), dangerous commands (`rm -rf /`, `git push --force main`, `DROP TABLE`, `DELETE` without WHERE). **Warn** on: PII patterns outside exception paths, destructive git commands. |
| `pre-compact.sh` | PreCompact | Back up session transcript to `thinking/session-logs/YYYY-MM-DD-HH-MM.md` before context compaction. |

---

## 3. Utility Scripts

| Script | Purpose |
|--------|---------|
| `charcount.sh` | Count characters in a file or string (used by hooks for token budget estimates). |
| `find-python.sh` | Locate the available Python binary (python3 or python). Used by hooks that shell out to Python. |

---

## 4. Script Conventions

- **Shell scripts:** POSIX-compatible where possible. Use `#!/bin/bash` shebang.
- **Python scripts:** Python 3.8+. No third-party dependencies — use stdlib only.
- **Exit codes:** `0` = success or no action needed. `1` = block (PreToolUse). `2` = warning (non-blocking).
- **Output format:** Warnings go to stdout in a format Claude can parse and present to the user. Blocks go to stderr.
- **No interactive prompts:** Scripts run non-interactively. Input comes from environment or stdin.

---

## 5. Settings Configuration

Hook scripts are registered in `.claude/settings.json`. Hooks point to scripts by path relative to the vault root.

```json
{
  "hooks": {
    "SessionStart": [".claude/scripts/session-start.sh"],
    "UserPromptSubmit": [".claude/scripts/classify-message.py"],
    "PostToolUse": [".claude/scripts/validate-write.py"],
    "PreToolUse": [".claude/scripts/pre-tool-use.py"],
    "PreCompact": [".claude/scripts/pre-compact.sh"]
  }
}
```

---

## 6. What NOT to Add

- No TypeScript/Bun tools (this vault has no `bun` runtime requirement).
- No global schema validators (validation is handled by `validate-write.py`).
- No notification tools (no audio or system alerts needed).
- Do not add tools that duplicate Obsidian CLI capabilities — use `obsidian` CLI instead.

---

**Related Files:** `ARCHITECTURE.md`, `MEMORY-LOGIC.md`, `ORCHESTRATION.md`
