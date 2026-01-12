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
