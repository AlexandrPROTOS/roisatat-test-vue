<script setup lang="ts">
import { useStore } from '@/stores/users'
import UsersTableUser from '@/components/UsersTableUser.vue'
import { SortingOrder } from '@/stores/users'

const store = useStore()
</script>

<template>
  <div class="users">
    <table class="users__table">
      <caption>Пользователи</caption>
      <thead>
        <tr>
          <th @click="store.setSortField('name')">
            Имя
            <span v-if="store.isUseSort && store.sortingField === 'name'">
              {{ store.sortingOrder === SortingOrder.ASC ? '▲' : '▼' }}
            </span>
          </th>
          <th @click="store.setSortField('phone')">
            Телефон
            <span v-if="store.isUseSort && store.sortingField === 'phone'">
              {{ store.sortingOrder === SortingOrder.ASC ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <UsersTableUser
          v-for="user in store.sortedUsers"
          :key="user.id"
          :user="user"
          :is-child="false"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.users {
  margin: 20px;
}

.users__table {
  min-width: 500px;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
}

.users__table caption {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
}

.users__table th,
.users__table tr {
  border: 1px solid black;
  padding: 12px;
  text-align: left;
}

.users__table th {
  font-weight: bold;
  cursor: pointer;
}
</style>
