<script setup lang="ts">
import { provide } from 'vue'
import type { Card } from '@/types'
import CardDisplay from './CardDisplay.vue'

const props = withDefaults(
  defineProps<{
    cards: Card[]
    emptyMessage?: string
    selectable?: boolean
    selectedIds?: string[]
    size?: 'default' | 'compact'
  }>(),
  { size: 'default' }
)

provide('cardGridSize', () => props.size)

const emit = defineEmits<{
  select: [card: Card]
  'view-details': [card: Card]
}>()
</script>

<template>
  <div v-if="cards.length === 0" class="empty">
    {{ emptyMessage ?? 'Nenhuma carta.' }}
  </div>
  <div v-else class="grid" :class="size">
    <CardDisplay
      v-for="card in cards"
      :key="card.id"
      :card="card"
      :selected="selectable && selectedIds?.includes(card.id)"
      @select="emit('select', card)"
      @view-details="() => emit('view-details', card)"
    />
  </div>
</template>

<style scoped>
.empty {
  color: var(--color-text-muted);
  padding: var(--space-6);
  text-align: center;
  font-size: var(--text-sm);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-5);
  max-width: 100%;
}
.grid.compact {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-3);
}
</style>
