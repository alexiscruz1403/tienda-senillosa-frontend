import { ref } from 'vue'

export const useAlert = () => {
  const alertMessage = ref<string>('')
  const alertTitle = ref<string>('')
  const alertType = ref<'success' | 'info' | 'warning' | 'error'>('success')
  const showAlert = ref<boolean>(false)

  const setAlertMessage = (message: string): void => {
    alertMessage.value = message
  }

  const setAlertTitle = (title: string): void => {
    alertTitle.value = title
  }

  const setAlertType = (type: 'success' | 'info' | 'error' | 'warning') => {
    alertType.value = type
  }

  const displayAlertSuccess = (title: string, message: string) => {
    setAlertType('success')
    setAlertTitle(title)
    setAlertMessage(message)
    showAlert.value = true

    setTimeout(() => {
      showAlert.value = false
    }, 3000)
  }

  const displayAlertError = (title: string, message: string) => {
    setAlertType('error')
    setAlertTitle(title)
    setAlertMessage(message)
    showAlert.value = true

    setTimeout(() => {
      showAlert.value = false
    }, 5000)
  }

  const displayAlertInfo = (title: string, message: string) => {
    setAlertType('info')
    setAlertTitle(title)
    setAlertMessage(message)
    showAlert.value = true

    setTimeout(() => {
      showAlert.value = false
    }, 5000)
  }

  const displayAlertWarning = (title: string, message: string) => {
    setAlertType('warning')
    setAlertTitle(title)
    setAlertMessage(message)
    showAlert.value = true

    setTimeout(() => {
      showAlert.value = false
    }, 5000)
  }

  return {
    alertMessage,
    alertTitle,
    alertType,
    showAlert,
    displayAlertError,
    displayAlertInfo,
    displayAlertSuccess,
    displayAlertWarning,
  }
}
