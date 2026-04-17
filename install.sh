#!/usr/bin/env bash
# =============================================================================
# Awesome Second Brain — Installer (Mac / Linux)
# =============================================================================
# Usage (Scenario A — public GitHub):
#   curl -fsSL https://raw.githubusercontent.com/superuser-pal/awesome-second-brain/main/install.sh | bash
#
# Usage (Scenario B — paid ZIP download):
#   bash install.sh
#
# The script auto-detects whether it's running inside a cloned repo (.git
# directory present) or a downloaded ZIP (.git absent) and adapts accordingly.
# =============================================================================

set -euo pipefail

# ─── Colours ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; DIM='\033[2m'; RESET='\033[0m'

info()    { echo -e "${BLUE}→${RESET}  $*"; }
success() { echo -e "${GREEN}✓${RESET}  $*"; }
warn()    { echo -e "${YELLOW}~${RESET}  $*"; }
error()   { echo -e "${RED}✗${RESET}  $*" >&2; }
header()  { echo -e "\n${BOLD}$*${RESET}\n"; }
die()     { error "$*"; exit 1; }

# ─── Banner ──────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}  🧠 Awesome Second Brain — Installer${RESET}"
echo -e "${DIM}  ─────────────────────────────────────${RESET}"
echo ""

# ─── Detect scenario ─────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
IS_GIT_REPO=false
if [ -d "$SCRIPT_DIR/.git" ]; then
  IS_GIT_REPO=true
  info "Detected: running inside a Git repository (Scenario A — Open Source)"
else
  info "Detected: running from a downloaded ZIP (Scenario B — Digital Product)"
fi

# ─── Check prerequisites ─────────────────────────────────────────────────────
header "Step 1 / 5 — Checking prerequisites"

MISSING_REQUIRED=()

check_cmd() {
  local name="$1" cmd="$2" url="$3" required="${4:-true}"
  if command -v "$cmd" &>/dev/null; then
    local ver
    ver=$(${cmd} --version 2>/dev/null | head -1) || ver="found"
    success "$name   ${DIM}$ver${RESET}"
  else
    if [ "$required" = "true" ]; then
      error "$name   ${RED}NOT FOUND${RESET}"
      echo -e "     ${YELLOW}→${RESET}  Install: $url"
      MISSING_REQUIRED+=("$name")
    else
      warn "$name   ${DIM}not found (optional)${RESET}"
      echo -e "     ${DIM}→  $url${RESET}"
    fi
  fi
}

check_cmd "Claude Code" "claude"   "https://docs.anthropic.com/en/docs/claude-code" true
check_cmd "Bun"         "bun"      "https://bun.sh"                                  true
check_cmd "Git"         "git"      "https://git-scm.com/downloads"                   true
check_cmd "Obsidian CLI" "obsidian" "Enable in Obsidian → Settings → General (v1.12+)" false
check_cmd "QMD"         "qmd"      "https://github.com/tobi/qmd  (optional — semantic search)" false

