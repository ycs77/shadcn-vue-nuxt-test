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
import type { ColumnDef, FilterFn, SortingFn } from '@tanstack/vue-table'
import type { User } from '~~/shared/types/user'
import type { DataTableFilter } from '@/components/data-table/DataTable.vue'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import DataTable from '@/components/data-table/DataTable.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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

const nameFilterFn: FilterFn<User> = (row, _columnId, filterValue) => {
  const search = filterValue.toLowerCase()
  return (
    row.original.name.toLowerCase().includes(search) ||
    row.original.email.toLowerCase().includes(search)
  )
}

const roleFilterFn: FilterFn<User> = (row, _columnId, filterValue) => {
  return row.original.role === filterValue
}

const dateSortingFn: SortingFn<User> = (rowA, rowB) => {
  const dateA = new Date(rowA.original.createdAt).getTime()
  const dateB = new Date(rowB.original.createdAt).getTime()
  return dateA - dateB
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatar',
    header: '',
    cell: ({ row }) => {
      const user = row.original
      return h('div', { class: 'flex items-center' }, h(Avatar, { class: 'h-8 w-8' }, () => [
        h(AvatarImage, { src: user.avatar, alt: user.name }),
        h(AvatarFallback, () => user.name.charAt(0).toUpperCase()),
      ]))
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('name')),
    filterFn: nameFilterFn,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', row.getValue('email')),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue<string>('role')
      return h(Badge, {
        variant: role === 'admin' ? 'default' : 'secondary',
      }, () => role === 'admin' ? 'Admin' : 'User')
    },
    filterFn: roleFilterFn,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Registration Date', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', row.getValue('createdAt')),
    sortingFn: dateSortingFn,
  },
]
</script>
