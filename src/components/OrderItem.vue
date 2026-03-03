<template>
  <div
    class="bg-white w-full px-4 py-4 flex justify-between items-center cursor-pointer border border-gray-100 rounded-2xl shadow-sm hover:border-gray-200 hover:shadow-md transition-all duration-200"
    @click="handleItemClick"
  >
    <div class="flex flex-col gap-2 items-start">
      <div>
        <h2 class="font-bold text-lg">ORD - {{ props.order.order_id }}</h2>
        <h3 class="text-[#65758B]">{{ argentinaDate }}</h3>
      </div>
      <div class="relative min-w-40 h-24">
        <!-- 1 sola imagen -->
        <div
          v-if="images.length === 1"
          class="absolute top-0 bg-[#F4F6FB] h-18 w-18 md:h-24 md:w-24 rounded-2xl border-2 border-white flex items-center justify-center"
        >
          <img :src="images[0]?.url" class="w-14 h-14 md:h-20 md:w-20 object-cover" />
        </div>

        <!-- 2 imágenes -->
        <template v-else-if="images.length === 2">
          <div
            v-for="(img, index) in images"
            :key="index"
            class="absolute top-0 bg-[#F4F6FB] h-18 w-18 md:h-24 md:w-24 rounded-2xl border-2 border-white flex items-center justify-center"
            :class="index === 0 ? 'left-0 z-10' : 'left-10 md:left-14'"
          >
            <img :src="img.url" class="w-14 h-14 md:h-20 md:w-20 object-cover" />
          </div>
        </template>

        <!-- 3 o más imágenes -->
        <template v-else-if="images.length >= 3">
          <!-- Primera -->
          <div
            class="absolute top-0 bg-[#F4F6FB] h-18 w-18 md:h-24 md:w-24 rounded-2xl border-2 border-white flex items-center justify-center z-20"
          >
            <img :src="images[0]?.url" class="w-14 h-14 md:h-20 md:w-20 object-cover" />
          </div>

          <!-- Segunda -->
          <div
            class="absolute top-0 bg-[#F4F6FB] h-18 w-18 md:h-24 md:w-24 rounded-2xl border-2 border-white flex items-center justify-center z-10 left-10 md:left-14"
          >
            <img :src="images[1]?.url" class="w-14 h-14 md:h-20 md:w-20 object-cover" />
          </div>

          <!-- Tercera con overlay + -->
          <div
            class="absolute top-0 left-20 md:left-28 h-18 w-18 md:h-24 md:w-24 rounded-2xl overflow-hidden border-2 border-white bg-gray-800"
          >
            <img :src="images[2]?.url" class="w-14 h-14 md:h-20 md:w-20 object-cover opacity-60" />
            <div
              class="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold"
            >
              +
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="flex gap-4 items-center">
      <div class="flex flex-col gap-2">
        <v-chip :color="chipColor">{{ lastStatus?.name }}</v-chip>
        <p class="font-bold">${{ totalPrice }}</p>
      </div>
      <chevron-right :size="20" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { type Order } from '@/services/orderService'
import { type PublicImage } from '@/types/ImageTypes'
import { computed } from 'vue'
import router from '@/router'
import { getArgentinaDate } from '@/utils/dateUtils'

interface Props {
  order: Order
}

const props = defineProps<Props>()

const lastStatus = computed(() => {
  const orderStatusesLength = props.order.order_statuses.length
  const lastOrderStatus = props.order.order_statuses[orderStatusesLength - 1]?.status ?? null
  return lastOrderStatus
})

const totalPrice = computed(() => {
  console.log(props.order.products)
  const total = props.order.products.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity
  }, 0)

  return total.toFixed(2)
})

const chipColor = computed(() => {
  switch (lastStatus.value?.status_id) {
    case 1:
      return 'info'
    default:
      return 'text-muted'
  }
})

const argentinaDate = getArgentinaDate(props.order.order_date)

const images = computed(() => {
  const mainImages: PublicImage[] = []
  props.order.products.forEach((product) => {
    const image =
      product.product.images.find((img) => img.is_main) ?? product.product.images[0] ?? null
    if (image) mainImages.push(image)
  })

  return mainImages
})

const handleItemClick = () => {
  router.push(`/orders/${props.order.order_id}`)
}
</script>
