export interface Post {
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
