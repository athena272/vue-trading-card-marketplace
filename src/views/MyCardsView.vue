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
  <div class="my-cards page">
    <div class="header">
      <div>
        <h1 class="page-title">Minhas cartas</h1>
        <p class="page-subtitle">Gerencie sua coleção e adicione novas cartas do catálogo.</p>
      </div>
    </div>

    <div class="cols">
      <section class="panel">
        <h2 class="panel-title">Adicionar do catálogo</h2>
        <AddCardsForm class="add-form" @view-details="onViewDetails" />
      </section>

      <section class="panel">
        <h2 class="panel-title">Minha coleção</h2>

        <p v-if="userCardsStore.error" class="error">{{ userCardsStore.error }}</p>
        <AppLoader v-if="userCardsStore.loading" message="Carregando suas cartas..." />
        <CardGrid
          v-else
          :cards="userCardsStore.cards"
          size="threeColumns"
          empty-message="Você ainda não tem cartas."
          @view-details="onViewDetails"
        />
      </section>
    </div>

    <CardDetailsModal v-model="detailsCard" />
  </div>
</template>

<style scoped>
.my-cards {
  max-width: 1280px;
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

.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-page-y) var(--space-page-x);
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
  line-height: var(--line-height-tight);
}

.page-subtitle {
  margin-top: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.cols {
  display: grid;
  grid-template-columns: 1.1fr 1fr; /* catálogo um pouco maior */
  gap: var(--space-6);
  align-items: start;
}

@media (max-width: 900px) {
  .cols {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-5);
  min-width: 0;
}

.panel-title {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
}

.error {
  color: var(--color-danger);
  margin-bottom: var(--space-3);
  font-size: var(--text-sm);
}
</style>
