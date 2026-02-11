import { users } from '~~/data/users'

export function useUsers() {
  const allUsers = computed(() => users)

  const roleOptions = computed(() => [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ])

  return {
    users: allUsers,
    roleOptions,
  }
}
