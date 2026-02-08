# AGENTS.md

## Technology Stack

- Node.js v22+
- Yarn 1.22+
- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS 4
- `shadcn-vue` — shadcn/ui for Vue
- `@unovis/vue` — charts (area, line; used in dashboard)
- `reka-ui` — headless UI primitives (shadcn-vue dependency)
- `vue-sonner` — toast notifications
- `@tanstack/vue-table` — data table utilities (used with shadcn-vue Table)
- `vee-validate + @vee-validate/zod + zod` — form validation and schema definition
- `@vueuse/core` — Vue composition utilities
- `lucide-vue-next` — icon library
- `class-variance-authority + clsx + tailwind-merge` — component styling utilities

## Commands

- `yarn dev` — dev server
- `yarn build` — production build
- `yarn lint --fix` — ESLint for TypeScript and Vue files with auto-fix (uses `@ycs77/eslint-config`)
- `yarn eslint [...files] --fix` — ESLint for specific files with auto-fix (uses `@ycs77/eslint-config`)

## Architecture

- `app/` — application code (pages, components, layouts, composables)
- `app/pages/` — Nuxt file-based routing
- `app/components/` — Vue components (UI + page-specific)
- `app/components/ui/` — shadcn-vue generated components, do not create manually
- `app/layouts/` — Nuxt layouts (`default`, `dashboard`)
- `app/composables/` — Vue composables
- `app/assets/` — global CSS and static assets
- `app/lib/` — shared utilities (`cn()` class merge helper, `valueUpdater()` for TanStack Table)
- `data/` — mock data (fake datasets for development)
- `shared/types/` — shared TypeScript type definitions

## shadcn-vue

### Installed Components (`app/components/ui/`)

alert-dialog, avatar, breadcrumb, button, card, chart, collapsible, dialog, dropdown-menu, field, input, label, select, separator, sheet, sidebar, skeleton, sonner, table, tooltip

To add new shadcn-vue components: `npx shadcn-vue@latest add <component>`

### Common Patterns

- **Toast** — via Sonner, see `app/components/AppToaster.vue` for settings and styling
- **Forms** — VeeValidate + shadcn-vue `<Field />` layout components + Zod schema validation, follow the reference: @docs/shadcn-vue/forms/vee-validate.md
- **DataTable** — shadcn-vue does not provide a pre-built DataTable component; build custom DataTable per page by composing TanStack Table + shadcn-vue Table. When creating, editing, or designing a DataTable, always follow the reference: @docs/shadcn-vue/components/data-table.md

## Page Zones

- **Public** — E-Ink / Paper style, default layout
  - `/`
  - `/posts/[id]`
- **Dashboard** — shadcn default style, dashboard layout
  - `/dashboard`
  - `/dashboard/categories`
- **Login** — shadcn default style, default layout
  - `/login`

## Frontend Design (Public)

Public pages use a **E-Ink / Paper** style — paper-like, calm, distraction-free, ultra-minimal, reading-focused.

- **Palette** — Paper `#FDFBF7` background, Ink `#1A1A1A` text/buttons, `#6B7280` secondary text, `#1A1A1A`/10% borders
- **Font** — Merriweather (Google Fonts) site-wide, including buttons
- **Layout** — max-w-2xl centered, no images, no shadows, no rounded corners
- **Shared blocks** — Navbar (Logo + Sign In) and Footer (Copyright + links) appear on every public page
- **Components** — shadcn-vue `Button` and `Separator` with Ink/Paper overrides; icons from `lucide-vue-next`

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
