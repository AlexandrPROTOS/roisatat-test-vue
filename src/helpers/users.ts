import type { User } from '@/stores/users'

export const getAllUsersFlat = (users: User[]): User[] => {
  const allUsers: User[] = []
  users.forEach((user) => {
    allUsers.push(user)
    allUsers.push(...getAllUsersFlat(user.children))
  })
  return allUsers
}

export const userTemplate: User = {
  id: 0,
  name: '',
  phone: '',
  children: []
}

export const getUserTemplate = (): User => {
  return JSON.parse(JSON.stringify(userTemplate))
}
