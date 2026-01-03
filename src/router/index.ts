import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/pages/auth/RegisterView.vue'
import LoginView from '@/pages/auth/LoginView.vue'
import AuthCallback from '@/pages/auth/AuthCallback.vue'
import AuthError from '@/pages/auth/AuthError.vue'
import HomeView from '@/pages/HomeView.vue'
import ProductDetailView from '@/pages/products/ProductDetailView.vue'
import CatalogView from '@/pages/products/CatalogView.vue'
import LikesView from '@/pages/products/LikesView.vue'

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
    },
  ],
})

export default router
