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

const uiStore = useUiStore()
const { isLoading } = storeToRefs(uiStore)

const appStore = useAppStore()
const { fetchedCart } = storeToRefs(appStore)

const cartStore = useCartStore()

const fetchCart = async () => {
  if (!fetchedCart.value) {
    await cartStore.fetchCartItems()
    appStore.setFetchedCart(true)
  }
}

onMounted(() => {
  fetchCart()
})
</script>

<style scoped></style>
