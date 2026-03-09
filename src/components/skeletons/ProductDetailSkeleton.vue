<template>
  <section class="flex flex-col lg:flex-row gap-2 px-4 py-4 animate-pulse">
    <!-- IMAGES -->
    <div class="flex flex-col gap-4 md:gap-2 relative">
      <!-- main image -->
      <div class="h-96 md:h-screen w-full lg:w-2xl bg-gray-200 rounded"></div>

      <!-- thumbnails -->
      <div class="flex gap-2">
        <div v-for="i in 4" :key="i" class="h-20 w-20 bg-gray-200 rounded"></div>
      </div>

      <!-- chips -->
      <div class="flex flex-col gap-2 absolute top-4 left-4">
        <div class="h-5 w-16 bg-gray-300 rounded-full"></div>
        <div class="h-5 w-20 bg-gray-300 rounded-full"></div>
      </div>

      <!-- carousel buttons -->
      <div class="absolute left-0 top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
        <div class="size-12 bg-gray-300 rounded-full"></div>
        <div class="size-12 bg-gray-300 rounded-full"></div>
      </div>
    </div>

    <!-- PRODUCT INFO -->
    <div class="flex flex-col gap-6 mt-8 md:mt-0 w-full">
      <!-- brand + name -->
      <div class="flex flex-col gap-3">
        <div class="h-5 w-32 bg-gray-200 rounded"></div>
        <div class="h-10 w-80 bg-gray-200 rounded"></div>
      </div>

      <!-- price -->
      <div class="flex gap-3 items-center">
        <div class="h-8 w-28 bg-gray-200 rounded"></div>
        <div class="h-6 w-20 bg-gray-200 rounded"></div>
      </div>

      <!-- description -->
      <div class="flex flex-col gap-2">
        <div class="h-4 w-full bg-gray-200 rounded"></div>
        <div class="h-4 w-[90%] bg-gray-200 rounded"></div>
        <div class="h-4 w-[80%] bg-gray-200 rounded"></div>
      </div>

      <!-- sizes -->
      <div class="flex flex-col gap-3">
        <div class="h-5 w-20 bg-gray-200 rounded"></div>

        <div class="flex gap-3">
          <div v-for="i in 5" :key="i" class="h-10 w-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      <!-- quantity -->
      <div class="flex flex-col gap-3">
        <div class="h-5 w-24 bg-gray-200 rounded"></div>

        <div class="h-10 w-32 bg-gray-200 rounded"></div>
      </div>

      <!-- buttons -->
      <div class="flex gap-2">
        <div class="h-12 w-52 bg-gray-300 rounded"></div>
        <div class="h-12 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
