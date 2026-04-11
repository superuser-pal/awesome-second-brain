# Auto Memory

All project memories live in the vault (git-tracked). This file is a lightweight index.

## Rule: Vault-First Memories

**All new memories for this project MUST be written to vault notes in `brain/`, NOT to files in this directory.**

- Durable knowledge → `brain/` notes (git-tracked, Obsidian-browsable, linked)
- This `MEMORY.md` → index only, pointers to vault locations
- Never create new `.md` files in this `~/.claude/` memory directory — they aren't version-controlled

## Where to Find Things

| Topic                     | Vault Location                       |
| ------------------------- | ------------------------------------ |
| Technical gotchas         | `brain/GOTCHAS.md`       |
| Patterns and conventions  | `brain/PATTERNS.md`      |
| Key decisions             | `brain/KEY_DECISIONS.md` |
| Goals and focus           | `brain/NORTH_STAR.md`    |
| Slash commands and skills | `brain/SKILLS.md`        |
| People and org context    | `work/06_ORG/PEOPLE.md`              |
| Active work and projects  | `work/INDEX.md`                      |
| Performance evidence      | `work/05_REVIEW/WINS.md`             |

## Setup

1. Find your project memory path: `~/.claude/projects/<encoded-path>/memory/`
2. Copy this file there as `MEMORY.md`
3. Claude Code will auto-load it at the start of every conversation
4. When Claude creates memories, they go to vault notes — not this directory
