import type { PostWithCategory } from '~~/shared/types/post'
import { categories } from '~~/data/categories'
import { posts } from '~~/data/posts'

export function usePosts() {
  const postsWithCategory = computed<PostWithCategory[]>(() => {
    return posts.map(post => ({
      ...post,
      categoryName: categories.find(c => c.id === post.categoryId)?.name ?? 'Unknown',
    }))
  })

  const categoryOptions = computed(() => {
    return categories.map(c => ({
      label: c.name,
      value: String(c.id),
    }))
  })

  function getPostById(id: number): PostWithCategory | undefined {
    return postsWithCategory.value.find(p => p.id === id)
  }

  return {
    postsWithCategory,
    categoryOptions,
    getPostById,
  }
}
