<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">
        Posts
      </h1>
      <Button as-child>
        <NuxtLink to="/dashboard/posts/create">
          <Plus class="mr-2 h-4 w-4" />
          New Post
        </NuxtLink>
      </Button>
    </div>

    <DataTable
      :columns
      :data="postsWithCategory"
      empty-text="No posts found."
      searchable
      search-column="title"
      search-placeholder="Search posts..."
      :filters
      paginated
    />

    <PostDeleteDialog
      v-model:open="deleteDialogOpen"
      :post-title="deletingPost?.title ?? ''"
      :is-loading="isDeleting"
      @confirmed="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { PostWithCategory } from '~~/shared/types/post'
import type { DataTableFilter } from '@/components/data-table/DataTable.vue'
import { Plus } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { createColumns } from '@/components/dashboard/posts/columns'
import PostDeleteDialog from '@/components/dashboard/posts/PostDeleteDialog.vue'
import DataTable from '@/components/data-table/DataTable.vue'
import { Button } from '@/components/ui/button'

definePageMeta({
  layout: 'dashboard',
  breadcrumbs: [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Posts' },
  ],
})

useSeoMeta({
  title: 'Posts',
})

const { postsWithCategory, categoryOptions } = usePosts()

const filters = computed<DataTableFilter[]>(() => [
  {
    column: 'categoryName',
    label: 'Categories',
    options: categoryOptions.value,
  },
  {
    column: 'status',
    label: 'Status',
    options: [
      { label: 'Published', value: 'published' },
      { label: 'Draft', value: 'draft' },
    ],
  },
])

const columns = createColumns({
  onEdit: (post: PostWithCategory) => {
    navigateTo(`/dashboard/posts/${post.id}/edit`)
  },
  onDelete: openDeleteDialog,
})

// Delete dialog state
const deleteDialogOpen = ref(false)
const deletingPost = ref(null) as Ref<PostWithCategory | null>
const isDeleting = ref(false)

function openDeleteDialog(post: PostWithCategory) {
  deletingPost.value = post
  deleteDialogOpen.value = true
}

async function handleDelete() {
  if (!deletingPost.value) return

  isDeleting.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  toast.success(`Post "${deletingPost.value.title}" deleted successfully.`)

  isDeleting.value = false
  deleteDialogOpen.value = false
  deletingPost.value = null
}
</script>
