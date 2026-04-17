# =============================================================================
# Awesome Second Brain — Installer (Windows PowerShell)
# =============================================================================
# Usage (Scenario A — public GitHub):
#   irm https://raw.githubusercontent.com/superuser-pal/awesome-second-brain/main/install.ps1 | iex
#
# Usage (Scenario B — paid ZIP download):
#   .\install.ps1
#
# The script auto-detects whether it's running inside a cloned repo (.git
# directory present) or a downloaded ZIP (.git absent) and adapts accordingly.
# =============================================================================
#Requires -Version 5.1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ─── Colour helpers ──────────────────────────────────────────────────────────
function Write-Info    { param($msg) Write-Host "→  $msg" -ForegroundColor Cyan }
function Write-Success { param($msg) Write-Host "✓  $msg" -ForegroundColor Green }
function Write-Warn    { param($msg) Write-Host "~  $msg" -ForegroundColor Yellow }
function Write-Fail    { param($msg) Write-Host "✗  $msg" -ForegroundColor Red }
function Write-Header  { param($msg) Write-Host "`n$msg`n" -ForegroundColor White }

# ─── Banner ──────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  🧠 Awesome Second Brain — Installer (Windows)" -ForegroundColor White
Write-Host "  ────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# ─── Helper: check if a command exists ───────────────────────────────────────
function Test-Command {
    param([string]$Name)
    $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Get-CommandVersion {
    param([string]$Name)
    try { (& $Name --version 2>&1) | Select-Object -First 1 } catch { "found" }
}

# ─── Detect scenario ─────────────────────────────────────────────────────────
$ScriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$IsGitRepo = Test-Path (Join-Path $ScriptDir ".git")

if ($IsGitRepo) {
    Write-Info "Detected: running inside a Git repository (Scenario A — Open Source)"
} else {
    Write-Info "Detected: running from a downloaded ZIP (Scenario B — Digital Product)"
}

# ─── Check prerequisites ─────────────────────────────────────────────────────
Write-Header "Step 1 / 5 — Checking prerequisites"

$MissingRequired = @()

function Check-Prerequisite {
    param([string]$Name, [string]$Command, [string]$Url, [bool]$Required = $true)

    if (Test-Command $Command) {
        $ver = Get-CommandVersion $Command
        Write-Success "$Name   $ver"
    } else {
        if ($Required) {
            Write-Fail "$Name   NOT FOUND"
            Write-Host "     → Install: $Url" -ForegroundColor Yellow
            $script:MissingRequired += $Name
        } else {
            Write-Warn "$Name   not found (optional)"
            Write-Host "     → $Url" -ForegroundColor DarkGray
        }
    }
}

Check-Prerequisite "Claude Code"  "claude"   "https://docs.anthropic.com/en/docs/claude-code" $true
Check-Prerequisite "Bun"          "bun"      "https://bun.sh"                                  $true
Check-Prerequisite "Git"          "git"      "https://git-scm.com/downloads"                   $true
Check-Prerequisite "Obsidian CLI" "obsidian" "Enable in Obsidian → Settings → General (v1.12+)" $false
Check-Prerequisite "QMD"          "qmd"      "https://github.com/tobi/qmd  (optional — semantic search)" $false

if ($MissingRequired.Count -gt 0) {
    Write-Host ""
    Write-Fail "Missing required tools: $($MissingRequired -join ', '). Install them and re-run this script."
    exit 1
}

Write-Host ""
Write-Success "All required prerequisites found."

# ─── Vault location ──────────────────────────────────────────────────────────
Write-Header "Step 2 / 5 — Choose vault location"

$DefaultDir = Join-Path $HOME "second-brain"
Write-Host "  Where would you like to install your vault?"
Write-Host "  Press Enter to use the default, or type a custom path." -ForegroundColor DarkGray
Write-Host ""
$VaultPath = Read-Host "  Vault path [$DefaultDir]"
if ([string]::IsNullOrWhiteSpace($VaultPath)) { $VaultPath = $DefaultDir }

# Expand ~ if user typed it
$VaultPath = $VaultPath -replace "^~", $HOME

if ($IsGitRepo) {
    # Clone scenario
    if (Test-Path $VaultPath) {
        Write-Warn "Directory already exists: $VaultPath"
        $confirm = Read-Host "  Overwrite? (y/N)"
        if ($confirm -notmatch "^[yY]$") {
            Write-Fail "Aborted by user."; exit 1
        }
        Remove-Item $VaultPath -Recurse -Force
    }
    Write-Info "Cloning repository to: $VaultPath"
    git clone --depth=1 https://github.com/superuser-pal/awesome-second-brain.git $VaultPath
    Write-Success "Repository cloned."
} else {
    # ZIP scenario — copy files to chosen location
    if ($VaultPath -ne $ScriptDir) {
        Write-Info "Copying vault files to: $VaultPath"
        New-Item -ItemType Directory -Force -Path $VaultPath | Out-Null
        Copy-Item -Path "$ScriptDir\*" -Destination $VaultPath -Recurse -Force
        Write-Success "Files copied to $VaultPath"
    } else {
        Write-Success "Using current directory: $VaultPath"
    }
}

# ─── Install hook dependencies ───────────────────────────────────────────────
Write-Header "Step 3 / 5 — Installing hook dependencies (Bun)"

Push-Location (Join-Path $VaultPath ".claude\scripts")
Write-Info "Running bun install in .claude\scripts\"
bun install --silent
Pop-Location
Write-Success "Hook dependencies installed."

# ─── Generate settings.local.json ────────────────────────────────────────────
Write-Header "Step 4 / 5 — Generating settings.local.json"

$ExampleFile = Join-Path $VaultPath "settings.local.example.json"
$OutputFile  = Join-Path $VaultPath "settings.local.json"

if (-not (Test-Path $ExampleFile)) {
    Write-Fail "settings.local.example.json not found in $VaultPath. Is the vault complete?"
    exit 1
}

# Replace {{VAULT_PATH}} with actual path, normalising Windows backslashes to forward slashes
# (Claude Code settings.json uses forward slashes on all platforms)
$content = Get-Content $ExampleFile -Raw
$forwardSlashPath = $VaultPath -replace "\\", "/"
$content = $content -replace "\{\{VAULT_PATH\}\}", $forwardSlashPath
Set-Content -Path $OutputFile -Value $content -Encoding UTF8
Write-Success "settings.local.json generated with vault path: $VaultPath"

# ─── Hook registration note ───────────────────────────────────────────────────
Write-Header "Step 5 / 5 — Hook registration"

$ClaudeSettings = Join-Path $HOME ".claude\settings.json"
if (-not (Test-Path $ClaudeSettings)) {
    Write-Warn "Claude Code global settings not found at $ClaudeSettings"
    Write-Warn "Run 'claude' once to initialise it, then re-run this installer."
} else {
    Write-Info "Claude Code settings found. Project-level .claude\settings.json will be picked up automatically."
    Write-Success "No changes needed to global Claude settings."
}

# ─── Done ────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  ✓ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "  Your vault is at: $VaultPath" -ForegroundColor White
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor White
Write-Host "  1. Open Obsidian and open $VaultPath as a vault" -ForegroundColor Cyan
Write-Host "     (In Obsidian: File → Open Vault → Open Folder as Vault)" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  2. Start Claude Code in your vault directory:" -ForegroundColor Cyan
Write-Host "     cd `"$VaultPath`" ; claude" -ForegroundColor White
Write-Host ""
Write-Host "  3. Run the setup wizard inside Claude:" -ForegroundColor Cyan
Write-Host "     /setup-context" -ForegroundColor White
Write-Host "     (Choose Level 1 for a health check, Level 2 for full first-time setup)" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Need help? See SETUP.md in your vault for step-by-step guidance." -ForegroundColor DarkGray
Write-Host ""
