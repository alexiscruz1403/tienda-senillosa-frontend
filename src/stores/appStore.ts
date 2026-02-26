import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const fetchedCart = ref<boolean>(false)

  function setFetchedCart(value: boolean) {
    fetchedCart.value = value
  }

  return { fetchedCart, setFetchedCart }
})
