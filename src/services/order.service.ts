import { getData, postData } from './api.service'
import type { PublicProduct } from './product.service'

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

export const createOrder = async (products: OrderProductPayload[]): Promise<Order> => {
  return await postData<Order>('/orders', { products }).then((r) => r.data)
}

export const getUserOrders = async (): Promise<Order[]> => {
  return await getData<Order[]>('/orders', {}).then((r) => r.data)
}

export const getUserOrder = async (orderId: number): Promise<Order> => {
  return await getData<Order>(`/orders/${orderId}`, {}).then((r) => r.data)
}
