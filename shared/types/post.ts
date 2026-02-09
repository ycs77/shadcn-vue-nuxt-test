import type { Model } from './model'

export interface Post extends Model {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  authorBio: string
  readTime: string
  body: string[]
  categoryId: number
  status: 'published' | 'draft'
  views: number
}

export interface PostWithCategory extends Post {
  categoryName: string
}
