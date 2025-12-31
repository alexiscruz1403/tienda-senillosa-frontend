import { postData } from './api'

export const likeProduct = async (productId: number): Promise<void> => {
  await postData(`/products/${productId}/like`, {})
}
