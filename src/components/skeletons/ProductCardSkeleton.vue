<template>
  <div
    class="max-h-max relative shadow-md bg-white rounded-lg overflow-hidden animate-pulse"
    v-for="i in props.quantity"
    :key="i"
  >
    <!-- IMAGE -->
    <div class="h-58 md:h-72 lg:h-80 bg-gray-200 relative">
      <!-- chips -->
      <div class="flex flex-col gap-2 absolute top-2 left-2">
        <div class="h-5 w-14 bg-gray-300 rounded-full"></div>
        <div class="h-5 w-16 bg-gray-300 rounded-full"></div>
      </div>

      <!-- like button -->
      <div class="absolute top-2 right-2 h-8 w-8 bg-gray-300 rounded-full"></div>

      <!-- button -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 h-8 w-32 bg-gray-300 rounded"></div>
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col gap-2 px-2 py-4 bg-white">
      <!-- brand -->
      <div class="h-4 w-24 bg-gray-200 rounded"></div>

      <!-- product name -->
      <div class="h-5 w-40 bg-gray-200 rounded"></div>

      <!-- price -->
      <div class="flex items-center gap-2">
        <div class="h-5 w-16 bg-gray-200 rounded"></div>
        <div class="h-4 w-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  quantity: number
}

const props = defineProps<Props>()
</script>
