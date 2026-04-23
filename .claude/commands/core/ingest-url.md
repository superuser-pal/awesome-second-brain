---
description: "Ingest a URL into the vault. Chains defuddle (extract) → /process (classify) → /distribute (route to domain + sub-folder). Single command for URL capture."
---

# Ingest URL

Extract a web page as clean markdown and route it directly to the vault in one step.

## Usage

```
/ingest-url <url>
```

## Workflow

### 1. Preflight Check

Verify `defuddle` CLI is installed:

```bash
defuddle --version
```

If not installed, **fail gracefully**:

```
⚠️  defuddle CLI not found.

Install it with:
  npm install -g defuddle-cli

Then re-run: /ingest-url <url>
```

Stop here — do not continue without defuddle.

### 2. Extract Content with Defuddle

```bash
defuddle parse <url> --md
```

Capture the markdown output. If defuddle returns an error or empty output:

```
⚠️  defuddle could not extract content from <url>.
Try opening the URL in a browser to confirm it's accessible.
```

Stop here if extraction fails.

### 3. Stage as Raw Note

Save the extracted markdown to `inbox/raw/` using the standard InboxRaw schema:

```markdown
---
date: YYYY-MM-DD
created: YYYY-MM-DD
status: unprocessed
---

# [Page title from defuddle output]

> Source: <url>

[Extracted markdown content]
```

Filename: `[slugified-title]-[YYYY-MM-DD].md`

### 4. Process

Run `/process` on the staged note to:
- Assign `domain` from content analysis
- Assign `type` (expect `source` for most URL ingests, but allow content analysis to override)
- Complete frontmatter (`name`, `description`, `tags`, `origin: url`)
- Move from `inbox/raw/` → `inbox/ready/`

### 5. Distribute

Run `/distribute` on the processed note to:
- Route to `domains/[domain]/02_PAGES/` (or `02_PAGES/sources/` if the `sources/` sub-folder exists)
- Apply steps 3b and 3c from the distribute workflow (type assignment + sub-folder routing)
- Present routing plan and wait for confirmation

### 6. Report

```
✓ Ingested: <url>
  Extracted: [Page title]
  Domain: [domain]
  Type: source
  Destination: domains/[domain]/02_PAGES/[sub-folder/][filename]
```

## Notes

- This command chains three existing operations — no new logic beyond the chain itself.
- `/process` and `/distribute` retain their normal confirmation prompts; this command does not bypass them.
- If the URL content is clearly not a `source` (e.g., a decision log or report), `/process` may assign a different type — that is correct behavior.
- See [[.claude/skills/defuddle/SKILL|defuddle skill]] for defuddle CLI details.
