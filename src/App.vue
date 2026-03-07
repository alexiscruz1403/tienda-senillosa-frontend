<template>
  <loader-modal :display="isLoading" message="" />
  <router-view :key="$route.fullPath" />
</template>

<script setup lang="ts">
import LoaderModal from './components/LoaderModal.vue'
import { useUiStore } from './stores/uiStore'
import { storeToRefs } from 'pinia'

const uiStore = useUiStore()
const { isLoading } = storeToRefs(uiStore)
</script>

<style scoped></style>
