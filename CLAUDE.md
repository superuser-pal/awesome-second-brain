# Awesome Second Brain

Awesome Second Brain vault — Obsidian-based personal knowledge system for work notes, decisions, performance tracking, and Claude context.

## Rules

- Never modify `.obsidian/` config files unless explicitly asked.
- Preserve existing frontmatter when editing notes.
- Git sync is handled by the user's preferred method (obsidian-git, manual commits, etc.) -- don't configure git hooks or auto-commit.
- When asked to "remember" something, write to the relevant `brain/` topic note with a link to context. Never create memory files in `~/.claude/` -- they are not version-controlled.
- Prefer Obsidian CLI over filesystem when Obsidian is running.
- Skills are in `.claude/skills/`. Load a skill's `SKILL.md` on demand when the relevant operation is needed — do not preload all skills.
- Always check for and suggest connections between notes.
- Every note must have a `description` field (~150 chars). Claude fills this automatically.
- **Zero data loss**: when reorganizing, always use `git mv` (or your file manager if not using git). Never delete without explicit user confirmation.
- **North Star**: Read `brain/NORTH_STAR.md` at session start. Reference it when suggesting priorities or trade-offs. Update it when the user signals a shift in goals.

## Skills & Capabilities

This vault has [obsidian-skills](https://github.com/kepano/obsidian-skills) installed in `.claude/skills/`. Follow these skill conventions:

- **obsidian-markdown**: Obsidian-flavored markdown -- wikilinks, embeds, callouts, properties. Always prefer `[[wikilinks]]` over markdown links.
- **obsidian-cli**: CLI commands for vault operations when Obsidian is running.
- **json-canvas**: Create `.canvas` files with nodes, edges, and visual layouts.
- **obsidian-bases**: Create `.base` files with views, filters, and formulas. Bases core plugin is enabled.
- **defuddle**: Extract clean markdown from web pages via `defuddle parse <url> --md`.
- **qmd**: Semantic search across the vault via [QMD](https://github.com/tobi/qmd). Use PROACTIVELY before reading files -- `qmd query "..."` for hybrid search, `qmd search "..."` for keyword, `qmd vsearch "..."` for semantic. Falls back to grep/glob if QMD not installed.
- **project-management**: Create, track, and archive domain-scoped projects. Aggregates tasks from all sources into `dashboards/TASKS.md` with bidirectional sync.
- **daily-rituals**: Structured daily and weekly planning cycle. Enhances `/open-day` and `/close-day` with daily notes in `plan/`. Adds `/week-prep`, `/week-close` (with synthesis), and `/week-cycle`.
- **create-agent**: Create and validate Domain Agents — interactive, domain-bound agents for focused context work.
- **prompts**: Search, promote, and demote atomic prompt pages. Dormant prompts live in `docs/prompts/`; promoted ones get a `/prompts:<slug>` command.
- **strategy**: Search, promote, and demote reasoning strategy pages. Dormant strategies live in `docs/strategies/`; promoted ones get a `/thinking:<slug>` command.

### Prompts & Strategies

The vault includes a dormant prompt library (240+ pages) and reasoning strategy library (9 pages) under `docs/`. Neither bloats `.claude/commands/` by default. **Standing commands**: `/thinking:reset`, `/thinking:eval`, `/thinking:cot` are always available regardless of promotion state.

### Custom Slash Commands

Defined in `.claude/commands/`. See `.claude/core/reference/SYSTEM-INDEX.md` for the full registry.

## Vault Structure

| Folder            | Purpose                                                                                     | Key Subfolders / Files                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `dashboards/`     | Navigation dashboards                                                                       | `HOME.md`, `TASKS.md`                                                                        |
| `inbox/`          | Capture entry point                                                                         | `raw/` (unprocessed), `ready/` (classified, awaiting distribution)                            |
| `domains/`        | Organized knowledge areas — each domain has its own projects, pages, archive                | `[Name]/INDEX.md`, `01_PROJECTS/`, `02_PAGES/`, `05_ARCHIVE/`                                |
| `work/`           | Cross-domain work — incidents, 1-1s, decisions that span domains                            | `INDEX.md`, `01_PROJECTS/`, `02_1-1/`, `03_INCIDENTS/`, `04_PAGES/`, `05_REVIEW/`, `06_ORG/`, `07_ARCHIVE/` |
| `brain/`          | Agent's operational knowledge                                                               | `MEMORIES.md`, `LOGIC.md`, `RULES.md`, `CAVEATS.md`, `SKILLS.md`, `NORTH_STAR.md`, `USER.md`, `CACHE.md` |
| `thinking/`       | Temporary notes — reasoning scratchpads, ongoing research (`status: thinking`)              | `YYYY-MM-DD-topic.md`                                                                        |
| `plan/`           | Daily notes and weekly planning files                                                       | `DD-MM-YY.md` (daily), `W[x]_YYYY-MM-DD.md` (weekly), `archive/`                            |
| `bases/`          | Obsidian Bases — dynamic views for navigation                                               | `Incidents`, `People Directory`, `1-1 History`, `Domains`, `Templates`                        |

Domain-scoped content goes in `domains/[Name]/`. Cross-domain work (incidents, 1-1s, multi-area decisions) stays in `work/`. When unsure, default to domain.

---

## Content Lifecycle

Three content types: **Notes** (temporary, in `inbox/` or `thinking/`), **Pages** (permanent, in `domains/` or `work/`), **Planning notes** (in `plan/`, never promoted). Notes promote to pages via `/distribute` (simple, split, absorb, or thinking). Status flow: `unprocessed` → `thinking` or `ready` → `processed`.

## Inbox & Capture Flow

All input enters through `inbox/`. Three stages: (1) `/capture` → `inbox/raw/` (unprocessed), (2) `/process` → `inbox/ready/` (classified), (3) `/distribute` → `domains/` or `work/` (promoted to page). `/dump` does all 3 in one shot.

---

## Session Workflow

- **Start Session**: The `SessionStart` hook injects your context automatically. For a structured morning kickoff, use `/open-day`.
- **End Session**: When you ask to "wrap up", invoke `/close-day` to review notes, update indexes, check for orphans, and commit changes.
- **Thinking Notes**: Use `thinking/YYYY-MM-DD-topic.md` for reasoning, ongoing research, and scratchpads (`status: thinking`). When ready to make insights permanent, run `/process` to classify them, then `/distribute` to promote to pages. Alternatively, use `/dump` for direct, high-confidence routing.

### Creating Notes

1. **Always use correct YAML frontmatter:** Consult `.claude/core/reference/ASSET-CLASSES.md` for exact schemas. The PostToolUse hook (`validate-write.ts`) will automatically enforce compliance via Zod schemas.
2. **Use templates** from `.claude/core/system/templates/`. Fill `{{placeholders}}` with real values.
3. **Place files correctly**: Adhere strictly to the Vault Structure table defined above.
4. **Naming conventions**: Use descriptive titles for normal notes. For projects, use `PROJECT_UPPER_SNAKE.md`. For ad-hoc tasks not tied to a project, use `AD_HOC_TASKS.md`. For index/review files, use `ALL_CAPS.md` (e.g. `WINS.md`).

### Linking

**A note without links is a bug.** Every new note must link to at least one existing note. Prefer bidirectional links. Before writing, ask: "Does this cover 3+ independent concepts?" — if so, split into atomic pages.

Key linking patterns:
- **Work ↔ Decision**: bidirectional. **Work → Person/Team/Competency**: in `## Related`.
- **WINS → Work note**: every entry links to evidence. **Memories → Source**: every memory links to context.
- **Index → Everything**: `work/INDEX.md` links to all work notes. **North Star → Projects**: active focus areas link to project notes.

### Maintaining Indexes

Update these when creating or archiving notes:

- **`work/INDEX.md`** -- add to Active Projects or Recent Notes, move completed to Archive
- **`brain/MEMORIES.md`** -- index of memory topics. Add new memories to the relevant topic note, not here.
- **`brain/SKILLS.md`** -- register vault-specific workflows and slash commands
- **`work/06_ORG/PEOPLE.md`** -- update when people or org structure changes
- **`work/06_ORG/TEAMS.md`** -- update when teams change
- **`work/05_REVIEW/WINS.md`** -- log wins with links to evidence, add new quarter sections as needed

### Decision Records

1. Create in `work/` using the Decision Record template
2. Link from the work note(s) that led to the decision
3. Add to the Decisions Log table in `work/INDEX.md`
4. If significant, note in `brain/LOGIC.md`

### Wins & Achievements

When significant work is completed, add a new entry to `work/05_REVIEW/WINS.md` (in the relevant quarter section) with links to the work note(s). Categorize under Impact, Technical Growth, Collaboration, or Feedback.

## Frontmatter

Frontmatter schemas are enforced by `validate-write.ts` via Zod. See `.claude/core/reference/ASSET-CLASSES.md` for canonical schemas per asset class.

## Memory System

When explicitly asked to "remember" something, or when a session ends and durable learnings have emerged:

1. Use the routing table to select the destination.
2. Write with a `[[wikilink]]` to the source context.
3. Mark new entries as `[observation]`.

### Brain File Routing Table

Apply this table before any session ends. Every durable learning goes to exactly one file.

| What was learned | Destination |
|---|---|
| A decision was made with rationale | `brain/LOGIC.md` |
| A recurring pattern confirmed | `brain/RULES.md` |
| Something broke or was surprising | `brain/CAVEATS.md` |
| A new skill or workflow discovered | `brain/SKILLS.md` |
| User preferences or context updated | `brain/USER.md` |
| Goals or focus shifted | `brain/NORTH_STAR.md` |
| New contact or person referenced | `brain/CONTACTS.md` |
| An ingested source | `brain/INGEST_LOG.md` |
| Durable but doesn't fit above | New `brain/` topic note + add to `MEMORIES.md` |

### Content Promotion Lifecycle

Brain note entries carry an optional inline maturity marker: `[observation]` (default, single session) → `[confirmed]` (3+ sessions) → `[canonical]` (survived a quarter). Promote during `/close-day` or weekly review.

## Agent Guidelines

- **Graph-first**: Folders group by purpose, links group by meaning. Prefer bidirectional links. Before creating subfolders, ask: "Can I solve this with a tag or link?"
- **Don't mix contexts**: Project evidence → `work/` notes. Review prep → `work/05_REVIEW/`. People dynamics → `work/06_ORG/PEOPLE.md`. Skip non-review-relevant personal conversations.

## Agent System

Two agent types in `.claude/agents/`: **Subagents** (task-bound, have `maxTurns`, invoked by commands) and **Domain Agents** (interactive, no `maxTurns`, invoked by user via `/agent:[name]`). See `.claude/core/reference/SYSTEM-INDEX.md` for the full registry.
