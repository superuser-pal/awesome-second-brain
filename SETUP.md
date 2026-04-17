# Setting Up Awesome Second Brain

A step-by-step guide for getting ASB running on your computer. Whether you're on a Mac or Windows, you'll be up and running in about 10 minutes.

> **New to Terminal?** Don't worry — we have a companion video that walks through every step. Follow along with the video alongside this guide.

---

## What You'll Need

You need three things. Everything else is optional.

| What | Why | Install |
|------|-----|---------|
| **Obsidian** (v1.12+) | This is where your notes live. It's the "front-end" of your second brain. | [obsidian.md](https://obsidian.md) |
| **Claude Code** | The AI agent that powers your second brain. It runs in your Terminal. | [docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code) |
| **Bun** | A fast JavaScript runtime used by the hook scripts that run in the background. | [bun.sh](https://bun.sh) |

**Optional (for advanced search):**

| What | Why | Install |
|------|-----|---------|
| **QMD** | Adds semantic (meaning-based) search across your vault. Everything works without it. | [github.com/tobi/qmd](https://github.com/tobi/qmd) |

---

## Installation

Choose your scenario:

- [Scenario A — Installing from GitHub (Open Source)](#scenario-a--installing-from-github)
- [Scenario B — Installing from a downloaded ZIP (Paid Product)](#scenario-b--installing-from-a-zip-file)

---

## Scenario A — Installing from GitHub

### Mac / Linux

1. Open **Terminal**
   - Mac: press `⌘ + Space`, type `Terminal`, hit Enter
   - Linux: `Ctrl + Alt + T`

2. Paste this command and press Enter:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/superuser-pal/awesome-second-brain/main/install.sh | bash
   ```

3. The installer will:
   - Check that Claude Code, Bun, and Git are installed
   - Ask you where you want to save your vault (default: `~/second-brain`)
   - Download all the files
   - Configure the hook scripts automatically

4. When it finishes, you'll see a "✓ Installation complete!" message with your next steps.

### Windows

1. Open **PowerShell as Administrator**
   - Press `Win + X`, select "Windows PowerShell (Admin)"

2. If you get a security warning about running scripts, first run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Paste this command and press Enter:
   ```powershell
   irm https://raw.githubusercontent.com/superuser-pal/awesome-second-brain/main/install.ps1 | iex
   ```

4. The installer will guide you through the same steps as Mac.

---

## Scenario B — Installing from a ZIP File

### Mac / Linux

1. **Unzip** the downloaded file. You'll get a folder called `awesome-second-brain`.

2. Open **Terminal** and navigate to that folder:
   ```bash
   cd ~/Downloads/awesome-second-brain
   ```
   *(Replace `~/Downloads` with wherever you unzipped the file)*

3. Run the installer:
   ```bash
   bash install.sh
   ```

4. The installer will ask where you want to move the vault files. Type a path (e.g. `~/second-brain`) or press Enter for the default.

### Windows

1. **Unzip** the downloaded file. Right-click → "Extract All".

2. Open **PowerShell** inside that folder:
   - Hold `Shift`, right-click inside the unzipped folder → "Open PowerShell window here"

3. If needed, enable scripts:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

4. Run the installer:
   ```powershell
   .\install.ps1
   ```

---

## After Installation — First-Time Setup

### Step 1: Open the vault in Obsidian

1. Open **Obsidian**
2. Click **"Open folder as vault"**
3. Navigate to your vault folder (e.g. `~/second-brain` or `C:\Users\You\second-brain`)
4. Click **Open**

You should see the vault structure load in the left sidebar.

### Step 2: Enable the Obsidian CLI

1. In Obsidian, go to **Settings** (gear icon, bottom left)
2. Click **General**
3. Find **"Local REST API"** or **"CLI"** and enable it

> This lets Claude Code interact with Obsidian directly for searching notes and managing files.

### Step 3: Start Claude Code

1. Open **Terminal** (Mac) or **PowerShell** (Windows)
2. Navigate to your vault:
   ```bash
   cd ~/second-brain
   ```
3. Start Claude:
   ```bash
   claude
   ```

### Step 4: Run the setup wizard

Inside Claude, type:
```
/setup-context
```

Choose **Level 2** for a full guided setup. Claude will:
- Check that everything is wired up correctly
- Ask you 5 questions about your goals
- Create your first workspace domain based on your answers
- Set up your task dashboard

---

## Verifying the Setup

After `/setup-context` finishes, try these to confirm everything works:

```
/open-day
```
→ Should load your North Star goals, tasks, and active projects.

```
/brain-dump "I had an idea for X today"
```
→ Should capture the idea and route it to the right place.

---

## Optional: Set Up Semantic Search (QMD)

For smarter search across your vault (finds notes even when you don't remember the exact words):

```bash
npm install -g @tobilu/qmd
qmd collection add . --name vault --mask "**/*.md"
qmd context add qmd://vault "My personal knowledge vault: notes, projects, ideas"
qmd update && qmd embed
```

You only need to run this once. After that, Claude will use QMD automatically.

---

## Troubleshooting

### "claude: command not found"

Claude Code isn't installed or isn't on your PATH. Install it from [docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code) and restart your Terminal.

### "bun: command not found"

Bun isn't installed. Go to [bun.sh](https://bun.sh) and follow the install instructions for your OS, then restart your Terminal.

### Hooks not firing (no session context appearing)

The hook scripts need to be whitelisted. Re-run the installer — it will regenerate `settings.local.json` with the correct paths:

```bash
# Mac/Linux — from your vault directory
bash install.sh

# Windows
.\install.ps1
```

### "Permission denied" on Mac when running install.sh

Make the script executable first:
```bash
chmod +x install.sh
bash install.sh
```

### PowerShell blocks the install.ps1 script (Windows)

Run this first, then try again:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Getting Help

- Run `/setup-context` inside Claude → Level 1 for a health check
- Check `docs/CHANGELOG.md` for what changed in each version
- Open an issue at [github.com/superuser-pal/awesome-second-brain/issues](https://github.com/superuser-pal/awesome-second-brain/issues)
