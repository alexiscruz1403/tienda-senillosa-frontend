<template>
  <div class="w-full bg-white px-6 py-6 flex flex-col gap-4 rounded-lg animate-pulse">
    <!-- Title skeleton -->
    <div class="bg-gray-300 h-6 w-32 rounded"></div>

    <!-- Subtotal and shipping section -->
    <div class="flex flex-col gap-3">
      <div class="w-full flex justify-between">
        <div class="bg-gray-300 h-5 w-20 rounded"></div>
        <div class="bg-gray-300 h-5 w-16 rounded"></div>
      </div>
      <div class="w-full flex justify-between">
        <div class="bg-gray-300 h-5 w-16 rounded"></div>
        <div class="bg-gray-300 h-5 w-16 rounded"></div>
      </div>
    </div>

    <!-- Divider -->
    <div class="bg-gray-300 h-px w-full rounded"></div>

    <!-- Total section -->
    <div class="flex flex-col gap-4">
      <div class="w-full flex justify-between">
        <div class="bg-gray-300 h-5 w-16 rounded"></div>
        <div class="bg-gray-300 h-6 w-24 rounded"></div>
      </div>

      <!-- Buttons skeleton -->
      <div class="flex flex-col gap-2">
        <div class="bg-gray-300 h-10 w-full rounded"></div>
        <div class="bg-gray-300 h-10 w-full rounded"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
