import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createOrder } from '@/services/order.service'
import { useAlert } from '@/composables/useAlert'
import router from '@/router'

export const useOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrder,

    onSuccess: (order) => {
      // limpiar carrito o refrescarlo
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })

      // refrescar historial de órdenes si existe
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })

      const { displayAlertSuccess } = useAlert()
      displayAlertSuccess('', 'Compra realizada exitosamente')

      setTimeout(() => {
        router.push(`/orders/${order.order_id}`)
      }, 1500)
    },
  })
}
