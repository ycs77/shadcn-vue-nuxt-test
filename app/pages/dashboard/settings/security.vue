<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold tracking-tight">
      Settings
    </h1>

    <SettingsNav />

    <div class="max-w-2xl">
      <SecurityForm
        :is-loading
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import SecurityForm from '@/components/dashboard/settings/SecurityForm.vue'
import SettingsNav from '@/components/dashboard/settings/SettingsNav.vue'

definePageMeta({
  layout: 'dashboard',
  breadcrumbs: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Settings', url: '/dashboard/settings/profile' },
    { title: 'Security' },
  ],
})

useSeoMeta({
  title: 'Security Settings',
})

const isLoading = ref(false)

async function handleSubmit() {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  toast.success('Password updated successfully.')
  isLoading.value = false
}
</script>
