export interface LoginResponse {
  token: string
  cartCount: number
}

export interface JwtPayload {
  email: string
  username: string
  user_id: number
  role: string
  exp: number
  iat: number
}
