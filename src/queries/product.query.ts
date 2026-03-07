import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import {
  getProductCatalog,
  getProductById,
  getRelatedProducts,
  getFeaturedProducts,
  type ProductCatalogParams,
} from '@/services/product.service'
import { type MaybeRef, unref, computed } from 'vue'

export const useProductsQuery = (params: MaybeRef<ProductCatalogParams>) => {
  const queryKey = computed(() => {
    const p = unref(params)

    return ['products', p.search, p.gender, p.ordering, [...p.category]]
  })

  return useInfiniteQuery({
    queryKey,

    initialPageParam: 1,

    queryFn: async ({ pageParam = 1 }) => {
      const unrefedParams = unref(params)
      const res = await getProductCatalog({
        ...unrefedParams,
        page: pageParam,
      })

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

export const useProductQuery = (id: MaybeRef<number>) => {
  return useQuery({
    queryKey: computed(() => ['product', unref(id)]),
    queryFn: () => getProductById(unref(id)),
    enabled: !!unref(id),
    staleTime: 1000 * 60 * 10,
  })
}

export const useRelatedProductsQuery = (id: MaybeRef<number>) => {
  return useQuery({
    queryKey: computed(() => ['related-products', unref(id)]),
    queryFn: () => getRelatedProducts(unref(id)),
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  })
}

export const useFeaturedProductsQuery = () => {
  const query = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => getFeaturedProducts(),
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  })

  return query
}
