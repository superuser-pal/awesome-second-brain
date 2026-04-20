# Changelog

## v2.0.0 — The "Second Brain" Release

This release transforms the Awesome Second Brain into a true personal knowledge management system, capable of capturing, connecting, and reasoning over your life and work.

### New Capabilities

- **Prompt library** (`docs/prompts/`, `docs/prompts/`): 240+ atomic prompt pattern pages with `type: prompt` frontmatter. Dormant until promoted; promotion generates a `/prompts:<slug>` slash command.
- **Strategy library** (`docs/strategies/`, `docs/strategies/`): 9 reasoning strategy pages. CoT is pre-promoted. Promote others via the `strategy` skill.
- **`prompts` skill**: search, promote, and demote prompt pages. Three workflows: `search`, `promote`, `demote`.
- **`strategy` skill**: search, promote, and demote strategy pages. Three workflows: `search`, `promote`, `demote`.
- **`/thinking:cot`**: injects Chain-of-Thought reasoning for the session.
- **`/thinking:eval`**: evaluates which active strategy best fits the user's current task.
- **`/thinking:reset`**: clears the active strategy from the session.
- **`bases/Prompts.base`**: Active / Dormant by Category / All views for the prompt library.
- **`bases/Strategies.base`**: Active / Dormant / All views for the strategy library.

### Schema additions

- `type: prompt` and `type: strategy` added to `ASSET-CLASSES.md` and `schemas.ts`.
- `resolveSchema()` extended with 4 exact-prefix matchers (`docs/prompts/`, `docs/prompts/`, `docs/strategies/`, `docs/strategies/`).

---

## v1.0.0 — Launch Release

Welcome to **Awesome Second Brain**! 

This launch release introduces a robust, cohesive architecture powered by Claude that transforms Obsidian into an active, intelligent partner. This version represents the consolidation of our development efforts into a finalized ecosystem.

### Core Features
- **Vault-First Memory System**: All project memories live internally inside the vault (`user/`), and CLAUDE connects to them implicitly, turning Obsidian into an automated knowledge graph.
- **Hook Lifecycle Management**: 5 intelligent hooks (SessionStart, UserPromptSubmit, PostToolUse, PreCompact, Stop) that intercept workflows, classify intents, automatically validate notes for clean formatting, and backup transcripts safely.
- **4 Centralized Bases**: Structured dashboards containing Incidents, People Directory, 1-1 History, and Templates.

### System Capacities

Awesome Second Brain launches with a comprehensive suite of utilities:

#### 11 Skills
1. `create-agent`
2. `create-domain`
3. `create-skill`
4. `daily-rituals`
5. `defuddle`
6. `json-canvas`
7. `obsidian-bases`
8. `obsidian-cli`
9. `obsidian-markdown`
10. `project-management`
11. `qmd`

#### 9 Specialized Agents
1. `contact-importer.md`
2. `context-loader.md`
3. `cross-linker.md`
4. `review-fact-checker.md`
5. `review-prep.md`
6. `slack-archaeologist.md`
7. `vault-librarian.md`
8. `vault-migrator.md`
9. `wins-capture.md`

#### 27 Commands
Included out of the box are **27 tailored commands** mapping across Agent, Capture, Core, Manage, Review, and Rituals directories that execute specific, highly focused macro tasks securely within your file system. These include `/open-day`, `/weekly`, `/humanize`, `/vault-upgrade`, `/dump`, and more.

---
*For a more detailed operational overview see `REFERENCE.md`.*
