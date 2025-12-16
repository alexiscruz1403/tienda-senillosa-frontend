import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/pages/RegisterView.vue'
import LoginView from '@/pages/LoginView.vue'
import AuthCallback from '@/pages/AuthCallback.vue'
import AuthError from '@/pages/AuthError.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth/google/callback',
      name: 'auth-callback',
      component: AuthCallback,
    },
    {
      path: '/auth-error',
      name: 'auth-error',
      component: AuthError,
    },
  ],
})

export default router
