<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold tracking-tight">
      Settings
    </h1>

    <SettingsNav />

    <div class="max-w-2xl">
      <AccountForm
        :is-loading
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import AccountForm from '@/components/dashboard/settings/AccountForm.vue'
import SettingsNav from '@/components/dashboard/settings/SettingsNav.vue'

definePageMeta({
  layout: 'dashboard',
  breadcrumbs: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Settings', url: '/dashboard/settings/profile' },
    { title: 'Account' },
  ],
})

useSeoMeta({
  title: 'Account Settings',
})

const isLoading = ref(false)

async function handleSubmit() {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  toast.success('Password updated successfully.')
  isLoading.value = false
}
</script>
