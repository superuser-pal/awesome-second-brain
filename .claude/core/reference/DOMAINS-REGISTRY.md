---
title: PAL Second Brain Domains Registry
version: 1.0.0
layer: REFERENCE
purpose: Living registry of all vault domains — single source of truth for domain definitions and routing signals
last_updated: 2026-04-05
---

# Domains Registry

> **This is the single source of truth for domain definitions.** When a domain is created via the `create-domain` skill, an entry is added here. Domain detection, inbox routing, and agent binding all derive from this registry.

---

## Registry Schema

Each domain entry contains:

| Field | Description |
|-------|-------------|
| `name` | PascalCase directory name (e.g., `LaraLou`) |
| `path` | Relative path from vault root (e.g., `domains/LaraLou/`) |
| `agent` | Bound Domain Agent name (`kebab-case`), or `null` |
| `status` | `active` or `archived` |
| `primary_signals` | High-confidence routing phrases (trigger auto-suggest at ≥80%) |
| `secondary_signals` | Supporting phrases (contribute to scoring) |
| `exclude_patterns` | Phrases that reduce score for this domain |

---

## Detection Algorithm

Used by `/dump`, `/process`, and `/distribute` for domain routing:

```
function detect_domain(content):
    scores = {}
    content_lower = content.lower()

    for domain in DOMAINS-REGISTRY:
        score = 0

        # Primary signals: +40%, max 1 match
        for signal in domain.primary_signals:
            if signal.lower() in content_lower:
                score += 40
                break

        # Secondary signals: +25% each, max 2 matches
        matched = 0
        for signal in domain.secondary_signals:
            if signal.lower() in content_lower and matched < 2:
                score += 25
                matched += 1

        # Exclusions: -30% each
        for pattern in domain.exclude_patterns:
            if pattern.lower() in content_lower:
                score -= 30

        scores[domain.name] = max(0, min(100, score))

    return sorted(scores.items(), key=lambda x: -x[1])
```

**Thresholds:**

| Confidence | Score | Action |
|------------|-------|--------|
| High | ≥ 80% | Auto-suggest as primary domain |
| Medium | 60–79% | Suggest with confirmation |
| Low | < 60% | No match — show domain menu |

When multiple domains score ≥70%, present a choice. Non-selected domains can be added as relations.

---

## Domains

### AwesomeSecondBrain

| Field | Value |
|-------|-------|
| **Name** | `AwesomeSecondBrain` |
| **Path** | `domains/AwesomeSecondBrain/` |
| **Agent** | `null` |
| **Status** | `active` |

**Primary Signals:** `"awesome second brain"`, `"vault template"`, `"obsidian skill"`, `"PAL framework"`, `"open source"`

**Secondary Signals:** `"claude code"`, `"slash command"`, `"vault"`, `"obsidian"`, `"skill workflow"`

**Exclude Patterns:** `"moro-tech"`, `"toyota"`, `"souvenir"`, `"brussels shop"`

---

### BrusselsShop

| Field | Value |
|-------|-------|
| **Name** | `BrusselsShop` |
| **Path** | `domains/BrusselsShop/` |
| **Agent** | `null` |
| **Status** | `active` |

**Primary Signals:** `"brussels shop"`, `"souvenir shop"`, `"souvenir"`, `"retail brussels"`

**Secondary Signals:** `"tourist"`, `"brussels"`, `"shop inventory"`, `"retail"`, `"e-commerce"`

**Exclude Patterns:** `"moro-tech"`, `"toyota"`, `"awesome second brain"`, `"vault"`

---

## Adding a Domain

When a new domain is created via the `create-domain` skill, add a new entry here following this template:

```markdown
### [DomainName]

| Field | Value |
|-------|-------|
| **Name** | `DomainName` |
| **Path** | `domains/DomainName/` |
| **Agent** | `null` |
| **Status** | `active` |

**Primary Signals:** `"signal one"`, `"signal two"`, `"signal three"`

**Secondary Signals:** `"supporting"`, `"phrase"`, `"examples"`

**Exclude Patterns:** `"other-domain-signal"` *(or leave empty)*
```

Do NOT duplicate domain data in CLAUDE.md signal tables — CLAUDE.md's Domains section should reference this registry as the source, not maintain its own copy.

---

**Related Files:** `SYSTEM-INDEX.md`, `ROUTING-TABLE.md`, `.claude/skills/create-domain/workflows/create-domain.md`
