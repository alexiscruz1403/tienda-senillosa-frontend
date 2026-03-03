<template>
  <div class="bg-white px-6 py-6 flex flex-col gap-4 max-h-max w-full rounded-xl shadow-md">
    <h2 class="text-xl font-bold">Resumen</h2>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between text-sm">
        <p class="text-[#65758B]">Subtotal</p>
        <p>${{ getSubtotal }}</p>
      </div>
      <div class="flex justify-between text-sm">
        <p class="text-[#65758B]">Envío</p>
        <p class="text-[#3C83F6]">Gratis</p>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="flex justify-between">
      <p class="font-bold">Total</p>
      <p class="font-bold text-lg">${{ getSubtotal }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Order } from '@/services/orderService'
import { computed } from 'vue'

interface Props {
  order: Order
}

const props = defineProps<Props>()

const getSubtotal = computed(() => {
  const total = props.order.products.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity
  }, 0)

  return total.toFixed(2)
})
</script>
