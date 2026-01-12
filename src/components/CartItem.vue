<template>
  <div class="bg-white w-full flex px-6 py-6 gap-8 rounded-lg">
    <div>
      <img
        :src="props.image"
        alt=""
        class="h-full w-full lg:h-40 lg:w-32 cursor-pointer"
        @click="handleImageClick"
      />
    </div>
    <div class="flex flex-col justify-between gap-4 w-full">
      <div class="flex gap-2 items-start w-full justify-between">
        <div>
          <p class="text-[#65758B] text-sm">{{ props.brand }}</p>
          <h2 class="md:text-lg font-semibold">{{ props.name }}</h2>
          <p class="text-[#65758B] text-sm">Talle: {{ props.size }}</p>
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
        <item-counter
          :model-value="counterModel"
          :min="1"
          :max="props.max"
          @update="handleQuantityChange"
        />
        <div class="flex flex-col">
          <p class="md:text-lg font-semibold">${{ calculatePrice(props.price, props.discount) }}</p>
          <p v-if="props.product_quantity > 1" class="text-sm text-[#65758B]">
            ${{ props.price }} c/u
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ItemCounter from './ItemCounter.vue'
import { Trash2 } from 'lucide-vue-next'
import { ref, defineEmits } from 'vue'
import router from '@/router'

const props = defineProps<{
  product_id: number
  name: string
  brand: string
  price: number
  discount: number
  image: string
  size: string
  max: number
  product_quantity: number
}>()

const counterModel = ref<number>(props.product_quantity)

const calculatePrice = (price: number, discount: number = 0): number => {
  const discountedPrice = (price - (price * discount) / 100).toFixed(2)
  return (parseFloat(discountedPrice) * counterModel.value).toFixed(2) as unknown as number
}

const emit = defineEmits<{
  (e: 'update-quantity', productId: number, size: string, quantity: number): void
  (e: 'remove-item', productId: number, size: string): void
}>()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const handleQuantityChange = (newQuantity: number) => {
  counterModel.value = newQuantity

  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    emit('update-quantity', props.product_id, props.size, newQuantity)
  }, 500)
}

const handleRemoveItem = () => {
  emit('remove-item', props.product_id, props.size)
}

const handleImageClick = () => {
  router.push(`/products/${props.product_id}`)
}
</script>
