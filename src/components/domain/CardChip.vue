<script setup lang="ts">
import type { Card } from '@/types'

defineProps<{
  card: Card
}>()

const emit = defineEmits<{
  'view-details': []
}>()

function onViewDetails(e: Event) {
  e.stopPropagation()
  emit('view-details')
}
</script>

<template>
  <div class="chip">
    <button
      type="button"
      class="view-details-btn"
      aria-label="Ver detalhes da carta"
      @click="onViewDetails"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
    <img
      v-if="card.imageUrl"
      :src="card.imageUrl"
      :alt="card.name"
      class="chip-thumb"
    />
    <div v-else class="chip-thumb-placeholder">?</div>
    <span class="chip-name">{{ card.name }}</span>
  </div>
</template>

<style scoped>
.chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  height: 96px;
  padding: var(--space-2) var(--space-4);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
  min-width: 0;
}

.view-details-btn {
  position: absolute;
  top: var(--space-1);
  right: var(--space-1);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}
.view-details-btn:hover {
  background: rgba(0, 0, 0, 0.75);
}
.view-details-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
.chip:hover {
  background: var(--color-bg-subtle);
  border-color: var(--color-border-strong);
}
.chip-thumb {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
.chip-thumb-placeholder {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-subtle);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  border-radius: var(--radius-sm);
}
.chip-name {
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
</style>
