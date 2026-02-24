<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserCardsStore } from '@/stores/userCardsStore'
import { useCardsCatalogStore } from '@/stores/cardsCatalogStore'
import CardGrid from './CardGrid.vue'
import AppLoader from './AppLoader.vue'
import type { Card } from '@/types'

const userCardsStore = useUserCardsStore()
const catalogStore = useCardsCatalogStore()
const selectedIds = ref<Set<string>>(new Set())
const submitting = ref(false)
const message = ref<{ type: 'ok' | 'err'; text: string } | null>(null)

const myCardIds = computed(() => new Set(userCardsStore.cards.map((c) => c.id)))
const catalogExcludingMine = computed(() => {
  const myIds = myCardIds.value
  return catalogStore.list.filter((c) => !myIds.has(c.id))
})

onMounted(async () => {
  await Promise.all([
    userCardsStore.fetchCards().catch(() => {}),
    catalogStore.fetchCards().catch(() => {}),
  ])
})

function toggle(card: Card) {
  if (myCardIds.value.has(card.id)) return
  const next = new Set(selectedIds.value)
  if (next.has(card.id)) next.delete(card.id)
  else next.add(card.id)
  selectedIds.value = next
}

async function submit() {
  const ids = Array.from(selectedIds.value)
  if (ids.length === 0) {
    message.value = { type: 'err', text: 'Selecione ao menos uma carta.' }
    return
  }
  submitting.value = true
  message.value = null
  try {
    await userCardsStore.addCards(ids)
    catalogStore.invalidateCache()
    selectedIds.value = new Set()
    message.value = { type: 'ok', text: 'Cartas adicionadas.' }
  } catch {
    message.value = { type: 'err', text: userCardsStore.error ?? 'Erro ao adicionar cartas.' }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="add-cards-form">
    <p v-if="message" :class="message.type === 'ok' ? 'msg-ok' : 'msg-err'">{{ message.text }}</p>
    <AppLoader v-else-if="catalogStore.loading" message="Carregando catálogo de cartas..." />
    <template v-else>
      <p class="hint">Selecione as cartas que deseja adicionar à sua conta (as que você já tem não podem ser selecionadas).</p>
      <div class="grid-wrap">
        <CardGrid
          :cards="catalogExcludingMine"
          :selectable="true"
          :selected-ids="Array.from(selectedIds)"
          @select="toggle"
        />
      </div>
      <div class="actions">
        <button
          type="button"
          class="btn-submit"
          :disabled="submitting || selectedIds.size === 0"
          @click="submit"
        >
          {{ submitting ? 'Adicionando...' : `Adicionar (${selectedIds.size})` }}
        </button>
      </div>
      <p v-if="catalogStore.more" class="more">
        Há mais cartas no catálogo. Carregue a próxima página (a implementar).
      </p>
    </template>
  </div>
</template>

<style scoped>
.add-cards-form {
  margin-bottom: 1rem;
}
.msg-ok {
  color: #8f8;
}
.msg-err {
  color: #f88;
}
.hint {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.75rem;
}
.grid-wrap {
  margin-bottom: 1rem;
}
.actions {
  margin-bottom: 0.5rem;
}
.btn-submit {
  padding: 0.5rem 1rem;
  background: #0a7;
  border: none;
  border-radius: 4px;
  color: #fff;
}
.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.more {
  font-size: 0.85rem;
  color: #888;
}
</style>
