import type { User } from '~~/shared/types/user'
import { currentUser } from '~~/data/current-user'

export function useCurrentUser() {
  const user = ref<User>({ ...currentUser })

  function updateProfile(values: { name: string, bio: string, avatar: string }) {
    user.value = {
      ...user.value,
      ...values,
    }
  }

  return {
    user,
    updateProfile,
  }
}
