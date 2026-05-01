---
description: "Manually refresh the QMD vector embeddings and index."
---

# QMD Reindex

## Parameters
- None

## Prerequisites
- QMD CLI tool must be installed. (If QMD is unavailable, inform the user that semantic search is not configured).

## Steps
1. Run `qmd embed` to generate or update vector embeddings for all markdown files in the vault. This may take a few moments.
2. Run `qmd update` to ensure the BM25 index is fully synchronized.
3. Report success to the user with any output metrics (e.g., number of files indexed).

## Validation / Success Criteria
- The vault is fully embedded and the index is fresh.
