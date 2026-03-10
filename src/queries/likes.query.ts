import { useInfiniteQuery } from '@tanstack/vue-query'
import { getLikes } from '@/services/like.service'

export const useLikesQuery = () => {
  const queryKey = ['likes']

  return useInfiniteQuery({
    queryKey,

    initialPageParam: 1,

    queryFn: async ({ pageParam = 1 }) => {
      const res = await getLikes(pageParam)

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
}
