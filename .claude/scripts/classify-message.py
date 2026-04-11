#!/usr/bin/env python3
"""Classify user messages and inject routing hints for Claude.

Architecture: data-driven signal matching. Each signal has a list of trigger
patterns checked via regex with Latin-letter lookarounds (not \\b). Words can
appear in multiple signals (explicit overlaps) because the cost of a false
positive hint is ~0 (Claude ignores irrelevant hints) while a false negative
means missed routing.

Patterns include English to support users. The Latin-letter lookaround approach allows correct word-boundary behavior for English keywords.
"""
import json
import sys
import re


# Each signal: name, routing message, and trigger patterns.
# Patterns are checked with Latin-letter lookarounds to ensure correct word-boundary behavior.
# Words MAY appear in multiple signals to express natural category overlaps.
SIGNALS = [
    {
        "name": "DECISION",
        "message": "DECISION detected — consider creating a Decision Record in work/01_PROJECTS/ and logging in work/INDEX.md Decisions Log",
        "patterns": [
            "decided", "deciding", "decision", "we chose", "agreed to",
            "let's go with", "the call is", "we're going with",
        ],
    },
    {
        "name": "INCIDENT",
        "message": "INCIDENT detected — consider using /incident or creating an incident note in work/03_INCIDENTS/",
        "patterns": [
            "incident", "outage", "pagerduty", "severity",
            "p0", "p1", "p2", "sev1", "sev2", "postmortem", "rca",
        ],
    },
    {
        "name": "1:1 CONTENT",
        "message": "1:1 CONTENT detected — consider creating a 1-on-1 note in work/02_1-1/ and updating the person section in work/06_ORG/PEOPLE.md",
        "patterns": [
            "1:1", "1-1", "1-on-1", "one on one", "1on1",
            "catch up with", "sync with",
        ],
    },
    {
        "name": "WIN",
        "message": "WIN detected — consider adding to perf/Brag Doc.md with a link to the evidence note",
        "patterns": [
            # Delivery
            "shipped", "shipping", "ships",
            "launched", "launching", "launches",
            "completed", "completing", "completes",
            "released", "releasing", "releases",
            "deployed", "deploying", "deploys",
            # Achievement
            "achieved", "achieving", "won", "promoted", "praised", "win",
            "kudos", "shoutout", "great feedback", "recognized",
        ],
    },
    {
        "name": "ARCHITECTURE",
        "message": "ARCHITECTURE discussion — consider creating a reference note in reference/ or a decision record",
        "patterns": [
            "architecture", "system design", "rfc", "tech spec",
            "trade-off", "design doc", "adr",
        ],
    },
    {
        "name": "PERSON CONTEXT",
        "message": "PERSON CONTEXT detected — consider updating the relevant person section in work/06_ORG/PEOPLE.md and linking from the conversation note",
        "patterns": [
            "told me", "said that", "feedback from", "met with",
            "talked to", "spoke with",
            "mentioned that", "mentioned the", "mentioned a",
        ],
    },
    {
        "name": "CAPTURE_INTENT",
        "message": "CAPTURE_INTENT detected — if no command was invoked, route through the /quick-dump workflow (classify, create/update notes, add wikilinks, update indexes)",
        "patterns": [
            "notes from", "from today's meeting", "from the meeting",
            "i learned", "takeaway", "wanted to note",
            "just had a", "recap of",
        ],
    },
    {
        "name": "TASK",
        "message": "TASK detected — if no command was invoked, offer to create a task via the /task-add workflow",
        "patterns": [
            "todo", "to-do", "need to", "have to",
            "remind me", "action item", "follow up on", "task:",
        ],
    },
    {
        "name": "PROJECT UPDATE",
        "message": "PROJECT UPDATE detected — consider updating the active work note in work/01_PROJECTS/ and checking if wins should go to work/05_REVIEW/WINS.md",
        "patterns": [
            # English
            "project update", "sprint", "milestone", "iteration", "cycle update",
            # Delivery
            "shipped", "shipping", "ships", "shipped feature",
            "launched", "launching", "launches",
            "completed", "completing", "completes",
            "released", "releasing", "releases",
            "deployed", "deploying", "deploys",
            # Delivery-only
            "went live", "rolled out", "rolling out",
            "merged", "merging", "merges",
            "cut the release", "release cut",
            "submitted", "submitting", "submits",
            "published", "publishing", "publishes",
            "delivered", "delivering", "delivers",
            "iteration", "cycle complete",
        ],
    },
]


def _any_word_match(pattern_words: list, text: str) -> bool:
    """Check if any phrase appears as a whole word/phrase in text.

    Uses Latin-letter boundaries instead of \b to ensure correct word-boundary behavior for English keywords.
    (?<![a-zA-Z]) and (?![a-zA-Z]) ensure English keywords aren't part of
    a larger English word.
    """
    for phrase in pattern_words:
        if re.search(r'(?<![a-zA-Z])' + re.escape(phrase) + r'(?![a-zA-Z])', text):
            return True
    return False


def classify(prompt: str) -> list:
    p = prompt.lower()
    signals = []
    for sig in SIGNALS:
        if _any_word_match(sig["patterns"], p):
            signals.append(sig["message"])
    return signals


def main():
    try:
        input_data = json.load(sys.stdin)
    except (ValueError, EOFError, OSError):
        sys.exit(0)

    prompt = input_data.get("prompt", "")
    if not isinstance(prompt, str) or not prompt:
        sys.exit(0)

    try:
        signals = classify(prompt)
    except Exception:
        sys.exit(0)

    if signals:
        hints = "\n".join(f"- {s}" for s in signals)
        output = {
            "hookSpecificOutput": {
                "hookEventName": "UserPromptSubmit",
                "additionalContext": (
                    "Content classification hints (act on these if the user's message contains relevant info):\n"
                    + hints
                    + "\n\nRemember: use proper templates, add [[wikilinks]], follow CLAUDE.md conventions."
                )
            }
        }
        json.dump(output, sys.stdout)
        sys.stdout.flush()

    sys.exit(0)

if __name__ == "__main__":
    try:
        main()
    except Exception:
        sys.exit(0)
