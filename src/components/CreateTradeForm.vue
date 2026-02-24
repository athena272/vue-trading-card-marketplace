<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserCardsStore } from '@/stores/userCardsStore'
import { useCardsCatalogStore } from '@/stores/cardsCatalogStore'
import { useTradesStore } from '@/stores/tradesStore'
import CardGrid from './CardGrid.vue'
import AppLoader from './AppLoader.vue'
import type { Card } from '@/types'
import type { TradeCardType } from '@/types'

const emit = defineEmits<{ success: [] }>()
const userCardsStore = useUserCardsStore()
const catalogStore = useCardsCatalogStore()
const tradesStore = useTradesStore()

const offeringIds = ref<Set<string>>(new Set())
const receivingIds = ref<Set<string>>(new Set())
const submitting = ref(false)
const serverError = ref<string | null>(null)
const offeringError = ref<string | null>(null)
const receivingError = ref<string | null>(null)

onMounted(async () => {
  await Promise.all([
    userCardsStore.fetchCards().catch(() => {}),
    catalogStore.fetchCards().catch(() => {}),
  ])
})

function toggleOffering(card: Card) {
  const next = new Set(offeringIds.value)
  if (next.has(card.id)) next.delete(card.id)
  else next.add(card.id)
  offeringIds.value = next
}

function toggleReceiving(card: Card) {
  const next = new Set(receivingIds.value)
  if (next.has(card.id)) next.delete(card.id)
  else next.add(card.id)
  receivingIds.value = next
}

const catalogExcludingMine = computed(() => {
  const myIds = new Set(userCardsStore.cards.map((c) => c.id))
  return catalogStore.list.filter((c) => !myIds.has(c.id))
})

async function onSubmit() {
  offeringError.value = null
  receivingError.value = null
  serverError.value = null
  if (offeringIds.value.size === 0) {
    offeringError.value = 'Selecione ao menos uma carta para oferecer'
    return
  }
  if (receivingIds.value.size === 0) {
    receivingError.value = 'Selecione ao menos uma carta que deseja receber'
    return
  }
  submitting.value = true
  try {
    const cards = [
      ...Array.from(offeringIds.value).map((cardId) => ({ cardId, type: 'OFFERING' as TradeCardType })),
      ...Array.from(receivingIds.value).map((cardId) => ({ cardId, type: 'RECEIVING' as TradeCardType })),
    ]
    await tradesStore.create({ cards })
    emit('success')
  } catch (e: unknown) {
    serverError.value = e instanceof Error ? e.message : 'Erro ao criar troca'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <p v-if="serverError" class="error">{{ serverError }}</p>

    <div class="section">
      <h2>Cartas que ofereço</h2>
      <p v-if="offeringError" class="field-error">{{ offeringError }}</p>
      <AppLoader v-else-if="userCardsStore.loading" message="Carregando suas cartas..." />
      <CardGrid
        v-else
        :cards="userCardsStore.cards"
        :selectable="true"
        :selected-ids="Array.from(offeringIds)"
        empty-message="Você não tem cartas. Adicione cartas em Minhas cartas."
        @select="toggleOffering"
      />
    </div>

    <div class="section">
      <h2>Cartas que quero receber</h2>
      <p v-if="receivingError" class="field-error">{{ receivingError }}</p>
      <AppLoader v-else-if="catalogStore.loading" message="Carregando catálogo..." />
      <CardGrid
        v-else
        :cards="catalogExcludingMine"
        :selectable="true"
        :selected-ids="Array.from(receivingIds)"
        @select="toggleReceiving"
      />
    </div>

    <button type="submit" class="btn-submit" :disabled="submitting">
      {{ submitting ? 'Criando...' : 'Criar solicitação de troca' }}
    </button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.error {
  color: #f88;
}
.section h2 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.field-error {
  color: #f88;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}
.btn-submit {
  padding: 0.6rem 1rem;
  background: #0a7;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
}
.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
