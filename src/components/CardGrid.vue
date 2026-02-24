<script setup lang="ts">
import type { Card } from '@/types'
import CardDisplay from './CardDisplay.vue'

defineProps<{
  cards: Card[]
  emptyMessage?: string
  selectable?: boolean
  selectedIds?: string[]
}>()

const emit = defineEmits<{
  select: [card: Card]
}>()
</script>

<template>
  <div v-if="cards.length === 0" class="empty">
    {{ emptyMessage ?? 'Nenhuma carta.' }}
  </div>
  <div v-else class="grid">
    <CardDisplay
      v-for="card in cards"
      :key="card.id"
      :card="card"
      :selected="selectable && selectedIds?.includes(card.id)"
      @select="emit('select', card)"
    />
  </div>
</template>

<style scoped>
.empty {
  color: #888;
  padding: 2rem;
  text-align: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}
</style>
