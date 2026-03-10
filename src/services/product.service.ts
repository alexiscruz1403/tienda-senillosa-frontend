import { getData } from './api.service'
import type { PublicStock } from '@/types/StockTypes'
import type { PublicImage } from '@/types/ImageTypes'

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

export interface ProductCatalogParams {
  search: string
  category: string[]
  gender: string
  ordering: string
  page?: number
}

export const getProductCatalog = async (
  params: ProductCatalogParams,
): Promise<PublicProductPaginated> => {
  return await getData<PublicProductPaginated>('/products', {
    search: params.search,
    category: params.category,
    gender: params.gender,
    ordering: params.ordering,
    page: params.page,
  }).then((r) => r.data)
}

export const getProductById = async (productId: number): Promise<PublicProduct> => {
  return await getData<PublicProduct>(`/products/${productId}`).then((r) => r.data)
}

export const getRelatedProducts = async (productId: number): Promise<PublicProduct[]> => {
  return await getData<PublicProduct[]>(`/products/${productId}/related`).then((r) => r.data)
}

export const getFeaturedProducts = async (): Promise<PublicProduct[]> => {
  return await getData<PublicProduct[]>('/products/featured').then((r) => r.data)
}
