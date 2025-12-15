import axios, { type AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

interface AuthToken{
  token: string
  expiresIn: number
}

export type { AuthToken }

interface ApiResponse {
  data: Record<string, unknown>
  message: string
  errors: Array<string>
}

export type { ApiResponse }

export const getData = async <T>(
  endpoint: string,
  params?: Record<string, unknown>,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(endpoint, { params })
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const postData = async <T>(
  endpoint: string,
  data: T,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, data)
    return response.data
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

export default api
