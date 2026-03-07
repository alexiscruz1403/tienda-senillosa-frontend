import { ref } from 'vue'

const alertMessage = ref<string>('')
const alertTitle = ref<string>('')
const alertType = ref<'success' | 'info' | 'warning' | 'error'>('success')
const showAlert = ref<boolean>(false)

let timeout: ReturnType<typeof setTimeout> | null = null

const hideAlert = (delay: number) => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    showAlert.value = false
  }, delay)
}

export const useAlert = () => {
  const displayAlert = (
    type: 'success' | 'info' | 'warning' | 'error',
    title: string,
    message: string,
    duration = 4000,
  ) => {
    alertType.value = type
    alertTitle.value = title
    alertMessage.value = message
    showAlert.value = true

    hideAlert(duration)
  }

  return {
    alertMessage,
    alertTitle,
    alertType,
    showAlert,

    displayAlertSuccess: (title: string, message: string) =>
      displayAlert('success', title, message, 3000),

    displayAlertError: (totle: string, message: string) =>
      displayAlert('error', totle, message, 5000),

    displayAlertInfo: (totle: string, message: string) => displayAlert('info', totle, message),

    displayAlertWarning: (totle: string, message: string) =>
      displayAlert('warning', totle, message),
  }
}
