<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            class="data-[slot=sidebar-menu-button]:p-1.5!"
          >
            <a href="#">
              <Shell class="size-5" />
              <span class="text-base font-semibold">Acme Inc.</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  FileText,
  LayoutDashboard,
  Settings,
  Shell,
  Users,
} from 'lucide-vue-next'
import { currentUser } from '~~/data/current-user'
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'offcanvas',
})

const data = {
  user: currentUser,
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      isActive: '^/dashboard$',
    },
    {
      title: 'Posts',
      url: '#',
      icon: FileText,
      items: [
        {
          title: 'All Posts',
          url: '/dashboard/posts',
          isActive: '^/dashboard/posts(/|$)',
        },
        {
          title: 'Categories',
          url: '/dashboard/categories',
          isActive: '^/dashboard/categories(/|$)',
        },
      ],
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: Users,
      isActive: '^/dashboard/users(/|$)',
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'Profile',
          url: '/dashboard/settings/profile',
          isActive: '^/dashboard/settings/profile(/|$)',
        },
        {
          title: 'Security',
          url: '/dashboard/settings/security',
          isActive: '^/dashboard/settings/security(/|$)',
        },
      ],
    },
  ],
}
</script>
