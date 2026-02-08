import { users } from './users'

export const currentUser = users.find(u => u.id === 1)!
