import type { ColumnDef, FilterFn, SortingFn } from '@tanstack/vue-table'
import type { PostWithCategory } from '~~/shared/types/post'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import DataTableDropdown from '@/components/data-table/DataTableDropdown.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CreateColumnsOptions {
  onEdit: (row: any) => void
  onDelete: (row: any) => void
}

const categoryFilterFn: FilterFn<PostWithCategory> = (row, _columnId, filterValue) => {
  return String(row.original.categoryId) === filterValue
}

const statusFilterFn: FilterFn<PostWithCategory> = (row, _columnId, filterValue) => {
  return row.original.status === filterValue
}

const dateSortingFn: SortingFn<PostWithCategory> = (rowA, rowB) => {
  const dateA = new Date(rowA.original.date).getTime()
  const dateB = new Date(rowB.original.date).getTime()
  return dateA - dateB
}

export function createColumns({ onEdit, onDelete }: CreateColumnsOptions): ColumnDef<PostWithCategory>[] {
  return [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['ID', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', row.getValue('id')),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => h('div', { class: 'max-w-[300px] truncate font-medium' }, row.getValue('title')),
    },
    {
      accessorKey: 'categoryName',
      header: 'Category',
      cell: ({ row }) => h('div', row.getValue('categoryName')),
      filterFn: categoryFilterFn,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue<string>('status')
        return h(Badge, {
          variant: status === 'published' ? 'default' : 'secondary',
        }, () => status === 'published' ? 'Published' : 'Draft')
      },
      filterFn: statusFilterFn,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Date', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', row.getValue('date')),
      sortingFn: dateSortingFn,
    },
    {
      accessorKey: 'views',
      header: ({ column }) => {
        return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Views', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
      },
      cell: ({ row }) => h('div', Number(row.getValue('views')).toLocaleString()),
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
