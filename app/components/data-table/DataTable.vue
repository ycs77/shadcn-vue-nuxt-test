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
    <div v-if="paginated" class="flex items-center justify-between px-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="text-sm font-medium">
            Rows per page
          </p>
          <Select
            :model-value="`${table.getState().pagination.pageSize}`"
            @update:model-value="table.setPageSize(Number($event))"
          >
            <SelectTrigger class="h-8 w-[70px]">
              <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
                {{ pageSize }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </div>
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            :disabled="!table.getCanPreviousPage()"
            @click="table.setPageIndex(0)"
          >
            <span class="sr-only">Go to first page</span>
            <ChevronsLeft class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="h-8 w-8 p-0"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            <span class="sr-only">Go to previous page</span>
            <ChevronLeft class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="h-8 w-8 p-0"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            <span class="sr-only">Go to next page</span>
            <ChevronRight class="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            :disabled="!table.getCanNextPage()"
            @click="table.setPageIndex(table.getPageCount() - 1)"
          >
            <span class="sr-only">Go to last page</span>
            <ChevronsRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="TData extends Model, TValue">
import type { ColumnDef, ColumnFiltersState, RowSelectionState, SortingState } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import type { Model } from '~~/shared/types/model'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@lucide/vue'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
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
    modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
    'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
    ariaLabel: 'Select all',
  }),
  cell: ({ row }) => h(Checkbox, {
    modelValue: row.getIsSelected(),
    'onUpdate:modelValue': value => row.toggleSelected(!!value),
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
