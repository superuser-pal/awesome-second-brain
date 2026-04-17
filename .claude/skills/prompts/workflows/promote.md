# Workflow: Promote Prompt

Flip a prompt's status to `active` in-place and generate a command stub. The file stays in `docs/prompts/` — no move required.

## Preconditions

- `docs/prompts/<slug>.md` must exist with `status: dormant`.
- `.claude/commands/prompts/<slug>.md` must NOT already exist.

## Steps

1. **Resolve the file**: Find `docs/prompts/<slug>.md`. If not found, report: "No prompt named `<slug>` found. Run the search workflow to find the correct slug."

2. **Check current status**: Read the frontmatter. If `status: active` already → report "`<slug>` is already active — invoke it with `/prompts:<slug>`." and stop.

3. **Flip status in-place**: Edit `docs/prompts/<slug>.md` — change `status: dormant` → `status: active`.

4. **Read `category` frontmatter** for use in the command stub.

5. **Generate command stub** at `.claude/commands/prompts/<slug>.md`:
   ```markdown
   ---
   description: Apply the <slug> prompt pattern to the next user message.
   ---

   Load and apply the `<slug>` prompt pattern.

   ## Steps

   1. Read `docs/prompts/<slug>.md` to load the prompt.
   2. Apply the `## Prompt` section as the system-level instruction for the next response.
   3. Acknowledge: "Applying `<slug>` pattern. Send your content and I'll process it using this prompt."

   > Source: [[docs/prompts/<slug>|<slug>]]
   ```

6. **Assert post-conditions**:
   - `docs/prompts/<slug>.md` exists with `status: active`.
   - `.claude/commands/prompts/<slug>.md` exists.

7. **Refresh QMD index**:
   ```bash
   qmd refresh docs/prompts
   ```
   (Skip silently if QMD not available.)

8. **Report**: "`<slug>` is now active. Invoke it with `/prompts:<slug>`."

## Notes

- The file is never moved. Status is the only thing that changes.
- The command stub references the source page — it does not copy the prompt body.
- Category is preserved in frontmatter throughout the lifecycle.
