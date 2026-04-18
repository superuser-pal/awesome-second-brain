# Awesome Second Brain

Awesome Second Brain vault — Obsidian-based personal knowledge system for work notes, decisions, performance tracking, and Claude context.

## Rules

- Never modify `.obsidian/` config files unless explicitly asked.
- Preserve existing frontmatter when editing notes.
- Git sync is handled by the user's preferred method (obsidian-git, manual commits, etc.) -- don't configure git hooks or auto-commit.
- When asked to "remember" something, write to the relevant `brain/` topic note with a link to context. Never create memory files in `~/.claude/` -- they are not version-controlled.
- Prefer Obsidian CLI over filesystem when Obsidian is running.
- **Always invoke Obsidian skills via the Skill tool** before doing vault work. Load `obsidian-markdown` when creating/editing `.md` files. Load `obsidian-cli` when running vault commands. Load `obsidian-bases` or `json-canvas` when working with those file types.
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

Defined in `.claude/commands/`. See [[SKILLS]] for full documentation.

## Vault Structure

| Folder                        | Purpose                                                                                              | Key Files                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `dashboards/`                 | **Navigation dashboards**                                                                            | `HOME.md` (vault entry point), `TASKS.md` (master task list)                     |
| `inbox/raw/`                  | Unprocessed captures (braindumps, URLs, docs)                                                        | Minimal metadata (date only)                                                      |
| `inbox/ready/`                | Processed notes awaiting distribution                                                                | Full frontmatter, domain classified                                               |
| `domains/`                    | **Organized knowledge areas** — each domain has `01_PROJECTS/`, `02_PAGES/`, `05_ARCHIVE/`          | Created via create-domain skill                                                   |
| `bases/`                      | **All Bases centralized** -- dynamic views for navigation                                            | `Incidents`, `People Directory`, `1-1 History`, `Domains`, `Templates`            |
| `work/`                       | **Cross-domain work** -- incidents, 1-1s, decisions that span domains                               | `INDEX.md`, `01_PROJECTS/`, `02_1-1/`, `03_INCIDENTS/`, `04_PAGES/`, `05_REVIEW/`, `06_ORG/`, `07_ARCHIVE/` |
| `brain/`                      | Claude's operational knowledge                                                                       | `MEMORIES.md`, `KEY_DECISIONS.md`, `PATTERNS.md`, `GOTCHAS.md`, `SKILLS.md`, `NORTH_STAR.md` |
| `thinking/`                   | Temporary **notes** — reasoning scratchpads, ongoing research, agent outputs (`status: thinking`)    | Named `YYYY-MM-DD-topic.md`                                                       |
| `plan/`                       | Daily notes and weekly planning files                                                                | `DD-MM-YY.md` (daily), `W[x]_YYYY-MM-DD.md` (weekly), `archive/` (closed weeks) |

## Domains

Domains are isolated knowledge areas under `domains/`. Each domain has its own projects, pages, and archive. Create new domains with the `create-domain` skill.

### Domain vs work/

- **Domain-scoped**: Projects, knowledge, and notes that belong to one area go in `domains/[name]/`
- **Cross-domain**: Incidents, 1-1s, decisions that span multiple areas stay in `work/`
- When unsure, default to the domain. Move to `work/` only if it genuinely spans domains.

---

## Content Types

The vault distinguishes three kinds of content by lifecycle, not by topic.

| Type              | Where it lives                               | Lifecycle                                                                                                                                         |
| ----------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note**          | `inbox/raw/`, `inbox/ready/`, `thinking/`    | Temporary. Created by capture commands with `status: unprocessed`. Promoted to pages via `/distribute`, or moved to `thinking/` for ongoing work. |
| **Page**          | `domains/[Name]/02_PAGES/`, `work/04_PAGES/` | Permanent. Promoted from notes. Atomic — one concept per page. Asset class is determined by location, not by the `type` field.                    |
| **Planning note** | `plan/`                                      | Separate lifecycle. Created by `/open-day`, closed by `/close-day`. Never promoted.                                                               |

### Promotion Flows (Note → Page)

1. **Simple** — 1 note → 1 new page (default path via `/distribute`)
2. **Split** — 1 note → multiple pages (when the note covers 3+ independently page-worthy topics)
3. **Absorb** — 1 note → merged into an existing page (when a closely related page already exists)
4. **Thinking** — Note moved to `thinking/` (`status: thinking`) for ongoing work — promoted later via `/process` → `/distribute`

### Note Status Lifecycle

| Status        | Set by                   | Meaning                                                          |
| ------------- | ------------------------ | ---------------------------------------------------------------- |
| `unprocessed` | Any capture command      | Newly captured, no frontmatter classification yet                |
| `thinking`    | `/capture` or `/process` | Moved to `thinking/` for ongoing work                            |
| `ready`       | `/process`               | Frontmatter complete, awaiting distribution                      |
| `processed`   | `/distribute`            | Promoted to a page in a domain (source note kept for provenance) |

---

## Inbox & Capture Flow

All user input enters through `inbox/`. Three stages move notes from raw capture to their final domain location.

### Stages

