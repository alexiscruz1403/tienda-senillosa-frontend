import { postData, getData } from './api.service'
import type { PublicProductPaginated } from './product.service'

export const getLikes = async (page: number): Promise<PublicProductPaginated> => {
  return await getData<PublicProductPaginated>('/likes', { page: page }).then((r) => r.data)
}

export const likeProduct = async (productId: number): Promise<unknown> => {
  return await postData(`/products/${productId}/like`, {}).then((r) => r.data)
}
