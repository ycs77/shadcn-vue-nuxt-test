<template>
  <SidebarProvider
    :style="{
      '--header-height': 'calc(var(--spacing) * 12 + 1px)',
    }"
  >
    <AppSidebar variant="inset" />
    <SidebarInset>
      <header class="flex h-(--header-height) shrink-0 bg-background items-center gap-1 border-b px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger class="-ml-1" />
        <Separator
          orientation="vertical"
          class="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <template v-for="(crumb, index) in breadcrumbs" :key="crumb.title">
              <BreadcrumbSeparator v-if="index > 0" class="hidden md:block" />
              <BreadcrumbItem :class="{ 'hidden md:block': index < breadcrumbs.length - 1 }">
                <BreadcrumbLink v-if="crumb.url" :href="crumb.url">
                  {{ crumb.title }}
                </BreadcrumbLink>
                <BreadcrumbPage v-else>
                  {{ crumb.title }}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="@container/main flex-1 p-4">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
  <AppToaster />
</template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import AppToaster from '@/components/AppToaster.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const appConfig = useAppConfig()
const route = useRoute()

useSeoMeta({
  titleTemplate: `%s - ${appConfig.title}`,
  description: appConfig.description,
})

const breadcrumbs = computed(() => {
  return (route.meta.breadcrumbs as { title: string, url?: string }[]) ?? []
})
</script>
