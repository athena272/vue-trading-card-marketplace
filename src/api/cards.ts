import { apiClient } from './client'
import type { Card, PaginatedResponse, PaginationParams } from '@/types'

export async function getCards(params?: PaginationParams): Promise<PaginatedResponse<Card>> {
  const { data } = await apiClient.get<PaginatedResponse<Card>>('/cards', { params })
  return data
}

export async function getCardById(id: string): Promise<Card> {
  const { data } = await apiClient.get<Card>(`/cards/${id}`)
  return data
}
