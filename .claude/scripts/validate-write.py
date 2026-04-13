#!/usr/bin/env python3
"""Post-write validation for vault notes."""
import json
import sys
import os
from pathlib import Path

def main():
    try:
        input_data = json.load(sys.stdin)
    except (ValueError, EOFError, OSError):
        sys.exit(0)

    tool_input = input_data.get("tool_input")
    if not isinstance(tool_input, dict):
        sys.exit(0)

    file_path = tool_input.get("file_path", "")
    if not isinstance(file_path, str) or not file_path:
        sys.exit(0)

    # Only validate markdown files in the vault, skip dotfiles and templates
    if not file_path.endswith(".md"):
        sys.exit(0)
    # Normalize path separators for cross-platform matching (Windows uses backslashes)
    normalized = file_path.replace("\\", "/")
    # Skip dotfiles, templates, thinking, and root template files (not vault notes)
    basename = os.path.basename(normalized)
    root_files = {"README.md", "CHANGELOG.md", "CONTRIBUTING.md", "CLAUDE.md"}
    if basename in root_files:
        sys.exit(0)
    # Also skip translated READMEs (README.ja.md, README.zh-CN.md, etc.)
    if basename.startswith("README.") and basename.endswith(".md"):
        sys.exit(0)
    if any(skip in normalized for skip in [".claude/", ".obsidian/", "templates/", "thinking/"]):
        sys.exit(0)

    warnings = []

    try:
        content = Path(file_path).read_text(encoding="utf-8")

        # Check for frontmatter
        if not content.startswith("---"):
            warnings.append("Missing YAML frontmatter")
        else:
            parts = content.split("---", 2)
            if len(parts) >= 3:
                fm = parts[1]
                lines = fm.split("\n")
                keys = {line.split(":")[0].strip() for line in lines if ":" in line}

                # 1. Global requirements (for all vault notes)
                if "tags" not in keys:
                    warnings.append("Missing `tags` in frontmatter")
                if "description" not in keys and not any(p in normalized for p in ["inbox/raw", "plan/"]):
                    warnings.append("Missing `description` (~150 chars required)")

                # 2. Folder-specific requirements (ASSET-CLASSES.md)
                
                # --- Domain Page (02_PAGES) ---
                if "/02_PAGES/" in normalized:
                    required = {"name", "domain", "origin", "type", "status", "created", "last_updated"}
                    missing = required - keys
                    if missing:
                        warnings.append(f"Domain Page missing fields: {', '.join(missing)}")
                    if "date" in keys:
                        warnings.append("Domain Page uses `created` instead of `date`")
                    if "status" in keys and not any(s in fm for s in ["processed", "archived"]):
                        warnings.append("Domain Page status must be `processed` or `archived`")

                # --- Domain Project (01_PROJECTS) ---
                elif "/01_PROJECTS/" in normalized and "PROJECT_" in basename:
                    required = {"name", "domain", "goal", "status", "priority", "created", "last_updated"}
                    missing = required - keys
                    if missing:
                        warnings.append(f"Project missing fields: {', '.join(missing)}")

                # --- Domain INDEX ---
                elif "/INDEX.md" in normalized and "/domains/" in normalized:
                    required = {"name", "description", "status", "last_updated"}
                    missing = required - keys
                    if missing:
                        warnings.append(f"Domain INDEX missing fields: {', '.join(missing)}")

                # --- Inbox Raw ---
                elif "inbox/raw/" in normalized:
                    required = {"date", "created", "status"}
                    missing = required - keys
                    if missing:
                        warnings.append(f"Inbox Raw missing fields: {', '.join(missing)}")
                    if "status" in keys and "unprocessed" not in fm:
                        warnings.append("Inbox Raw status must be `unprocessed`")

                # --- Inbox Ready ---
                elif "inbox/ready/" in normalized:
                    required = {"name", "domain", "origin", "type", "status", "description", "created", "last_updated"}
                    missing = required - keys
                    if missing:
                        warnings.append(f"Inbox Ready missing fields: {', '.join(missing)}")
                    if "status" in keys and "ready" not in fm:
                        warnings.append("Inbox Ready status must be `ready`")

                # --- Plan: Daily ---
                elif "plan/" in normalized and any(d in basename for d in ["-MO", "-TU", "-WE", "-TH", "-FR", "-SA", "-SU"]):
                    if "date" not in keys:
                        warnings.append("Daily note missing `date`")
                    if "daily" not in fm:
                        warnings.append("Daily note missing `daily` tag")

                # --- Plan: Weekly ---
                elif "plan/" in normalized and basename.startswith("W"):
                    required = {"week", "date", "goal"}
                    missing = required - keys
                    if missing:
                        warnings.append(f"Weekly plan missing fields: {', '.join(missing)}")
                    if "weekly" not in fm:
                        warnings.append("Weekly plan missing `weekly` tag")

                # --- Work Notes (Cross-domain) ---
                elif "work/" in normalized and not any(s in normalized for s in ["01_PROJECTS", "07_ARCHIVE"]):
                    # Generic work notes (1-1s, incidents, etc.)
                    if "/03_INCIDENTS/" in normalized:
                        if "severity" not in keys or "status" not in keys:
                            warnings.append("Incident note missing `severity` or `status`")
                    elif "/02_1-1/" in normalized:
                        if "person" not in keys or "date" not in keys:
                            warnings.append("1:1 note missing `person` or `date`")
                    else:
                        if "quarter" not in keys:
                            warnings.append("Work note missing `quarter` field (e.g. Q1-2026)")

        # Check for wikilinks (skip very short notes and plans)
        if len(content) > 300 and "[[" not in content and "plan/" not in normalized:
            warnings.append("No [[wikilinks]] found — every note must link to at least one other note")

    except Exception:
        sys.exit(0)

    if warnings:
        hint_list = "\n".join(f"  - {w}" for w in warnings)
        output = {
            "hookSpecificOutput": {
                "hookEventName": "PostToolUse",
                "additionalContext": f"Vault hygiene warnings for `{basename}`:\n{hint_list}\nFix these before moving on."
            }
        }
        json.dump(output, sys.stdout)
        sys.stdout.flush()

    sys.exit(0)

if __name__ == "__main__":
    try:
        main()
    except Exception:
        sys.exit(0)
