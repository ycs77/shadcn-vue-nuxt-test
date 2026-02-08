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

    <DataTable
      :columns
      :data="categoriesWithCount"
      empty-text="No categories found."
    />

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
import type { Ref } from 'vue'
import type { Category } from '~~/shared/types/category'
import { Plus } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import CategoryDeleteDialog from '@/components/dashboard/categories/CategoryDeleteDialog.vue'
import CategoryFormDialog from '@/components/dashboard/categories/CategoryFormDialog.vue'
import { createColumns } from '@/components/dashboard/categories/columns'
import DataTable from '@/components/data-table/DataTable.vue'
import { Button } from '@/components/ui/button'

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

const columns = createColumns({
  onEdit: openEditDialog,
  onDelete: openDeleteDialog,
})

// Form dialog state
const formDialogOpen = ref(false)
const editingCategory = ref(null) as Ref<Category | null>
const isSubmitting = ref(false)

// Delete dialog state
const deleteDialogOpen = ref(false)
const deletingCategory = ref(null) as Ref<Category | null>
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
