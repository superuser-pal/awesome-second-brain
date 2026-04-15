/**
 * Security policy — credentials, restricted paths, dangerous commands.
 * Ported from pre-tool-use.py. Each pattern is documented with its Python source.
 */

export interface SecurityPolicy {
  blockedCredentials: RegExp[];
  blockedPaths: RegExp[];
  blockedCommands: RegExp[];
  warnedPii: RegExp[];
  warnedDestructive: RegExp[];
  piiExceptions: RegExp[];
}

export const SECURITY: SecurityPolicy = {
  // ── BLOCK: Credentials ──────────────────────────────────────────────────────
  blockedCredentials: [
    /api[_-]?key[_-]?[:=]\s*['"]?[a-zA-Z0-9_-]{20,}['"]?/i,
    /password[_-]?[:=]\s*['"]?[^\s'"]{8,}['"]?/i,
    /secret[_-]?[:=]\s*['"]?[^\s'"]{8,}['"]?/i,
    /-----BEGIN\s*(?:RSA\s+|OPENSSH\s+|DSA\s+|EC\s+|PGP\s+|ENCRYPTED\s+)?PRIVATE\s+KEY-----/i,
    /AKIA[0-9A-Z]{16}/,
    /sk_live_[0-9a-zA-Z]{24}/,
    /ghp_[0-9a-zA-Z]{36}/,
    /(?:mysql|postgres|mongodb):\/\/[^:]+:[^@]+@/i,
  ],

  // ── BLOCK: Restricted paths ──────────────────────────────────────────────
  blockedPaths: [
    /^\/etc\//,
    /^\/usr\//,
    /^\/bin\//,
    /^\/System\//,
    /^\/var\//,
    /[~/]\.ssh\//,
    /[~/]\.aws\//,
    /[~/]\.gnupg\//,
    /[~/]Library\/Keychains\//,
    /\.env$/,
    /\.env\.[a-z]+$/i,
    /credentials\.json$/,
  ],

  // ── BLOCK: Dangerous commands ────────────────────────────────────────────
  blockedCommands: [
    /rm\s+-rf\s+[/~]/,
    /rm\s+\*\.md/,
    /chmod\s+777/,
    />\s*\/dev\/sd/,
    /mkfs\./,
    /dd\s+if=/,
    /git\s+push\s+.*--force\s+.*main/,
    /git\s+push\s+.*--force\s+.*master/,
    /git\s+reset\s+--hard\s+HEAD~[0-9]{2,}/,
    /git\s+clean\s+-fd/,
    /DROP\s+(?:TABLE|DATABASE)/i,
    /TRUNCATE\s+TABLE/i,
    /DELETE\s+FROM\s+\w+\s*$/i,
  ],

  // ── WARN: PII ────────────────────────────────────────────────────────────
  warnedPii: [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
    /\b\d{3}-\d{2}-\d{4}\b/,
    /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/,
  ],

  // ── WARN: Destructive ops ────────────────────────────────────────────────
  warnedDestructive: [
    /git\s+reset\s+--hard/,
    /git\s+stash\s+drop/,
    /DELETE\s+FROM.*WHERE/i,
  ],

  // ── PII Exceptions: files where PII is expected ──────────────────────────
  piiExceptions: [
    /work\/06_ORG\/PEOPLE\.md/,
    /work\/06_ORG\/TEAMS\.md/,
    /\.env\.example$/,
  ],
};

/** Env-var reference patterns — these are safe, not real credentials */
const ENV_REF = /process\.env\.|Bun\.env\.|import\.meta\.env\./i;

export function checkContent(content: string, filePath: string): "block" | "warn" | "allow" {
  // Credential check (skip if content only references env vars)
  if (!ENV_REF.test(content)) {
    for (const re of SECURITY.blockedCredentials) {
      if (re.test(content)) return "block";
    }
  }

  // PII check
  const isPiiException = SECURITY.piiExceptions.some((re) => re.test(filePath));
  if (!isPiiException) {
    for (const re of SECURITY.warnedPii) {
      if (re.test(content)) return "warn";
    }
  }

  return "allow";
}

export function checkPath(filePath: string): "block" | "allow" {
  for (const re of SECURITY.blockedPaths) {
    if (re.test(filePath)) return "block";
  }
  return "allow";
}

export function checkCommand(command: string): "block" | "warn" | "allow" {
  for (const re of SECURITY.blockedCommands) {
    if (re.test(command)) return "block";
  }
  for (const re of SECURITY.warnedDestructive) {
    if (re.test(command)) return "warn";
  }
  return "allow";
}
