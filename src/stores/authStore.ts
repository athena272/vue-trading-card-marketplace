import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authApi from '@/api/auth'
import { getMe } from '@/api/me'
import { getAuthToken, setAuthToken } from '@/api/client'
import type { User } from '@/types'
import type { LoginPayload, RegisterPayload } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getAuthToken())
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function init(): Promise<void> {
    if (!token.value) return
    try {
      user.value = await getMe()
    } catch {
      setAuthToken(null)
      token.value = null
      user.value = null
    }
  }

  async function login(payload: LoginPayload): Promise<void> {
    const { token: newToken, user: userData } = await authApi.login(payload)
    token.value = newToken
    user.value = userData
  }

  async function register(payload: RegisterPayload): Promise<void> {
    await authApi.register(payload)
    await login({ email: payload.email, password: payload.password })
  }

  async function fetchUser(): Promise<void> {
    if (!token.value) return
    user.value = await getMe()
  }

  function logout(): void {
    authApi.logout()
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    isAuthenticated,
    init,
    login,
    register,
    fetchUser,
    logout,
  }
})
