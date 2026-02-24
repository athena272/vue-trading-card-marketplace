import { apiClient } from './client'
import type { User, Card } from '@/types'

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<User>('/me')
  return data
}

export async function getMyCards(): Promise<Card[]> {
  const { data } = await apiClient.get<Card[]>('/me/cards')
  return data
}

export async function addCardsToMe(cardIds: string[]): Promise<void> {
  await apiClient.post('/me/cards', { cardIds })
}
