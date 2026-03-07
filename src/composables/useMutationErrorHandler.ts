import { watch } from 'vue'
import { useAlert } from '@/composables/useAlert'
import { handleApiError, handleApiMessage } from '@/utils/apiUtils'

export const useMutationErrorHandler = (mutation: any) => {
  const { displayAlertError } = useAlert()

  watch(
    () => mutation.isError.value,
    (isError) => {
      if (!isError) return

      const errors = handleApiError(mutation.error.value)
      const message = handleApiMessage(mutation.error.value)

      displayAlertError(message, errors)
    },
  )
}
