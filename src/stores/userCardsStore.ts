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

  async function addCards(cardIds: string[]): Promise<void> {
    if (cardIds.length === 0) return
    error.value = null
    await addCardsToMe(cardIds)
    await fetchCards()
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
