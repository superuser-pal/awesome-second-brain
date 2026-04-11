---
description: "Interactive onboarding workflow that asks 'Way Questions' to configure brain context, domain scaffolding, and advanced agent setup across three tiers."
---

# /onboard Workflow

Guides the user through an interactive setup of their second brain by asking targeted "Way Questions" to configure critical files, domains, projects, and domain agents.

## Step 1: Introduction & Tier Selection

Welcome the user to the PAL Second Brain and present the three tiers of onboarding:
1. **Tier 1 (Simple Setup):** Core context in `brain/`
2. **Tier 2 (Workspace Construction):** Domain and Project scaffolding
3. **Tier 3 (Robust Setup):** Advanced automations, skills (`obsidian-cli`, `qmd`), and custom Domain Agents

Ask the user: "Which tier would you like to start with? We can execute them one at a time."

## Step 2: Execute Selected Tier

Depending on the user's choice, initiate the appropriate tier flow. Only proceed to ask questions one by one. Do not overwhelm the user.

### Tier 1 Flow (Simple Setup)
1. **NORTH_STAR.md:** Ask: "What are your top 2-3 current life or work goals right now?" -> *Save silently to `brain/NORTH_STAR.md`*
2. **RESUME.md:** Ask: "Can you provide a quick bio or paste your resume/background? This grounds my contextual understanding of your skills." -> *Save silently to `brain/RESUME.md`*
3. **GOTCHAS.md:** Ask: "Do you have any specific pet peeves or formatting rules you want me to strictly follow moving forward?" -> *Save silently to `brain/GOTCHAS.md`*
*If they are done, skip to Conclusion.*

### Tier 2 Flow (Workspace Construction)
1. Tell the user you are going to use the `create-domain` workflow. Ask: "What is the name of the new domain you want to establish?"
2. After executing `create-domain`, ask for the initial tasks/goal to run the `/create-project` workflow to scaffold their `01_PROJECTS` folder inside that domain.
*If they are done, skip to Conclusion.*

### Tier 3 Flow (Robust Setup)
1. Introduce the specialized capabilities of the second brain. Explain that incorporating the `obsidian-cli` (to interact directly with Obsidian) and `qmd` (for smart semantic search) skills allows for highly autonomous agents.
2. Ask: "Which domain would you like to build a dedicated Domain Agent for?"
3. Trigger the `create-agent` workflow logic to generate their targeted agent and remind them to set up `CONNECTIONS.yaml` to catalog integrations.
*If they are done, skip to Conclusion.*

## Conclusion

Once a tier is finished, or if the user asks to stop, provide the following recommended reading list:
- `SYSTEM_REFERENCE.md` — To see all commands, principles, and capabilities.
- `.claude/core/reference/ASSET-CLASSES.md` — To understand note types.
- `.claude/core/reference/DOMAINS-REGISTRY.md` — To see registered domains.

Remind them they can run `/onboard` anytime to continue to another tier!
