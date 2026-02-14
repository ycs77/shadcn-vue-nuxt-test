<template>
  <div>
    <!-- Toolbar: search + filters -->
    <div v-if="searchable || filters?.length" class="flex items-center justify-between gap-2 py-4">
      <Input
        v-if="searchable"
        class="max-w-sm"
        :placeholder="searchPlaceholder"
        :model-value="table.getColumn(searchColumn!)?.getFilterValue() as string"
        @update:model-value="table.getColumn(searchColumn!)?.setFilterValue($event)"
      />
      <div v-if="filters?.length" class="ml-auto flex items-center gap-2">
        <Select
          v-for="filter in filters"
          :key="filter.column"
          :model-value="(table.getColumn(filter.column)?.getFilterValue() as string) ?? 'all'"
          @update:model-value="table.getColumn(filter.column)?.setFilterValue($event === 'all' ? undefined : $event)"
        >
          <SelectTrigger class="w-[160px]">
            <SelectValue :placeholder="`All ${filter.label}`" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All {{ filter.label }}
            </SelectItem>
            <SelectItem v-for="option in filter.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableEmpty :colspan="table.getAllColumns().length">
              {{ emptyText }}
            </TableEmpty>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <DataTablePagination v-if="paginated" :table class="py-4" />
  </div>
</template>

<script setup lang="ts" generic="TData extends Model, TValue">
import type { ColumnDef, ColumnFiltersState, RowSelectionState, SortingState } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import type { Model } from '~~/shared/types/model'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { valueUpdater } from '@/components/ui/table/utils'

export interface DataTableFilter {
  column: string
  label: string
  options: { label: string, value: string }[]
}

const props = withDefaults(defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  emptyText?: string
  searchable?: boolean
  searchColumn?: string
  searchPlaceholder?: string
  filters?: DataTableFilter[]
  paginated?: boolean
}>(), {
  emptyText: 'No results.',
  searchPlaceholder: 'Search...',
})

const sorting = ref([]) as Ref<SortingState>
const columnFilters = ref([]) as Ref<ColumnFiltersState>
const rowSelection = ref({}) as Ref<RowSelectionState>

const selectColumn: ColumnDef<TData, TValue> = {
  id: 'select',
  header: ({ table }) => h(Checkbox, {
    checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
    'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
    ariaLabel: 'Select all',
  }),
  cell: ({ row }) => h(Checkbox, {
    checked: row.getIsSelected(),
    'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
    ariaLabel: 'Select row',
  }),
  enableSorting: false,
  enableHiding: false,
}

const columnsWithSelect = computed<ColumnDef<TData, TValue>[]>(() => [
  selectColumn,
  ...props.columns,
])

const table = useVueTable({
  get data() { return props.data },
  get columns() { return columnsWithSelect.value },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get rowSelection() { return rowSelection.value },
  },
})
</script>
