# Contributing to Awesome Second Brain

> [!note]
> "The best way to make your own code high quality is to give it away." Rasmus L. (creator of PHP)

This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists
2. If not, create a new issue with:
   - Clear, descriptive title
   - Detailed description
   - Steps to reproduce (for bugs)

### Suggesting Enhancements

I welcome ideas for new features:

1. Create an issue with the "enhancement" label
2. Describe the feature and why it would be useful
3. Provide examples if applicable
4. Be open to discussion

### Pull Requests

#### Before You Start

1. Fork the repository
2. Create a new branch for your feature/fix
3. Ensure your changes align with Awesome Second Brain's philosophy:
   - Technical-literate first
   - Context over prompts
   - Plan-first execution
   - Pattern-based design (can be introduced)

#### Making Changes

**Skills:** New skills should follow Awesome Second Brain structure:

```
.claude/skills/skill-name/
├── SKILL.md           # Main skill file (uppercase)
├── context_file.md    # Context files (snake_case)
├── workflows/         # Workflow files
│   └── workflow_name.md
└── tools/             # CLI tools (always present)
```

**Agents:** Single `.md` files in `.claude/agents/`:

- Use 8-section structure
- Include YAML frontmatter with name, description, version, domain
- Bind to existing domain

**Domains:** Standard 6-folder structure in `Domains/`:

```
Domains/DomainName/
├── INDEX.md
├── CONNECTIONS.yaml
├── 00_CONTEXT/
├── 01_PROJECTS/
├── 02_SESSIONS/
├── 03_PAGES/
├── 04_WORKSPACE/
└── 05_ARCHIVE/
```

#### Testing

Before submitting:

1. Test your changes with Claude Code or any other AI Model
2. Verify skills activate correctly
3. Check that agents load properly
4. Ensure documentation is accurate
5. Optional (review the context that is being loaded to the session and/or Agents)

#### Submitting

1. Commit with clear messages (verb + description)
2. Push to your fork
3. Create a Pull Request with:
   - Description of changes
   - Related issues
   - Testing done

## Types of Contributions

### High Priority

- **New Skills** — Useful workflows for common tasks
- **Documentation** — Tutorials, examples, use cases
- **Workflow Improvements** — Enhancements to existing workflows
- **Bug Fixes** — Fixes for reported issues

### Medium Priority

- **Domain Templates** — Templates for common project types
- **Integration Scripts** — Tools for connecting with external services

### Lower Priority

- **Visual Improvements** — Awesome Second Brain is text-first for the moment
- **Detachment from Cloud Models** — Keeping it grounded for the moment with Claude Code.

## Community Guidelines

- Treat all contributors with respect
- Provide constructive feedback
- Be open to different perspectives
- Write clear commit messages

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Awesome Second Brain by Rodrigo C.
