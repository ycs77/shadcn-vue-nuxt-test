# AGENTS.md

## Technology Stack

- Node.js v22+
- Yarn 1.22+
- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS 4
- shadcn/ui for Vue

## Commands

- `yarn dev` — dev server
- `yarn build` — production build
- `yarn lint` — ESLint for TypeScript and Vue files (uses `@ycs77/eslint-config`)
- `yarn eslint [...files]` — ESLint for specific files (uses `@ycs77/eslint-config`)

## Architecture

- `app/` — application code (pages, components, layouts, composables)
- `app/components/ui/` — shadcn-vue generated components, do not create manually

## Skills Activation Rules

`ycs77-vue` is the project-level convention — when rules conflict, always follow `ycs77-vue`.

- **When writing, modifying, or reviewing Vue 3 SFCs**, load ALL of the following skills:
  1. `vue`
  2. `vue-best-practices`
  3. `ycs77-vue`
  4. `nuxt`

- **When working on Nuxt-specific files** (server routes, middleware, plugins, composables, `nuxt.config.ts`), load:
  1. `ycs77-vue`
  2. `nuxt`
