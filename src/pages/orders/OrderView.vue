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
      <order-skeleton v-if="isFetching" />
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
import OrderSkeleton from '@/components/skeletons/OrderSkeleton.vue'
import { Box, Check, Home, Truck } from 'lucide-vue-next'
import { computed } from 'vue'
import { useOrderQuery } from '@/queries/order.query'
import { useQueryErrorHandler } from '@/composables/useQueryErrorHandler'
import { useRoute } from 'vue-router'
import { getArgentinaDate } from '@/utils/dateUtils'

const route = useRoute()
const orderId = computed(() => Number(route.params.id))

const orderQuery = useOrderQuery(orderId)
const { data: order, isFetching } = orderQuery
useQueryErrorHandler(orderQuery)
const orderStatuses = computed(() => {
  return order.value?.order_statuses ?? []
})
const orderProducts = computed(() => {
  return order.value?.products ?? []
})

const getStatusSelectedColor = (statusId: number) => {
  const statusExists = orderStatuses.value.find((status) => status.status.status_id === statusId)

  return statusExists ? 'accent-main' : 'text-muted'
}
</script>
