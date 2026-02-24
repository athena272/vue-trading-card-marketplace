import { ref } from 'vue'
import { ApiError } from '@/api/client'

/**
 * Composable para exibir erro de API na UI.
 * Útil para feedback consistente em formulários e ações.
 */
export function useApiError() {
  const message = ref<string | null>(null)

  function setError(e: unknown): void {
    if (e instanceof Error) {
      message.value = e.message
    } else {
      message.value = 'Ocorreu um erro inesperado.'
    }
  }

  function clear(): void {
    message.value = null
  }

  function isApiError(e: unknown): e is ApiError {
    return e instanceof ApiError
  }

  return { message, setError, clear, isApiError }
}
