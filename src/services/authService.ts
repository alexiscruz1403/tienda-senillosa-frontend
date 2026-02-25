import { getData } from './api'
import { type ApiResponse } from './api'

export interface ValidateTokenResponse {
  valid: boolean
}

export interface RefreshTokenResponse {
  token: string
}

export const validateToken = async (): Promise<ApiResponse<ValidateTokenResponse>> => {
  return await getData('/auth/validate')
}

export const refreshToken = async (): Promise<ApiResponse<RefreshTokenResponse>> => {
  return await getData('/auth/refresh')
}
