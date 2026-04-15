---
title: PAL Second Brain Toolbox
version: 1.0.0
layer: SYSTEM
purpose: Scripts inventory, hook responsibilities, and tool creation rules
last_updated: 2026-04-05
---

## 1. Scripts Location

All scripts live in `.claude/scripts/`. No global tools directory. Scripts are shell (`.sh`) or TypeScript/Bun (`.ts`).

---

## 2. Hook Scripts

These scripts are wired to lifecycle events in `.claude/settings.json`:

| Script | Hook Event | Responsibility |
|--------|-----------|---------------|
| `session-start.sh` | SessionStart | Inject date, North Star, active work, git log, open tasks, domain list, inbox status, full file listing. Trigger QMD re-index. |
| `hooks/classify-message.ts` | UserPromptSubmit | Classify message against known content types (decision, incident, win, 1:1, architecture, person, project update) and known domain signals. Inject routing hints as system context. |
| `hooks/validate-write.ts` | PostToolUse (Write/Edit) | Check written `.md` files for: required YAML frontmatter fields (Zod schema per asset class), at least one `[[wikilink]]` in content-area notes, correct folder placement. Emit warnings — do not block. |
| `hooks/pre-tool-use.ts` | PreToolUse | Security validation. **Block** on: hardcoded credentials (API keys, AWS AKIA*, Stripe sk_live_*, GitHub ghp_*, private keys, DB connection strings with passwords), restricted paths (`/etc/`, `/usr/`, `~/.ssh/`, `~/.aws/`, `.env`), dangerous commands (`rm -rf /`, `git push --force main`, `DROP TABLE`, `DELETE` without WHERE). **Warn** on: PII patterns outside exception paths, destructive git commands. |
| `pre-compact.sh` | PreCompact | Back up session transcript to `thinking/session-logs/YYYY-MM-DD-HH-MM.md` before context compaction. |

---

## 3. Utility Scripts

| Script | Purpose |
|--------|---------|
| `charcount.sh` | Count characters in a file or string (used by hooks for token budget estimates). |

---

## 4. Script Conventions

- **Shell scripts:** POSIX-compatible where possible. Use `#!/bin/bash` shebang.
- **TypeScript hooks:** Run via `bun run`. Dependencies (`zod`, `gray-matter`) installed in `.claude/scripts/node_modules/`. Requires Bun ≥ 1.1.0.
- **Exit codes:** `0` = success or no action needed. `2` = block (PreToolUse). Warnings emit to stderr with exit `0`.
- **Output format:** Warnings go to stdout as `hookSpecificOutput.additionalContext` JSON. Blocks go to stderr with exit code 2.
- **No interactive prompts:** Scripts run non-interactively. Input comes from environment or stdin.

---

## 5. Settings Configuration

Hook scripts are registered in `.claude/settings.json`. Hooks point to scripts by path relative to the vault root.

```json
{
  "hooks": {
    "SessionStart": [".claude/scripts/session-start.sh"],
    "UserPromptSubmit": ["bun run .claude/scripts/hooks/classify-message.ts"],
    "PostToolUse": ["bun run .claude/scripts/hooks/validate-write.ts"],
    "PreToolUse": ["bun run .claude/scripts/hooks/pre-tool-use.ts"],
    "PreCompact": [".claude/scripts/pre-compact.sh"]
  }
}
```

---

## 6. What NOT to Add

- No additional Python scripts — hooks are now TypeScript/Bun.
- No global schema validators outside the hook stack (validation is handled by `hooks/validate-write.ts` + Zod schemas in `hooks/lib/schemas.ts`).
- No notification tools (no audio or system alerts needed).
- Do not add tools that duplicate Obsidian CLI capabilities — use `obsidian` CLI instead.

---

**Related Files:** `ARCHITECTURE.md`, `MEMORY-LOGIC.md`, `ORCHESTRATION.md`
