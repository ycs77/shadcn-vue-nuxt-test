import type { ColumnDef } from '@tanstack/vue-table'
import type { CategoryWithCount } from '~~/shared/types/category'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import DataTableDropdown from '@/components/data-table/DataTableDropdown.vue'
import { Button } from '@/components/ui/button'

interface CreateColumnsOptions {
  onEdit: (row: any) => void
  onDelete: (row: any) => void
}

export function createColumns({ onEdit, onDelete }: CreateColumnsOptions): ColumnDef<CategoryWithCount>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => h('div', row.getValue('id')),
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
    },
    {
      accessorKey: 'postCount',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Posts', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', row.getValue('postCount')),
    },
    {
      id: 'actions',
      enableSorting: false,
      enableHiding: false,
      header: () => h('span', { class: 'sr-only' }, 'Actions'),
      cell: ({ row }) => {
        return h('div', { class: 'relative' }, h(DataTableDropdown, {
          row: row.original,
          onEdit,
          onDelete,
        }))
      },
    },
  ]
}
