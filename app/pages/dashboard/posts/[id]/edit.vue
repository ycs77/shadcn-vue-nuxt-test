<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold tracking-tight">
      Edit Post
    </h1>

    <div class="max-w-2xl">
      <PostForm :post :is-loading="isSubmitting" @submit="handleSubmit" />
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
    { title: 'Edit Post' },
  ],
})

useSeoMeta({
  title: 'Edit Post',
})

const route = useRoute()
const { getPostById } = usePosts()

const postId = Number(route.params.id)
const post = getPostById(postId)

if (!post) {
  navigateTo('/dashboard/posts')
}

const isSubmitting = ref(false)

async function handleSubmit(values: PostFormValues) {
  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  toast.success(`Post "${values.title}" updated successfully.`)

  isSubmitting.value = false
  navigateTo('/dashboard/posts')
}
</script>
