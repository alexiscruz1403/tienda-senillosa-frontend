import { watch } from 'vue'
import { useAlert } from '@/composables/useAlert'
import { handleApiError, handleApiMessage } from '@/utils/apiUtils'

export const useQueryErrorHandler = (query: any) => {
  const { displayAlertError } = useAlert()

  watch(
    () => query.failureCount.value,
    () => {
      if (!query.isError.value) return

      if (query.failureCount.value < 3) return

      const errors = handleApiError(query.error.value)
      const message = handleApiMessage(query.error.value)

      displayAlertError(message, errors)
    },
  )
}
