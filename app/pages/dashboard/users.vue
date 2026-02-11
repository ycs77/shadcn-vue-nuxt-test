<template>
  <div class="space-y-4">
    <h1 class="text-3xl font-bold tracking-tight">
      Users
    </h1>

    <DataTable
      :columns
      :data="users"
      empty-text="No users found."
      searchable
      search-column="name"
      search-placeholder="Search users..."
      :filters
      paginated
    />
  </div>
</template>

<script setup lang="ts">
import type { DataTableFilter } from '@/components/data-table/DataTable.vue'
import { createColumns } from '@/components/dashboard/users/columns'
import DataTable from '@/components/data-table/DataTable.vue'

definePageMeta({
  layout: 'dashboard',
  breadcrumbs: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Users' },
  ],
})

useSeoMeta({
  title: 'Users',
})

const { users, roleOptions } = useUsers()

const filters = computed<DataTableFilter[]>(() => [
  {
    column: 'role',
    label: 'Roles',
    options: roleOptions.value,
  },
])

const columns = createColumns()
</script>
