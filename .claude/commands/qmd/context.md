---
description: "Pull all relevant context and snippets on a specific topic to provide a comprehensive overview."
---

# QMD Context

## Parameters
- `topic` (required): The topic or entity to gather context on.

## Prerequisites
- QMD CLI tool must be installed. (If QMD is completely unavailable, gracefully fallback to `obsidian search "[topic]"` and warn the user, or use ripgrep if Obsidian is closed).

## Steps
1. Run `qmd vsearch "[topic]" --json -n 20` to perform a broad vector search for related concepts across the vault.
2. Aggregate all the returned snippets.
3. Categorize the findings logically (e.g., Decisions, People involved, Projects, Concepts).
4. Provide a summarized "Context Brief" to the user, acting as a dashboard of what the brain knows about the topic. Include file links to all referenced documents.

## Validation / Success Criteria
- A structured context brief is generated and presented to the user with categorized insights and file links.
