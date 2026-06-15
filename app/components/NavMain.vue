<template>
  <SidebarGroup>
    <SidebarMenu>
      <template v-for="(item, index) in items" :key="item.title">
        <!-- Items with sub-items: collapsible -->
        <Collapsible
          v-if="item.items?.length"
          v-model:open="openStates[index]"
          as-child
          class="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton :tooltip="item.title">
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                  <SidebarMenuSubButton as-child :is-active="matchActive(subItem.isActive)">
                    <NuxtLink :to="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        <!-- Items without sub-items: direct link -->
        <SidebarMenuItem v-else>
          <SidebarMenuButton as-child :tooltip="item.title" :is-active="matchActive(item.isActive)">
            <NuxtLink :to="item.url">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>

<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue'
import { ChevronRight } from '@lucide/vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

const props = defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: string
    items?: {
      title: string
      url: string
      isActive?: string
    }[]
  }[]
}>()

const route = useRoute()

function matchActive(pattern?: string) {
  if (!pattern) return false
  return new RegExp(pattern).test(route.path)
}

function isGroupActive(item: { items?: { isActive?: string }[] }) {
  return item.items?.some(subItem => matchActive(subItem.isActive)) ?? false
}

const openStates = reactive<Record<number, boolean>>(
  Object.fromEntries(
    props.items.map((item, index) => [index, isGroupActive(item)]),
  ),
)

watch(() => route.path, () => {
  props.items.forEach((item, index) => {
    if (item.items?.length && isGroupActive(item)) {
      openStates[index] = true
    }
  })
})
</script>
