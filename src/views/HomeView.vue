<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTradesStore } from '@/stores/tradesStore'
import type { Card } from '@/types'
import TradeCardList from '@/components/TradeCardList.vue'
import CardDetailsModal from '@/components/domain/CardDetailsModal.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppAlert from '@/components/ui/AppAlert.vue'

const tradesStore = useTradesStore()
const detailsCard = ref<Card | null>(null)

function onViewDetails(card: Card) {
  detailsCard.value = card
}

onMounted(() => {
  tradesStore.fetchTrades().catch(() => {})
})
</script>

<template>
  <div class="page">
    <h1 class="page-title">Marketplace de trocas</h1>
    <AppLoader v-if="tradesStore.loading" message="Carregando solicitações de troca..." />
    <template v-else>
      <AppAlert v-if="tradesStore.error" type="error">
        {{ tradesStore.error }}
      </AppAlert>
      <TradeCardList v-else :trades="tradesStore.list" @view-details="onViewDetails" />
    </template>
    <CardDetailsModal v-model="detailsCard" />
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-page-y) var(--space-page-x);
}
.page-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-5);
  line-height: var(--line-height-tight);
}
</style>
