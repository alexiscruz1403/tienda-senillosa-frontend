<template>
  <app-layout>
    <div class="bg-[#0E1629] w-full h-52 text-white flex flex-col gap-2 justify-center px-4">
      <h1 class="text-4xl md:text-5xl font-bold">Mi Carrito</h1>
      <p class="text-[#F8FAFCB2]">{{ itemCount }} productos encontrados</p>
    </div>
    <div class="bg-[#F4F6FB] min-h-screen w-screen py-8 px-4">
      <div
        class="h-full w-full flex flex-col items-center justify-center gap-6"
        v-if="emptyProducts && !loading"
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
          <div v-if="loading" class="w-full">
            <div class="bg-white w-full flex px-6 py-6 gap-8 rounded-lg animate-pulse">
              <!-- Image skeleton -->
              <div class="bg-gray-300 h-32 w-24 lg:h-40 lg:w-32 rounded"></div>

              <!-- Content skeleton -->
              <div class="flex flex-col justify-between gap-4 w-full">
                <!-- Top section -->
                <div class="flex gap-2 items-start w-full justify-between">
                  <div class="flex flex-col gap-2 flex-1">
                    <!-- Brand -->
                    <div class="bg-gray-300 h-4 w-20 rounded"></div>
                    <!-- Product name -->
                    <div class="bg-gray-300 h-5 w-48 rounded"></div>
                    <!-- Size -->
                    <div class="bg-gray-300 h-4 w-16 rounded"></div>
                  </div>
                  <!-- Trash icon placeholder -->
                  <div class="bg-gray-300 h-5 w-5 rounded"></div>
                </div>

                <!-- Bottom section -->
                <div class="flex flex-col gap-4 md:flex-row md:justify-between">
                  <!-- Counter skeleton -->
                  <div class="flex gap-2 items-center">
                    <div class="bg-gray-300 h-10 w-10 rounded"></div>
                    <div class="bg-gray-300 h-6 w-8 rounded"></div>
                    <div class="bg-gray-300 h-10 w-10 rounded"></div>
                  </div>
                  <!-- Price skeleton -->
                  <div class="flex flex-col gap-1">
                    <div class="bg-gray-300 h-6 w-24 rounded"></div>
                    <div class="bg-gray-300 h-4 w-16 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <cart-item
            v-else
            v-for="item in items"
            :key="item.product.product_id + '-' + item.stock.size"
            :product_id="item.product.product_id"
            :name="item.product.name"
            :brand="item.product.brand"
            :price="item.product.price"
            :discount="item.product.discount"
            :image="item.product.images.find((img) => img.is_main)?.url || ''"
            :size="item.stock.size"
            :product_quantity="item.product_quantity"
            :max="item.stock.quantity"
            @update-quantity="updateItemQuantity"
            @remove-item="removeItemFromCart"
          />
          <div v-if="!loading && items.length">
            <button
              class="text-sm! text-[#65758B]! hover:text-[#EF4343]! py-2! transition-colors duration-300"
              @click="handleClearCart"
            >
              Vaciar carrito
            </button>
          </div>
        </section>
        <section class="w-full lg:w-[40%]">
          <div
            class="w-full bg-white px-6 py-6 flex flex-col gap-4 rounded-lg animate-pulse"
            v-if="loading"
          >
            <!-- Title skeleton -->
            <div class="bg-gray-300 h-6 w-32 rounded"></div>

            <!-- Subtotal and shipping section -->
            <div class="flex flex-col gap-3">
              <div class="w-full flex justify-between">
                <div class="bg-gray-300 h-5 w-20 rounded"></div>
                <div class="bg-gray-300 h-5 w-16 rounded"></div>
              </div>
              <div class="w-full flex justify-between">
                <div class="bg-gray-300 h-5 w-16 rounded"></div>
                <div class="bg-gray-300 h-5 w-16 rounded"></div>
              </div>
            </div>

            <!-- Divider -->
            <div class="bg-gray-300 h-px w-full rounded"></div>

            <!-- Total section -->
            <div class="flex flex-col gap-4">
              <div class="w-full flex justify-between">
                <div class="bg-gray-300 h-5 w-16 rounded"></div>
                <div class="bg-gray-300 h-6 w-24 rounded"></div>
              </div>

              <!-- Buttons skeleton -->
              <div class="flex flex-col gap-2">
                <div class="bg-gray-300 h-10 w-full rounded"></div>
                <div class="bg-gray-300 h-10 w-full rounded"></div>
              </div>
            </div>
          </div>
          <cart-summary v-if="!loading && items.length" />
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
import { ShoppingBag } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import {
  type CartItemPayload,
  type CartItemResponse,
  getCartProducts,
  updateProductCart,
  removeProductFromCart,
  clearCart,
} from '@/services/cartService'
import { useAlert } from '@/composables/useAlert'
import { handleApiError } from '@/utils/apiUtils'
import router from '@/router'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const cartStore = useCartStore()
const { items, itemCount } = storeToRefs(cartStore)

const loading = ref<boolean>(true)

const emptyProducts = ref<boolean>(false)

const { alertMessage, alertTitle, alertType, showAlert, displayAlertError } = useAlert()

const getCartItems = async () => {
  try {
    const cartProductsResponse = await getCartProducts()
    const cartProducts: CartItemResponse[] = cartProductsResponse.data
    cartStore.setCartItems(cartProducts)
    loading.value = false
    if (items.value.length === 0) {
      emptyProducts.value = true
    } else {
      emptyProducts.value = false
    }
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Ocurrió un error al obtener su carrito', errors)
  }
}

const updateItemQuantity = async (productId: number, size: string, quantity: number) => {
  try {
    const product: CartItemPayload = { product: { product_id: productId }, size, quantity }
    cartStore.updateItem(product)
    await updateProductCart(product)
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Ocurrió un error al actualizar su carrito', errors)
  }
}

const removeItemFromCart = async (productId: number, size: string) => {
  try {
    cartStore.removeItem(productId, size)
    emptyProducts.value = items.value.length === 0
    await removeProductFromCart(productId, size)
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Ocurrió un error al eliminar el producto de su carrito', errors)
  }
}

const handleClearCart = async () => {
  try {
    emptyProducts.value = true
    cartStore.clearCart()
    await clearCart()
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Ocurrió un error al limpiar su carrito', errors)
  }
}

const handleExploreClick = () => {
  router.push('/products')
}

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  getCartItems()
})
</script>
