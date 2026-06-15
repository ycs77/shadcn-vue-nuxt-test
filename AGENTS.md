# AGENTS.md

## Technology Stack

- Node.js v22+
- Yarn 1.22+
- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS 4
- `shadcn-vue` — shadcn/ui for Vue
- `@unovis/vue` — chart library (area, line); used in dashboard
- `reka-ui` — headless UI primitives (shadcn-vue dependency)
- `vue-sonner` — toast notifications
- `@tanstack/vue-table` — data table utilities (used with shadcn-vue Table)
- `vee-validate + @vee-validate/zod + zod` — form validation and schema definition
- `@vueuse/core` — Vue composition utilities
- `@lucide/vue` — icon library
- `class-variance-authority + clsx + tailwind-merge` — component styling utilities

## Commands

- `yarn build` — production build
- `yarn lint --fix` — ESLint for TypeScript and Vue files with auto-fix (uses `@ycs77/eslint-config`)
- `yarn eslint [...files] --fix` — ESLint for specific files with auto-fix

## Architecture

- `app/` — application code (pages, components, layouts, composables)
- `app/pages/` — Nuxt file-based routing
- `app/components/` — Vue components (UI + page-specific)
- `app/components/ui/` — shadcn-vue generated components — do not edit or create manually
- `app/components/data-table/` — reusable DataTable components
- `app/components/dashboard/` — dashboard page-specific components
- `app/layouts/` — Nuxt layouts (`default`, `dashboard`)
- `app/composables/` — Vue composables
- `app/assets/` — global CSS and static assets
- `app/lib/` — shared utilities (`cn()` class merge helper, `valueUpdater()` for TanStack Table)
- `data/` — mock data (fake datasets for development)
- `shared/types/` — shared TypeScript type definitions

## shadcn-vue

### Installed Components (`app/components/ui/`)

alert-dialog, avatar, badge, breadcrumb, button, calendar, card, chart, checkbox, collapsible, dialog, dropdown-menu, field, input, label, native-select, popover, select, separator, sheet, sidebar, skeleton, sonner, table, textarea, tooltip

To add new shadcn-vue components: `npx shadcn-vue@latest add <component>`

### Common Patterns

- **Toast** — powered by Sonner. See `app/components/AppToaster.vue` for configuration and styling.
- **Forms** — use VeeValidate with shadcn-vue `<Field />` components and Zod schema validation.
- **DataTable** — use the shared components in `app/components/data-table/`. The shared DataTable supports optional search, filter dropdowns, and pagination via props (all off by default). Create a custom DataTable only if shared components lack the needed capability.

## Page Zones

- **Public** — E-Ink / Paper style, default layout
  - `/`
  - `/posts/[id]`
- **Dashboard** — shadcn default style, dashboard layout
  - `/dashboard` — overview with stats cards, views trend chart, recent posts, category overview
  - `/dashboard/posts` — list, create, edit pages
  - `/dashboard/categories` — list page only
- **Login** — shadcn default style, default layout
  - `/login`

## Frontend Design (Public)

Public pages use an **E-Ink / Paper** style — calm, distraction-free, ultra-minimal, reading-focused.

- **Palette** — Paper `#FDFBF7` background, Ink `#1A1A1A` text/buttons, `#6B7280` secondary text, `#1A1A1A`/10% borders
- **Font** — Merriweather (Google Fonts) for all public pages, including buttons
- **Layout** — max-w-2xl centered, no images, no shadows, no rounded corners
- **Shared blocks** — Navbar (Logo + Sign In) and Footer (Copyright + links) on every public page
- **Components** — shadcn-vue `Button` and `Separator` with Ink/Paper overrides; icons from `@lucide/vue`

## Skills Activation Rules

`ycs77-vue` is the project-level convention. When rules conflict, `ycs77-vue` takes precedence.

- **When writing, modifying, or reviewing Vue 3 SFCs**, load ALL of the following skills:
  1. `vue`
  2. `vue-best-practices`
  3. `ycs77-vue`
  4. `shadcn-vue`
  5. `nuxt`
