---
title: PAL Second Brain Security Guardrails
version: 1.0.0
layer: SECURITY
purpose: Execution constraints enforced by pre-tool-use.py — BLOCK / WARN / ALLOW model
last_updated: 2026-04-05
---

# Security Guardrails

Three-tier model: **BLOCK** (operation halted) | **WARN** (operation allowed with notice) | **ALLOW** (safe, no action needed).

Enforced by `.claude/scripts/pre-tool-use.py` at every tool execution. Claude should also apply these rules proactively before writing.

---

## 1. Credentials [BLOCK]

Never allow hardcoded credentials in any file. Only environment variable references are acceptable.

**Detection patterns:**
```
api[_-]?key[_-]?[:=]\s*['"]?([a-zA-Z0-9_-]{20,})['"]?
AKIA[0-9A-Z]{16}
sk_live_[0-9a-zA-Z]{24}
ghp_[0-9a-zA-Z]{36}
password[_-]?[:=]\s*['"]?([^\s'"]{8,})['"]?
(mysql|postgres|mongodb):\/\/[^:]+:[^@]+@
-----BEGIN (RSA|OPENSSH|DSA|EC|PGP) PRIVATE KEY-----
eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+
```

**Safe pattern:** Reference environment variables — `process.env.KEY` or shell `$VAR`. Placeholder strings in documentation (e.g., `your-api-key-here`) are allowed.

---

## 2. PII — Personally Identifiable Information [WARN]

Emit a warning when writing PII outside exception paths. Operation is allowed — the warning is informational.

**Detection patterns:**
```
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}    # Email
(\+1\s?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})  # Phone
[0-9]{3}-[0-9]{2}-[0-9]{4}                           # SSN
[0-9]{4}[- ]?[0-9]{4}[- ]?[0-9]{4}[- ]?[0-9]{4}   # Credit card
```

**Exception paths (PII allowed without warning):**
- `brain/CONTACTS.md`
- `brain/RESUME.md`
- `work/06_ORG/PEOPLE.md`
- `work/06_ORG/TEAMS.md`
- `work/02_1-1/`

---

## 3. Destructive Operations [BLOCK]

**File system:**
- BLOCK: `rm -rf [directory]`, `rm *.md`, targets in system paths
- WARN: single file deletion
- ALLOW: `/tmp/` targets

**Database:**
- BLOCK: `DROP TABLE`, `DROP DATABASE`, `TRUNCATE`, mass `DELETE` or `UPDATE` without WHERE
- WARN: multi-row WHERE clauses
- ALLOW: SELECT, INSERT, single-row updates

**Git:**
- BLOCK: `git push --force main`, `git push --force master`, `git reset --hard HEAD~[2+]`, `git clean -fd`
- WARN: `git reset --hard` (local), `git stash drop`
- ALLOW: standard git operations (commit, push non-main, pull, fetch, log, status)

---

## 4. Restricted Paths [BLOCK / WARN]

**BLOCK writes to:**
- `/etc/`, `/usr/`, `/bin/`, `/sbin/`
- `~/.ssh/`, `~/.aws/`, `~/Library/Keychains/`
- Any `.env` file (`.env`, `.env.local`, `.env.production`, etc.)
- Path traversal patterns: `../../../`

**WARN on:**
- Writes outside the vault root (the working directory)
- Read-only system config files (`~/.bashrc`, `~/.zshrc`)

**ALLOW:**
- Vault root and all subdirectories
- `/tmp/`

---

## 5. Command Execution [BLOCK / WARN]

**BLOCK:**
- `eval`, `exec`, `system` with unsanitized user input
- Unescaped variable expansion in destructive commands (e.g., `rm ${USER_INPUT}`)

**WARN:**
- `curl`, `wget` (network fetch)
- `brew install`, `npm install`, `pip install` (package installs)
- `sudo` (privilege escalation)

**ALLOW:**
- Read-only commands: `ls`, `pwd`, `cat`, `grep`, `git status`, `git log`
- Vault scripts in `.claude/scripts/`
- `obsidian` CLI commands

---

## 6. Vault-Specific Rules [BLOCK / WARN]

These rules are specific to PAL Second Brain and enforced by convention (Claude applies them directly):

| Rule | Level |
|------|-------|
| Never modify `.obsidian/` config files without explicit user request | BLOCK |
| Never auto-commit — only commit when explicitly asked | BLOCK |
| Never delete files without explicit user confirmation | BLOCK |
| Always use `git mv` when moving or renaming files | WARN if not used |
| Never write memory to `~/.claude/memory/` — use `brain/` instead | BLOCK |
| Never create notes at vault root (only `CLAUDE.md`, `vault-manifest.json`, `CHANGELOG.md`, `README.md`, `LICENSE`, `.gitignore` belong there) | WARN |

---

**Related Files:** `ARCHITECTURE.md`, `MEMORY-LOGIC.md`, `.claude/scripts/pre-tool-use.py`
