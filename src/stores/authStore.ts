import { ref } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from '@/types/authTypes'

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

  return { isAuthenticated, user, login, logout }
})
