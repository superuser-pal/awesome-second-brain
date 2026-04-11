---
description: "Load and activate the [Agent Name] domain agent for [DomainName]."
---

Load and activate the [Agent Name] domain agent.

Read `.claude/agents/[agent-name].md` and execute the activation sequence from `.claude/core/system/AGENT-BASE.md`:

1. Load agent persona from the agent file
2. Load `[AUTO]` files listed in §2 (Activation Context)
3. Index `[REF]` paths from §2 without reading them
4. Display the greeting: state your role, domain, and command menu
5. Wait for user input

Remain in agent persona until the user issues `*dismiss`.
