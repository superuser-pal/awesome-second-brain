# Category Rules — Prompt Library

Verb-prefix → category mapping for routing prompt patterns into `docs/prompts/`.

## Mapping Table

| Verb prefix (slug starts with) | Category folder | Examples |
|---|---|---|
| `analyze_*` | `analysis` | analyze_answers, analyze_paper, analyze_debate |
| `extract_*` | `extraction` | extract_wisdom, extract_ideas, extract_references |
| `summarize_*`, `create_summary_*` | `synthesis` | summarize_debate, create_summary |
| `write_*`, `create_*`, `draft_*` | `writing` | write_essay, create_report, draft_email |
| `improve_*`, `enhance_*`, `rewrite_*` | `editing` | improve_writing, enhance_text, rewrite_paragraphs |
| `rate_*`, `score_*`, `evaluate_*` | `evaluation` | rate_content, score_submission |
| `explain_*`, `describe_*`, `define_*` | `explanation` | explain_code, describe_concepts |
| `translate_*`, `convert_*` | `transformation` | translate_document, convert_format |
| `find_*`, `identify_*`, `detect_*` | `discovery` | find_logical_fallacies, identify_assumptions |
| `create_quiz_*`, `generate_questions_*` | `assessment` | create_quiz, generate_interview_questions |
| `debate_*`, `argue_*`, `critique_*` | `argumentation` | debate_topic, critique_argument |
| `code_*`, `review_code_*`, `debug_*` | `engineering` | code_review, debug_program |
| `security_*`, `pentest_*` | `security` | security_review, pentest_findings |
| `agility_*`, `estimate_*` | `product` | agility_story, estimate_effort |
| `ai_*` | `ai` | ai_check, ai_conversations |
| *(no prefix match)* | `utility` | catchall for slugs that don't match above rules |

## Usage

- These rules are applied during **one-time content placement** (Phase 6, Task 13) to route each of the 240+ pattern slugs to the correct category subfolder.
- If a slug matches multiple prefixes, use the most specific (longest) match.
- All unroutable slugs land in `utility/`. Review the `utility/` folder after import and re-file any that clearly belong elsewhere.

## Adding new categories

To add a category: update this table, create the corresponding subfolder under `docs/prompts/`, and add an entry in `docs/prompts/INDEX.md`.
