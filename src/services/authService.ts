import { getData, postData } from './api'
import { type ApiResponse } from './api'

export interface ValidateTokenResponse {
  valid: boolean
}

export interface RefreshTokenResponse {
  token: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  cartCount: number
}

export interface RegisterPayload {
  email: string
  username: string
  password: string
}

export interface RegisterResponse {
  token: string
}

export interface JwtPayload {
  email: string
  username: string
  user_id: number
  role: string
  exp: number
  iat: number
}

export const validateToken = async (): Promise<ApiResponse<ValidateTokenResponse>> => {
  return await getData<ValidateTokenResponse>('/auth/validate')
}

export const refreshToken = async (): Promise<ApiResponse<RefreshTokenResponse>> => {
  return await getData<RefreshTokenResponse>('/auth/refresh')
}

export const login = async (userData: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
  return await postData<LoginResponse>('/auth/login', userData)
}

export const loginWithGoogle = (): void => {
  window.location.href = 'http://localhost:8000/api/auth/google/redirect'
}

export const register = async (
  userData: RegisterPayload,
): Promise<ApiResponse<RegisterResponse>> => {
  return await postData<RegisterResponse>('/auth/register', userData)
}
