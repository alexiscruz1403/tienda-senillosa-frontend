<template>
  <app-layout>
    <div class="min-h-screen w-full bg-[#F4F6FB] flex flex-col items-center">
      <div class="bg-[#0E1629] w-full h-52 text-white flex flex-col gap-2 justify-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold">Mis Favoritos</h1>
        <p class="text-[#F8FAFCB2]">{{ likedProducts.length }} productos encontrados</p>
      </div>
      <div
        class="h-full w-full flex flex-col items-center justify-center gap-6"
        v-if="emptyLikedProducts && !isLoading && !isFetching && !isFetchingNextPage"
      >
        <div class="px-6 py-6 rounded-full bg-[#EDEFF3] max-w-max">
          <Heart :size="50" color="#65758B" />
        </div>
        <div class="flex flex-col gap-2 justify-center items-center text-center">
          <h2 class="text-2xl font-semibold">No tenes productos favoritos</h2>
          <p class="text-lg text-[#65758B]">
            Guarda los productos que te gusten para encontrarlos fácilmente aquí.
          </p>
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
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-screen py-8 px-4 gap-y-4 gap-x-4"
      >
        <ProductCard
          v-for="product in likedProducts"
          :key="product.product_id"
          :product_id="product.product_id"
          :name="product.name"
          :brand="product.brand"
          :price="product.price"
          :imageUrl="
            product.images?.length > 0
              ? (product.images.find((image) => image.is_main)?.url ?? '')
              : ''
          "
          :discount="product.discount"
          :isLiked="product.is_liked"
        />
        <product-card-skeleton :quantity="4" v-if="isLoading || isFetchingNextPage" />
      </div>
      <v-btn
        v-if="!isLoading && !isFetching && hasNextPage"
        color="primary"
        class="mb-4"
        @click="nextPage"
      >
        Cargar más
      </v-btn>
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
import ProductCard from '@/components/ProductCard.vue'
import AppAlert from '@/components/AppAlert.vue'
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton.vue'
import { Heart, ArrowRight } from 'lucide-vue-next'
import { computed } from 'vue'
import router from '@/router'
import { useAlert } from '@/composables/useAlert'
import { useLikesQuery } from '@/queries/likes.query'
import { useQueryErrorHandler } from '@/composables/useQueryErrorHandler'

const likesQuery = useLikesQuery()
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } = likesQuery
const likedProducts = computed(() => data?.value?.pages.flatMap((page) => page.data) ?? [])
useQueryErrorHandler(likesQuery)

const emptyLikedProducts = computed(() => {
  return likedProducts.value.length === 0
})

const { alertMessage, alertTitle, alertType, showAlert } = useAlert()

const nextPage = () => {
  if (hasNextPage) {
    fetchNextPage()
  }
}

const handleExploreClick = () => {
  router.push('/products')
}
</script>
