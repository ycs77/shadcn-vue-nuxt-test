import type { Model } from './model'

export interface User extends Model {
  id: number
  avatar: string
  name: string
  email: string
  bio: string
  role: 'admin' | 'user'
  createdAt: string
}
