<template>
  <div></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => {
  const token = route.query.token as string
  const cartCount = route.query.cartCount as string

  const numberedCartCount: number = Number(cartCount) ?? 0

  if (token) {
    authStore.login(token)
    cartStore.setItemCount(numberedCartCount)
    router.push('/')
  } else {
    router.push('/auth-error')
  }
})
</script>
