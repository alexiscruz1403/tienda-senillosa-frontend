import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import { getUserOrders, getUserOrder } from '@/services/order.service'
import { type MaybeRef, unref, computed } from 'vue'

export const useOrdersQuery = () => {
  const query = useInfiniteQuery({
    queryKey: ['orders'],

    initialPageParam: 1,

    queryFn: async ({ pageParam = 1 }) => {
      const res = await getUserOrders(pageParam)
      return res
    },

    getNextPageParam: (lastPage) => {
      const current = lastPage.meta.current_page
      const total = lastPage.meta.total_pages
      return current < total ? current + 1 : undefined
    },

    staleTime: 1000 * 60 * 5,
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
