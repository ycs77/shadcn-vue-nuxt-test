<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold tracking-tight">
      New Post
    </h1>

    <div class="max-w-2xl">
      <PostForm :is-loading="isSubmitting" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostFormValues } from '@/components/dashboard/posts/PostForm.vue'
import { toast } from 'vue-sonner'
import PostForm from '@/components/dashboard/posts/PostForm.vue'

definePageMeta({
  layout: 'dashboard',
  breadcrumbs: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Posts', url: '/dashboard/posts' },
    { title: 'New Post' },
  ],
})

useSeoMeta({
  title: 'New Post',
})

const isSubmitting = ref(false)

async function handleSubmit(values: PostFormValues) {
  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  toast.success(`Post "${values.title}" created successfully.`)

  isSubmitting.value = false
  navigateTo('/dashboard/posts')
}
</script>
