<script setup lang="ts">
withDefaults(
  defineProps<{
    padding?: 'none' | 'sm' | 'md'
  }>(),
  { padding: 'md' }
)
</script>

<template>
  <div class="card" :class="padding">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-fast);
}
.card:hover {
  box-shadow: var(--shadow-md);
}
.card.none {
  padding: 0;
}
.card.sm {
  padding: var(--space-3);
}
.card.md {
  padding: var(--space-4);
}
.card:not(.none):not(.sm):not(.md) {
  padding: var(--space-4);
}
</style>
