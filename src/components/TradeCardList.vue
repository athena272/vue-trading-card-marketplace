<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useTradesStore } from '@/stores/tradesStore'
import type { Trade } from '@/types'

defineProps<{
  trades: Trade[]
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
        <button
          v-if="canDelete(trade)"
          type="button"
          class="btn-delete"
          @click="handleDelete(trade.id)"
        >
          Excluir
        </button>
      </div>
      <div class="trade-cards">
        <div class="trade-group">
          <span class="label">Oferece:</span>
          <div class="mini-cards">
            <div
              v-for="tc in trade.tradeCards.filter((c) => c.type === 'OFFERING')"
              :key="tc.id"
              class="mini-card"
            >
              <img v-if="tc.card.imageUrl" :src="tc.card.imageUrl" :alt="tc.card.name" />
              <span>{{ tc.card.name }}</span>
            </div>
          </div>
        </div>
        <div class="trade-group">
          <span class="label">Quer receber:</span>
          <div class="mini-cards">
            <div
              v-for="tc in trade.tradeCards.filter((c) => c.type === 'RECEIVING')"
              :key="tc.id"
              class="mini-card"
            >
              <img v-if="tc.card.imageUrl" :src="tc.card.imageUrl" :alt="tc.card.name" />
              <span>{{ tc.card.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.empty {
  color: #888;
  padding: 2rem;
  text-align: center;
}
.trade-list {
  list-style: none;
}
.trade-item {
  border: 1px solid #444;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #2a2a2a;
}
.trade-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.trade-user {
  font-weight: 600;
}
.trade-date {
  color: #888;
  font-size: 0.9rem;
}
.btn-delete {
  margin-left: auto;
  padding: 0.35rem 0.75rem;
  background: #622;
  border: 1px solid #833;
  border-radius: 4px;
  color: #fcc;
}
.btn-delete:hover {
  background: #733;
}
.trade-cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.label {
  font-size: 0.85rem;
  color: #aaa;
}
.mini-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.mini-card {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.5rem;
  background: #333;
  border-radius: 4px;
  font-size: 0.85rem;
}
.mini-card img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
