import { apiClient, setAuthToken } from './client'
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from '@/types'

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>('/register', payload)
  return data
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/login', payload)
  setAuthToken(data.token)
  return data
}

export function logout(): void {
  setAuthToken(null)
}
