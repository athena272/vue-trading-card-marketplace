<script setup lang="ts">
import { inject } from 'vue'
import type { Card } from '@/types'

defineProps<{
  card: Card
  selected?: boolean
}>()

const emit = defineEmits<{
  select: []
  'view-details': []
}>()

function onViewDetails(e: Event) {
  e.stopPropagation()
  emit('view-details')
}

const gridSize = inject<() => 'default' | 'compact'>('cardGridSize', () => 'default')
</script>

<template>
  <div
    class="card-display"
    :class="{ selected, compact: gridSize() === 'compact' }"
    role="button"
    tabindex="0"
    @click="emit('select')"
    @keydown.enter.space.prevent="emit('select')"
  >
    <button
      type="button"
      class="view-details-btn"
      aria-label="Ver detalhes da carta"
      @click="onViewDetails"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
    <img v-if="card.imageUrl" :src="card.imageUrl" :alt="card.name" class="card-image" />
    <div v-else class="card-image-placeholder">Sem imagem</div>
    <div class="card-info">
      <h3 class="card-name">{{ card.name }}</h3>
      <p v-if="card.description" class="card-desc">{{ card.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-display {
  position: relative;
  border: 2px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg-elevated);
  cursor: pointer;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal),
    background-color var(--transition-normal), transform var(--transition-normal);
}
.card-display:hover {
  border-color: var(--color-border);
  background: var(--color-bg-subtle);
  transform: scale(1.02);
  box-shadow: var(--shadow-md);
}
.card-display:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
.card-display.selected {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
  background: var(--color-primary-subtle);
}
.card-image {
  width: 100%;
  aspect-ratio: 421 / 614;
  object-fit: cover;
}
.card-image-placeholder {
  width: 100%;
  aspect-ratio: 421 / 614;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-subtle);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}
.card-info {
  padding: var(--space-3);
}
.card-name {
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-2);
  line-height: var(--line-height-tight);
}
.card-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-display.compact .card-info {
  padding: var(--space-2);
}
.card-display.compact .card-name {
  font-size: var(--text-xs);
  margin-bottom: var(--space-1);
}
.card-display.compact .card-desc {
  font-size: var(--text-xs);
  -webkit-line-clamp: 1;
}
.card-display.compact:hover {
  transform: scale(1.03);
}

.view-details-btn {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}
.view-details-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.05);
}
.view-details-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
.card-display.compact .view-details-btn {
  width: 28px;
  height: 28px;
  top: var(--space-1);
  right: var(--space-1);
}
.card-display.compact .view-details-btn svg {
  width: 16px;
  height: 16px;
}
</style>
