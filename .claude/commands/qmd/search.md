---
description: "Perform a fast keyword search across the vault and return a formatted table of results."
---

# QMD Search

## Parameters
- `query` (required): The exact term, name, or keyword to search for.

## Prerequisites
- QMD CLI tool must be installed. (If QMD is completely unavailable, gracefully fallback to `obsidian search "[query]"` and warn the user, or use ripgrep if Obsidian is closed).

## Steps
1. Run `qmd search "[query]" --json -n 15` to perform a fast BM25 keyword search.
2. Parse the JSON results.
3. Format the results into a markdown table with columns for: 
   - File Name (linked)
   - Snippet/Match
   - Relevance Score (if available)
4. Present the table to the user and ask if they would like to read any of the files in full.

## Validation / Success Criteria
- The user sees a formatted table of search results and can choose to dive deeper.
