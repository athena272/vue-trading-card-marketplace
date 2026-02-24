<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useTradesStore } from '@/stores/tradesStore'
import CardChip from '@/components/domain/CardChip.vue'
import AppButton from '@/components/ui/AppButton.vue'
import type { Trade } from '@/types'
import type { Card } from '@/types'

defineProps<{
  trades: Trade[]
}>()

const emit = defineEmits<{
  'view-details': [card: Card]
}>()

const authStore = useAuthStore()
const tradesStore = useTradesStore()

function canDelete(trade: Trade): boolean {
  return authStore.user?.id === trade.userId
}

async function handleDelete(id: string) {
  try {
    await tradesStore.remove(id)
  } catch {
    // error already in store
  }
}
</script>

<template>
  <div v-if="trades.length === 0" class="empty">Nenhuma solicitação de troca no momento.</div>
  <ul v-else class="trade-list">
    <li v-for="trade in trades" :key="trade.id" class="trade-item">
      <div class="trade-header">
        <span class="trade-user">{{ trade.user.name }}</span>
        <span class="trade-date">{{ new Date(trade.createdAt).toLocaleDateString('pt-BR') }}</span>
        <AppButton
          v-if="canDelete(trade)"
          type="button"
          variant="danger"
          @click="handleDelete(trade.id)"
        >
          Excluir
        </AppButton>
      </div>
      <div class="trade-cards">
        <div class="trade-group">
          <span class="label">Oferece:</span>
          <div class="chip-list">
            <CardChip
              v-for="tc in trade.tradeCards.filter((c) => c.type === 'OFFERING')"
              :key="tc.id"
              :card="tc.card"
              @view-details="emit('view-details', tc.card)"
            />
          </div>
        </div>
        <div class="trade-group">
          <span class="label">Quer receber:</span>
          <div class="chip-list">
            <CardChip
              v-for="tc in trade.tradeCards.filter((c) => c.type === 'RECEIVING')"
              :key="tc.id"
              :card="tc.card"
              @view-details="emit('view-details', tc.card)"
            />
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.empty {
  padding: var(--space-6);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--text-base);
}
.trade-list {
  list-style: none;
}
.trade-item {
  padding: var(--space-5);
  margin-bottom: var(--space-5);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  box-shadow: var(--shadow-md);
}
.trade-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.trade-user {
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
}
.trade-date {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.trade-header :deep(.btn) {
  margin-left: auto;
}
.trade-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.trade-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.label {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
}
.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}
</style>
