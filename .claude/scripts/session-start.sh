#!/bin/bash
# set -eo pipefail # Disabled to prevent immediate crash on empty matches (e.g. no active week or blocked tasks)
cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Persist vault path for the session
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export VAULT_PATH=\"${CLAUDE_PROJECT_DIR:-$(pwd)}\"" >> "$CLAUDE_ENV_FILE"
fi

# Incremental QMD re-index (fast, non-blocking if qmd not installed)
qmd update 2>/dev/null || true

# Hot mode: if CACHE.md was written within the last 24 hours, emit the cache
# and exit early (~500 tokens) instead of running the full 3000-token dump.
# Uses Bun (cross-platform: macOS, Linux, Windows) instead of stat -f %m (macOS-only).
CACHE_FILE="brain/CACHE.md"
if [ -f "$CACHE_FILE" ] && command -v bun &>/dev/null; then
  CACHE_AGE_MS=$(bun -e "process.stdout.write(String(Date.now() - require('fs').statSync('$CACHE_FILE').mtimeMs))" 2>/dev/null || echo "99999999")
  if [ "$CACHE_AGE_MS" -lt 86400000 ] 2>/dev/null; then
    echo "## Session Context (hot mode — cache < 24h old)"
    echo ""
    cat "$CACHE_FILE"
    echo ""
    echo "### Inbox snapshot"
    RAW_COUNT=$(find inbox/raw -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
    READY_COUNT=$(find inbox/ready -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
    echo "- inbox/raw: ${RAW_COUNT} notes"
    echo "- inbox/ready: ${READY_COUNT} notes awaiting distribute"
    BLOCKED=$(grep -rl "status: blocked" . --include="*.md" 2>/dev/null | grep -v "^./\." | wc -l | tr -d ' ')
    [ "$BLOCKED" -gt 0 ] && echo "- blocked tasks: ${BLOCKED}"
    echo ""
    echo "> Full context available — ask for full mode if needed."
    exit 0
  fi
fi

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
  cat "$NORTH_STAR_FILE" | head -60
elif command -v obsidian &>/dev/null; then
  run_with_timeout 5 'echo "(not found)"' obsidian read file="North Star" | head -30
else
  echo "(not found)"
fi
echo ""

# Load USER into context quietly (no section header)
# Only show content if user has filled in real data under "# About Me"
if [ -f "brain/USER.md" ]; then
  real_content=$(awk '/^# About Me/{found=1} found{print}' "brain/USER.md" \
    | grep -v '^\s*<!--' \
    | grep -v '^\s*-->' \
    | grep -v '^\s*#' \
    | grep -v '^\s*---' \
    | grep -v '^\s*$' \
    | grep -Fv 'setup-context' \
    | grep -Fv 'See [[' \
    | grep -Fv 'Run /' \
    | head -3)
  if [ -n "$real_content" ]; then
    echo "---"
    echo "### About Me"
    cat "brain/USER.md" | head -80
  else
    echo "> USER: not configured — run /setup-context to personalize"
  fi
else
  echo "> USER: not configured — run /setup-context to personalize"
fi
echo ""

echo "### Recent Changes (last 48h)"
git log --oneline --since="48 hours ago" --no-merges 2>/dev/null | head -15 || echo "(no git history)"
echo ""

echo "### Projects Open Tasks"
if command -v obsidian &>/dev/null; then
  run_with_timeout 5 'echo "(CLI timed out)"' obsidian tasks daily todo | head -10
else
  # Filesystem fallback: grep only PROJECT_*.md files for open checkboxes
  project_tasks=$(grep -rh '^\- \[ \]' work/01_PROJECTS/PROJECT_*.md domains/*/01_PROJECTS/PROJECT_*.md 2>/dev/null | grep -v '^$' | sed 's/^- \[ \] //' | head -10)
  if [ -n "$project_tasks" ]; then
    echo "$project_tasks" | sed 's/^/- [ ] /'
  else
    echo "(no open project tasks)"
  fi
fi
echo ""

echo "### Active Week"
# Robust check for weekly files to avoid shell expansion errors
active_week=$(find plan -maxdepth 1 -name "W*.md" 2>/dev/null | head -1 || echo "")
if [ -n "$active_week" ]; then
  week_label=$(basename "$active_week" .md)
  week_goal=$(grep -m1 "^## Goal" -A1 "$active_week" 2>/dev/null | tail -1 | sed 's/^> //' || echo "(no goal set)")
  committed=$(grep -c '^\- \[/\]' "$active_week" 2>/dev/null || echo "0")
  done_count=$(grep -c '^\- \[x\]' "$active_week" 2>/dev/null || echo "0")
  echo "- Week: $week_label"
  echo "- Goal: $week_goal"
  echo "- Tasks: ${done_count} done / ${committed} committed"
else
  echo "(no active week — run /week-prep to start one)"
fi
echo ""

echo "### Active Projects"
{
  ls work/01_PROJECTS/PROJECT_*.md 2>/dev/null || true
  ls domains/*/01_PROJECTS/PROJECT_*.md 2>/dev/null || true
} | sed 's|^\./||' | while IFS= read -r f; do
  [ -z "$f" ] && continue
  if echo "$f" | grep -q '^domains/'; then
    domain=$(echo "$f" | cut -d'/' -f2)
  else
    domain="work"
  fi
  name=$(basename "$f" .md | sed 's/^PROJECT_//' | tr '_' ' ')
  echo "- [$domain] $name"
done | head -15
# If nothing printed, show "(none)"
{ ls work/01_PROJECTS/PROJECT_*.md domains/*/01_PROJECTS/PROJECT_*.md 2>/dev/null | head -1 | grep -q .; } || echo "(none)"
echo ""

echo "### Ad-hoc Tasks"
adhoc_files=""
[ -f "work/01_PROJECTS/AD_HOC_TASKS.md" ] && adhoc_files="$adhoc_files work/01_PROJECTS/AD_HOC_TASKS.md"
for f in domains/*/01_PROJECTS/AD_HOC_TASKS.md; do
  [ -f "$f" ] && adhoc_files="$adhoc_files $f"
done
if [ -n "$adhoc_files" ]; then
  # shellcheck disable=SC2086
  adhoc_tasks=$(grep '^\- \[ \]' $adhoc_files 2>/dev/null | sed 's|.*:- \[ \] ||;s|^- \[ \] ||' | head -10)
  if [ -n "$adhoc_tasks" ]; then
    echo "$adhoc_tasks" | sed 's/^/- /'
  else
    echo "(no open ad-hoc tasks)"
  fi
else
  echo "(no AD_HOC_TASKS.md files found)"
fi
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

echo "### Thinking Notes"
thinking_count=$( (ls thinking/*.md 2>/dev/null || true) | grep -v README | wc -l | tr -d ' ')
if [ "$thinking_count" -gt 0 ]; then
  echo "- $thinking_count note(s) in thinking/"
  ls thinking/*.md 2>/dev/null | grep -v README | sed 's|thinking/||;s|\.md$||' | head -5 | sed 's/^/  - /'
else
  echo "(no thinking notes)"
fi
echo ""

blocked_count=$(grep -rl '^\- \[!\]' work/ domains/ 2>/dev/null | wc -l || echo "0")
blocked_count=$(echo $blocked_count | tr -d ' ')
if [ "$blocked_count" -gt 0 ]; then
  echo "### Blocked Tasks"
  echo "- $blocked_count file(s) contain blocked tasks — check TASKS.md"
  echo ""
fi

echo "### Recently Modified (Last 10 Days)"
find . -type f -name "*.md" -not -path "./.git/*" -not -path "./.obsidian/*" -not -path "./thinking/*" -not -path "./.claude/*" -mtime -10 | sort