if [ ${#MISSING_REQUIRED[@]} -gt 0 ]; then
  echo ""
  die "Missing required tools: ${MISSING_REQUIRED[*]}. Install them and re-run this script."
fi

echo ""
success "All required prerequisites found."

# ─── Vault location ──────────────────────────────────────────────────────────
header "Step 2 / 5 — Choose vault location"

DEFAULT_DIR="$HOME/second-brain"

if [ "$IS_GIT_REPO" = "false" ]; then
  # ZIP scenario — files are already here; ask where to move them
  echo "  Where would you like to install your vault?"
  echo -e "  ${DIM}Press Enter to use the default, or type a custom path.${RESET}"
  echo ""
  read -rp "  Vault path [${DEFAULT_DIR}]: " VAULT_PATH
  VAULT_PATH="${VAULT_PATH:-$DEFAULT_DIR}"
  VAULT_PATH="${VAULT_PATH/#\~/$HOME}"  # expand ~

  if [ "$VAULT_PATH" != "$SCRIPT_DIR" ]; then
    info "Moving vault files to: $VAULT_PATH"
    mkdir -p "$(dirname "$VAULT_PATH")"
    cp -r "$SCRIPT_DIR/." "$VAULT_PATH"
    success "Files copied to $VAULT_PATH"
  else
    VAULT_PATH="$SCRIPT_DIR"
    success "Using current directory: $VAULT_PATH"
  fi
else
  # Git clone scenario — clone into chosen location
  echo "  Where would you like to install your vault?"
  echo -e "  ${DIM}Press Enter to use the default, or type a custom path.${RESET}"
  echo ""
  read -rp "  Vault path [${DEFAULT_DIR}]: " VAULT_PATH
  VAULT_PATH="${VAULT_PATH:-$DEFAULT_DIR}"
  VAULT_PATH="${VAULT_PATH/#\~/$HOME}"  # expand ~

  if [ -d "$VAULT_PATH" ]; then
    warn "Directory already exists: $VAULT_PATH"
    read -rp "  Overwrite? (y/N): " confirm
    [ "${confirm,,}" = "y" ] || die "Aborted by user."
    rm -rf "$VAULT_PATH"
  fi

  info "Cloning repository to: $VAULT_PATH"
  git clone --depth=1 https://github.com/superuser-pal/awesome-second-brain.git "$VAULT_PATH"
  success "Repository cloned."
fi

# ─── Install hook dependencies ───────────────────────────────────────────────
header "Step 3 / 5 — Installing hook dependencies (Bun)"

cd "$VAULT_PATH/.claude/scripts"
info "Running bun install in .claude/scripts/"
bun install --silent
success "Hook dependencies installed."
cd "$VAULT_PATH"

# ─── Generate settings.local.json ────────────────────────────────────────────
header "Step 4 / 5 — Generating settings.local.json"

EXAMPLE_FILE="$VAULT_PATH/settings.local.example.json"
OUTPUT_FILE="$VAULT_PATH/settings.local.json"

if [ ! -f "$EXAMPLE_FILE" ]; then
  die "settings.local.example.json not found in $VAULT_PATH. Is the vault complete?"
fi

# Escape path for sed (handle slashes)
ESCAPED_PATH="${VAULT_PATH//\//\\/}"
sed "s|{{VAULT_PATH}}|${VAULT_PATH}|g" "$EXAMPLE_FILE" > "$OUTPUT_FILE"
success "settings.local.json generated with vault path: $VAULT_PATH"

# ─── Register hooks with Claude Code ─────────────────────────────────────────
header "Step 5 / 5 — Registering hooks with Claude Code"

CLAUDE_SETTINGS="$HOME/.claude/settings.json"

if [ ! -f "$CLAUDE_SETTINGS" ]; then
  warn "Claude Code global settings not found at $HOME/.claude/settings.json"
  warn "Claude Code may not be installed yet, or settings haven't been created."
  warn "Once you run 'claude' for the first time, re-run: bash $VAULT_PATH/install.sh"
  info "Skipping hook registration — you can register manually later."
else
  info "Claude Code settings found. Note: hooks are already configured in .claude/settings.json"
  info "The project-level .claude/settings.json will be picked up automatically."
  success "No changes needed to global Claude settings."
fi

# ─── Done ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}  ✓ Installation complete!${RESET}"
echo ""
echo -e "  ${BOLD}Your vault is at:${RESET} $VAULT_PATH"
echo ""
echo -e "  ${BOLD}Next steps:${RESET}"
echo -e "  1. ${BLUE}Open Obsidian${RESET} and open ${BOLD}$VAULT_PATH${RESET} as a vault"
echo -e "     ${DIM}(In Obsidian: File → Open Vault → Open Folder as Vault)${RESET}"
echo ""
echo -e "  2. ${BLUE}Start Claude Code${RESET} in your vault directory:"
echo -e "     ${BOLD}cd \"$VAULT_PATH\" && claude${RESET}"
echo ""
echo -e "  3. ${BLUE}Run the setup wizard${RESET} inside Claude:"
echo -e "     ${BOLD}/setup-context${RESET}"
echo -e "     ${DIM}(Choose Level 1 for a health check, Level 2 for full first-time setup)${RESET}"
echo ""
echo -e "  ${DIM}Need help? See SETUP.md in your vault for step-by-step guidance.${RESET}"
echo ""
