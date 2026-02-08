# AGENTS.md

## Technology Stack

- Node.js v22+
- Yarn 1.22+
- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS 4
- shadcn-vue — shadcn/ui for Vue
- @unovis/vue — charts (area, line; used in dashboard)
- reka-ui — headless UI primitives (shadcn-vue dependency)
- vue-sonner — toast notifications
- class-variance-authority + clsx + tailwind-merge — component styling utilities

## Commands

- `yarn dev` — dev server
- `yarn build` — production build
- `yarn lint --fix` — ESLint for TypeScript and Vue files with auto-fix (uses `@ycs77/eslint-config`)
- `yarn eslint [...files] --fix` — ESLint for specific files with auto-fix (uses `@ycs77/eslint-config`)

## Architecture

- `app/` — application code (pages, components, layouts, composables)
- `app/pages/` — Nuxt file-based routing
- `app/components` — Vue components (UI + page-specific)
- `app/components/ui/` — shadcn-vue generated components, do not create manually
- `app/layouts/` — Nuxt layouts (`default`, `dashboard`)
- `app/lib/` — shared utilities (`cn()` class merge helper)
- `data/` — mock data (fake datasets for development)
- `shared/types/` — shared TypeScript type definitions

## Existing Components

### Application Components (`app/components/`)

- `AppSidebar` — dashboard sidebar, composes TeamSwitcher + NavMain + NavUser
- `AppToaster` — vue-sonner toast wrapper (top-center, close button, rich colors)
- `LoginForm` — email/password login card (demo: demo@example.com / password)
- `NavMain` — collapsible sidebar nav group with icon + sub-items; supports direct link items (no sub-items)
- `NavUser` — sidebar user avatar + dropdown (Account, Billing, Notifications, Log out)
- `PublicFooter` — public page footer (copyright + Privacy/RSS links)
- `PublicNavbar` — public page navbar (site logo + Sign In link)
- `TeamSwitcher` — dashboard team selector dropdown
- `dashboard/categories/CategoryActions` — category row dropdown (Edit, Delete)
- `dashboard/categories/CategoryFormDialog` — create/edit category dialog with VeeValidate + Zod
- `dashboard/categories/CategoryDeleteDialog` — delete confirmation alert dialog

### Installed shadcn-vue Components (`app/components/ui/`)

alert-dialog, avatar, breadcrumb, button, card, chart, collapsible, dialog, dropdown-menu, form, input, label, select, separator, sheet, sidebar, skeleton, sonner, table, tooltip

To add new shadcn-vue components: `npx shadcn-vue@latest add <component>`

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

## Forms (VeeValidate + Zod)

When building forms, follow the shadcn-vue VeeValidate integration pattern.
Reference: https://www.shadcn-vue.com/raw/docs/forms/vee-validate.md

- **Packages** — `vee-validate`, `zod`, `@vee-validate/zod`
- **Flow** — Zod schema → `useForm({ validationSchema: toTypedSchema(schema) })` → `handleSubmit`
- **Field binding** — `<VeeField v-slot="{ field, errors }">` wrapping shadcn `<Field>` / `<FieldLabel>` / `<FieldError>`
  - Input / Textarea: `v-bind="field"`
  - Select / RadioGroup / Switch: `:model-value="field.value"` + `@update:model-value="field.onChange"`
- **Invalid state** — `:data-invalid="!!errors.length"` on `<Field>`, `:aria-invalid="!!errors.length"` on control
- **Dynamic arrays** — `<VeeFieldArray v-slot="{ fields, push, remove }">`, use `field.key` as `:key`
- **Validation modes** — `validateOnInput`, `validateOnChange`, `validateOnBlur`, `validateOnMount` props on `<VeeField>`

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
