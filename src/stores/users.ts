import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { getAllUsersFlat } from '@/helpers/users'

const USERS_LS_KEY = 'users';
export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc'
}
type SortingField = 'name' | 'phone';

export type User = {
  id: number
  name: string
  phone: string
  children: User[]
}

export const useStore = defineStore('store', () => {
  const users = ref<User[]>([])
  const isShowModal = ref(false)

  const allUsersFlat = computed<User[]>(() => getAllUsersFlat(users.value))

  const storedUsers = localStorage.getItem(USERS_LS_KEY)
  if (storedUsers) {
    users.value = JSON.parse(storedUsers)
  }

  watch(
    users,
    (newUsers) => {
      localStorage.setItem(USERS_LS_KEY, JSON.stringify(newUsers))
    },
    { deep: true }
  )

  function toggleModalShow() {
    isShowModal.value = !isShowModal.value
  }

  function resetUsers() {
    users.value = []
  }

  function addUser(userTemplate: User, parentId?: number) {
    if (parentId) {
      const parent = allUsersFlat.value.find((user) => user.id === parentId)
      if (parent) {
        parent.children.push(userTemplate)
        return
      }
    }
    users.value.push(userTemplate)
  }

  const isUseSort = ref(false)
  const sortingField = ref<SortingField>('name')
  const sortingOrder = ref<SortingOrder.ASC | SortingOrder.DESC>(SortingOrder.DESC)

  const sortUsers = (users: User[]): User[] => {
    const usersCopy = [...users]
    const sortedUsers = usersCopy.sort((a, b) => {
      if (a[sortingField.value] < b[sortingField.value])
        return sortingOrder.value === SortingOrder.ASC ? -1 : 1
      if (a[sortingField.value] > b[sortingField.value])
        return sortingOrder.value === SortingOrder.ASC ? 1 : -1
      return 0
    })
    sortedUsers.forEach((user) => {
      user.children = sortUsers(user.children)
    })
    return sortedUsers
  }

  const sortedUsers = computed(() => {
    if (!isUseSort.value) {
      return users.value
    }
    return sortUsers(users.value)
  })

  function setSortField(field: SortingField) {
    isUseSort.value = true
    if (sortingField.value === field) {
      sortingOrder.value = sortingOrder.value === SortingOrder.ASC ? SortingOrder.DESC : SortingOrder.ASC
    } else {
      sortingField.value = field
      sortingOrder.value = SortingOrder.ASC
    }
  }

  return {
    allUsersFlat,
    isShowModal,
    toggleModalShow,
    resetUsers,
    addUser,
    sortedUsers,
    setSortField,
    isUseSort,
    sortingField,
    sortingOrder
  }
})
