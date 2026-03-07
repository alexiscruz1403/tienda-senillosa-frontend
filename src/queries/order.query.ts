import { useQuery } from '@tanstack/vue-query'
import { getUserOrders, getUserOrder } from '@/services/order.service'
import { type MaybeRef, unref, computed } from 'vue'

export const useOrdersQuery = () => {
  const query = useQuery({
    queryKey: ['orders'],
    queryFn: () => getUserOrders(),
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  })

  return query
}

export const useOrderQuery = (id: MaybeRef<number>) => {
  const query = useQuery({
    queryKey: computed(() => ['order', unref(id)]),
    queryFn: () => getUserOrder(unref(id)),
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
    enabled: !!unref(id),
  })

  return query
}
