<script setup lang="ts">
import { useStore } from '@/stores/users'
import TogglerBtn from '@/components/AppButton.vue'
import UsersTable from '@/components/UsersTable.vue'
import FormModal from '@/components/FormModal.vue'

const store = useStore()
</script>

<template>
  <main class="main-container">
    <h1 class="title">Тестовое задание для компании "ROISTAT" / Frontend-developer</h1>
    <div class="togglers">
      <TogglerBtn class="show-modal-btn" @click="store.toggleModalShow">
        Добавить
      </TogglerBtn>
      <TogglerBtn class="reset-btn" @click="store.resetUsers">
        Сбросить
      </TogglerBtn>
    </div>
    <p v-if="store.sortedUsers.length === 0">Пока что здесь пусто. Добавьте пользователя :)</p>
    <UsersTable v-else />
    <transition name="modal-fade">
      <FormModal class="modal" v-show="store.isShowModal" />
    </transition>
  </main>
</template>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 0;
}

.togglers {
  border: 1px solid black;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  background-color: rgb(255, 255, 255);
  padding: 15px;
  border-radius: 15px;
  display: flex;
  gap: 30px;
  align-items: center;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
