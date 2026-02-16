import axios, { type AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface AuthToken {
  token: string
  expiresIn: number
}

export type { AuthToken }

export interface ApiResponse<T = unknown> {
  data: T
  message: string
  errors?: string[]
}

export const getData = async <T>(
  endpoint: string,
  params?: Record<string, unknown>,
  config?: Record<string, unknown>,
): Promise<ApiResponse<T>> => {
  try {
    const token = localStorage.getItem('authToken')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    const response: AxiosResponse<ApiResponse<T>> = await api.get(endpoint, { params, ...config })
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const postData = async <T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('authToken')
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  const response: AxiosResponse<ApiResponse<T>> = await api.post(endpoint, data)
  return response.data
}

export const putData = async <T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('authToken')
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  const response: AxiosResponse<ApiResponse<T>> = await api.put(endpoint, data)
  return response.data
}

export default api
