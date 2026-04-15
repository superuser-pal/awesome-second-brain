import { describe, it, expect } from "bun:test";
import { checkContent, checkPath, checkCommand } from "../hooks/lib/security.ts";

describe("Credential blocking", () => {
  it("blocks API keys", () => {
    expect(checkContent('api_key: "abc123def456ghi789jkl"', "")).toBe("block");
    expect(checkContent('api-key=shortkey', "")).toBe("allow"); // under 20 chars
  });

  it("blocks GitHub PATs", () => {
    const longToken = "ghp_" + "A".repeat(36);
    expect(checkContent(longToken, "")).toBe("block");
    expect(checkContent("ghp_short", "")).toBe("allow");
  });

  it("blocks Stripe live keys", () => {
    expect(checkContent("sk_live_" + "x".repeat(24), "")).toBe("block");
    expect(checkContent("sk_test_" + "x".repeat(24), "")).toBe("allow");
  });

  it("blocks AWS access key IDs", () => {
    expect(checkContent("AKIAIOSFODNN7EXAMPLE", "")).toBe("block");
    expect(checkContent("BKIAIOSFODNN7EXAMPLE", "")).toBe("allow"); // wrong prefix
  });

  it("blocks private keys", () => {
    expect(checkContent("-----BEGIN RSA PRIVATE KEY-----", "")).toBe("block");
    expect(checkContent("-----BEGIN OPENSSH PRIVATE KEY-----", "")).toBe("block");
  });

  it("blocks database URLs with credentials", () => {
    expect(checkContent("postgres://user:pass@localhost/db", "")).toBe("block");
    expect(checkContent("postgres://localhost/db", "")).toBe("allow"); // no credentials
  });

  it("allows env var references", () => {
    // process.env references are safe
    expect(checkContent('api_key: process.env.MY_KEY', "")).toBe("allow");
    expect(checkContent('secret: Bun.env.SECRET', "")).toBe("allow");
  });
});

describe("PII warnings", () => {
  it("warns on email addresses", () => {
    expect(checkContent("Contact me at user@example.com for details", "")).toBe("warn");
  });

  it("warns on US phone numbers", () => {
    expect(checkContent("Call 555-867-5309", "")).toBe("warn");
  });

  it("does NOT warn on PII-exception files (PEOPLE.md)", () => {
    expect(checkContent("user@example.com", "work/06_ORG/PEOPLE.md")).toBe("allow");
  });
});

describe("Path blocking", () => {
  it("blocks /etc/ paths", () => {
    expect(checkPath("/etc/passwd")).toBe("block");
    expect(checkPath("/etc/hosts")).toBe("block");
  });

  it("blocks ~/.ssh/", () => {
    expect(checkPath("/Users/me/.ssh/id_rsa")).toBe("block");
  });

  it("blocks .env files", () => {
    expect(checkPath("/project/.env")).toBe("block");
    expect(checkPath("/project/.env.local")).toBe("block");
  });

  it("blocks credentials.json", () => {
    expect(checkPath("/project/credentials.json")).toBe("block");
  });

  it("allows normal vault paths", () => {
    expect(checkPath("/vault/work/01_PROJECTS/test.md")).toBe("allow");
    expect(checkPath("/vault/inbox/raw/braindump.md")).toBe("allow");
  });
});

describe("Command blocking", () => {
  it("blocks rm -rf /", () => {
    expect(checkCommand("rm -rf /")).toBe("block");
    expect(checkCommand("rm -rf ~/")).toBe("block");
  });

  it("does NOT block rm -rf ./build (relative path)", () => {
    expect(checkCommand("rm -rf ./build")).toBe("allow");
    expect(checkCommand("rm -rf build/")).toBe("allow");
  });

  it("blocks force push to main", () => {
    expect(checkCommand("git push origin --force main")).toBe("block");
    expect(checkCommand("git push origin --force master")).toBe("block");
  });

  it("blocks DROP TABLE / DATABASE", () => {
    expect(checkCommand("DROP TABLE users")).toBe("block");
    expect(checkCommand("DROP DATABASE prod")).toBe("block");
  });

  it("blocks mkfs", () => {
    expect(checkCommand("mkfs.ext4 /dev/sda1")).toBe("block");
  });

  it("blocks git clean -fd", () => {
    expect(checkCommand("git clean -fd")).toBe("block");
  });

  it("warns on git reset --hard", () => {
    expect(checkCommand("git reset --hard HEAD")).toBe("warn");
  });

  it("warns on git stash drop", () => {
    expect(checkCommand("git stash drop")).toBe("warn");
  });

  it("allows safe git commands", () => {
    expect(checkCommand("git status")).toBe("allow");
    expect(checkCommand("git add -p")).toBe("allow");
    expect(checkCommand("git log --oneline")).toBe("allow");
  });
});
