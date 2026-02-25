<template>
  <app-layout>
    <section class="relative h-screen w-full">
      <v-carousel show-arrows="hover" hide-delimiters height="100vh">
        <template v-slot:prev="{ props }">
          <button
            class="bg-[#F8FAFC]/10 px-2 py-2 backdrop-blur-xs border rounded-full transition-colors text-white"
            @click="props.onClick"
          >
            <ChevronLeft :size="30" />
          </button>
        </template>
        <template v-slot:next="{ props }">
          <button
            class="bg-[#F8FAFC]/10 px-2 py-2 backdrop-blur-xs border rounded-full transition-colors text-white"
            @click="props.onClick"
          >
            <ChevronRight :size="30" />
          </button>
        </template>
        <v-carousel-item v-for="(item, i) in 5" :key="i">
          <img
            src="../../public/imgs/zapatillas-home.jpg"
            alt="Imagen zapatillas"
            class="w-full h-full object-cover absolute"
          />

          <div
            class="absolute inset-0 bg-linear-to-br from-[#0f1729] to-[#073c92] opacity-80 w-full h-full"
          ></div>

          <div
            class="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 p-6 rounded flex flex-col gap-8 md:gap-5 max-w-md"
          >
            <h3 class="text-[#3C83F6] font-semibold">EDICIÓN LIMITADA</h3>
            <h2 class="text-white text-5xl md:text-7xl font-bold">Zapatillas exclusivas</h2>
            <p class="text-white text-xl">
              Las zapatillas más buscadas ya están aquí. No te quedes sin las tuyas
            </p>
            <div class="flex gap-4">
              <v-btn color="white" size="x-large" rounded="lg">Comprar ahora</v-btn>
              <v-btn color="white" size="x-large" variant="outlined" rounded="lg">Explorar</v-btn>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </section>

    <section class="bg-[#F4F6FB] py-10">
      <div class="flex flex-col gap-1 px-4 py-4">
        <h3 class="font-semibold text-[#3C83F6] text-lg">Lo más vendido</h3>
        <div class="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-0">
          <h2 class="text-3xl md:text-5xl font-semibold">
            Productos <span class="text-[#3C83F6]">Destacados</span>
          </h2>
          <v-btn variant="text" class="max-w-max!">
            <template #append>
              <ArrowRight :size="20" />
            </template>
            Ver todos
          </v-btn>
        </div>
      </div>
      <div class="relative w-full px-4">
        <div class="overflow-hidden">
          <div
            class="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[33.3333%] lg:auto-cols-[25%] transition-transform duration-500 ease-in-out"
            ref="productsCarousel"
            v-if="loading"
          >
            <div class="px-2" v-for="n in 10" :key="n">
              <v-skeleton-loader
                type="image, list-item-three-line"
                class="w-full h-96 flex items-start!"
              />
            </div>
          </div>
          <div
            class="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[33.3333%] lg:auto-cols-[25%] transition-transform duration-500 ease-in-out"
            ref="productsCarousel"
            v-else
          >
            <div class="px-2" v-for="product in featuredProducts" :key="product.product_id">
              <ProductCard
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
                @like="handleLikeClick"
                :isLiked="product.is_liked"
              />
            </div>
          </div>
        </div>

        <div
          class="flex w-full justify-between absolute top-1/2 -translate-y-1/2 left-0 px-4 pointer-events-none"
        >
          <button
            @click="prevSlide"
            :disabled="disablePrevButton()"
            class="px-2 py-2 bg-white rounded-full hover:bg-[#3C83F6] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto shadow-lg"
          >
            <ChevronLeft :size="30" />
          </button>
          <button
            @click="nextSlide"
            :disabled="disableNextButton()"
            class="px-2 py-2 bg-white rounded-full hover:bg-[#3C83F6] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto shadow-lg"
          >
            <ChevronRight :size="30" />
          </button>
        </div>
      </div>
    </section>
    <section class="bg-[#F4F6FB] flex flex-col gap-8 py-10 px-4">
      <div class="flex flex-col gap-4 items-center">
        <h3 class="font-semibold text-[#3C83F6] text-lg">Nuestra historia</h3>
        <h2 class="text-3xl md:text-5xl font-semibold">
          Más que <span class="text-[#3C83F6]">Ropa</span>
        </h2>
        <p class="text-lg text-[#65758B] max-w-3xl text-center">
          Nacimos en 2020 con una misión clara: democratizar el streetwear en Argentina. Creemos que
          el estilo no tiene que ser caro para ser auténtico. Cada prenda que diseñamos está pensada
          para quienes se atreven a expresarse, para los que no siguen tendencias sino que las
          crean. Tienda Senillosa es más que una marca, es una comunidad de jóvenes que redefinen
          las reglas de la moda.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <v-card color="white" variant="flat" class="py-6!">
          <div class="flex justify-center items-center">
            <div class="rounded-full bg-[#3C83F61A] px-3 py-3">
              <Sparkles :size="34" color="#3C83F6" />
            </div>
          </div>
          <v-card-title class="text-center! text-wrap!">Calidad Premium</v-card-title>
          <v-card-subtitle class="text-center! text-wrap!"
            >Materiales seleccionados para prendas que duran</v-card-subtitle
          >
        </v-card>
        <v-card color="white" variant="flat" class="py-6!">
          <div class="flex justify-center items-center">
            <div class="rounded-full bg-[#3C83F61A] px-3 py-3">
              <Truck :size="34" color="#3C83F6" />
            </div>
          </div>
          <v-card-title class="text-center! text-wrap!">Envíos a todo el país</v-card-title>
          <v-card-subtitle class="text-center! text-wrap!"
            >Recibe tu pedido en cualquier punto de Argentina</v-card-subtitle
          >
        </v-card>
        <v-card color="white" variant="flat" class="py-6!">
          <div class="flex justify-center items-center">
            <div class="rounded-full bg-[#3C83F61A] px-3 py-3">
              <Shield :size="34" color="#3C83F6" />
            </div>
          </div>
          <v-card-title class="text-center! text-wrap!">Pago Seguro</v-card-title>
          <v-card-subtitle class="text-center! text-wrap!"
            >Tus datos y compras están protegidas</v-card-subtitle
          >
        </v-card>
        <v-card color="white" variant="flat" class="py-6!">
          <div class="flex justify-center items-center">
            <div class="rounded-full bg-[#3C83F61A] px-3 py-3">
              <RefreshCcw :size="34" color="#3C83F6" />
            </div>
          </div>
          <v-card-title class="text-center! text-wrap!">Cambios gratis</v-card-title>
          <v-card-subtitle class="text-center! text-wrap!"
            >Tienes 30 días para cambiar o devolver tu pedido</v-card-subtitle
          >
        </v-card>
      </div>
    </section>
  </app-layout>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import AppLayout from '@/layout/AppLayout.vue'
