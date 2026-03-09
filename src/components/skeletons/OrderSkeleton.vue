<template>
  <div class="flex flex-col gap-4 lg:flex-row animate-pulse">
    <!-- LEFT PANEL -->
    <div
      class="bg-white px-8 py-8 rounded-xl flex flex-col gap-8 w-screen lg:min-w-[60%] shadow-md"
    >
      <!-- HEADER -->
      <div class="flex flex-col gap-2">
        <div class="h-7 w-48 bg-gray-200 rounded"></div>
        <div class="h-5 w-64 bg-gray-200 rounded"></div>
      </div>

      <!-- TIMELINE -->
      <div class="flex flex-col gap-3">
        <div class="h-5 w-40 bg-gray-200 rounded"></div>

        <div class="flex justify-between items-center mt-4">
          <div v-for="i in 4" :key="i" class="flex flex-col items-center gap-2 w-full">
            <div class="w-10 h-10 rounded-full bg-gray-200"></div>
            <div class="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <!-- PRODUCTS -->
      <div class="flex flex-col gap-3">
        <div class="h-5 w-32 bg-gray-200 rounded"></div>

        <div class="flex flex-col gap-4">
          <div v-for="i in 3" :key="i" class="flex gap-4 items-center">
            <!-- image -->
            <div class="bg-gray-200 h-24 w-24 rounded-lg"></div>

            <!-- text -->
            <div class="flex flex-col gap-2 w-full">
              <div class="h-4 w-52 bg-gray-200 rounded"></div>
              <div class="h-3 w-40 bg-gray-200 rounded"></div>
              <div class="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="bg-white px-6 py-6 flex flex-col gap-4 max-h-max w-full rounded-xl shadow-md">
      <div class="h-6 w-32 bg-gray-200 rounded"></div>

      <div class="flex flex-col gap-3">
        <div class="flex justify-between">
          <div class="h-4 w-20 bg-gray-200 rounded"></div>
          <div class="h-4 w-16 bg-gray-200 rounded"></div>
        </div>

        <div class="flex justify-between">
          <div class="h-4 w-16 bg-gray-200 rounded"></div>
          <div class="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div class="border-t pt-4 flex justify-between">
        <div class="h-5 w-16 bg-gray-200 rounded"></div>
        <div class="h-6 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
