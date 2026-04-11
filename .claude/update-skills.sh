#!/bin/bash
# Update obsidian-skills from upstream (kepano/obsidian-skills)
# Run from vault root: .claude/update-skills.sh

set -e

REPO="kepano/obsidian-skills"
SKILLS_DIR=".claude/skills"
TEMP_DIR=$(mktemp -d)

echo "Fetching latest obsidian-skills from $REPO..."
git clone --depth 1 "https://github.com/$REPO.git" "$TEMP_DIR" 2>/dev/null

for skill in "$TEMP_DIR/skills/"*/; do
  skill_name=$(basename "$skill")
  if [ -d "$SKILLS_DIR/$skill_name" ]; then
    echo "Updating $skill_name..."
    cp -R "$skill"* "$SKILLS_DIR/$skill_name/"
  else
    echo "New skill found: $skill_name — copying..."
    cp -R "$skill" "$SKILLS_DIR/$skill_name"
  fi
done

rm -rf "$TEMP_DIR"
echo "Done. Skills updated to latest."
