#!/bin/bash

npx skills add antfu/skills \
  --agent claude-code \
  --skill vue \
  --skill vue-best-practices \
  --skill nuxt \
  -y

npx skills add ./skills \
  --agent claude-code \
  --skill '*' \
  -y

# Will remove on PR merged: https://github.com/vercel-labs/skills/pull/314
mkdir -p .gemini
cp -r .agents/skills/* .gemini/skills/

npx uipro-cli init --ai claude --ai gemini --force
