<script setup lang="ts">
import FormAdd from '@/components/FormAdd.vue'
import { useStore } from '@/stores/users'
const store = useStore()
</script>

<template>
  <div class="modal-wrapper" @click="store.toggleModalShow">
    <div class="modal-content" @click.stop>
      <p class="madal-name">Добавление пользователя</p>
      <button type="button" class="close-btn" @click="store.toggleModalShow">
        <img width="30" height="30" src="../assets/images/close-modal__icon.png" alt="" />
      </button>
      <FormAdd class="form-add" />
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
  height: 300px;
  position: relative;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
}

.madal-name {
  text-align: center;
  margin: 0;
  font-size: 24px;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  background: transparent;
  padding: 5px;
}

.close-btn:hover {
  transform: scale(1.1);
  transition: 0.2s ease-in-out;
}

.form-add {
  margin-top: 50px;
}
</style>
