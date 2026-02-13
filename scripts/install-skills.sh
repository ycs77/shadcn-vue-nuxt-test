#!/bin/bash

npx -y skills@latest add antfu/skills \
  --agent claude-code \
  --skill vue \
  --skill vue-best-practices \
  --skill nuxt \
  -y

npx -y skills@latest add ycs77/skills \
  --agent claude-code \
  --skill ycs77-vue \
  --skill shadcn-vue \
  -y

# Will remove on PR merged: https://github.com/vercel-labs/skills/pull/314
mkdir -p .gemini/skills/
cp -r .agents/skills/* .gemini/skills/

npx -y uipro-cli@latest init --ai claude --ai gemini --force
