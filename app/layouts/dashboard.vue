<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex sticky z-1 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
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
      <div class="flex-1 p-4">
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
  titleTemplate: `%s - ${appConfig.name}`,
  description: appConfig.description,
})

const breadcrumbs = computed(() => {
  return (route.meta.breadcrumbs as { title: string, url?: string }[]) ?? []
})
</script>
