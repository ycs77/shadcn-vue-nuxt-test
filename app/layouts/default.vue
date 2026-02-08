<template>
  <div>
    <slot />
  </div>
  <AppToaster />
</template>

<script setup lang="ts">
import AppToaster from '@/components/AppToaster.vue'
</script>
