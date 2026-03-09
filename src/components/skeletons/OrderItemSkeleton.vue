<template>
  <div class="flex flex-col gap-4">
    <div
      class="bg-white w-full px-4 py-4 flex justify-between items-center border border-gray-100 rounded-2xl shadow-sm animate-pulse"
      v-for="i in 3"
      :key="i"
    >
      <!-- LEFT -->
      <div class="flex flex-col gap-3 items-start w-full">
        <!-- title + date -->
        <div class="flex flex-col gap-2">
          <div class="h-5 w-32 bg-gray-200 rounded"></div>
          <div class="h-4 w-24 bg-gray-200 rounded"></div>
        </div>

        <!-- images stack -->
        <div class="relative min-w-40 h-24">
          <!-- first -->
          <div
            class="absolute top-0 bg-gray-200 h-18 w-18 md:h-24 md:w-24 rounded-2xl border-2 border-white z-20"
          ></div>

          <!-- second -->
          <div
            class="absolute top-0 left-10 md:left-14 bg-gray-200 h-18 w-18 md:h-24 md:w-24 rounded-2xl border-2 border-white z-10"
          ></div>

          <!-- third -->
          <div
            class="absolute top-0 left-20 md:left-28 bg-gray-200 h-18 w-18 md:h-24 md:w-24 rounded-2xl border-2 border-white"
          ></div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="flex gap-4 items-center">
        <div class="flex flex-col gap-2 items-end">
          <!-- chip -->
          <div class="h-6 w-24 bg-gray-200 rounded-full"></div>

          <!-- price -->
          <div class="h-5 w-16 bg-gray-200 rounded"></div>
        </div>

        <!-- arrow -->
        <div class="h-5 w-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
