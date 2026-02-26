import { type ApiResponse } from './api'
import { postData, getData, putData } from './api'

export interface CartItemPayload {
  product: {
    product_id: number
    brand?: string
    name?: string
    price?: number
    discount?: number
    images?: Array<{
      url: string
      is_main: boolean
    }>
  }
  quantity: number
  size: string
}

export interface CartItemResponse {
  stock: {
    size: string
    quantity: number
  }
  product: {
    product_id: number
    brand: string
    name: string
    price: number
    discount: number
    images: Array<{
      url: string
      is_main: boolean
    }>
  }
  product_quantity: number
}

export const getCartProducts = async (): Promise<ApiResponse<CartItemResponse[]>> => {
  return await getData<Array<CartItemResponse>>('/cart')
}

export const addProductToCart = async (
  product: CartItemPayload,
): Promise<ApiResponse<CartItemResponse>> => {
  return await postData('/cart/add', {
    product_id: product.product.product_id,
    quantity: product.quantity,
    size: product.size,
  })
}

export const updateProductCart = async (
  product: CartItemPayload,
): Promise<ApiResponse<CartItemResponse>> => {
  return await putData('/cart/update', {
    product_id: product.product.product_id,
    quantity: product.quantity,
    size: product.size,
  })
}

export const removeProductFromCart = async (
  productId: number,
  size: string,
): Promise<ApiResponse<null>> => {
  return await postData('/cart/remove', { product_id: productId, size })
}

export const clearCart = async (): Promise<ApiResponse<null>> => {
  return await postData('/cart/clear', {})
}
