# Workflow: Search Prompts

Search the prompt library using QMD semantic search.

## Steps

1. **Get query**: Use the user's stated intent as the search query. If vague ("show me prompts"), ask for a topic or use-case.

2. **Run QMD search** scoped to the prompts folder:
   ```bash
   qmd query "<user intent>" --path docs/prompts
   ```
   If QMD is not available, fall back to:
   ```bash
   grep -rl "<keyword>" docs/prompts/ | grep -v INDEX.md | head -20
   ```

3. **Collect top 5 results**. For each result, read the frontmatter (`type`, `status`, `category`, `description`) — do NOT read the full body.

4. **Format output**:
   ```
   Found 5 prompts matching "<query>":

   1. <slug> [<status>] — <description>
      Category: <category> | Path: docs/prompts/<slug>.md

   2. …
   ```

5. **Offer next step**:
   - If the top result is dormant: "Run the `prompts` skill's promote workflow to activate `<slug>`."
   - If the top result is already active: "`<slug>` is already active — invoke it with `/prompts:<slug>`."

## Notes

- `status: active` results can be used immediately via `/prompts:<slug>`.
- `status: dormant` results need promotion first (see `promote.md`).
- Category rules are in `references/category-rules.md`.
