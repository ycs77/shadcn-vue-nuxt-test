<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">
        Categories
      </h1>
      <Button @click="openCreateDialog">
        <Plus class="mr-2 h-4 w-4" />
        New Category
      </Button>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead class="w-[100px]">
              Posts
            </TableHead>
            <TableHead class="w-[70px]">
              <span class="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty v-if="categoriesWithCount.length === 0" :colspan="3">
            No categories found.
          </TableEmpty>
          <TableRow v-for="category in categoriesWithCount" :key="category.id">
            <TableCell class="font-medium">
              {{ category.name }}
            </TableCell>
            <TableCell>{{ category.postCount }}</TableCell>
            <TableCell>
              <CategoryActions
                @edit="openEditDialog(category)"
                @delete="openDeleteDialog(category)"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Create/Edit Dialog -->
    <CategoryFormDialog
      v-model:open="formDialogOpen"
      :category="editingCategory"
      :is-loading="isSubmitting"
      @submit="handleFormSubmit"
    />

    <!-- Delete Dialog -->
    <CategoryDeleteDialog
      v-model:open="deleteDialogOpen"
      :category-name="deletingCategory?.name ?? ''"
      :is-loading="isDeleting"
      @confirmed="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~~/shared/types/category'
import { Plus } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import CategoryActions from '@/components/dashboard/categories/CategoryActions.vue'
import CategoryDeleteDialog from '@/components/dashboard/categories/CategoryDeleteDialog.vue'
import CategoryFormDialog from '@/components/dashboard/categories/CategoryFormDialog.vue'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

definePageMeta({
  layout: 'dashboard',
  breadcrumbs: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Posts', url: '/dashboard/posts' },
    { title: 'Categories' },
  ],
})

useSeoMeta({
  title: 'Categories',
})

const { categoriesWithCount } = useCategories()

// Form dialog state
const formDialogOpen = ref(false)
const editingCategory = ref<Category | null>(null)
const isSubmitting = ref(false)

// Delete dialog state
const deleteDialogOpen = ref(false)
const deletingCategory = ref<Category | null>(null)
const isDeleting = ref(false)

function openCreateDialog() {
  editingCategory.value = null
  formDialogOpen.value = true
}

function openEditDialog(category: Category) {
  editingCategory.value = category
  formDialogOpen.value = true
}

function openDeleteDialog(category: Category) {
  deletingCategory.value = category
  deleteDialogOpen.value = true
}

async function handleFormSubmit(name: string) {
  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  if (editingCategory.value) {
    toast.success(`Category "${name}" updated successfully.`)
  } else {
    toast.success(`Category "${name}" created successfully.`)
  }

  isSubmitting.value = false
  formDialogOpen.value = false
}

async function handleDelete() {
  if (!deletingCategory.value) return

  isDeleting.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  toast.success(`Category "${deletingCategory.value.name}" deleted successfully.`)

  isDeleting.value = false
  deleteDialogOpen.value = false
  deletingCategory.value = null
}
</script>
