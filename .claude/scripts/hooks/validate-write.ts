#!/usr/bin/env bun
/**
 * PostToolUse hook — validate vault note frontmatter and wikilinks.
 *
 * Uses gray-matter for real YAML parsing and Zod schemas per asset class.
 * Emits warnings as hookSpecificOutput.additionalContext (never blocks).
 * Always exits 0.
 */

import { readStdin, emitAdditionalContext } from "./lib/io.ts";
import { resolveSchema } from "./lib/schemas.ts";
import matter from "gray-matter";
import { readFileSync } from "fs";
import path from "path";

const input = readStdin();
const toolInput = input.tool_input ?? {};
const filePath = toolInput.file_path ?? "";

// ── Skip rules (mirrors validate-write.py) ────────────────────────────────────

if (!filePath || !filePath.endsWith(".md")) process.exit(0);

const normalized = filePath.replace(/\\/g, "/");
const basename = path.basename(normalized);

const ROOT_FILES = new Set(["README.md", "CHANGELOG.md", "CONTRIBUTING.md", "CLAUDE.md"]);
if (ROOT_FILES.has(basename)) process.exit(0);

// Translated READMEs
if (basename.startsWith("README.") && basename.endsWith(".md")) process.exit(0);

const SKIP_DIRS = [".claude/", ".obsidian/", "templates/", "thinking/"];
if (SKIP_DIRS.some((d) => normalized.includes(d))) process.exit(0);

// ── Read file ─────────────────────────────────────────────────────────────────

let content: string;
try {
  content = readFileSync(filePath, "utf-8");
} catch {
  process.exit(0);
}

const warnings: string[] = [];

// ── Frontmatter check ─────────────────────────────────────────────────────────

if (!content.startsWith("---")) {
  warnings.push("Missing YAML frontmatter");
} else {
  let fm: Record<string, unknown> = {};
  try {
    const parsed = matter(content);
    fm = parsed.data;
  } catch (e) {
    warnings.push(`Invalid YAML frontmatter: ${e}`);
  }

  const keys = new Set(Object.keys(fm));

  // Global requirements
  if (!keys.has("tags") && !normalized.includes("inbox/raw")) {
    warnings.push("Missing `tags` in frontmatter");
  }
  if (
    !keys.has("description") &&
    !normalized.includes("inbox/raw") &&
    !normalized.includes("plan/")
  ) {
    warnings.push("Missing `description` (~150 chars required)");
  }

  // Asset-class-specific schema validation
  const resolved = resolveSchema(filePath);
  if (resolved) {
    const result = resolved.schema.safeParse(fm);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const fieldPath = issue.path.join(".");
        if (issue.code === "invalid_union") {
          // OneOnOneSchema union — surface clearly
          warnings.push(`${resolved.label} missing required field: date or last_updated`);
        } else if (issue.code === "invalid_type" && issue.received === "undefined") {
          warnings.push(`${resolved.label} missing required field: ${fieldPath}`);
        } else {
          warnings.push(`${resolved.label} schema error: ${fieldPath} — ${issue.message}`);
        }
      }
    }
  }

  // Legacy: inbox/raw must have status=unprocessed
  if (normalized.includes("inbox/raw/")) {
    if (keys.has("status") && fm["status"] !== "unprocessed") {
      warnings.push("Inbox Raw status must be `unprocessed`");
    }
  }

  // Legacy: inbox/ready must have status=ready
  if (normalized.includes("inbox/ready/")) {
    if (keys.has("status") && fm["status"] !== "ready") {
      warnings.push("Inbox Ready status must be `ready`");
    }
  }
}

// ── Wikilink check ────────────────────────────────────────────────────────────

const WIKILINK_SKIP = ["plan/", "inbox/raw"];
if (
  content.length > 300 &&
  !content.includes("[[") &&
  !WIKILINK_SKIP.some((s) => normalized.includes(s))
) {
  warnings.push("No [[wikilinks]] found — every note must link to at least one other note");
}

// ── Emit ──────────────────────────────────────────────────────────────────────

if (warnings.length > 0) {
  const hint_list = warnings.map((w) => `  - ${w}`).join("\n");
  emitAdditionalContext(
    "PostToolUse",
    `Vault hygiene warnings for \`${basename}\`:\n${hint_list}\nFix these before moving on.`
  );
}

process.exit(0);
