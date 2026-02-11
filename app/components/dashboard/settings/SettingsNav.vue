<template>
  <nav class="flex gap-4 border-b">
    <NuxtLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="border-b-2 px-1 pb-2 text-sm font-medium transition-colors"
      :class="isActive(tab.to)
        ? 'border-primary text-foreground'
        : 'border-transparent text-muted-foreground hover:text-foreground'"
    >
      {{ tab.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const tabs = [
  { label: 'Profile', to: '/dashboard/settings/profile' },
  { label: 'Account', to: '/dashboard/settings/account' },
]

function isActive(path: string) {
  return route.path === path
}
</script>
