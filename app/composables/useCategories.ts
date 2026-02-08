import { categories } from '~~/data/categories'
import { posts } from '~~/data/posts'

export function useCategories() {
  const categoriesWithCount = computed(() => {
    return categories.map(category => ({
      ...category,
      postCount: posts.filter(post => post.categoryId === category.id).length,
    }))
  })

  return {
    categoriesWithCount,
  }
}
