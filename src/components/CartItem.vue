<template>
  <div class="bg-white w-full flex px-6 py-6 gap-8 rounded-lg">
    <div>
      <img
        :src="
          props.product.images.find((image) => image.is_main)?.url ?? props.product.images[0]?.url
        "
        alt=""
        class="h-full w-full lg:h-40 lg:w-32 cursor-pointer"
        @click="handleImageClick"
      />
    </div>
    <div class="flex flex-col justify-between gap-4 w-full">
      <div class="flex gap-2 items-start w-full justify-between">
        <div>
          <p class="text-[#65758B] text-sm">{{ props.product.brand }}</p>
          <h2 class="md:text-lg font-semibold">{{ props.product.name }}</h2>
          <p class="text-[#65758B] text-sm">Talle: {{ props.stock.size }}</p>
        </div>
        <div>
          <Trash2
            :size="20"
            class="cursor-pointer text-[#65758B] hover:text-[#EF4343] transition-colors duration-300"
            @click="handleRemoveItem"
          />
        </div>
      </div>
      <div class="flex flex-col gap-4 md:flex-row md:justify-between md:not-odd:items-start">
        <item-counter :model-value="counterModel" :min="1" @update="handleQuantityChange" />
        <div class="flex flex-col">
          <p class="md:text-lg font-semibold">
            ${{ calculatePrice(props.product.price, props.product.discount) }}
          </p>
          <p v-if="props.product_quantity > 1" class="text-sm text-[#65758B]">
            ${{ props.product.price }} c/u
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ItemCounter from './ItemCounter.vue'
import { Trash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { type CartItemResponse } from '@/services/cart.service'
import { useUpdateCartMutation, useRemoveCartItemMutation } from '@/mutations/cart.mutation'
import { useMutationErrorHandler } from '@/composables/useMutationErrorHandler'
import router from '@/router'

const props = defineProps<CartItemResponse>()

const counterModel = ref<number>(props.product_quantity)

const updateCartMutation = useUpdateCartMutation()
const { mutate: updateCart } = updateCartMutation
useMutationErrorHandler(updateCartMutation)

const removeCartItemMutation = useRemoveCartItemMutation()
const { mutate: removeItem } = removeCartItemMutation
useMutationErrorHandler(removeCartItemMutation)

const calculatePrice = (price: number, discount: number = 0): number => {
  const discountedPrice = (price - (price * discount) / 100).toFixed(2)
  return (parseFloat(discountedPrice) * counterModel.value).toFixed(2) as unknown as number
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const handleQuantityChange = (newQuantity: number) => {
  counterModel.value = newQuantity

  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    updateCart({
      ...props,
      product_quantity: counterModel.value,
    })
  }, 500)
}

const handleRemoveItem = () => {
  removeItem({
    productId: props.product.product_id,
    size: props.stock.size,
  })
}

const handleImageClick = () => {
  router.push(`/products/${props.product.product_id}`)
}
</script>
