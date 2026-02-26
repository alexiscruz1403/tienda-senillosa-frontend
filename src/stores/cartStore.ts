import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItemPayload, CartItemResponse } from '@/services/cartService'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Array<CartItemResponse>>([])
  const itemCount = ref<number>(0)

  const updateItemCount = () => {
    itemCount.value = items.value.reduce((total, item) => total + item.product_quantity, 0)
  }

  const setCartItems = (cartProducts: CartItemResponse[]) => {
    items.value = cartProducts
    updateItemCount()
  }

  const addItem = (cartItem: CartItemPayload) => {
    const existingItem = items.value.find(
      (i) => i.product.product_id === cartItem.product.product_id && i.stock.size === cartItem.size,
    )
    if (existingItem) {
      existingItem.product_quantity = cartItem.quantity + existingItem.product_quantity
    } else {
      items.value.push({
        product: {
          product_id: cartItem.product.product_id,
          brand: cartItem.product.brand || '',
          name: cartItem.product.name || '',
          price: cartItem.product.price || 0,
          discount: cartItem.product.discount || 0,
          images: cartItem.product.images || [],
        },
        product_quantity: cartItem.quantity,
        stock: { size: cartItem.size, quantity: cartItem.quantity },
      })
    }

    updateItemCount()
  }

  const updateItem = (cartItem: CartItemPayload) => {
    const existingItem = items.value.find(
      (i) => i.product.product_id === cartItem.product.product_id && i.stock.size === cartItem.size,
    )
    if (existingItem) {
      existingItem.product_quantity = cartItem.quantity
    }

    updateItemCount()
  }

  const removeItem = (productId: number, size: string) => {
    items.value = items.value.filter(
      (i) => !(i.product.product_id === productId && i.stock.size === size),
    )

    updateItemCount()
  }

  const setItemCount = (count: number) => {
    itemCount.value = count
  }

  const clearCart = () => {
    items.value = []
    itemCount.value = 0
  }

  return {
    items,
    itemCount,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    setCartItems,
    setItemCount,
  }
})
