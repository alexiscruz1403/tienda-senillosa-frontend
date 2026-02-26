<template>
  <div :class="alertPositionClass" v-if="props.showAlert">
    <v-alert
      closable
      variant="flat"
      :text="props.alertMessage"
      :type="props.alertType"
      :title="props.alertTitle"
    ></v-alert>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

type AlertType = 'success' | 'info' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    alertMessage?: string
    alertType?: AlertType
    alertTitle?: string
    showAlert?: boolean
  }>(),
  {
    alertMessage: '',
    alertType: 'info',
    alertTitle: '',
    showAlert: false,
  },
)

const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const isMobile = computed(() => screenWidth.value < 1024)

const alertPositionClass = computed(() => {
  if (isMobile.value) {
    return 'fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%]'
  }

  return 'fixed bottom-4 right-4 md:w-96'
})

onMounted(() => {
  const onResize = () => (screenWidth.value = window.innerWidth)
  window.addEventListener('resize', onResize)
  onUnmounted(() => window.removeEventListener('resize', onResize))
})
</script>
