import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCards } from '@/api/cards'
import type { Card } from '@/types'
import type { PaginationParams } from '@/types'

const CACHE_TTL_MS = 60_000
let cache: { list: Card[]; rpp: number; page: number; more: boolean; ts: number } | null =
  null

export const useCardsCatalogStore = defineStore('cardsCatalog', () => {
  const list = ref<Card[]>([])
  const rpp = ref(20)
  const page = ref(1)
  const more = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  function isCacheValid(): boolean {
    return cache !== null && Date.now() - cache.ts < CACHE_TTL_MS
  }

  function invalidateCache(): void {
    cache = null
  }

  async function fetchCards(params?: PaginationParams): Promise<void> {
    const reqPage = params?.page ?? page.value
    const reqRpp = params?.rpp ?? rpp.value
    if (isCacheValid() && cache!.page === reqPage && cache!.rpp === reqRpp) {
      list.value = cache!.list
      page.value = cache!.page
      rpp.value = cache!.rpp
      more.value = cache!.more
      return
    }
    loading.value = true
    error.value = null
    try {
      const res = await getCards({ page: reqPage, rpp: reqRpp })
      list.value = res.list
      rpp.value = res.rpp
      page.value = res.page
      more.value = res.more
      cache = { ...res, ts: Date.now() }
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Erro ao carregar catálogo'
      throw e
    } finally {
      loading.value = false
    }
  }

  function clearError(): void {
    error.value = null
  }

  return {
    list,
    rpp,
    page,
    more,
    loading,
    error,
    fetchCards,
    invalidateCache,
    clearError,
  }
})
