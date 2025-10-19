<template>
  <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'

useSeoMeta({
  title: 'Login - shadcn-vue Demo',
  description: 'Login page demo using shadcn-vue login-01 block',
})
</script>
