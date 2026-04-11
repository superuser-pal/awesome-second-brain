# Automation Hooks and Scripts Summary

This document provides a detailed overview of the automation logic and safety guards within the PAL Second Brain system, located in `.claude/scripts/`.

## 1. `session-start.sh` (The Onboarding Hook)
**Purpose:** Runs at the start of every Claude session to establish the current workspace state.
*   **Context Injection:** Builds a "Session Context" including date, "North Star" goals, recent git history, and open tasks.
*   **Vault Indexing:** Updates the `qmd` index and generates a full markdown file listing for the AI's reference.
*   **Environment Stability:** Ensures `VAULT_PATH` and other session variables are correctly set.

## 2. `pre-tool-use.py` (The Security Guardrail)
**Purpose:** Intercepts every tool call (Bash, Write, Edit) before execution to prevent accidents or security breaches.
*   **Credential Protection:** Blocks detection of API keys, passwords, and private SSH/GNP keys.
*   **Path Protection:** Prevents modifications to system-level directories and configuration files.
*   **Destructive Safety:** Identifies and blocks high-risk terminal commands (e.g., `rm -rf /`).
*   **PII Monitoring:** Warns when sensitive personal info (emails, phones) is detected in standard notes.

## 3. `classify-message.py` (The Intent Detector)
**Purpose:** A pre-prompt hook that scans user input to provide Claude with "routing hints."
*   **Category Identification:** Detects keywords for Decisions, Incidents, 1:1 Meetings, Wins, Architecture, and Project Updates.
*   **Routing Logic:** If a signal is found, it injects context for Claude to suggest relevant folders and templates (e.g., pointing a "Win" towards `perf/Brag Doc.md`).

## 4. `validate-write.py` (The Vault Hygiene Hook)
**Purpose:** Runs after a file is saved to ensure it follows the "System of Quality."
*   **Metadata Checks:** Ensures all notes have a correctly formatted YAML block with `tags`, `description`, and `date`.
*   **Graph Health:** Checks for `[[wikilinks]]` in larger notes to prevent orphaned content.
*   **File Filtering:** Intelligently skips system files, configuration settings, and temporary items.

## 5. `pre-compact.sh` (The History Backup)
**Purpose:** Runs before session memory compaction to preserve the raw conversation.
*   **Archiving:** Safely copies the session transcript (`.jsonl`) to `thinking/session-logs/`.
*   **Pruning:** Automatically manages disk space by rotating out logs older than the last 30 sessions.

## 6. `charcount.sh` (The Precision Analytics)
**Purpose:** A specialized tool for counting characters in specific markdown sections.
*   **Header Targeting:** Can extract text between specific `###` headers.
*   **Constraint Validation:** Useful for character-limited documents like Performance Reviews or Project Summaries.

## 7. `find-python.sh` (The Binary Resolver)
**Purpose:** A cross-platform helper script.
*   **Environment Agnostic:** Automatically finds the correct Python executable path across macOS, Linux, and Windows to ensure all Python-based hooks function correctly.
