import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTrades, createTrade, deleteTrade } from '@/api/trades'
import type { Trade } from '@/types'
import type { CreateTradePayload } from '@/types'
import type { PaginationParams } from '@/types'

export const useTradesStore = defineStore('trades', () => {
  const list = ref<Trade[]>([])
  const rpp = ref(10)
  const page = ref(1)
  const more = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTrades(params?: PaginationParams): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const payload = params ?? { rpp: rpp.value, page: page.value }
      const res = await getTrades(payload)
      list.value = res.list
      rpp.value = res.rpp
      page.value = res.page
      more.value = res.more
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Erro ao carregar trocas'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function create(payload: CreateTradePayload): Promise<string> {
    error.value = null
    const res = await createTrade(payload)
    await fetchTrades({ rpp: rpp.value, page: 1 })
    return res.tradeId
  }

  async function remove(id: string): Promise<void> {
    error.value = null
    await deleteTrade(id)
    list.value = list.value.filter((t) => t.id !== id)
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
    fetchTrades,
    create,
    remove,
    clearError,
  }
})
