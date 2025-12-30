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
  is_liked: boolean
}
