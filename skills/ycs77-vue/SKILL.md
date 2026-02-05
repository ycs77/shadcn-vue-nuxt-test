---
name: ycs77-vue
description: Lucas Yang's opinionated code style and conventions for Vue.js and TypeScript. Use when writing or reviewing Vue 3 components, or when the user mentions Lucas Yang's Vue coding style preferences.
---

# Lucas Yang's Vue Conventions

Opinionated Vue 3 and TypeScript patterns emphasizing minimal boilerplate, readability, and practical simplicity for real-world projects.

## TypeScript Formatting

**Standard**: 2 spaces, single quotes, no semicolons, trailing commas

## Vue SFC Patterns

### 1. SFC Block Order

Always place `<template>` before `<script setup lang="ts">` in Single File Components. This follows the natural reading flow from structure (what to render) to behavior (how it works).

**Good:**
```vue
<template>
  <div class="container">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
const title = ref('Hello World')
</script>
```

**Avoid:**
```vue
<script setup lang="ts">
const title = ref('Hello World')
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
  </div>
</template>
```

### 2. Inline Props/Emits Types

Prefer inline type declarations for `defineProps` and `defineEmits`. This approach provides better readability and reduces the need for additional type declarations, making it easier to understand the component's API at a glance.

**Good:**
```vue
<script setup lang="ts">
const props = defineProps<{
  title: string
  count?: number
  items: {
    id: string
    name: string
  }[]
}>()

const emit = defineEmits<{
  update: [value: string]
  delete: [id: string]
}>()
</script>
```

**Avoid:**
```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items: {
    id: string
    name: string
  }[]
}

interface Emits {
  update: [value: string]
  delete: [id: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
```

**Exception**: Only extract to a separate interface when the type is reused across multiple components or needs to be exported.

### 3. Use reactive() for Form State

When managing form state, prefer using `reactive()` to create a single reactive object that holds all form fields. This approach simplifies state management and reduces boilerplate code compared to using multiple `ref()` calls for each field.

**Good:**
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.email" type="email">
    <input v-model="form.password" type="password">
    <input v-model="form.rememberMe" type="checkbox">
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

function handleSubmit() {
  console.log(form) // Clean object, easy to submit
}

function resetForm() {
  form.email = ''
  form.password = ''
  form.rememberMe = false
}
</script>
```

**Avoid:**
```vue
<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

function handleSubmit() {
  console.log({
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  })
}
</script>
```

**Rationale**: Grouping related state reduces `.value` boilerplate and makes form submission cleaner. Use individual `ref()` only for truly independent state.

### 4. Use Type Assertion for ref() with Complex Types

When using `ref()` with interface or complex object types, use type assertion with `as Ref<Type>` to avoid TypeScript errors. For primitive types (string, number, boolean) or enum types, you can safely use the generic parameter `ref<Type>()`.

**Good:**
```vue
<script setup lang="ts">
import type { Ref } from 'vue'
import type { User } from '@/types'

// Complex type - use type assertion
const user = ref() as Ref<User>
const users = ref([]) as Ref<User[]>
const isSelectedUser = ref(null) as Ref<User | null>

// Primitive types - generic parameter is fine
const count = ref<number>(0)
const isActive = ref<boolean>(false)
const status = ref<Status>(Status.Pending)
</script>
```

**Avoid:**
```vue
<script setup lang="ts">
import type { User } from '@/types'

// May cause: Type '...' is not assignable to type 'Ref<User>'
const user = ref<User>()
</script>
```

**Rationale**: Using type assertion `as Ref<Type>` with complex types prevents common TypeScript errors while maintaining type safety. This pattern is especially important when the ref is initialized without a value or with `undefined`.

### 5. Use Same-name Shorthand for Bindings

When binding a prop or attribute where the variable name matches the attribute name, use the same-name shorthand syntax to reduce redundancy. This feature is available in Vue 3.4+ and mirrors JavaScript's object property shorthand pattern.

**Good:**
```vue
<template>
  <div :id :title>
    <MyComponent :user-name :count :is-active />
  </div>
</template>

<script setup lang="ts">
const id = ref('app')
const title = ref('Dashboard')
const userName = ref('Lucas')  // Matches :user-name (kebab-case)
const count = ref(42)
const isActive = ref(true)
</script>
```

**Avoid:**
```vue
<template>
  <div :id="id" :title="title">
    <MyComponent :user-name="userName" :count="count" :is-active="isActive" />
  </div>
</template>

<script setup lang="ts">
const id = ref('app')
const title = ref('Dashboard')
const userName = ref('Lucas')
const count = ref(42)
const isActive = ref(true)
</script>
```

**Rationale**: Same-name shorthand reduces visual noise and follows the familiar JavaScript ES6 object property shorthand pattern. It makes templates more concise when variable names already describe the bound attribute clearly. Note that kebab-case attributes (`:user-name`) automatically match camelCase variables (`userName`).
