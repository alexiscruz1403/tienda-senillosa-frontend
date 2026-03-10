<template>
  <app-layout>
    <div class="bg-[#0E1629] w-full h-52 text-white flex flex-col gap-2 justify-center px-4">
      <h1 class="text-4xl md:text-5xl font-bold">Mi Carrito</h1>
      <p class="text-[#F8FAFCB2]">{{ itemCount }} productos encontrados</p>
    </div>
    <div class="bg-[#F4F6FB] min-h-screen w-screen py-8 px-4">
      <div
        class="h-full w-full flex flex-col items-center justify-center gap-6"
        v-if="emptyProducts && !isLoading"
      >
        <div class="px-6 py-6 rounded-full bg-[#EDEFF3] max-w-max">
          <ShoppingBag :size="50" color="#65758B" />
        </div>
        <div class="flex flex-col gap-2 justify-center items-center text-center">
          <h2 class="text-2xl font-semibold">Tu carrito está vacío</h2>
          <p class="text-lg text-[#65758B]">Explora nuestros productos y encontrá lo que buscás</p>
        </div>
        <div>
          <v-btn color="primary" @click="handleExploreClick">
            Explorar catálogo
            <template #append>
              <ArrowRight :size="20" />
            </template>
          </v-btn>
        </div>
      </div>
      <div v-else class="w-full h-full flex flex-col items-center lg:flex-row gap-8 lg:items-start">
        <section class="w-full lg:w-[60%] flex flex-col gap-2">
          <cart-item-skeleton v-if="isLoading" />
          <cart-item
            v-else
            v-for="item in items"
            :key="item.product.product_id + '-' + item.stock.size"
            :product="item.product"
            :stock="item.stock"
            :product_quantity="item.product_quantity"
          />
          <div v-if="!isLoading && items.length">
            <button
              class="text-sm! text-[#65758B]! hover:text-[#EF4343]! py-2! transition-colors duration-300"
              @click="handleClearCart"
            >
              Vaciar carrito
            </button>
          </div>
        </section>
        <section class="w-full lg:w-[40%]">
          <cart-summary-skeleton v-if="isLoading" />
          <cart-summary v-if="!isLoading && items.length" />
        </section>
      </div>
      <app-alert
        :alertMessage="alertMessage"
        :alertTitle="alertTitle"
        :alertType="alertType"
        :showAlert="showAlert"
      />
    </div>
  </app-layout>
</template>
<script lang="ts" setup>
import AppLayout from '@/layout/AppLayout.vue'
import CartItem from '@/components/CartItem.vue'
import CartSummary from '@/components/CartSummary.vue'
import AppAlert from '@/components/AppAlert.vue'
import CartItemSkeleton from '@/components/skeletons/CartItemSkeleton.vue'
import CartSummarySkeleton from '@/components/skeletons/CartSummarySkeleton.vue'
import { ShoppingBag, ArrowRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { useAlert } from '@/composables/useAlert'
import { useCartQuery } from '@/queries/cart.query'
import { useClearCartMutation } from '@/mutations/cart.mutation'
import { useQueryErrorHandler } from '@/composables/useQueryErrorHandler'
import { useMutationErrorHandler } from '@/composables/useMutationErrorHandler'
import router from '@/router'

const cartQuery = useCartQuery()
const { data, isLoading } = cartQuery
useQueryErrorHandler(cartQuery)

const clearCartMutation = useClearCartMutation()
const { mutate: clearCart } = clearCartMutation
useMutationErrorHandler(clearCartMutation)

const items = computed(() => data.value ?? [])
const itemCount = computed(
  () => data.value?.reduce((total, item) => total + item.product_quantity, 0) ?? 0,
)

const emptyProducts = computed(() => {
  return !isLoading.value && items.value.length === 0
})

const { alertMessage, alertTitle, alertType, showAlert } = useAlert()

const handleExploreClick = () => {
  router.push('/products')
}

const handleClearCart = () => {
  clearCart()
}
</script>
