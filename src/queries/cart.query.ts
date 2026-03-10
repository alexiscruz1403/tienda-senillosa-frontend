import { useQuery } from '@tanstack/vue-query'
import { getCartProducts } from '@/services/cart.service'

export const useCartQuery = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartProducts(),
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  })
}
