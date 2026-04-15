#!/usr/bin/env bun
/**
 * PreToolUse hook — security validation.
 * Blocks credentials, restricted paths, and dangerous commands.
 * Warns on PII and destructive operations.
 *
 * Exit codes:
 *   0 — allow (or warn, with message on stderr)
 *   2 — block (message on stderr)
 */

import { readStdin, block, warn, allow } from "./lib/io.ts";
import { checkContent, checkPath, checkCommand } from "./lib/security.ts";

const input = readStdin();
const toolName = input.tool_name ?? "";
const toolInput = input.tool_input ?? {};
const content = toolInput.content ?? toolInput.new_string ?? "";
const filePath = toolInput.file_path ?? "";
const command = toolInput.command ?? "";

// 1. Check content for credentials / PII
if (content) {
  const result = checkContent(content, filePath);
  if (result === "block") {
    block("BLOCKED: Potential credential detected. Use environment variables instead.");
  }
  if (result === "warn") {
    warn("WARNING: Potential PII detected. Verify this should be included.");
  }
}

// 2. Check file paths for restricted locations
if (filePath && ["Write", "Edit", "MultiEdit"].includes(toolName)) {
  const result = checkPath(filePath);
  if (result === "block") {
    block(`BLOCKED: Operation on restricted path: ${filePath}`);
  }
}

// 3. Check commands
if (toolName === "Bash" && command) {
  const result = checkCommand(command);
  if (result === "block") {
    block("BLOCKED: Dangerous command pattern detected.");
  }
  if (result === "warn") {
    warn("WARNING: Destructive operation detected. Confirm this is intentional.");
  }
}

allow();
