<script setup lang="ts">
import type { Card } from '@/types'

defineProps<{
  card: Card
  selected?: boolean
}>()

defineEmits<{
  select: []
}>()
</script>

<template>
  <div
    class="card-display"
    :class="{ selected }"
    @click="$emit('select')"
  >
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
  border: 2px solid #444;
  border-radius: 8px;
  overflow: hidden;
  background: #2a2a2a;
  cursor: pointer;
  transition: border-color 0.2s;
}
.card-display:hover {
  border-color: #666;
}
.card-display.selected {
  border-color: #0a7;
  box-shadow: 0 0 0 1px #0a7;
}
.card-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
.card-image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  color: #888;
}
.card-info {
  padding: 0.75rem;
}
.card-name {
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}
.card-desc {
  font-size: 0.8rem;
  color: #aaa;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
