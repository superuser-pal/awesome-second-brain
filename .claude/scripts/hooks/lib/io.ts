/**
 * Hook I/O contract — stdin/stdout envelope helpers.
 * All hooks read JSON from stdin, write JSON to stdout (if needed), exit with a code.
 *
 * Exit codes (Claude Code contract):
 *   0  — allow / warn (warn text on stderr)
 *   2  — block (block text on stderr)
 */

export interface HookInput {
  tool_name?: string;
  tool_input?: {
    file_path?: string;
    content?: string;
    new_string?: string;
    command?: string;
  };
  prompt?: string;
}

export function readStdin(): HookInput {
  try {
    const raw = require("fs").readFileSync("/dev/stdin", "utf-8");
    return JSON.parse(raw);
  } catch {
    process.exit(0);
  }
}

export function block(message: string): never {
  process.stderr.write(message + "\n");
  process.exit(2);
}

export function warn(message: string): never {
  process.stderr.write(message + "\n");
  process.exit(0);
}

export function allow(): never {
  process.exit(0);
}

export function emitAdditionalContext(hookEventName: string, text: string): void {
  const output = {
    hookSpecificOutput: {
      hookEventName,
      additionalContext: text,
    },
  };
  process.stdout.write(JSON.stringify(output));
}
