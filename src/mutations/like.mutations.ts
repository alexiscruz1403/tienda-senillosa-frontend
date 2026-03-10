import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { likeProduct } from '@/services/like.service'
import { type PublicProduct } from '@/services/product.service'

export const useLikeProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: likeProduct,

    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })
      await queryClient.cancelQueries({ queryKey: ['product'] })
      await queryClient.cancelQueries({ queryKey: ['likes'] })
      await queryClient.cancelQueries({ queryKey: ['featured-products'] })
      await queryClient.cancelQueries({ queryKey: ['related-products'] })

      const productsQueries = queryClient.getQueriesData({
        queryKey: ['products'],
      })
      const relatedProductsQueries = queryClient.getQueriesData({
        queryKey: ['related-products'],
      })
      const productQueries = queryClient.getQueriesData({
        queryKey: ['product'],
      })
      const previousFeaturedProducts = queryClient.getQueryData(['featured-products'])
      const previousLikedProducts = queryClient.getQueryData(['likes'])

      queryClient.setQueriesData({ queryKey: ['products'] }, (old: any) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((product: PublicProduct) =>
              product.product_id === productId
                ? { ...product, is_liked: !product.is_liked }
                : product,
            ),
          })),
        }
      })

      queryClient.setQueriesData({ queryKey: ['related-products'] }, (old: any) => {
        if (!old) return old
        return old.map((product: any) =>
          product.product_id === productId ? { ...product, is_liked: !product.is_liked } : product,
        )
      })

      queryClient.setQueriesData({ queryKey: ['product'] }, (old: any) => {
        if (!old) return old
        return { ...old, is_liked: !old.is_liked }
      })

      queryClient.setQueryData(['likes'], (old: any) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages
            .map((page: any) => ({
              ...page,
              data: page.data.filter((product: PublicProduct) => product.product_id !== productId),
            }))
            .filter((page: any) => page.data.length > 0),
        }
      })

      queryClient.setQueryData(['featured-products'], (old: any) => {
        if (!old) return old
        return old.map((product: any) =>
          product.product_id === productId ? { ...product, is_liked: !product.is_liked } : product,
        )
      })

      return {
        productsQueries,
        relatedProductsQueries,
        productQueries,
        previousLikedProducts,
        previousFeaturedProducts,
      }
    },

    onError: (_err, _variables, context) => {
      if (context?.productsQueries) {
        queryClient.setQueriesData({ queryKey: ['products'] }, context.productsQueries)
      }
      if (context?.relatedProductsQueries) {
        queryClient.setQueryData(['related-products'], context.relatedProductsQueries)
      }
      if (context?.previousLikedProducts) {
        queryClient.setQueryData(['likes'], context.previousLikedProducts)
      }
      if (context?.previousFeaturedProducts) {
        queryClient.setQueryData(['featured-products'], context.previousFeaturedProducts)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })
}
