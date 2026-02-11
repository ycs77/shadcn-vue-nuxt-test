<template>
  <div class="flex items-center gap-4">
    <Avatar class="h-16 w-16">
      <AvatarImage :src="modelValue" alt="Avatar" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
    <Button type="button" variant="outline" size="sm" @click="triggerUpload">
      Change Avatar
    </Button>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    >
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const modelValue = defineModel<string>({ required: true })

const fileInput = ref<HTMLInputElement | null>(null)

function triggerUpload() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = e => {
    modelValue.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}
</script>
