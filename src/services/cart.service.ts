import { postData, getData, putData } from './api.service'

export interface CartItemPayload {
  product_id: number
  size: string
  quantity: number
}

export interface CartItemResponse {
  stock: {
    size: string
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

export const getCartProducts = async (): Promise<CartItemResponse[]> => {
  return await getData<CartItemResponse[]>('/cart').then((r) => r.data)
}

export const addProductToCart = async (product: CartItemPayload): Promise<CartItemResponse> => {
  return await postData<CartItemResponse>('/cart/add', product).then((r) => r.data)
}

export const updateProductCart = async (product: CartItemPayload): Promise<CartItemResponse> => {
  return await putData<CartItemResponse>('/cart/update', product).then((r) => r.data)
}

export const removeProductFromCart = async (productId: number, size: string): Promise<null> => {
  return await postData<null>('/cart/remove', { product_id: productId, size }).then((r) => r.data)
}

export const clearCart = async (): Promise<null> => {
  return await postData<null>('/cart/clear', {}).then((r) => r.data)
}
