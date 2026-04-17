---
date: 2026-04-16
description: Structure audit and customer journey reference for ASB — Scenario A (open source) and Scenario B (paid ZIP) onboarding flows.
tags:
  - onboarding
  - reference
  - brain
---

# ASB Onboarding — Reference Report

**Date:** 2026-04-16
**Document version:** 2.0
**Product version:** ASB v2.0.0 (see [[CHANGELOG]])
**Purpose:** Structure audit + full customer journey documentation for Scenario A (Open Source) and Scenario B (Paid Digital Product).

> Related: [[README]] · [[SETUP]] · [[CHANGELOG]] · [[CONTRIBUTING]] · [[REFERENCE]] · [[PERSONAL-DATA-SEPARATION]]

---

## Part 1 — Root Structure Audit & Reorganisation

### Current root (post-reorganisation)

```
awesome-second-brain/
│
├── 📄 README.md                    ← "What is this?" — first discovery point
├── 📄 SETUP.md                     ← "How do I install it?" — second discovery point
├── 📄 CLAUDE.md                    ← Claude Code instruction file (cannot move — required at root)
├── 📄 ONBOARDING.md                ← This file
├── 📄 LICENSE
├── 📄 .gitignore
├── 📄 package.json                 ← npm run setup / check / test
├── 📄 vault-manifest.json          ← template metadata for /upgrade
├── 📄 settings.local.example.json  ← committed template ({{VAULT_PATH}} placeholders)
│
├── 🔧 install.sh                   ← Mac/Linux installer
├── 🔧 install.ps1                  ← Windows PowerShell installer
│
├── 📁 docs/                        ← Extended documentation
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md             ← moved from root
│   ├── REFERENCE.md                ← moved from root
│   ├── prompts/                    ← 240+ atomic prompt library
│   └── strategies/                 ← reasoning strategy library
│
├── 📁 .claude/                     ← Claude behaviour layer (hidden from Obsidian)
│   ├── agents/
│   ├── commands/
│   │   └── setup-context.md        ← 3-level onboarding wizard
│   ├── core/
│   ├── scripts/
│   │   ├── check-prerequisites.js  ← moved from scripts/ at root
│   │   ├── session-start.sh
│   │   ├── pre-compact.sh
│   │   └── hooks/
│   │       ├── classify-message.ts
│   │       ├── validate-write.ts
│   │       └── pre-tool-use.ts
│   └── skills/
│
└── 📁 [vault content]
    ├── bases/
    ├── brain/
    ├── dashboards/
    ├── domains/
    ├── inbox/
    ├── plan/
    ├── thinking/
    └── work/
```

### Diagram scope & exclusion rule

The tree above intentionally shows only the **user-facing surface** of the vault — the files and folders a user will read, edit, or navigate from Obsidian. Everything else is hidden by one of two rules:

1. **Obsidian `userIgnoreFilters`** — the following files live at the root on disk but are never rendered in Obsidian's sidebar (configured in `.obsidian/app.json`):

   ```
   settings.local.json
   settings.local.example.json
   install.sh
   install.ps1
   package.json
   vault-manifest.json
   ONBOARDING.md
   ```

2. **Development-only artifacts** — these exist in the repo for maintainers but are either ignored in distribution or invisible to end users:

   - `.obsidian/` — Obsidian's own config directory (vault settings, workspace, plugins). Template ships with a curated version; users customise freely afterwards.
   - `_spec-kit/` — internal spec-kit feature specs. Not shipped to end users.
   - `IMPROVEMENTS.md`, `TESTING_PLAN.md` — contributor scratchpads, `.gitignore`'d.
   - `docs/how-to/`, `docs/assets/`, `docs/skills-archive/`, `docs/PERSONAL-DATA-SEPARATION.md` — supplementary documentation reachable from [[README]] and [[REFERENCE]] but not part of the critical-path onboarding surface.
   - The **generated** `settings.local.json` — written by the installer, `.gitignore`'d, never commited.

If a file isn't in the diagram and isn't covered by one of these rules, it's a gap — report it.

---

## Part 2 — Customer Journey

### Journey map

```
Discovery → Install → Obsidian Open → Claude Start → /setup-context → Daily Use
```

Both scenarios share everything from "Obsidian Open" onwards. They differ only in **how the files arrive**.

---

## Scenario A — Open Source (Public GitHub)

### Who this is

