<script setup lang="ts">
import { ref } from 'vue'
import TogglerBtn from './AppButton.vue'
import { useStore } from '@/stores/users'
import { getUserTemplate } from '@/helpers/users'

const store = useStore()
const user = ref(getUserTemplate())
const selectedParentId = ref<number | undefined>()

const addUser = () => {
  const newUser = {
    ...user.value,
    id: Date.now()
  }
  store.addUser(newUser, selectedParentId.value)
  store.toggleModalShow()
  user.value = getUserTemplate()
  selectedParentId.value = undefined
}
</script>

<template>
  <div>
    <form class="users__form" @submit.prevent="addUser">
      <input type="text" placeholder="Имя" required minlength="2" v-model="user.name" />
      <input type="tel" placeholder="Телефон" required minlength="10" v-model="user.phone" />
      <select v-model="selectedParentId">
        <option value="" :selected="!selectedParentId"></option>
        <option
          v-for="user in store.allUsersFlat"
          :key="user.id"
          :value="user.id"
          :selected="selectedParentId === user.id"
        >
          {{ user.name }}
        </option>
      </select>
      <TogglerBtn class="add-btn" type="submit">
        Сохранить
      </TogglerBtn>
    </form>
  </div>
</template>

<style scoped>
.users__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.users__form input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
}

.users__form select,
.users__form option {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
}
</style>
