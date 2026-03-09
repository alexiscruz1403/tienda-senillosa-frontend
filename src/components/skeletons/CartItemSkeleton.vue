<template>
  <div class="w-full">
    <div class="bg-white w-full flex px-6 py-6 gap-8 rounded-lg animate-pulse">
      <!-- Image skeleton -->
      <div class="bg-gray-300 h-32 w-24 lg:h-40 lg:w-32 rounded"></div>

      <!-- Content skeleton -->
      <div class="flex flex-col justify-between gap-4 w-full">
        <!-- Top section -->
        <div class="flex gap-2 items-start w-full justify-between">
          <div class="flex flex-col gap-2 flex-1">
            <!-- Brand -->
            <div class="bg-gray-300 h-4 w-20 rounded"></div>
            <!-- Product name -->
            <div class="bg-gray-300 h-5 w-48 rounded"></div>
            <!-- Size -->
            <div class="bg-gray-300 h-4 w-16 rounded"></div>
          </div>
          <!-- Trash icon placeholder -->
          <div class="bg-gray-300 h-5 w-5 rounded"></div>
        </div>

        <!-- Bottom section -->
        <div class="flex flex-col gap-4 md:flex-row md:justify-between">
          <!-- Counter skeleton -->
          <div class="flex gap-2 items-center">
            <div class="bg-gray-300 h-10 w-10 rounded"></div>
            <div class="bg-gray-300 h-6 w-8 rounded"></div>
            <div class="bg-gray-300 h-10 w-10 rounded"></div>
          </div>
          <!-- Price skeleton -->
          <div class="flex flex-col gap-1">
            <div class="bg-gray-300 h-6 w-24 rounded"></div>
            <div class="bg-gray-300 h-4 w-16 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
