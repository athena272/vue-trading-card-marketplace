import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getMyCards, addCardsToMe } from '@/api/me'
import type { Card } from '@/types'

export const useUserCardsStore = defineStore('userCards', () => {
  const cards = ref<Card[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const hasCards = computed(() => cards.value.length > 0)

  async function fetchCards(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      cards.value = await getMyCards()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Erro ao carregar cartas'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function addCards(cardIds: string[], newCards?: Card[]): Promise<void> {
    if (cardIds.length === 0) return
    error.value = null
    await addCardsToMe(cardIds)
    if (newCards?.length) {
      if (cards.value.length === 0) {
        await fetchCards()
      }
      const existingIds = new Set(cards.value.map((c) => c.id))
      const toAppend = newCards.filter((c) => !existingIds.has(c.id))
      cards.value = [...cards.value, ...toAppend]
    }
  }

  function clearError(): void {
    error.value = null
  }

  return {
    cards,
    loading,
    error,
    hasCards,
    fetchCards,
    addCards,
    clearError,
  }
})
