export interface User {
  id: number
  avatar: string
  name: string
  email: string
  bio: string
  role: 'admin' | 'user'
  createdAt: string
}