import ProductCard from '@/components/ProductCard.vue'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Truck,
  Sparkles,
  Shield,
  RefreshCcw,
} from 'lucide-vue-next'
import { getData } from '@/services/api'
import { likeProduct } from '@/services/likeService'
import type { PublicProduct } from '@/types/ProductTypes'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import router from '@/router'

const loading = ref<boolean>(true)
const featuredProducts = ref<Array<PublicProduct>>([])

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const getItemsPerPage = () => {
  if (window.innerWidth >= 1024) return 4 // lg
  if (window.innerWidth >= 640) return 3 // sm
  return 1 // default
}

const lastDisplayedItem = ref<number>(getItemsPerPage())
const totalItems = ref<number>(10)

const productsCarousel = ref<HTMLElement | null>(null)

const nextSlide = () => {
  if (lastDisplayedItem.value < totalItems.value) {
    lastDisplayedItem.value += 1
    if (productsCarousel.value) {
      productsCarousel.value.style.transform = `translateX(-${(lastDisplayedItem.value - getItemsPerPage()) * (100 / getItemsPerPage())}%)`
    }
  }
}

const prevSlide = () => {
  if (lastDisplayedItem.value > getItemsPerPage()) {
    lastDisplayedItem.value -= 1
    if (productsCarousel.value) {
      productsCarousel.value.style.transform = `translateX(-${(lastDisplayedItem.value - getItemsPerPage()) * (100 / getItemsPerPage())}%)`
    }
  }
}

const disablePrevButton = () => {
  return lastDisplayedItem.value <= getItemsPerPage()
}

const disableNextButton = () => {
  return lastDisplayedItem.value >= totalItems.value
}

const handleLikeClick = (productId: number) => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  featuredProducts.value = featuredProducts.value.map((product) => {
    if (product.product_id === productId) {
      return {
        ...product,
        is_liked: !product.is_liked,
      }
    }
    return product
  })

  likeProduct(productId)
    .then(() => {
      // Successfully liked/unliked the product
    })
    .catch((error) => {
      console.error('Error liking/unliking product:', error)
      featuredProducts.value = featuredProducts.value.map((product) => {
        if (product.product_id === productId) {
          return {
            ...product,
            is_liked: !product.is_liked,
          }
        }
        return product
      })
    })
}

const fetchFeaturedProducts = async () => {
  getData<Array<PublicProduct>>('/products/featured')
    .then((response) => {
      featuredProducts.value = response.data as Array<PublicProduct>
    })
    .catch((error) => {
      console.error('Error fetching featured products:', error)
    })
    .finally(() => {
      loading.value = false
    })
}

const validateUserToken = async () => {
  if (isAuthenticated.value) {
    try {
      await authStore.validateUserToken()
    } catch (error) {
      console.error('Token validation failed:', error)
      authStore.logout()
    }
  }
}

onMounted(() => {
  window.addEventListener('resize', () => {
    // Reset carousel position on resize
    lastDisplayedItem.value = getItemsPerPage()
    if (productsCarousel.value) {
      productsCarousel.value.style.transform = `translateX(0%)`
    }
  })

  fetchFeaturedProducts()
  validateUserToken()
})

watch(featuredProducts, (newProducts) => {
  totalItems.value = newProducts.length
})
</script>
