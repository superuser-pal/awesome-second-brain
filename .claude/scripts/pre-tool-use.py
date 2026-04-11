#!/usr/bin/env python3
"""Pre-tool-use security validation. Blocks credentials, destructive ops, restricted paths.
Ported from PAL's pre-tool-use.ts guardrails."""
import json
import sys
import re


# ── BLOCK: Always prevent (catastrophic) ──
BLOCKED_CREDENTIALS = [
    re.compile(r'api[_-]?key[_-]?[:=]\s*[\'"]?[a-zA-Z0-9_-]{20,}[\'"]?', re.I),
    re.compile(r'password[_-]?[:=]\s*[\'"]?[^\s\'"]{8,}[\'"]?', re.I),
    re.compile(r'secret[_-]?[:=]\s*[\'"]?[^\s\'"]{8,}[\'"]?', re.I),
    re.compile(r'-----BEGIN\s*(?:RSA\s+|OPENSSH\s+|DSA\s+|EC\s+|PGP\s+|ENCRYPTED\s+)?PRIVATE\s+KEY-----', re.I),
    re.compile(r'AKIA[0-9A-Z]{16}'),
    re.compile(r'sk_live_[0-9a-zA-Z]{24}'),
    re.compile(r'ghp_[0-9a-zA-Z]{36}'),
    re.compile(r'(?:mysql|postgres|mongodb)://[^:]+:[^@]+@', re.I),
]

BLOCKED_PATHS = [
    re.compile(r'^/etc/'),
    re.compile(r'^/usr/'),
    re.compile(r'^/bin/'),
    re.compile(r'^/System/'),
    re.compile(r'^/var/'),
    re.compile(r'[~/]\.ssh/'),
    re.compile(r'[~/]\.aws/'),
    re.compile(r'[~/]\.gnupg/'),
    re.compile(r'[~/]Library/Keychains/'),
    re.compile(r'\.env$'),
    re.compile(r'\.env\.[a-z]+$', re.I),
    re.compile(r'credentials\.json$'),
]

BLOCKED_COMMANDS = [
    re.compile(r'rm\s+-rf\s+[/~]'),
    re.compile(r'rm\s+\*\.md'),
    re.compile(r'chmod\s+777'),
    re.compile(r'>\s*/dev/sd'),
    re.compile(r'mkfs\.'),
    re.compile(r'dd\s+if='),
    re.compile(r'git\s+push\s+.*--force\s+.*main'),
    re.compile(r'git\s+push\s+.*--force\s+.*master'),
    re.compile(r'git\s+reset\s+--hard\s+HEAD~[0-9]{2,}'),
    re.compile(r'git\s+clean\s+-fd'),
    re.compile(r'DROP\s+(?:TABLE|DATABASE)', re.I),
    re.compile(r'TRUNCATE\s+TABLE', re.I),
    re.compile(r'DELETE\s+FROM\s+\w+\s*$', re.I),
]

# ── WARN: Alert but allow (risky) ──
WARNED_PII = [
    re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'),
    re.compile(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b'),
    re.compile(r'\b\d{3}-\d{2}-\d{4}\b'),
    re.compile(r'\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b'),
]

WARNED_DESTRUCTIVE = [
    re.compile(r'git\s+reset\s+--hard'),
    re.compile(r'git\s+stash\s+drop'),
    re.compile(r'DELETE\s+FROM.*WHERE', re.I),
]

# PII exceptions — files where PII is expected
PII_EXCEPTION_PATTERNS = [
    re.compile(r'work/06_ORG/PEOPLE\.md'),
    re.compile(r'work/06_ORG/TEAMS\.md'),
    re.compile(r'\.env\.example$'),
]


def validate(input_data: dict) -> dict:
    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})
    content = tool_input.get("content", "") or tool_input.get("new_string", "") or ""
    file_path = tool_input.get("file_path", "") or ""
    command = tool_input.get("command", "") or ""

    # Check content for credentials (BLOCK)
    if content:
        is_env_ref = bool(re.search(r'process\.env\.|Bun\.env\.|import\.meta\.env\.', content, re.I))
        if not is_env_ref:
            for pattern in BLOCKED_CREDENTIALS:
                if pattern.search(content):
                    return {"status": "block",
                            "message": "BLOCKED: Potential credential detected. Use environment variables instead."}

    # Check file paths (BLOCK)
    if file_path and tool_name in ("Write", "Edit", "MultiEdit"):
        for pattern in BLOCKED_PATHS:
            if pattern.search(file_path):
                return {"status": "block",
                        "message": f"BLOCKED: Operation on restricted path: {file_path}"}

    # Check commands (BLOCK)
    if tool_name == "Bash" and command:
        for pattern in BLOCKED_COMMANDS:
            if pattern.search(command):
                return {"status": "block",
                        "message": "BLOCKED: Dangerous command pattern detected."}

    # Check for PII (WARN) — skip for exception files
    if content:
        is_exception = any(p.search(file_path) for p in PII_EXCEPTION_PATTERNS)
        if not is_exception:
            for pattern in WARNED_PII:
                if pattern.search(content):
                    return {"status": "warn",
                            "message": "WARNING: Potential PII detected. Verify this should be included."}

    # Check destructive operations (WARN)
    if command:
        for pattern in WARNED_DESTRUCTIVE:
            if pattern.search(command):
                return {"status": "warn",
                        "message": "WARNING: Destructive operation detected. Confirm this is intentional."}

    return {"status": "allow"}


def main():
    try:
        input_data = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        sys.exit(0)

    if not input_data:
        sys.exit(0)

    result = validate(input_data)

    if result["status"] == "block":
        print(result["message"], file=sys.stderr)
        sys.exit(2)
    elif result["status"] == "warn":
        print(result["message"], file=sys.stderr)
        sys.exit(0)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
