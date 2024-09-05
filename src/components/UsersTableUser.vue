<script setup lang="ts">
import type { User } from '@/stores/users'
import { computed } from 'vue'

const props = defineProps<{ user: User; lvl?: number }>()

const indent = computed(() => {
  const level = props.lvl || 0
  return `padding-left: ${level * 10}px;`
})
</script>

<template>
  <tr>
    <td :style="indent">
      <span v-if="lvl">{{ lvl }}</span> {{ user.name }}
    </td>
    <td>{{ user.phone }}</td>
  </tr>
  <UsersTableUser
    v-for="user in user.children"
    :key="user.id"
    :user="user"
    :lvl="lvl ? lvl + 1 : 1"
  />
</template>

<style scoped>
td,
tr {
  border: 1px solid black;
  padding: 12px;
  text-align: left;
}
</style>
