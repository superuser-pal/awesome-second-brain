---
description: "Reflective capture mode. Share your thoughts freely, and I'll extract atomic observations (facts, ideas, decisions) with suggested tags before staging them in your inbox."
---

# Brain Dump

"What's on your mind? Share your thoughts freely."

## Usage

```
/brain-dump <content>
```

This command is designed for deeper reflection and stream-of-consciousness capture. It extracts atomic observations and stages them in `inbox/raw/`.

## Workflow

### 1. Collect Raw Input
Accept any format:
- Stream of consciousness
- Voice-to-text output
- Bullet points
- Rambling paragraphs

**No filtering, no judgment** — capture everything exactly as provided.

### 2. Content Analysis
Internal analysis (not written to file):
- **Main Themes:** [3-5 primary topics]
- **Supporting Ideas:** [related concepts]
- **Action Items:** [tasks identified if any]

### 3. Observation Extraction
Extract atomic observations from the raw content, categorizing each.

**Process:**
1. Identify distinct statements in the raw input.
2. For each statement, determine the most appropriate category: `fact`, `idea`, `decision`, `technique`, `requirement`, `question`, `insight`, `problem`, `solution`, `action`.
3. Format as structured observations: `- [category] content #tag1 #tag2`.
4. Suggest 2-3 relevant tags per observation (AI-suggested based on context).

**Rules:**
- Each observation must be atomic (single subject-verb-object).
- Present extractions to the user for confirmation if they are complex.

### 4. Domain and Theme Detection
Analyze content to detect target domain and themes.
- **Segment content** by topic shifts (paragraph breaks, explicit markers like "Also...", domain changes).
- Determine if the content should be split into multiple raw notes.

### 5. Create the Raw Note
Save to `inbox/raw/[topic]-[YYYY-MM-DD].md` with:
- Verbatim raw input (in a collapsible callout)
- Structured atomic observations
- Proposed domain and tags

## Example Extraction

**Raw:** "I've been thinking about using Redis for caching. The API is rate limited to 1000 calls/hour. Need to review the docs tomorrow."

**Extracted:**
- `[idea] Use Redis for caching #caching #infrastructure`
- `[fact] API is rate limited to 1000 calls/hour #api #limits`
- `[action] Review the API documentation #api #tasks`

Content to process:
$ARGUMENTS
