# create-agent Workflow

Create a new Domain Agent for PAL Second Brain.

## Step 1: Read Authoritative Sources

Before proceeding, read:
- `.claude/core/system/AGENT-BASE.md`
- `.claude/skills/create-agent/agent_template.md`

## Step 2: Gather Requirements

Ask the user:
1. **Domain** — which domain will this agent operate in?
2. **Agent purpose** — what is the primary role?
3. **Custom behaviors** — any domain-specific commands or constraints beyond standard?
4. **Skills** — which skills does this agent need? (always include `obsidian-markdown`; add `qmd`, `project-management`, `daily-rituals` as appropriate)

## Step 3: Validate Domain

Check that `domains/[Name]/INDEX.md` exists.

```bash
ls domains/[Name]/INDEX.md
```

If missing: **STOP**. Invoke the `create-domain` skill first.

## Step 4: Determine Agent Name

All agents are named `domain-purpose` in `kebab-case` so users immediately know which domain they belong to:

| Domain | Purpose | Agent Name |
|--------|---------|-----------|
| LaraLou | Content strategy | `laralou-content` |
| PalFramework | System building | `palframework-system` |
| DemoDomain | Data analysis | `demodomain-analysis` |

The `domain-` prefix is **required** — never omit it.

Check for conflicts:
```bash
ls .claude/agents/ | grep [name]
ls .claude/commands/agent/ 2>/dev/null | grep [name]
```

## Step 5: Create Agent File

Write `.claude/agents/[agent-name].md` from `agent_template.md`.

Fill in all 5 sections:

**§1 Identity & Persona:**
- State the agent's role clearly
- Only add communication style overrides if different from base

**§2 Activation Context:**
- Always include `[AUTO]` for `domains/[Name]/INDEX.md`
- Add `[REF]` for `01_PROJECTS/`, `02_PAGES/`, `03_ARCHIVE/`
- Add any additional `[AUTO]` files critical for this domain (e.g., a key memory file)

**§3 Domain Knowledge:**
- 3-5 key facts about this domain: goals, conventions, constraints
- Keep atomic — one fact per bullet

**§4 Custom Behaviors:**
- Domain-specific execution rules
- Custom menu items (start at 4, since 1-3 are inherited from AGENT-BASE.md)

**§5 Routing Examples:**
- 3-4 examples: in-scope, edge, out-of-scope

## Step 6: Create Activation Command

Write `.claude/commands/agent/[agent-name].md` from `command_template.md`.

Fill in:
- `description` frontmatter
- Agent name and domain references

## Step 7: Register in CLAUDE.md

Add to the **Domain Agents** table in CLAUDE.md:

```markdown
| `[agent-name]` | [Domain] | [One-line purpose] | `/agent:[agent-name]` |
```

## Step 8: Register in SKILLS.md

Add to the Domain Agents section in `brain/SKILLS.md`:

```markdown
| `[agent-name]` | [One-line purpose] | Direct via `/agent:[agent-name]` |
```

## Step 8b: Register in SYSTEM-INDEX.md

Add a new row to the **Domain Agents** table in `.claude/core/reference/SYSTEM-INDEX.md`:

```markdown
| `[agent-name]` | [Domain] | [One-line purpose] | `/agent:[agent-name]` |
```

Update the domain agents total count at the bottom of that table.

## Step 9: Final Checklist

- [ ] Agent file uses `domain-purpose` kebab-case naming (e.g. `demodomain-analysis.md`)
- [ ] YAML has `name`, `description`, `domain`, `tools`, `model`, `skills` — and NO `maxTurns`
- [ ] `domain:` field uses PascalCase matching the directory name
- [ ] All 5 sections present
- [ ] §2 has `[AUTO]` for INDEX.md, `[REF]` for `01_PROJECTS/`, `02_PAGES/`, `03_ARCHIVE/`
- [ ] §4 custom menu items start at 4 (1-3 are inherited)
- [ ] §5 has 3+ routing examples including at least one out-of-scope case
- [ ] AGENT-BASE.md referenced in document header
- [ ] Command file created at `.claude/commands/agent/[agent-name].md`
- [ ] Registered in CLAUDE.md Domain Agents table
- [ ] Registered in SKILLS.md Domain Agents section
