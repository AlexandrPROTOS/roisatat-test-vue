<template>
  <button class="app-button" type="button">
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.app-button:hover {
  background-color: #377f3a;
}
</style>