Someone who found ASB on GitHub, Hacker News, Reddit, or through a recommendation. The companion video covers Terminal basics for non-technical users.

---

### Stage 1 — Discovery

**Entry points:**
- GitHub repo page → reads `README.md`
- Blog post / video → lands on GitHub
- Word of mouth → searches for it

**What they see first:**
- `README.md` with the one-liner `curl` command as step 1 of Quick Start
- The Before/After table showing the value proposition
- Stars, license, version badge building trust

**Decision moment:** "This looks useful. Let me try it."

---

### Stage 2 — Install

**Mac / Linux** — paste into Terminal:
```bash
curl -fsSL https://raw.githubusercontent.com/superuser-pal/awesome-second-brain/main/install.sh | bash
```

**Windows** — paste into PowerShell:
```powershell
irm https://raw.githubusercontent.com/superuser-pal/awesome-second-brain/main/install.ps1 | iex
```

**Detection:** `.git` directory found → Scenario A path.

**What the installer prints:**

```
  🧠 Awesome Second Brain — Installer

→  Detected: running inside a Git repository (Scenario A — Open Source)

Step 1 / 5 — Checking prerequisites
  ✓  Claude Code   v1.x
  ✓  Bun           v1.x
  ~  Obsidian CLI  not found (optional)
  ✓  Git           v2.50.1
  ~  QMD           not found (optional)

  ✓ All required prerequisites found.

Step 2 / 5 — Choose vault location
  Vault path [~/second-brain]: _

Step 3 / 5 — Installing hook dependencies (Bun)
  ✓ Hook dependencies installed.

Step 4 / 5 — Generating settings.local.json
  ✓ settings.local.json generated with vault path: ~/second-brain

Step 5 / 5 — Hook registration
  ✓ No changes needed to global Claude settings.

  ✓ Installation complete!

  Next steps:
  1. Open Obsidian → Open Folder as Vault → ~/second-brain
  2. cd ~/second-brain && claude
  3. /setup-context
```

**If a prerequisite is missing:**
```
  ✗  Claude Code   NOT FOUND
     → Install: https://docs.anthropic.com/en/docs/claude-code

  ✗ Missing required tools: Claude Code. Install them and re-run.
```
Script exits cleanly. User installs, re-runs the same `curl` command.

---

### Stage 3 — First Open in Obsidian

1. Open Obsidian
2. **"Open folder as vault"** → navigate to `~/second-brain` → Open
3. Vault structure loads in sidebar (only vault content visible — installers/configs hidden)
4. Enable the **Obsidian CLI** — the `obsidian` shell binary shipped with Obsidian 1.12+. Turn it on in **Settings → General** (one-time). Claude's hooks and skills shell out to this binary for vault-aware commands. Confirm it's on your `PATH` by running `obsidian --version` in a new terminal.

---

### Stage 4 — Start Claude Code

```bash
cd ~/second-brain
claude
```

The `SessionStart` hook fires automatically. `session-start.sh` injects:
- Today's date
- North Star goals
- Active projects summary
- Open tasks
- Domain and inbox status

Claude is contextually aware before the user types a single word.

---

### Stage 5 — `/setup-context` Wizard

User types `/setup-context`. Claude presents three levels:

#### Level 1 — Health Check (safe to re-run anytime)

```
  ✓  Vault structure      all 7 folders found
  ✓  Hook dependencies    node_modules present
  ✓  Hook registration    settings.local.json configured
  ✗  NORTH_STAR.md        not filled — run Level 2 to complete

  1 issue found.
```

#### Level 2 — First-Use Setup

Claude asks 5 guided questions, one at a time:

1. "What are you optimising for this quarter?"
2. "What does winning look like in 6 months?"
3. "What should you deprioritise right now?"
4. "How do you like working with AI?"
5. "What areas are you currently focused on?" → becomes first domains

Claude then:
- Writes answers to `brain/NORTH_STAR.md`
- Creates 1–2 domains via `create-domain` skill
- Scaffolds first projects if described
- Runs `/manage:task-sync` → initialises `dashboards/TASKS.md`
- Prints:

```
  ✓ North Star filled in
  ✓ Domain "Work" created
  ✓ TASKS.md initialised

  You're ready.
  /rituals:open-day    → Morning kickoff
  /capture:brain-dump  → Capture anything
  /rituals:close-day   → End of day
```

#### Level 3 — Power Setup (optional)

