import axios, { type AxiosError } from 'axios'

const baseURL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://cards-marketplace-api.onrender.com'

/** Timeout alto para dar tempo da API acordar após hibernação (~30s). */
const REQUEST_TIMEOUT_MS = 90_000

export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: REQUEST_TIMEOUT_MS,
})

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const getStoredToken = (): string | null => {
  return localStorage.getItem('auth_token')
}

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const API_WAKING_MESSAGE =
  'O serviço pode estar acordando. Aguarde alguns segundos e tente novamente.'

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const status = error.response?.status ?? 0
    const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout')
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      'Erro na requisição'
    const friendlyMessage = isTimeout
      ? API_WAKING_MESSAGE
      : status === 503
        ? API_WAKING_MESSAGE
        : status >= 500
          ? 'Erro no servidor. Tente novamente mais tarde.'
          : message
    throw new ApiError(friendlyMessage, status, error.response?.data)
  }
)

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('auth_token', token)
  } else {
    localStorage.removeItem('auth_token')
  }
}

export function getAuthToken(): string | null {
  return getStoredToken()
}
