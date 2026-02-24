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
  gap: var(--space-4);
  padding: var(--space-6);
}
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border-strong);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.message {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