- Browse prompt library (`bases/Prompts.base`) → promote chosen prompts to slash commands
- Browse reasoning strategies → promote beyond Chain-of-Thought
- Create first Domain Agent via `create-agent` skill
- Seed `brain/PATTERNS.md` and `brain/GOTCHAS.md` with personal preferences

---

### Stage 6 — Daily Use

> **Canonical commands.** ASB commands are skill-namespaced (e.g. `/rituals:open-day`, `/capture:brain-dump`, `/manage:task-sync`). These are the names surfaced by the skills registry and are authoritative throughout this document. [[README]]'s short marketing aliases (`/standup`, `/wrap-up`, `/brain-dump`, `/task-sync`) map 1:1 onto the namespaced forms and should be treated as nicknames, not separate commands.

**Morning:**
```
/rituals:open-day
→ "2 active projects. Auth refactor blocked on API contract.
   1:1 with Sarah at 2pm — last time she flagged observability."
```

**During the day (capture anything):**
```
/capture:brain-dump "We decided to use Redis for session caching"
→ Extracts [decision], routes to correct domain, adds wikilinks
```

**End of day:**
```
/rituals:close-day
→ Reviews new notes, checks orphans, logs wins, suggests commits
```

**Updates (Scenario A):**
```bash
cd ~/second-brain
git pull
```

---

## Scenario B — Paid Digital Product (Private Repo + ZIP)

### Who this is

A paying customer. They purchased ASB through Gumroad, Lemon Squeezy, or similar. They receive a download link for a ZIP. The GitHub repo is **private** — no public URL.

---

### Stage 1 — Purchase & Download

1. Customer visits the product page
2. Purchases → receives download link by email
3. Downloads `awesome-second-brain-v2.0.0.zip`
4. Unzips to get the `awesome-second-brain` folder

---

### Stage 2 — Install

**Mac / Linux** — open Terminal inside the unzipped folder:

```bash
cd ~/Downloads/awesome-second-brain
bash install.sh
```

**Windows** — Shift+right-click inside the unzipped folder → "Open PowerShell here":

```powershell
.\install.ps1
```

**Detection:** No `.git` directory found → Scenario B path.

**Key difference in Step 2:**

```
→  Detected: running from a downloaded ZIP (Scenario B — Digital Product)

Step 2 / 5 — Choose vault location
  Vault path [~/second-brain]: _
```

Instead of `git clone`, the installer:
- Copies all files from the current directory to the chosen vault path
- No Git operations
- No remote configured

Everything else is identical:
- `bun install` in `.claude/scripts/`
- `settings.local.json` generated from `settings.local.example.json` with `{{VAULT_PATH}}` replaced
- Same completion message and next steps

> **Note on Git in Scenario B:** The vault has no `.git` history. Users can initialise their own with `git init` if they want version control. This is not done automatically — it's their data.

---

### Stages 3–6 — Identical to Scenario A

From "First Open in Obsidian" onwards, the experience is **exactly the same** as Scenario A. The distribution mechanism is invisible after installation.

**Updates (Scenario B):**
- Download the new ZIP version from the product platform
- Run `bash install.sh` or `.\install.ps1` again in the new extracted folder
- Installer copies to the same vault path, regenerates `settings.local.json`

---

## Scenario Comparison

