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
        <v-btn color="primary" @click="handleCompletePurchase">Finalizar compra</v-btn>
        <v-btn variant="text" color="accent-main" @click="handleContinueShopping"
          >Continuar comprando</v-btn
        >
      </div>
    </div>
    <app-alert
      :alertMessage="alertMessage"
      :alertTitle="alertTitle"
      :alertType="alertType"
      :showAlert="showAlert"
    />
    <loader-modal
      :display="isLoading || isPending"
      message="Procesando compra, por favor espere..."
    />
  </div>
</template>
<script setup lang="ts">
import LoaderModal from './LoaderModal.vue'
import AppAlert from './AppAlert.vue'
import { computed } from 'vue'
import { type OrderProductPayload } from '@/services/order.service'
import { useAlert } from '@/composables/useAlert'
import { useCartQuery } from '@/queries/cart.query'
import { useOrderMutation } from '@/mutations/order.mutation'
import { useQueryErrorHandler } from '@/composables/useQueryErrorHandler'
import { useMutationErrorHandler } from '@/composables/useMutationErrorHandler'
import router from '@/router'

const { alertMessage, alertTitle, alertType, showAlert } = useAlert()

const cartQuery = useCartQuery()
const { data, isLoading } = cartQuery
useQueryErrorHandler(cartQuery)

const orderMutation = useOrderMutation()
const { mutate: createOrder, isPending } = orderMutation
useMutationErrorHandler(orderMutation)

const items = computed(() => data.value ?? [])

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

const handleCompletePurchase = async () => {
  const payload: OrderProductPayload[] = items.value.map((item) => {
    const orderProduct: OrderProductPayload = {
      product_id: item.product.product_id,
      size: item.stock.size,
      quantity: item.product_quantity,
      price: item.product.price,
    }
    return orderProduct
  })
  createOrder(payload)
}
</script>
