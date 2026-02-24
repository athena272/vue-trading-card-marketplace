<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserCardsStore } from '@/stores/userCardsStore'
import { useCardsCatalogStore } from '@/stores/cardsCatalogStore'
import { useTradesStore } from '@/stores/tradesStore'
import CardGrid from './CardGrid.vue'
import CardDetailsModal from './CardDetailsModal.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppButton from '@/components/ui/AppButton.vue'
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
const detailsCard = ref<Card | null>(null)

function onViewDetails(card: Card) {
  detailsCard.value = card
}

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

const summaryText = computed(() => {
  const o = offeringIds.value.size
  const r = receivingIds.value.size
  if (o === 0 && r === 0) return null
  const parts: string[] = []
  if (o > 0) parts.push(`${o} carta(s) ofertada(s)`)
  if (r > 0) parts.push(`${r} carta(s) desejada(s)`)
  return parts.join(' × ')
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
    <AppAlert v-if="serverError" type="error">
      {{ serverError }}
    </AppAlert>

    <div class="sections-row">
      <AppCard class="section-card">
        <h2 class="section-title">Cartas que ofereço</h2>
        <p class="section-desc">Selecione as cartas da sua conta que você quer trocar.</p>
        <AppAlert v-if="offeringError" type="error" class="section-alert">
          {{ offeringError }}
        </AppAlert>
        <AppLoader v-else-if="userCardsStore.loading" message="Carregando suas cartas..." />
        <CardGrid
          v-else
          size="compact"
          :cards="userCardsStore.cards"
          :selectable="true"
          :selected-ids="Array.from(offeringIds)"
          empty-message="Você não tem cartas. Adicione cartas em Minhas cartas."
          @select="toggleOffering"
          @view-details="onViewDetails"
        />
      </AppCard>

      <AppCard class="section-card">
        <h2 class="section-title">Cartas que quero receber</h2>
        <p class="section-desc">Selecione as cartas do catálogo que você deseja receber.</p>
        <AppAlert v-if="receivingError" type="error" class="section-alert">
          {{ receivingError }}
        </AppAlert>
        <AppLoader v-else-if="catalogStore.loading" message="Carregando catálogo..." />
        <CardGrid
          v-else
          size="compact"
          :cards="catalogExcludingMine"
          :selectable="true"
          :selected-ids="Array.from(receivingIds)"
          @select="toggleReceiving"
          @view-details="onViewDetails"
        />
      </AppCard>
    </div>

    <CardDetailsModal v-model="detailsCard" />

    <div class="footer">
      <p v-if="summaryText" class="summary">{{ summaryText }}</p>
      <AppButton type="submit" variant="primary" :loading="submitting" :disabled="submitting">
        {{ submitting ? 'Criando...' : 'Criar solicitação de troca' }}
      </AppButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
.sections-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  align-items: start;
}
@media (max-width: 768px) {
  .sections-row {
    grid-template-columns: 1fr;
  }
}
.section-card {
  margin-bottom: 0;
  min-width: 0;
}
.section-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-2);
  line-height: var(--line-height-tight);
}
.section-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}
.section-alert {
  margin-bottom: var(--space-3);
}
.footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-4);
}
.summary {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
</style>
