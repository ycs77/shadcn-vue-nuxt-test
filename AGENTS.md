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

- **When writing, modifying, or reviewing Vue 3 Single File Components (SFCs)**: load `vue`, `vue-best-practices`, `ycs77-vue`, and `nuxt` skills. When rules conflict, `ycs77-vue` takes precedence as the project-level convention.
- **When working on Nuxt-specific files** (server routes, middleware, plugins, composables, `nuxt.config.ts`): load `ycs77-vue` and `nuxt` skills.
