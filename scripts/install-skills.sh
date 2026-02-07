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
