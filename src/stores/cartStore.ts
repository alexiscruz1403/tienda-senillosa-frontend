import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getData, postData, putData } from '@/services/api'
import type { CartItemResponse, CartItemPayload } from '@/types/CartTypes'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Array<CartItemResponse>>([])
  const itemCount = ref<number>(0)

  const fetchCartItems = async () => {
    try {
      const response = await getData<Array<CartItemResponse>>('/cart')
      items.value = response.data
      itemCount.value = items.value.reduce((total, item) => total + item.product_quantity, 0)
    } catch (error) {
      console.error('Error fetching cart items:', error)
    }
  }

  const updateItemCount = () => {
    itemCount.value = items.value.reduce((total, item) => total + item.product_quantity, 0)
  }

  const addItem = async (cartItem: CartItemPayload) => {
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

    try {
      await postData('/cart/add', {
        product_id: cartItem.product.product_id,
        quantity: cartItem.quantity,
        size: cartItem.size,
      })
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }

  const updateItem = async (cartItem: CartItemPayload) => {
    const existingItem = items.value.find(
      (i) => i.product.product_id === cartItem.product.product_id && i.stock.size === cartItem.size,
    )
    if (existingItem) {
      existingItem.product_quantity = cartItem.quantity
    }

    updateItemCount()

    try {
      await putData('/cart/update', {
        product_id: cartItem.product.product_id,
        quantity: cartItem.quantity,
        size: cartItem.size,
      })
    } catch (error) {
      console.error('Error updating item in cart:', error)
    }
  }

  const removeItem = async (productId: number, size: string) => {
    items.value = items.value.filter(
      (i) => !(i.product.product_id === productId && i.stock.size === size),
    )

    updateItemCount()

    try {
      await postData('/cart/remove', { product_id: productId, size })
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }

  const setItemCount = (count: number) => {
    itemCount.value = count
  }

  const clearCart = async () => {
    items.value = []
    itemCount.value = 0
    try {
      await postData('/cart/clear', {})
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  return {
    items,
    itemCount,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    fetchCartItems,
    setItemCount,
  }
})
