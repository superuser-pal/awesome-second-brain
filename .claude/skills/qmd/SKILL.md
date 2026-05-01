---
name: qmd
description: "Search the vault using QMD semantic search. Use PROACTIVELY before reading files directly — whenever the user asks about past decisions, incidents, people, meetings, architecture, patterns, or any vault content. Always prefer QMD over Grep/Glob for vault queries. Also use after creating/editing notes to check for duplicates and related content."
---

# QMD — Vault Semantic Search

Before reading vault files directly, search with QMD first. It returns relevant snippets without burning context on full file reads.

## Workflow Routing
| Workflow | Trigger | File |
|----------|---------|------|
| ask | When user runs `/ask` or asks a complex question needing direct answers | `../commands/qmd/ask.md` |
| search | When user runs `/search` or asks for a list of results | `../commands/qmd/search.md` |
| context | When user runs `/context` or asks for all context on a topic | `../commands/qmd/context.md` |
| reindex | When user runs `/reindex` or needs to refresh the QMD index manually | `../commands/qmd/reindex.md` |

## Commands

### Search (pick one per query)
- `qmd query "..." --json -n 10` — Best quality. Hybrid BM25 + vector + LLM reranking. Use for complex or conceptual queries.
- `qmd search "..." --json -n 10` — Fast BM25 keyword. Use for exact terms, names, ticket numbers, dates.
- `qmd vsearch "..." --json -n 5` — Semantic only. Use for exploratory queries where you don't know the exact words.

### Retrieve
- `qmd get "path/to/file.md"` — Full document by path.
- `qmd get "#docid"` — Full document by ID (from search results).
- `qmd multi-get "work/06_ORG/PEOPLE.md" --json` — Batch retrieve people context.

### Index Management
- `qmd update` — Re-index after file changes (fast, ~1-2s incremental).
- `qmd embed` — Regenerate vector embeddings (slower, run after bulk changes).

## When to Search
- User mentions a past decision, incident, person, project → `qmd query`
- User asks "what did we decide about X" → `qmd query`
- User mentions a person by name → `qmd search "<name>"`
- Before creating a new note → `qmd vsearch "<topic>"` to check for existing content
- After creating a note → `qmd vsearch "<note title>"` to find notes that should link to it
- Loading context for review prep → `qmd get "work/05_REVIEW/EVIDENCE.md"`
- Loading 1-on-1 context → `qmd search "<person name> 1-1"`

## After Bulk Changes
Run `qmd update && qmd embed` to keep the index fresh. The SessionStart hook does `qmd update` automatically, but `qmd embed` should be run explicitly after sessions that create many notes.
