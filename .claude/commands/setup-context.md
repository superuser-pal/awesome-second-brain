---
description: First-run setup wizard for Awesome Second Brain. Run once after installing, or re-run any time to check system health.
---

# /setup-context

Guided onboarding wizard for Awesome Second Brain. Choose a level:

```
Level 1 — Health Check    (Is everything wired up?)
Level 2 — First-Use Setup (Get the vault ready for work)
Level 3 — Power Setup     (Explore the full system)
```

Ask the user which level they want before starting. Default to Level 2 for brand-new installs.

---

## Level 1 — Health Check

Safe to re-run at any time. Verifies the install is correct without making changes.

### 1.1 Vault Structure Check

Confirm all required top-level vault folders exist:

- `brain/`
- `dashboards/`
- `inbox/` (with `raw/` and `ready/` subdirectories)
- `domains/`
- `plan/`
- `work/`
- `thinking/`

For each folder, print ✅ if it exists or ❌ with a fix instruction if it's missing.

### 1.2 Hook Dependency Check

Confirm Bun hook dependencies are installed:

- Check that `.claude/scripts/node_modules/` exists
- If missing: tell the user to run `npm run setup` from the vault root (or `cd .claude/scripts && bun install`)

### 1.3 Hook Registration Check

Confirm the hook scripts are active by looking for evidence of the session-start hook having fired in the current session context. Also check:

- `settings.local.json` exists at vault root
- It contains references to `session-start.sh`, `classify-message.ts`, `validate-write.ts`, `pre-tool-use.ts`

If `settings.local.json` is missing: tell the user to re-run `install.sh` (Mac/Linux) or `install.ps1` (Windows).

### 1.4 NORTH_STAR Check

Check if `brain/NORTH_STAR.md` exists and is not empty (beyond template comments).

- If empty or only template text: note that Level 2 setup will fill it in.

### 1.5 Health Report

Print a final ✅/❌ summary table. Example:

```
  ✓  Vault structure      all 7 required folders found
  ✓  Hook dependencies    node_modules present
  ✓  Hook registration    settings.local.json configured
  ✗  NORTH_STAR.md        not filled in — run Level 2 to complete setup

  1 issue found. Run /setup-context and choose Level 2 to resolve it.
```

If all checks pass: congratulate the user and show them the 3 most useful commands to start:
`/standup`, `/brain-dump`, `/wrap-up`

---

## Level 2 — First-Use Setup

Runs all Level 1 checks first, then personalises the vault. For brand-new installs only.

### 2.1 North Star Setup

Walk the user through filling `brain/NORTH_STAR.md` with 5 guided questions. Ask one at a time, wait for the answer, then move to the next:

1. **"What are you optimising for this quarter?"**
   — (e.g. "Ship my MVP", "Get a promotion", "Write every day")

2. **"What does winning look like in 6 months from now?"**
   — Encourage them to be specific and ambitious.

3. **"What should you actively deprioritise right now?"**
   — Things that should NOT get your attention, even if tempting.

4. **"How do you like working with AI?"**
   — (e.g. "Be concise", "Always ask before creating files", "I prefer bullet lists")

5. **"What areas of your life or work are you currently focused on?"**
   — These will become your first vault domains (e.g. "Work", "Personal", "Side Project X")

After collecting all 5 answers, write them into `brain/NORTH_STAR.md` using the template format. Show the user what was written and ask for confirmation before saving.

### 2.2 First Domain Creation

Based on the answer to question 5 above, suggest 1–2 domains. For each:

- Show the domain name and a one-line description of what it would contain
- Ask: "Should I create this domain?"
- If yes: invoke the `create-domain` skill to scaffold the full domain structure

### 2.3 Scaffold Initial Projects (optional)

Ask: "Do you have any active projects you're working on right now?"

If yes: for each project described, create a `PROJECT_*.md` file in the appropriate domain's `01_PROJECTS/` folder using the project template.

### 2.4 Initialise Dashboards

- Confirm `dashboards/HOME.md` has working `[[wikilinks]]` to the created domains and `TASKS.md`
- Run `/task-sync` to initialise `dashboards/TASKS.md` with any tasks found in the vault

### 2.5 Handoff

Print a clear "you're ready" summary:

```
  ✓ North Star filled in
  ✓ Domain "Work" created
  ✓ Domain "Personal" created
  ✓ TASKS.md initialised

  You're ready. Your 3 most important commands:

  /standup      → Morning kickoff. Loads your goals, tasks, and context.
  /brain-dump   → Capture any thought, idea, or decision. AI routes it.
  /wrap-up      → End of day. Review notes, verify links, commit.

  Tip: Just talk to Claude naturally. The /brain-dump command is implicit —
  if you describe something worth remembering, it gets filed automatically.
```

---

## Level 3 — Power Setup

Runs all Level 2 steps, then helps the user explore advanced features.

### 3.1 Prompt Library

Explain: "ASB ships with 240+ atomic prompts organised in a library. You can promote prompts you find useful into active slash commands."

- Open `bases/Prompts.base` (or show a summary from `docs/prompts/INDEX.md`)
- Show the top 5–10 prompts by category
- Ask: "Are there any you'd like to activate? I'll turn them into `/prompts:<slug>` commands."
- For each chosen prompt: invoke the `prompts` skill to promote it

### 3.2 Reasoning Strategies

Explain: "ASB also has 9 reasoning strategy pages. Chain-of-Thought is already active. You can promote others for specific kinds of thinking."

- Show options from `docs/strategies/INDEX.md`
- For each strategy: one-line description of when it's useful
- Ask: "Would you like to activate any of these?"
- For each chosen strategy: invoke the `strategy` skill to promote it

### 3.3 Domain Agent (optional)

Explain: "A Domain Agent is an AI persona that loads your domain's full context — projects, pages, decisions — and stays in that context for the whole conversation."

- Ask: "Would you like to create a Domain Agent for one of your domains?"
- If yes: invoke the `create-agent` skill

### 3.4 Seed Personal Patterns

Explain: "Two files help the AI learn your habits over time: `brain/PATTERNS.md` (recurring things you do) and `brain/GOTCHAS.md` (things to avoid or remember)."

- Ask: "Is there anything you always want your AI to keep in mind? Any habits, preferences, or gotchas?"
- Write the user's answers to the appropriate `brain/` file with wikilinks

### 3.5 Final Handoff

```
  ✓ Prompts promoted: /prompts:reflect, /prompts:summarise
  ✓ Strategy promoted: /thinking:tree-of-thought
  ✓ Domain Agent created: Work
  ✓ brain/PATTERNS.md seeded

  Level 3 complete. Your vault is fully personalised.
  Run /audit any time to check vault health.
```
