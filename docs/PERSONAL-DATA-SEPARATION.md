---
date: 2026-04-13
description: How personal vault content is kept out of git using .gitignore and skip-worktree, so the open-source template stays clean.
tags:
  - docs
  - git
---

# Personal Data Separation

This vault is also an open-source template. This document explains how personal vault content is kept out of git without removing files from the repo.

## Two-layer approach

### Layer 1 — `.gitignore` (new files in personal dirs)

Personal content directories are gitignored at the file level. New notes you create during vault use are never staged:

```
plan/*.md
thinking/*.md
work/02_1-1/*.md
work/03_INCIDENTS/*.md
inbox/raw/*.md
inbox/ready/*.md
domains/*/01_PROJECTS/*.md
domains/*/02_PAGES/*.md
domains/*/05_ARCHIVE/*.md
```

`.gitkeep` placeholders and `thinking/README.md` are exempted via negation rules so folder structure stays intact for template users.

### Layer 2 — `skip-worktree` (edits to already-tracked scaffolds)

Template scaffold files (brain notes, work indexes, review files) ship as empty templates but get filled in personally. `skip-worktree` tells git to freeze the committed template version and silently ignore any local edits:

```bash
git update-index --skip-worktree <file>
```

Files currently marked skip-worktree:

| File | Why |
|------|-----|
| `brain/USER.md` | Personal identity |
| `brain/CONTACTS.md` | Personal contacts |
| `brain/CAVEATS.md` | Accumulated personal knowledge |
| `brain/LOGIC.md` | Personal decisions |
| `brain/MEMORIES.md` | Personal memories |
| `brain/NORTH_STAR.md` | Personal goals |
| `brain/RULES.md` | Personal patterns |
| `brain/RESUME.md` | Personal resume |
| `work/INDEX.md` | Work index with personal project refs |
| `work/CONNECTIONS.yaml` | Personal external integrations |
| `work/01_PROJECTS/AD_HOC_TASKS.md` | Personal tasks |
| `work/04_PAGES/INDEX.md` | Personal pages index |
| `work/05_REVIEW/COMPETENCIES.md` | Personal competency evidence |
| `work/05_REVIEW/EVIDENCE.md` | Personal review evidence |
| `work/05_REVIEW/WINS.md` | Personal wins log |
| `work/06_ORG/PEOPLE.md` | Personal org chart |
| `work/06_ORG/TEAMS.md` | Personal team notes |

## Common operations

### Check which files are skip-worktree

```bash
git ls-files -v | grep ^S
```

(`S` = skip-worktree, `s` = assume-unchanged)

### Add a new file to skip-worktree

```bash
git update-index --skip-worktree path/to/file.md
```

### Temporarily re-enable tracking (to update the template version)

```bash
git update-index --no-skip-worktree path/to/file.md
# edit, stage, and commit the template change
git update-index --skip-worktree path/to/file.md
```

### Remove skip-worktree from all files at once

```bash
git ls-files -v | grep ^S | cut -c3- | xargs git update-index --no-skip-worktree
```

## What gets pushed to GitHub

| Content | Tracked? |
|---------|----------|
| `.claude/` skills, commands, agents | Yes |
| `bases/`, `dashboards/` templates | Yes |
| `vault-manifest.json`, `package.json` | Yes |
| `README.md`, `CONTRIBUTING.md`, docs | Yes |
| Folder structure (`.gitkeep` files) | Yes |
| Brain/work scaffold files (empty templates) | Yes (frozen via skip-worktree) |
| Your personal edits to scaffold files | No |
| New notes in personal dirs | No (gitignored) |

See also: [[CONTRIBUTING]] for the full contribution guide, and [[vault-manifest]] for template version metadata.

## After cloning (for template users)

Template users get the empty scaffold files normally — `skip-worktree` is a local index flag, not stored in the repo. They fill in the files and their edits are tracked by their own git (or not, if they want to apply this same setup).
