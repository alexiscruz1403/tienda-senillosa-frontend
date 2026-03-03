<template>
  <app-layout>
    <div class="bg-[#F4F6FB] px-4 py-8">
      <v-breadcrumbs
        :items="[
          { title: 'Inicio', href: '/' },
          { title: 'Perfil', href: '/profile' },
          { title: `ORD - ${orderId}`, disabled: true },
        ]"
      />
      <div class="flex flex-col gap-4 lg:flex-row animate-pulse" v-if="loading">
        <!-- LEFT PANEL -->
        <div
          class="bg-white px-8 py-8 rounded-xl flex flex-col gap-8 w-screen lg:min-w-[60%] shadow-md"
        >
          <!-- HEADER -->
          <div class="flex flex-col gap-2">
            <div class="h-7 w-48 bg-gray-200 rounded"></div>
            <div class="h-5 w-64 bg-gray-200 rounded"></div>
          </div>

          <!-- TIMELINE -->
          <div class="flex flex-col gap-3">
            <div class="h-5 w-40 bg-gray-200 rounded"></div>

            <div class="flex justify-between items-center mt-4">
              <div v-for="i in 4" :key="i" class="flex flex-col items-center gap-2 w-full">
                <div class="w-10 h-10 rounded-full bg-gray-200"></div>
                <div class="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          <!-- PRODUCTS -->
          <div class="flex flex-col gap-3">
            <div class="h-5 w-32 bg-gray-200 rounded"></div>

            <div class="flex flex-col gap-4">
              <div v-for="i in 3" :key="i" class="flex gap-4 items-center">
                <!-- image -->
                <div class="bg-gray-200 h-24 w-24 rounded-lg"></div>

                <!-- text -->
                <div class="flex flex-col gap-2 w-full">
                  <div class="h-4 w-52 bg-gray-200 rounded"></div>
                  <div class="h-3 w-40 bg-gray-200 rounded"></div>
                  <div class="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT PANEL -->
        <div class="bg-white px-6 py-6 flex flex-col gap-4 max-h-max w-full rounded-xl shadow-md">
          <div class="h-6 w-32 bg-gray-200 rounded"></div>

          <div class="flex flex-col gap-3">
            <div class="flex justify-between">
              <div class="h-4 w-20 bg-gray-200 rounded"></div>
              <div class="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            <div class="flex justify-between">
              <div class="h-4 w-16 bg-gray-200 rounded"></div>
              <div class="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div class="border-t pt-4 flex justify-between">
            <div class="h-5 w-16 bg-gray-200 rounded"></div>
            <div class="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 lg:flex-row" v-else>
        <div
          class="bg-white px-8 py-8 rounded-xl flex flex-col gap-8 w-screen lg:min-w-[60%] shadow-md"
        >
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold">ORD - {{ order?.order_id }}</h1>
            <p class="text-[#65758B] text-lg">
              Fecha: {{ getArgentinaDate(order?.order_date ?? new Date()) }}
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <h2 class="font-bold">Estado del pedido</h2>
            <div class="w-full overflow-auto">
              <v-timeline direction="horizontal">
                <v-timeline-item :dot-color="getStatusSelectedColor(1)" size="x-large">
                  <template v-slot:icon>
                    <Box :size="20" color="white" />
                  </template>
                  <p>Orden Enviada</p>
                </v-timeline-item>
                <v-timeline-item :dot-color="getStatusSelectedColor(2)" size="x-large">
                  <template v-slot:icon>
                    <Check :size="20" color="white" />
                  </template>
                  <template v-slot:opposite>
                    <p>Orden Aceptada</p>
                  </template>
                </v-timeline-item>
                <v-timeline-item :dot-color="getStatusSelectedColor(3)" size="x-large">
                  <template v-slot:icon>
                    <Truck :size="20" color="white" />
                  </template>
                  <p>Orden en camino</p>
                </v-timeline-item>
                <v-timeline-item :dot-color="getStatusSelectedColor(4)" size="x-large">
                  <template v-slot:icon>
                    <Home :size="20" color="white" />
                  </template>
                  <template v-slot:opposite>
                    <p>Orden Recibida</p>
                  </template>
                </v-timeline-item>
              </v-timeline>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h2 class="font-bold">Productos</h2>
            <div class="flex flex-col gap-2">
              <div
                v-for="product in orderProducts"
                class="flex gap-4 bg-white"
                :key="product.product.product_id"
              >
                <div class="bg-[#F4F6FB] h-24 w-24 rounded-lg flex items-center justify-center">
                  <img
                    :src="
                      product.product.images.find((img) => img.is_main)?.url ??
                      product.product.images[0]?.url
                    "
                    alt="Imagen del producto"
                    class="h-20 w-20 object-cover"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">{{ product.product.name }}</p>
                  <p class="text-sm text-[#65758B]">
                    Talle: {{ product.size }} | Cantidad: {{ product.quantity }}
                  </p>
                  <p class="font-semibold">${{ product.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <order-summary :order="order" v-if="order" />
      </div>
    </div>
  </app-layout>
</template>
<script setup lang="ts">
import AppLayout from '@/layout/AppLayout.vue'
import OrderSummary from '@/components/OrderSummary.vue'
import { onMounted, ref } from 'vue'
import {
  getUserOrder,
  type Order,
  type OrderStatus,
  type OrderProduct,
} from '@/services/orderService'
import { Box, Check, Home, Truck } from 'lucide-vue-next'
import router from '@/router'
import { getArgentinaDate } from '@/utils/dateUtils'

const orderId = router.currentRoute.value.params.id
const order = ref<Order>()
const orderStatuses = ref<OrderStatus[]>([])
const orderProducts = ref<OrderProduct[]>([])

const loading = ref<boolean>(true)

const getOrder = async () => {
  try {
    const response = await getUserOrder(Number(orderId))
    order.value = response.data
    orderStatuses.value = response.data.order_statuses
    orderProducts.value = response.data.products
  } catch (error) {
    console.error(error)
    router.push('/profile')
  } finally {
    loading.value = false
  }
}

const getStatusSelectedColor = (statusId: number) => {
  const statusExists = orderStatuses.value.find((status) => status.status.status_id === statusId)

  return statusExists ? 'accent-main' : 'text-muted'
}

onMounted(() => {
  getOrder()
})
</script>
