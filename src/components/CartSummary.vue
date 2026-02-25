<template>
  <div class="w-full bg-white px-6 py-6 flex flex-col gap-4 rounded-lg">
    <h2 class="text-xl font-semibold">Resumen</h2>
    <div class="flex flex-col gap-3">
      <div class="w-full flex justify-between">
        <p class="text-[#65758B]">Subtotal</p>
        <p>$ {{ totalPrice }}</p>
      </div>
      <div class="w-full flex justify-between">
        <p class="text-[#65758B]">Envio</p>
        <p class="text-[#3C83F6]">Gratis</p>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="flex flex-col gap-4">
      <div class="w-full flex justify-between">
        <p class="font-bold">Total</p>
        <p class="text-lg font-bold">$ {{ totalPrice }}</p>
      </div>
      <div class="flex flex-col gap-2">
        <v-btn color="primary">Finalizar compra</v-btn>
        <v-btn variant="text" color="accent-main" @click="handleContinueShopping"
          >Continuar comprando</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import router from '@/router'

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)

const totalPrice = computed(() => {
  const total = items.value.reduce((total, item) => {
    const discountedPrice = (
      item.product.price -
      (item.product.price * item.product.discount) / 100
    ).toFixed(2)
    return total + parseFloat(discountedPrice) * item.product_quantity
  }, 0)

  return total.toFixed(2)
})

const handleContinueShopping = () => {
  router.push('/products')
}
</script>
