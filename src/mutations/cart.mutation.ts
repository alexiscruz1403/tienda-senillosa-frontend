import { useQueryClient, useMutation } from '@tanstack/vue-query'
import {
  addProductToCart,
  updateProductCart,
  removeProductFromCart,
  clearCart,
} from '@/services/cart.service'
import { type CartItemResponse } from '@/services/cart.service'
import { useAlert } from '@/composables/useAlert'

const { displayAlertSuccess } = useAlert()

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addProductToCart,

    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] })

      const previousCart = queryClient.getQueryData<CartItemResponse[]>(['cart'])

      queryClient.setQueryData<CartItemResponse[]>(['cart'], (old = []) => {
        displayAlertSuccess(
          '',
          `${newItem.product_name} Talle ${newItem.size} x ${newItem.quantity} añadido al carrito`,
        )
        return [...old, newItem]
      })

      return { previousCart }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProductCart,

    onMutate: async (product) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] })

      const previousCart = queryClient.getQueryData<CartItemResponse[]>(['cart'])

      queryClient.setQueryData<CartItemResponse[]>(['cart'], (old = []) =>
        old.map((item) =>
          item.product.product_id === product.product_id && item.stock.size === product.size
            ? { ...item, quantity: product.quantity }
            : item,
        ),
      )

      return { previousCart }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useRemoveCartItemMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, size }: { productId: number; size: string }) =>
      removeProductFromCart(productId, size),

    onMutate: async ({ productId, size }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] })

      const previousCart = queryClient.getQueryData<CartItemResponse[]>(['cart'])

      queryClient.setQueryData<CartItemResponse[]>(['cart'], (old = []) =>
        old.filter((item) => !(item.product.product_id === productId && item.stock.size === size)),
      )

      return { previousCart }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useClearCartMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clearCart,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['cart'] })

      const previousCart = queryClient.getQueryData<CartItemResponse[]>(['cart'])

      queryClient.setQueryData(['cart'], [])

      return { previousCart }
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
