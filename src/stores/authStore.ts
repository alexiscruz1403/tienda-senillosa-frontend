import { ref } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from '@/types/authTypes'
import { validateToken, refreshToken } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const isAuthenticated = ref<boolean>(token.value !== null)
  const user = ref<JwtPayload | null>(token.value ? jwtDecode<JwtPayload>(token.value) : null)

  function login(newToken: string) {
    token.value = newToken
    isAuthenticated.value = true
    user.value = jwtDecode<JwtPayload>(newToken)
    localStorage.setItem('authToken', newToken)
  }

  function logout() {
    token.value = null
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('authToken')
  }

  async function refreshUserToken() {
    try {
      const response = await refreshToken()
      login(response.data.token)
    } catch (error) {
      console.error('Error refreshing token:', error)
      logout()
    }
  }

  async function validateUserToken() {
    if (isAuthenticated.value && token.value) {
      try {
        const response = await validateToken()
        if (!response.data.valid) {
          logout()
        }
      } catch (error) {
        console.error('Error validating token:', error)
        try {
          await refreshUserToken()
        } catch (refreshError) {
          console.error('Token validation and refresh failed:', refreshError)
          logout()
        }
      }
    } else {
      logout()
    }
  }

  return { isAuthenticated, user, login, logout, validateUserToken }
})
