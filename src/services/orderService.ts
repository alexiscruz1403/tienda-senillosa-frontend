import { getData, postData } from './api'
import type { ApiResponse } from './api'
import type { PublicProduct } from './productService'

export interface OrderProductPayload {
  product_id: number
  size: string
  quantity: number
  price: number
}

export interface OrderProductPreview {
  image: string
  price: number
}

export interface Status {
  status_id: number
  name: string
}

export interface OrderStatus {
  order_id: number
  status: Status
}

export interface OrderProduct {
  product: PublicProduct
  price: string
  size: string
  quantity: number
}

export interface Order {
  order_id: number
  order_date: string
  products: OrderProduct[]
  order_statuses: OrderStatus[]
}

export const createOrder = async (products: OrderProductPayload[]): Promise<ApiResponse<Order>> => {
  return await postData('/orders', { products })
}

export const getUserOrders = async (): Promise<ApiResponse<Order[]>> => {
  return await getData('/orders', {})
}

export const getUserOrder = async (orderId: number): Promise<ApiResponse<Order>> => {
  return await getData(`/orders/${orderId}`, {})
}
