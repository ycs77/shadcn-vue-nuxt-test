#!/bin/bash

npx -y skills@latest add antfu/skills \
  --agent claude-code \
  --agent codex \
  --skill vue \
  --skill vue-best-practices \
  --skill nuxt \
  -y

npx -y skills@latest add ycs77/skills \
  --agent claude-code \
  --agent codex \
  --skill ycs77-vue \
  --skill shadcn-vue \
  -y

npx -y uipro-cli@latest init --ai claude
npx -y uipro-cli@latest init --ai codex
