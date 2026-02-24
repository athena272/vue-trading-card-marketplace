<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'error' | 'warning' | 'success' | 'info'
  }>(),
  { type: 'info' }
)
</script>

<template>
  <div class="alert" :class="type" role="alert">
    <slot />
  </div>
</template>

<style scoped>
.alert {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-size: var(--text-sm);
  line-height: var(--line-height-normal);
}
.error {
  background: var(--color-danger-subtle);
  border-color: var(--color-danger);
  color: #fca5a5;
}
.warning {
  background: rgba(234, 179, 8, 0.12);
  border-color: var(--color-warning);
  color: #fde047;
}
.success {
  background: var(--color-primary-subtle);
  border-color: var(--color-primary);
  color: #86efac;
}
.info {
  background: rgba(59, 130, 246, 0.12);
  border-color: var(--color-info);
  color: #93c5fd;
}
</style>
