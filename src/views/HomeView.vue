<script setup lang="ts">
import { onMounted } from 'vue'
import { useTradesStore } from '@/stores/tradesStore'
import TradeCardList from '@/components/TradeCardList.vue'
import AppLoader from '@/components/AppLoader.vue'

const tradesStore = useTradesStore()

onMounted(() => {
  tradesStore.fetchTrades().catch(() => {})
})
</script>

<template>
  <div class="home">
    <h1>Marketplace de trocas</h1>
    <AppLoader v-if="tradesStore.loading" message="Carregando solicitações de troca..." />
    <template v-else>
      <p v-if="tradesStore.error" class="error">{{ tradesStore.error }}</p>
      <TradeCardList v-else :trades="tradesStore.list" />
    </template>
  </div>
</template>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
}
h1 {
  margin-bottom: 1rem;
}
.error {
  color: #f88;
}
</style>
