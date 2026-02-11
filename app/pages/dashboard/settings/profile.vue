<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold tracking-tight">
      Settings
    </h1>

    <SettingsNav />

    <div class="max-w-2xl">
      <ProfileForm
        :user
        :is-loading
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileFormValues } from '@/components/dashboard/settings/ProfileForm.vue'
import { toast } from 'vue-sonner'
import ProfileForm from '@/components/dashboard/settings/ProfileForm.vue'
import SettingsNav from '@/components/dashboard/settings/SettingsNav.vue'

definePageMeta({
  layout: 'dashboard',
  breadcrumbs: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Settings', url: '/dashboard/settings/profile' },
    { title: 'Profile' },
  ],
})

useSeoMeta({
  title: 'Profile Settings',
})

const { user, updateProfile } = useCurrentUser()
const isLoading = ref(false)

async function handleSubmit(values: ProfileFormValues) {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  updateProfile(values)
  toast.success('Profile updated successfully.')
  isLoading.value = false
}
</script>