| Stage         | Command       | Location                                                         | What happens                                                                                                                                                                    |
| ------------- | ------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Capture    | `/capture`    | `inbox/raw/` (or `thinking/`)                                    | Raw note saved with `status: unprocessed`. No classification yet.                                                                                                               |
| 2. Process    | `/process`    | `inbox/raw/` → `inbox/ready/` (or `thinking/`)                   | Frontmatter added (domain, type, tags, description). Multi-topic notes flagged. Thinking notes offered `status: thinking`. Also scans `thinking/` and shows promotion reminder. |
| 3. Distribute | `/distribute` | `inbox/ready/` → `domains/[Name]/02_PAGES/` or `work/04_PAGES/` | Note promoted to a **page**. Split offered for multi-topic notes. Absorb offered if duplicate found. Wikilinks added. User confirms.                                            |

`/dump` is a power shortcut that does all 3 stages in one shot for high-confidence routing.

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

### Linking -- This Is Critical

**A note without links is a bug.** When creating a note, the FIRST thing to do after writing content is add wikilinks. Every new note must link to at least one existing note.

**Atomicity rule**: Before writing or appending to any page, ask: "Does this cover multiple distinct concepts that could be separate pages?" If a page has or would have 3+ independent sections that are each useful on their own, split into atomic pages that link to each other.

#### When to Link

- **Work note <-> Decision**: bidirectional links
- **Work note -> Competency**: in `## Related`, link to competencies demonstrated
- **Work note -> Team**: in `## Related`, link to team(s) involved
- **Work note -> Person**: link people involved (especially in 1:1 notes)
- **Person -> Work evidence**: link to their evidence file if one exists
- **WINS -> Work note**: every entry links to evidence
- **Memories -> Source**: every memory links to where it was learned
- **Index -> Everything**: `work/INDEX.md` links to all work notes
- **North Star -> Projects**: active focus areas link to project work notes

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
4. If significant, note in `brain/KEY_DECISIONS.md`

### Wins & Achievements

When significant work is completed, add a new entry to `work/05_REVIEW/WINS.md` (in the relevant quarter section) with links to the work note(s). Categorize under Impact, Technical Growth, Collaboration, or Feedback.

## Frontmatter Schema

Use tags in frontmatter (not inline):

| Property | Values / Format | Used on |
|---|---|---|
| `type` (tag) | `work-note`, `decision`, `perf`, `thinking`, `north-star`, `competency`, `person`, `team`, `brain` | All notes |
| `index` (tag) | `index`, `moc` | Index files |
| `status` | `active`, `completed`, `archived`, `proposed`, `accepted`, `deprecated` | Projects, decisions |
| `team` | e.g. `Backend`, `Platform`, `Mobile` | People + work notes |
| `cycle` | e.g. `h2-2024`, `h1-2025` | Review-related notes |
| `person` | Full name, e.g. `"Jane Smith"` | Evidence notes |
| `quarter` | e.g. `Q1-2026` | Work notes |
| `ticket` | e.g. `TICKET-123` | Incidents |
| `severity` | `high`, `medium`, `low` | Incidents |
| `role` | e.g. `incident-lead` | Incidents |
| `project` | e.g. `project/auth-refactor` | As needed |

## Memory System

When explicitly asked to "remember" something:

1. Find or create the appropriate `brain/` topic note (e.g., `GOTCHAS.md`, `PATTERNS.md`, `KEY_DECISIONS.md`).
2. Add the knowledge there with a wikilink pointing to the original source or context.

## Agent Guidelines

### Graph-First Thinking

- **Folders group by purpose, links group by meaning.** A note lives in ONE folder (its home) but links to MANY notes (its context).
- When creating a note, add wikilinks FIRST. A note without links is a bug.
- Prefer bidirectional links: if A links to B, B should link back to A (unless B is a concept node that receives backlinks passively).
- Before creating a new subfolder, ask: "Can I solve this with a tag, a property, or a link instead?" Folders are for browsing convenience, not for categorization.
- After every substantial session, verify new notes have at least one inbound link.

### Don't Mix Contexts

When capturing data from Slack, DMs, or meetings:

- **Project evidence** (work contributions, decisions, deliverables) -- goes to the relevant `work/` note
- **Review prep** (peer selection, manager strategy, wins framing) -- goes to review-related notes in `work/05_REVIEW/`
- **People dynamics** (feedback, relationships, career) -- goes to the relevant section in `work/06_ORG/PEOPLE.md`
- **Personal conversations** -- only capture if review-relevant; otherwise skip

## Agent System

Two types of agents live in `.claude/agents/`.

### Subagents

Task-specific agents invoked BY commands. Run in isolated context windows with bounded turns.

| Agent                 | Purpose                                                          | Invoked by                  |
| --------------------- | ---------------------------------------------------------------- | --------------------------- |
| `wins-capture`        | Finds uncaptured wins and competency gaps                        | `/week-close`               |
| `context-loader`      | Loads all vault context about a person, project, or concept      | Direct                      |
| `cross-linker`        | Finds missing wikilinks, orphans, broken backlinks               | `/audit`                    |
| `contact-importer`    | Bulk creates/updates person notes from Slack profiles            | `/incident`                 |
| `review-prep`         | Aggregates all performance evidence for a review period          | `/brief`                    |
| `slack-archaeologist` | Full Slack reconstruction -- every message, thread, profile      | `/incident`                 |
| `vault-librarian`     | Deep vault maintenance -- orphans, broken links, stale notes     | `/audit`                    |
| `review-fact-checker` | Verifies every claim in a review draft against vault sources     | `/self`, `/peer`            |
| `vault-migrator`      | Classifies, transforms, and migrates content from a source vault | `/upgrade`                  |

### Domain Agents

Interactive, domain-bound agents invoked by the USER. Activated via `/agent:[name]` commands. Create new with the `create-agent` skill. No domain agents configured yet.
