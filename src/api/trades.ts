import { apiClient } from './client'
import type {
  Trade,
  PaginatedResponse,
  PaginationParams,
  CreateTradePayload,
  CreateTradeResponse,
} from '@/types'

export async function getTrades(
  params?: PaginationParams
): Promise<PaginatedResponse<Trade>> {
  const { data } = await apiClient.get<PaginatedResponse<Trade>>('/trades', { params })
  return data
}

export async function createTrade(payload: CreateTradePayload): Promise<CreateTradeResponse> {
  const { data } = await apiClient.post<CreateTradeResponse>('/trades', payload)
  return data
}

export async function deleteTrade(id: string): Promise<void> {
  await apiClient.delete(`/trades/${id}`)
}