| Step | Scenario A (Open Source) | Scenario B (Paid ZIP) |
|------|--------------------------|----------------------|
| How files arrive | `git clone` from public GitHub | ZIP download, extracted locally |
| Installer trigger | `curl ... \| bash` / `irm ... \| iex` | `bash install.sh` / `.\install.ps1` |
| `.git` detection | Present → clone into chosen path | Absent → copy files to chosen path |
| Git history | Full repo history included | None (user's own `git init` if wanted) |
| Prerequisites check | ✓ Same | ✓ Same |
| `bun install` | ✓ Same | ✓ Same |
| `settings.local.json` | ✓ Same | ✓ Same |
| Hook registration | ✓ Same | ✓ Same |
| Obsidian onboarding | ✓ Same | ✓ Same |
| `/setup-context` wizard | ✓ Same | ✓ Same |
| Daily use | ✓ Same | ✓ Same |
| Getting updates | `git pull` | Download new ZIP version |

---

## Key files by audience

| Audience | Files they interact with |
|----------|--------------------------|
| **New users (first 5 min)** | `README.md`, `SETUP.md`, `install.sh`/`install.ps1` |
| **Claude Code (runtime)** | `CLAUDE.md`, `.claude/` |
| **Obsidian (vault UI)** | `bases/`, `brain/`, `dashboards/`, `domains/`, `inbox/`, `plan/`, `thinking/`, `work/` |
| **Developers/contributors** | `docs/CONTRIBUTING.md`, `docs/REFERENCE.md`, `package.json`, `.claude/scripts/`, `.claude/core/` |
| **Template migrations** | `vault-manifest.json`, `docs/CHANGELOG.md` |
| **Never visible to users** | `settings.local.json`, `settings.local.example.json`, `install.sh`, `install.ps1`, `package.json`, `vault-manifest.json` (hidden via Obsidian `userIgnoreFilters`) |

---

## Next Iteration — Improvements & Gaps

A consolidated review of this document against the actual installer scripts (`install.sh`, `install.ps1`), the `/setup-context` command, `SETUP.md`, `README.md`, `settings.local.example.json`, and the real root directory. Organised by priority.

### P0 — Resolved in this pass ✅

All P0 items from the initial audit are now addressed in this document:

1. ✅ **Version aligned to 2.0.** Header now declares document v2.0 for ASB v2.0.0 with a link to [[CHANGELOG]].
2. ✅ **"Obsidian CLI" disambiguated.** Canonical definition: *the `obsidian` shell binary shipped with Obsidian 1.12+, enabled via Settings → General*. Stage 3 step 4 now spells this out and tells the user to verify with `obsidian --version`. **Follow-up:** [[SETUP]] still says "Local REST API" in Step 2 — reconcile in the next pass.
3. ✅ **Command namespacing declared canonical.** `/rituals:open-day`, `/rituals:close-day`, `/capture:brain-dump`, and `/manage:task-sync` are authoritative. Short aliases in [[README]] are nicknames. A callout at the top of Stage 6 makes this explicit, and every example in Stages 5–6 now uses the namespaced form. **Follow-up:** update [[README]] command palette table to show the namespaced form with the nickname in parentheses.
4. ✅ **Root structure diagram scope documented.** The "Diagram scope & exclusion rule" section now explains the two rules (Obsidian `userIgnoreFilters` + development-only artifacts) and lists every file that was previously unexplained.
5. ✅ **`/setup-context` declared canonical.** Any `/core:onboard` entry in the skills registry is legacy and should be retired. **Follow-up:** remove or alias `/core:onboard` so only one onboarding command is discoverable.

### P1 — Missing content that blocks a real user

6. **No screenshots or visuals.** A text-only journey is harder to follow than one screenshot of "Open Vault" in Obsidian or a `/setup-context` Level 2 transcript. Add 3–5 screenshots at the highest-friction steps.
7. **No time estimates per stage.** SETUP.md promises "about 10 minutes" but Stages 1–6 here have no duration, which matters for commitment/trust.
8. **Verification / "success" criteria undefined.** Stage 5 ends with "You're ready" but there's no checklist the user can self-verify (hooks firing? North Star populated? First domain scaffolded? Tasks synced?). Add a "How to know onboarding worked" block with concrete evidence signals.
9. **Update paths are under-documented.**
   - Scenario A: `git pull` assumes the user hasn't diverged. What happens to local commits, personal data, or modified `settings.local.json`? Reference `docs/PERSONAL-DATA-SEPARATION.md` and the `/upgrade` skill.
   - Scenario B: "Download new ZIP and re-run" will overwrite user content because `cp -r` copies every file. Spell out the safe update procedure.
10. **Multi-device / sync strategy missing entirely.** No mention of Obsidian Sync, iCloud, Dropbox, or git as sync channels — yet the vault is by definition long-lived personal data. Add a one-paragraph stance.
11. **Data-privacy callout missing.** Local-first is one of ASB's headline selling points (per README §Why) but never framed in onboarding. Add a short "Where does your data live" subsection.
12. **Rollback / uninstall not covered.** No guidance for a failed install, a user who wants to move the vault, or full removal.
13. **QMD post-install maintenance missing.** `qmd update && qmd embed` has to be re-run when content changes. Onboarding mentions initial setup only.

### P2 — Scenario correctness and edge cases

14. **Scenario A overwrite is destructive.** `install.sh` prompts `Overwrite? (y/N)` then runs `rm -rf "$VAULT_PATH"`. For a returning user who typed the default path, this can delete weeks of notes. Add a warning and recommend a backup or alternative path.
15. **Scenario B copies hidden files indiscriminately.** `cp -r "$SCRIPT_DIR/." "$VAULT_PATH"` copies `.DS_Store`, possibly `.git`, and the template's `.obsidian/` — including `userIgnoreFilters`. Document what the user inherits and what they should clean up.
16. **"Fork then clone" path isn't covered.** A non-trivial subset of open-source users will fork before cloning. Neither Scenario A (upstream canonical) nor B (ZIP) matches. Acknowledge or redirect.
17. **`bun install --silent` hides failures.** If the install fails (Bun version mismatch, network, disk), the user sees "✓ Hook dependencies installed" falsely. Remove `--silent` or capture exit code + log path.
18. **Windows-specific details under-documented.**
    - `#Requires -Version 5.1` — surface the minimum PowerShell version.
    - Forward-slash normalisation in `settings.local.json` on Windows (`install.ps1` does this silently) — add a troubleshooting note.
    - "PowerShell as Administrator" in SETUP.md isn't strictly required for `-Scope CurrentUser`; either correct or justify.
19. **Hook registration step is a no-op.** Step 5/5 in both installers just prints "No changes needed." Either remove the step or explain what it verifies so the user understands why it exists.

### P3 — Security, trust, and transparency

20. **`curl … | bash` / `irm … | iex` with no checksum.** Experienced users will hesitate. Document the "review before running" path (`curl -o install.sh …; less install.sh; bash install.sh`) and note that the repo is open source.
21. **`settings.local.json` allowlist isn't explained.** It grants `Bash(git push:*)`, `Bash(git commit:*)`, etc. Users should see what they're consenting to and how to narrow it.
22. **No signing / provenance statement.** One sentence on publisher identity, license, and why users can trust the scripts.

### P4 — Wizard (`/setup-context`) gaps

23. **Idempotency undefined.** What happens if a user runs Level 2 twice? Does it overwrite `NORTH_STAR.md`? Skip created domains? Append? Define behaviour explicitly in the wizard spec.
24. **Level 3 handoff to external files is thin.** "Open `bases/Prompts.base`" works only inside Obsidian; a user in Claude's CLI needs a different path. Add both flows.
25. **Level 1 doesn't verify hooks actually fire.** It checks `settings.local.json` content, but not whether the `SessionStart` hook injected context in the current session. Add a runtime probe (e.g. "Has today's date appeared in your session header?").

### P5 — Post-onboarding / growth

26. **No day-1-to-day-30 ladder.** Once Stage 6 ends, the user is on their own. Add a short "First week" checklist: try `/capture:brain-dump`, run `/rituals:week-prep`, create a second domain, promote a prompt, run `/audit` after 7 days.
27. **No reference to `/upgrade` or `docs/CHANGELOG.md`.** The template evolves; onboarding should point the user at the upgrade pathway once.
28. **No reference to `CONNECTIONS.yaml`.** External integrations (Slack, MCP, Gmail) are part of the value proposition — at minimum, signpost them.

### P6 — Document hygiene

29. **Add a table of contents.** 380+ lines with no navigation anchor.
30. **State audience explicitly.** Internal reference report? Customer-facing guide? Both? Frame in the header.
31. **Date / version drift.** Replace static "2026-04-16" with a reference to `docs/CHANGELOG.md` or a generated timestamp so the doc doesn't rot silently.
32. **Inconsistent dash styles.** The doc mixes em-dash (`—`) and en-dash (`–`) in stage headings. Pick one.
33. **Installer output in the doc must match reality.** Step 5 banner text in Scenario A ("Step 5 / 5 — Hook registration") matches, but the Scenario A installer example at L154–155 labels Step 5 as "Hook registration" while the shell script header is identical — verify verbatim on next edit, because divergence here breaks the "follow the script" experience.

### Suggested ordering for the next pass

1. ~~Fix P0 factual errors~~ — done in this pass.
2. Propagate the P0 fixes outward: update [[README]] command palette to namespaced form, reconcile [[SETUP]] Step 2's "Local REST API" wording with the canonical Obsidian CLI definition, retire/alias `/core:onboard`.
3. Add P1 missing content (screenshots, time estimates, success criteria, update paths, data-privacy callout).
4. Harden P2 destructive edge cases (overwrite warnings, failure visibility).
5. Layer in P3–P6 as the doc matures.
