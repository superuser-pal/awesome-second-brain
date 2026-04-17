#!/usr/bin/env node
/**
 * check-prerequisites.js
 * Zero-dependency prerequisite checker for Awesome Second Brain.
 * Used by install.sh, install.ps1, and /setup-context Level 1.
 *
 * Usage: node scripts/check-prerequisites.js
 * Exit code 0 = all required deps found. Exit code 1 = missing required deps.
 */

const { execSync } = require("child_process");

// ─── Colour helpers (no deps) ────────────────────────────────────────────────
const GREEN  = (s) => `\x1b[32m${s}\x1b[0m`;
const RED    = (s) => `\x1b[31m${s}\x1b[0m`;
const YELLOW = (s) => `\x1b[33m${s}\x1b[0m`;
const BOLD   = (s) => `\x1b[1m${s}\x1b[0m`;
const DIM    = (s) => `\x1b[2m${s}\x1b[0m`;

const PASS = GREEN("✓");
const FAIL = RED("✗");
const WARN = YELLOW("~");

// ─── Helper: run a command and return trimmed stdout, or null on failure ──────
function try_exec(cmd) {
  try {
    return execSync(cmd, { stdio: ["pipe", "pipe", "pipe"] }).toString().trim();
  } catch {
    return null;
  }
}

// ─── Check definitions ────────────────────────────────────────────────────────
const checks = [
  {
    name: "Claude Code",
    required: true,
    installUrl: "https://docs.anthropic.com/en/docs/claude-code",
    check() {
      const v = try_exec("claude --version");
      if (!v) return { ok: false };
      return { ok: true, version: v.split("\n")[0] };
    },
  },
  {
    name: "Bun",
    required: true,
    installUrl: "https://bun.sh",
    check() {
      const v = try_exec("bun --version");
      if (!v) return { ok: false };
      return { ok: true, version: `v${v}` };
    },
  },
  {
    name: "Obsidian CLI",
    required: false,
    note: "Required for vault-aware commands. Enable in Obsidian → Settings → General (Obsidian 1.12+).",
    check() {
      const v = try_exec("obsidian --version");
      if (!v) return { ok: false };
      // Check minimum version 1.12
      const match = v.match(/(\d+)\.(\d+)/);
      if (match) {
        const [, major, minor] = match.map(Number);
        if (major < 1 || (major === 1 && minor < 12)) {
          return { ok: false, version: v, tooOld: true };
        }
      }
      return { ok: true, version: v };
    },
  },
  {
    name: "Git",
    required: true,
    installUrl: "https://git-scm.com/downloads",
    check() {
      const v = try_exec("git --version");
      if (!v) return { ok: false };
      return { ok: true, version: v };
    },
  },
  {
    name: "QMD (semantic search)",
    required: false,
    installUrl: "https://github.com/tobi/qmd",
    note: "Optional — enables semantic search across your vault. Everything works without it.",
    check() {
      const v = try_exec("qmd --version") || try_exec("command -v qmd");
      if (!v) return { ok: false };
      return { ok: true, version: v };
    },
  },
];

// ─── Run checks ───────────────────────────────────────────────────────────────
console.log("");
console.log(BOLD("  🧠 Awesome Second Brain — Prerequisite Check"));
console.log(DIM("  ─────────────────────────────────────────────"));
console.log("");

let allRequiredOk = true;
const rows = [];

for (const c of checks) {
  const result = c.check();
  const icon   = result.ok ? PASS : (c.required ? FAIL : WARN);
  const label  = c.required ? c.name : DIM(`${c.name} (optional)`);
  const status = result.ok
    ? DIM(result.version || "found")
    : c.required
    ? RED("NOT FOUND")
    : YELLOW("not found");

  rows.push({ icon, label, status, result, check: c });

  if (!result.ok && c.required) allRequiredOk = false;
}

// Print table
const maxLabel = Math.max(...rows.map((r) => r.label.replace(/\x1b\[[0-9;]*m/g, "").length));
for (const r of rows) {
  const rawLen = r.label.replace(/\x1b\[[0-9;]*m/g, "").length;
  const pad    = " ".repeat(maxLabel - rawLen + 2);
  console.log(`  ${r.icon}  ${r.label}${pad}${r.status}`);

  // Print fix hint for failed optional/required
  if (!r.result.ok) {
    if (r.result.tooOld) {
      console.log(`     ${YELLOW("→")} Update to Obsidian 1.12+: https://obsidian.md`);
    } else if (r.check.installUrl) {
      console.log(`     ${YELLOW("→")} Install: ${r.check.installUrl}`);
    }
    if (r.check.note) {
      console.log(`     ${DIM(r.check.note)}`);
    }
  }
}

console.log("");

// ─── Summary ─────────────────────────────────────────────────────────────────
if (allRequiredOk) {
  console.log(`  ${GREEN("✓ All required prerequisites are installed.")} You're good to go.`);
} else {
  console.log(`  ${RED("✗ Some required prerequisites are missing.")} Install them above, then re-run.`);
}
console.log("");

process.exit(allRequiredOk ? 0 : 1);
