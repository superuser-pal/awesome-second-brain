#!/usr/bin/env bun
/**
 * UserPromptSubmit hook — classify user messages and inject routing hints.
 *
 * Outputs JSON to stdout with hookSpecificOutput.additionalContext.
 * Always exits 0 (never blocks).
 */

import { readStdin, emitAdditionalContext } from "./lib/io.ts";
import { classifyPrompt } from "./lib/signals.ts";

const input = readStdin();
const prompt = typeof input.prompt === "string" ? input.prompt : "";

if (!prompt) process.exit(0);

const signals = classifyPrompt(prompt);

if (signals.length > 0) {
  const hints = signals.map((s) => `- ${s}`).join("\n");
  const text =
    "Content classification hints (act on these if the user's message contains relevant info):\n" +
    hints +
    "\n\nRemember: use proper templates, add [[wikilinks]], follow CLAUDE.md conventions.";
  emitAdditionalContext("UserPromptSubmit", text);
}

process.exit(0);
