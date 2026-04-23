#!/bin/bash
cat << 'EOF'
Before ending this session, do two things:

1. REWRITE brain/CACHE.md with this session's state (hard cap: 500 words).
   Use exactly these five sections:

   ## Last Updated — ISO timestamp now
   ## Key Recent Facts — 3-7 bullets of durable things learned or confirmed
   ## Recent Changes — files created/moved/edited (vault-relative paths)
   ## Active Threads — mid-flight work for next session to resume
   ## Deferred Work — things noticed but not acted on; nothing silently dropped

   Prioritize unfinished over finished. Durable facts belong in brain/ topic notes, not here.

2. CHECK brain/ files for durable learnings from this session using the Brain File Routing Table in CLAUDE.md:
   - Decision with rationale      -> brain/LOGIC.md
   - Confirmed recurring pattern  -> brain/RULES.md
   - Something broke or surprised -> brain/CAVEATS.md
   - New skill or workflow        -> brain/SKILLS.md
   - User preference updated      -> brain/USER.md
   - Goals shifted                -> brain/NORTH_STAR.md

   Append any learnings found. Skip if nothing durable emerged.
EOF
