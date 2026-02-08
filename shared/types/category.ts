import type { Model } from './model'

export interface Category extends Model {
  id: number
  name: string
}

export interface CategoryWithCount extends Category {
  postCount: number
}
