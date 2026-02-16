<template>
  <v-app-bar
    :elevation="0"
    class="fixed top-0 left-0 right-0 z-40! app-bar-glass border-b border-border"
  >
    <div class="flex justify-between items-center w-full px-6">
      <div class="flex gap-2 order-2 md:order-1">
        <p class="text-3xl cursor-pointer" @click="$router.push('/')">Logo</p>
      </div>

      <div class="order-1 md:hidden">
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn icon variant="text" aria-label="Menu" color="black" v-bind="props">
              <Menu :size="20" />
            </v-btn>
          </template>

          <v-list min-width="200">
            <v-list-item :key="1" :value="1">
              <v-list-item-title @click="handleHomeClick">Inicio</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item :key="2" :value="2">
              <v-list-item-title @click="handleProductsClick">Catálogo</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item :key="3" :value="3">
              <v-list-item-title @click="handleAboutClick">Contacto</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="hidden md:flex md:order-2">
        <nav-link to="/" label="Inicio" />
        <nav-link to="/products" label="Catálogo" />
        <nav-link to="/about" label="Contacto" />
      </div>

      <div class="hidden md:flex md:order-3" v-if="!isAuthenticated">
        <div class="flex gap-1 px-2">
          <v-btn variant="flat" color="primary" @click="$router.push('/login')">
            Iniciar Sesión
          </v-btn>
          <v-btn variant="flat" color="secondary" @click="$router.push('/register')">
            Registrarse
          </v-btn>
        </div>
      </div>
      <div v-else class="hidden md:flex md:order-3">
        <v-btn
          icon
          variant="text"
          aria-label="Carrito"
          color="black"
          @click="handleCartClick"
          class="relative"
        >
          <ShoppingBag :size="20" />
          <span
            class="absolute top-0 right-0 bg-[#3C83F6] w-4 h-4 rounded-full text-white text-xs text-center font-semibold"
            aria-hidden="true"
            v-if="itemCount != 0"
            >{{ itemCount }}</span
          >
        </v-btn>
        <v-btn icon variant="text" aria-label="Me gustas" color="black" @click="handleLikesClick">
          <Heart :size="20" />
        </v-btn>
        <v-btn icon variant="text" aria-label="Cuenta" color="black">
          <User :size="20" @click="handleProfileClick" />
        </v-btn>
      </div>

      <div class="order-3 md:hidden">
        <v-btn icon variant="text" aria-label="Cuenta" color="black">
          <User :size="20" @click="handleProfileClick" />
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import NavLink from '@/components/NavLink.vue'
import { User, Menu, ShoppingBag, Heart } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import router from '@/router'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const cartStore = useCartStore()
const { itemCount } = storeToRefs(cartStore)

const handleHomeClick = () => {
  router.push('/')
}

const handleProductsClick = () => {
  router.push('/products')
}

const handleAboutClick = () => {
  router.push('/about')
}

const handleLikesClick = () => {
  router.push('/likes')
}

const handleCartClick = () => {
  router.push('/cart')
}

const handleProfileClick = () => {
  router.push('/profile')
}
</script>
<style scoped>
.app-bar-glass {
  background-color: rgba(244, 246, 251, 0.8) !important;
  backdrop-filter: blur(8px) !important;
}
</style>
