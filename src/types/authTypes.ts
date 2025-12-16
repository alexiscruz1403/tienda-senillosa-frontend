export interface LoginResponse {
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
