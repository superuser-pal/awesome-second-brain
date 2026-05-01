---
description: "Semantically search the vault and synthesize a direct answer to a complex question using QMD."
---

# QMD Ask

## Parameters
- `query` (required): The question or topic to ask about.

## Prerequisites
- QMD CLI tool must be installed. (If QMD is completely unavailable, gracefully fallback to `obsidian search "[query]"` and warn the user, or use ripgrep if Obsidian is closed).

## Steps
1. Run `qmd query "[query]" --json -n 10` to perform a semantic + BM25 + LLM reranked search across the vault.
2. Read the returned snippets or retrieve full documents if the snippets indicate high relevance but lack full context.
3. Synthesize a comprehensive answer based ONLY on the retrieved context.
4. **Mandatory**: Cite your sources using exact file links (e.g., `[[Filename]]` or markdown links to the file path) for every major claim in the synthesis.

## Validation / Success Criteria
- The user receives a synthesized answer with citations to vault files.
