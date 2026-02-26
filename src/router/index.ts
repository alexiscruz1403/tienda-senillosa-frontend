import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/pages/auth/RegisterView.vue'
import LoginView from '@/pages/auth/LoginView.vue'
import AuthCallback from '@/pages/auth/AuthCallback.vue'
import AuthError from '@/pages/auth/AuthError.vue'
import HomeView from '@/pages/HomeView.vue'
import ProductDetailView from '@/pages/products/ProductDetailView.vue'
import CatalogView from '@/pages/products/CatalogView.vue'
import LikesView from '@/pages/products/LikesView.vue'
import CartView from '@/pages/products/CartView.vue'
import ProfileView from '@/pages/profile/ProfileView.vue'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'

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
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetailView,
    },
    {
      path: '/products',
      name: 'catalog',
      component: CatalogView,
    },
    {
      path: '/likes',
      name: 'likes',
      component: LikesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()
    const uiStore = useUiStore()
    uiStore.setLoading(true)

    const { isAuthenticated } = storeToRefs(authStore)

    if (!isAuthenticated.value) {
      uiStore.setLoading(false)
      return next({ name: 'login' })
    }

    try {
      await authStore.validateUserToken()
      next()
    } catch (error) {
      console.error('Authentication check failed:', error)
      next({ name: 'login' })
    } finally {
      uiStore.setLoading(false)
    }
  } else {
    next()
  }
})

export default router
