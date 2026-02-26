<template>
  <loader-modal :display="isLoading" message="" />
  <router-view />
</template>

<script setup lang="ts">
import LoaderModal from './components/LoaderModal.vue'
import { useUiStore } from './stores/uiStore'
import { useCartStore } from './stores/cartStore'
import { useAppStore } from './stores/appStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { getCartProducts } from './services/cartService'

const uiStore = useUiStore()
const { isLoading } = storeToRefs(uiStore)

const appStore = useAppStore()
const { fetchedCart } = storeToRefs(appStore)

const cartStore = useCartStore()

const fetchCart = async () => {
  if (!fetchedCart.value) {
    try {
      const cartProductsResponse = getCartProducts()
      cartStore.setCartItems((await cartProductsResponse).data)
      appStore.setFetchedCart(true)
    } catch (error) {
      console.error('Error al cargar el carrito: ', error)
    }
  }
}

onMounted(() => {
  fetchCart()
})
</script>

<style scoped></style>
