import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { updateUserInfo, updateUserAddress, updateUserPassword } from '@/services/user.service'
import { useAlert } from '@/composables/useAlert'

const { displayAlertSuccess } = useAlert()

export const useUserInfoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUserInfo,

    onSuccess: () => {
      displayAlertSuccess('', 'Información actualizada correctamente')

      queryClient.invalidateQueries({
        queryKey: ['user-info'],
      })
    },
  })
}

export const useUserAddressMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUserAddress,

    onSuccess: () => {
      displayAlertSuccess('', 'Dirección actualizada correctamente')

      queryClient.invalidateQueries({
        queryKey: ['user-address'],
      })
    },
  })
}

export const useUserPasswordMutation = () => {
  return useMutation({
    mutationFn: updateUserPassword,

    onSuccess: () => {
      displayAlertSuccess('', 'Contraseña actualizada correctamente')
    },
  })
}
