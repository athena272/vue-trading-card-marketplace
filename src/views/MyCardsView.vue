<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserCardsStore } from '@/stores/userCardsStore'
import type { Card } from '@/types'
import CardGrid from '@/components/domain/CardGrid.vue'
import CardDetailsModal from '@/components/domain/CardDetailsModal.vue'
import AddCardsForm from '@/components/AddCardsForm.vue'
import AppLoader from '@/components/ui/AppLoader.vue'

const userCardsStore = useUserCardsStore()
const detailsCard = ref<Card | null>(null)

function onViewDetails(card: Card) {
  detailsCard.value = card
}

onMounted(() => {
  userCardsStore.fetchCards().catch(() => {})
})
</script>

<template>
  <div class="my-cards">
    <h1>Minhas cartas</h1>
    <AddCardsForm class="add-form" @view-details="onViewDetails" />
    <p v-if="userCardsStore.error" class="error">{{ userCardsStore.error }}</p>
    <AppLoader v-if="userCardsStore.loading" message="Carregando suas cartas..." />
    <CardGrid
      v-else
      :cards="userCardsStore.cards"
      empty-message="Você ainda não tem cartas."
      @view-details="onViewDetails"
    />
    <CardDetailsModal v-model="detailsCard" />
  </div>
</template>

<style scoped>
.my-cards {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-page-y) var(--space-page-x);
}
h1 {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-tight);
}
.add-form {
  margin-bottom: var(--space-5);
}
.error {
  color: var(--color-danger);
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
}
</style>
