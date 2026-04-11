# Project Archive

Move a completed project from `work/01_PROJECTS/` to `work/07_ARCHIVE/YYYY/` and update all indexes.

## Usage

```
/project-archive <project name>
```

## Workflow

### 1. Find the Note

Search `work/01_PROJECTS/` for the project name. Confirm with the user before proceeding.

### 2. Update Frontmatter

- Set `status: completed`
- Verify `quarter` property is set correctly
- Verify `description` reflects the final state

### 3. Move the File

```bash
git mv "work/01_PROJECTS/<Note>.md" "work/07_ARCHIVE/YYYY/"
```

Use the year from the note's `date` field.

### 4. Update Indexes

- **`work/INDEX.md`**: Move from Active Projects to the appropriate Completed quarter section
- **`brain/NORTH_STAR.md`**: Mark as completed in Current Focus if listed there
- **`work/05_REVIEW/WINS.md`**: Verify the project is captured in the relevant quarter section
- **`brain/MEMORIES.md`**: Update Recent Context if the project is mentioned as "in progress"

### 5. Verify

- Run a quick check that no wikilinks are broken (Obsidian resolves by name, so moves shouldn't break links)
- Confirm the Work Dashboard Base shows the note in "Completed" view, not "Active Work"

## Important

- Always use `git mv` — never copy+delete
- Don't archive without user confirmation
- If the project has related incident notes, ask if those should be updated too
