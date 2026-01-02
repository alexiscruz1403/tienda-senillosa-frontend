import type { PublicStock } from './StockTypes'
import type { PublicImage } from './ImageTypes'

export interface PublicProduct {
  product_id: number
  name: string
  description: string
  brand: string
  price: number
  category: string
  gender: string
  discount: number
  created_at: string
  stocks: PublicStock[]
  images: PublicImage[]
  orders: number
  is_liked: boolean
}

export interface PublicProductPaginated {
  data: PublicProduct[]
  links: {
    self: string
    prev: string | null
    next: string | null
  }
  meta: {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
  }
}
