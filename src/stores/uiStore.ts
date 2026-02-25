import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref<boolean>(false)

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  return { isLoading, setLoading }
})
