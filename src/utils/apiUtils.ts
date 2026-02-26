import axios from 'axios'

export interface ApiError {
  message?: string
  errors?: string[]
}

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError<ApiError>(error)) {
    return (
      error.response?.data?.errors?.join(',') ??
      error.response?.data?.message ??
      'Error en la solicitud'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Error desconocido'
}
