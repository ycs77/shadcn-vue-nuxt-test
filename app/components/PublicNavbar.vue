<template>
  <nav class="border-b border-[#1A1A1A]/10">
    <div class="mx-auto flex max-w-2xl items-center justify-between px-6 py-6">
      <NuxtLink to="/" class="text-xl font-bold tracking-tight text-[#1A1A1A]">
        {{ appConfig.title }}
      </NuxtLink>
      <NuxtLink to="/login" class="cursor-pointer text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
        Sign In
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>
