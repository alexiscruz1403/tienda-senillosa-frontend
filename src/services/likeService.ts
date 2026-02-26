import { postData, getData } from './api'
import type { ApiResponse } from './api'
import type { PublicProductPaginated } from './productService'

export const getLikes = async (page: number): Promise<ApiResponse<PublicProductPaginated>> => {
  return await getData<PublicProductPaginated>('/user/likes', { page: page })
}

export const likeProduct = async (productId: number): Promise<ApiResponse<null>> => {
  return await postData(`/products/${productId}/like`, {})
}
