<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="loader-wrap">
    <div class="spinner" aria-hidden="true" />
    <p v-if="message" class="message">{{ message }}</p>
    <p v-else class="message">Carregando...</p>
  </div>
</template>

<style scoped>
.loader-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #444;
  border-top-color: #0a7;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.message {
  color: #aaa;
  font-size: 0.95rem;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
