---
name: prompts-index
description: "MOC for the atomic prompt library — 251 atomic prompt pages. Status (dormant/active) and category stored in frontmatter."
tags:
  - index
  - prompt
status: active
last_updated: 2026-04-16
---

# Prompts Index

A searchable library of atomic prompt patterns. Each page has `status: dormant` until explicitly promoted. Promotion flips the status in-place and generates a `/prompts:<slug>` slash command — no file moves required.

> Related: [[bases/Prompts.base|Prompts Base]] · [[brain/SKILLS|Skills]]

## How to use

- **Search**: Ask the `prompts` skill to "find a prompt about X" — runs QMD semantic search across `docs/prompts/`.
- **Browse**: Use `bases/Prompts.base` → "Dormant by Category" view (grouped by `category` property).
- **Promote**: Ask the `prompts` skill to "promote `<slug>`" → flips `status: active` and creates `/prompts:<slug>`.
- **Demote**: Ask the `prompts` skill to "demote `<slug>`" → flips `status: dormant` and deletes the command.

## Categories

| Category | Count | Description |
|---|---|---|
| `writing` | 69 | `write_*`, `create_*`, `draft_*` |
| `utility` | 63 | All other patterns (no verb-prefix match) |
| `extraction` | 44 | `extract_*` |
| `analysis` | 35 | `analyze_*` |
| `synthesis` | 14 | `summarize_*`, `create_summary_*` |
| `discovery` | 10 | `find_*`, `identify_*`, `detect_*` |
| `explanation` | 6 | `explain_*`, `describe_*`, `define_*` |
| `editing` | 4 | `improve_*`, `enhance_*`, `rewrite_*` |
| `evaluation` | 4 | `rate_*`, `score_*`, `evaluate_*` |
| `transformation` | 2 | `translate_*`, `convert_*` |
| `product` | 1 | `agility_*`, `estimate_*` |
| `ai` | 1 | `ai_*` |
| `assessment` | 1 | `create_quiz_*`, `generate_questions_*` |
| `engineering` | 1 | `code_*`, `review_code_*`, `debug_*` |
| **Total** | **255** | |

See [[.claude/skills/prompts/references/category-rules|Category Rules]] for full prefix → category mapping.
