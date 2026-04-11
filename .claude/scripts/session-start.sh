#!/bin/bash
set -eo pipefail
cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Persist vault path for the session
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export VAULT_PATH=\"${CLAUDE_PROJECT_DIR:-$(pwd)}\"" >> "$CLAUDE_ENV_FILE"
fi

# Incremental QMD re-index (fast, non-blocking if qmd not installed)
qmd update 2>/dev/null || true

# Helper: run a command with a timeout, fall back to alternative
run_with_timeout() {
  local timeout_sec=$1; shift
  local fallback_cmd=$1; shift
  if command -v gtimeout &>/dev/null; then
    gtimeout "$timeout_sec" "$@" 2>/dev/null || eval "$fallback_cmd"
  elif command -v timeout &>/dev/null; then
    timeout "$timeout_sec" "$@" 2>/dev/null || eval "$fallback_cmd"
  else
    "$@" 2>/dev/null || eval "$fallback_cmd"
  fi
}

# Build context summary
echo "## Session Context"
echo ""
# ### Date
echo "$(date +%Y-%m-%d) ($(date +%A))"
echo ""

echo "### North Star (current goals)"
# Use a more robust check that doesn't trigger pipefail
if [ -f "brain/NORTH_STAR.md" ]; then
    NORTH_STAR_FILE="brain/NORTH_STAR.md"
elif [ -f "brain/North Star.md" ]; then
    NORTH_STAR_FILE="brain/North Star.md"
else
    NORTH_STAR_FILE=""
fi


if [ -n "$NORTH_STAR_FILE" ]; then
  cat "$NORTH_STAR_FILE" | head -30
elif command -v obsidian &>/dev/null; then
  run_with_timeout 5 'echo "(not found)"' obsidian read file="North Star" | head -30
else
  echo "(not found)"
fi
echo ""

echo "### User Context (ABOUTME)"
if [ -f "brain/ABOUTME.md" ]; then
  cat "brain/ABOUTME.md" | head -20
else
  echo "(ABOUTME.md not found — create brain/ABOUTME.md to improve work/domain routing accuracy)"
fi
echo ""

echo "### Recent Changes (last 48h)"
git log --oneline --since="48 hours ago" --no-merges 2>/dev/null | head -15 || echo "(no git history)"
echo ""

echo "### Open Tasks"
if command -v obsidian &>/dev/null; then
  run_with_timeout 5 'echo "(CLI timed out)"' obsidian tasks daily todo | head -10
else
  echo "(Obsidian CLI not available)"
fi
echo ""

echo "### Active Work"
# Supports both 01_PROJECTS and 01-projects
(ls work/01*/PROJECT_*.md work/01*/*.md 2>/dev/null || true) | grep -v "INDEX.md" | sed 's|work/[^/]*/||;s|\.md$||' | head -10 || echo "(none)"
echo ""

echo "### Domains"
if [ -d "domains" ] && ls domains/*/INDEX.md &>/dev/null 2>&1; then
  for idx in domains/*/INDEX.md; do
    domain_dir=$(dirname "$idx")
    domain_name=$(basename "$domain_dir")
    # Robust counting for either case/naming style
    project_count=$(find "$domain_dir" -maxdepth 2 -name "PROJECT_*.md" | wc -l | tr -d ' ')
    page_count=$(find "$domain_dir" -maxdepth 2 -name "*.md" ! -name "PROJECT_*.md" ! -name "INDEX.md" | wc -l | tr -d ' ')
    echo "- $domain_name (${project_count} projects, ${page_count} pages)"
  done
else
  echo "(no domains created yet)"
fi
echo ""

echo "### Inbox"
# Support lowercase/kebab if migrated
raw_count=$( (ls inbox/raw/*.md 2>/dev/null || true) | wc -l | tr -d ' ')
ready_count=$( (ls inbox/ready/*.md 2>/dev/null || true) | wc -l | tr -d ' ')
if [ "$raw_count" -gt 0 ] || [ "$ready_count" -gt 0 ]; then
  echo "- Raw (unprocessed): $raw_count"
  echo "- Ready (awaiting distribution): $ready_count"
else
  echo "(inbox empty)"
fi
echo ""

echo "### Recently Modified (Last 10 Days)"
find . -type f -name "*.md" -not -path "./.git/*" -not -path "./.obsidian/*" -not -path "./thinking/*" -not -path "./.claude/*" -mtime -10 | sort

