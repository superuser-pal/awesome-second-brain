# validate-agent Workflow

Validate an existing Domain Agent against the canonical spec.

## Step 1: Read Authoritative Sources

Read:
- `.claude/core/system/AGENT-BASE.md`
- `.claude/skills/create-agent/agent_template.md`

## Step 2: Identify Agent

Ask which agent to validate, or detect from context.

```bash
ls .claude/agents/
```

## Step 3: Read Agent File

Read `.claude/agents/[agent-name].md` completely.

## Step 4: Validate Frontmatter

| Field | Required | Expected Format | Issues |
|-------|----------|----------------|--------|
| `name` | Yes | `kebab-case` | |
| `description` | Yes | 1-sentence string | |
| `domain` | Yes | `PascalCase` | |
| `tools` | Yes | Comma-separated | |
| `model` | Yes | `sonnet` or `opus` | |
| `skills` | Yes | List (obsidian-markdown minimum) | |
| `maxTurns` | **Must NOT exist** | — | Remove if present — Domain Agents are interactive |

## Step 5: Validate Domain Binding

- `domain:` value matches an existing `domains/[Name]/` directory
- `domains/[Name]/INDEX.md` exists
- `[AUTO]` activation includes `domains/[Name]/INDEX.md`

## Step 6: Validate 5-Section Structure

Check all sections present and properly structured:

| Section | Check |
|---------|-------|
| §1 Identity & Persona | Present, describes role |
| §2 Activation Context | Has `[AUTO]` and `[REF]` labels; INDEX.md is [AUTO]; 01_PROJECTS/, 02_PAGES/, 03_ARCHIVE/ are [REF] |
| §3 Domain Knowledge | Present, atomic bullets |
| §4 Custom Behaviors | Present; custom menu items start at 4; no duplicate of base menu items (*menu, *context, *dismiss) |
| §5 Routing Examples | Present; 3+ examples; includes at least one out-of-scope case |

**Flags for deviation:**
- `maxTurns` in YAML → Remove (makes it a Subagent, not a Domain Agent)
- Custom menu items numbered 1-3 → Remove (inherited from AGENT-BASE.md)
- Missing `[AUTO]`/`[REF]` labels → Add them
- `domain:` in kebab-case or kebab-case → Fix to PascalCase

## Step 7: Validate Command File

Check `.claude/commands/agent/[agent-name].md` exists.

If missing: report it as a gap (agent is not user-accessible without a command).

## Step 8: Validate Registration

- Agent appears in CLAUDE.md Domain Agents table
- Agent appears in Skills.md Domain Agents section
- Agent appears in `.claude/core/reference/SYSTEM-INDEX.md` Domain Agents table

## Step 9: Generate Report

```markdown
## Agent Validation Report: [agent-name]

### Frontmatter
- [ ] name: kebab-case
- [ ] description: present
- [ ] domain: PascalCase
- [ ] tools: present
- [ ] model: present
- [ ] skills: present (obsidian-markdown included)
- [ ] maxTurns: ABSENT ✓

### Domain Binding
- [ ] domains/[Name]/ exists
- [ ] INDEX.md exists
- [ ] [AUTO] includes INDEX.md

### 5-Section Structure
- [ ] §1 Identity & Persona
- [ ] §2 Activation Context with labels
- [ ] §3 Domain Knowledge
- [ ] §4 Custom Behaviors (menu items start at 4)
- [ ] §5 Routing Examples (3+, includes out-of-scope)

### Registration
- [ ] Command file exists at .claude/commands/agent/
- [ ] CLAUDE.md Domain Agents table
- [ ] Skills.md Domain Agents section
- [ ] reference/SYSTEM-INDEX.md Domain Agents table

### Issues Found
[List issues with suggested fixes]

### Result
[PASS | FAIL with issue count]
```
