# Workflow: Search Strategies

Search the strategy library.

## Steps

1. **Get query**: Use the user's stated task or goal as the search query. If vague, ask: "What kind of thinking task are you trying to accomplish?"

2. **Scan the folder**: Read all `.md` files (excluding `INDEX.md`) in `docs/strategies/`. For each, read:
   - `description` and `status` frontmatter fields
   - `## When to apply` section body

3. **Match**: Score each strategy against the user's query based on the "When to apply" criteria.

4. **Format output** (rank by fit, show max 3):
   ```
   Strategies matching "<query>":

   1. <slug> [<status>] — <description>
      When to apply: <one-sentence excerpt>

   2. …
   ```

5. **Offer next step**:
   - If top result is dormant: "To use `<slug>`, promote it first: ask the `strategy` skill to promote `<slug>`."
   - If top result is already active: "`<slug>` is active — invoke it with `/thinking:<slug>`."
   - If no good match: "None of the active strategies are a strong fit. Consider running `/thinking:eval` after promoting candidates."

## Notes

- Unlike `/thinking:eval`, this search looks at **both** dormant and active strategies (filtered by `status` field). It is a discovery tool.
- `/thinking:eval` is for session invocation — it checks only strategies with `status: active`.
