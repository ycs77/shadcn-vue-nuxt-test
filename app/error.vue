<template>
  <div class="min-h-screen bg-[#FDFBF7] font-[Merriweather]">
    <PublicNavbar />

    <div class="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 class="text-2xl font-bold text-[#1A1A1A]">
        {{ error.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
      </h1>
      <p class="mt-3 text-sm text-[#6B7280]">
        {{ error.statusCode === 404 ? 'The page you\'re looking for doesn\'t exist.' : error.message }}
      </p>
      <button
        class="mt-6 inline-block cursor-pointer text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]"
        @click="handleError"
      >
        Back to home
      </button>
    </div>

    <PublicFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: `${props.error.statusCode === 404 ? 'Page Not Found' : 'Error'} - Papyrus`,
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>
