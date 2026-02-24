export interface User {
  id: string
  name: string
  email: string
  cards?: Card[]
}

export interface Card {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: string
}

export type TradeCardType = 'OFFERING' | 'RECEIVING'

export interface TradeCard {
  id: string
  cardId: string
  tradeId: string
  type: TradeCardType
  card: Card
}

export interface Trade {
  id: string
  userId: string
  createdAt: string
  user: { name: string }
  tradeCards: TradeCard[]
}

export interface PaginatedResponse<T> {
  list: T[]
  rpp: number
  page: number
  more: boolean
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterResponse {
  userId: string
}

export interface CreateTradePayload {
  cards: Array<{ cardId: string; type: TradeCardType }>
}

export interface CreateTradeResponse {
  tradeId: string
}

export interface PaginationParams {
  rpp?: number
  page?: number
}
