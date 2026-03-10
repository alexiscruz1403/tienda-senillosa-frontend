<template>
  <section class="bg-white px-4 py-4 flex flex-col gap-8 rounded-lg w-full">
    <!-- Información Personal -->
    <div class="flex flex-col gap-4">
      <div class="h-6 w-48 bg-gray-200 rounded"></div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-2">
          <div class="h-4 w-32 bg-gray-200 rounded"></div>
          <div class="h-10 bg-gray-200 rounded"></div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="h-4 w-32 bg-gray-200 rounded"></div>
          <div class="h-10 bg-gray-200 rounded"></div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="h-4 w-32 bg-gray-200 rounded"></div>
          <div class="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div class="self-end h-10 w-40 bg-gray-200 rounded"></div>
    </div>

    <div class="border-t"></div>

    <!-- Dirección -->
    <div class="flex flex-col gap-4">
      <div class="h-6 w-40 bg-gray-200 rounded"></div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="flex flex-col gap-2">
          <div class="h-4 w-28 bg-gray-200 rounded"></div>
          <div class="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div class="self-end h-10 w-40 bg-gray-200 rounded"></div>
    </div>

    <div class="border-t"></div>

    <!-- Contraseña -->
    <div class="flex flex-col gap-4">
      <div class="h-6 w-48 bg-gray-200 rounded"></div>

      <div class="flex flex-col gap-6 lg:w-[50%]">
        <div v-for="i in 3" :key="i" class="flex flex-col gap-2">
          <div class="h-4 w-36 bg-gray-200 rounded"></div>
          <div class="h-10 bg-gray-200 rounded"></div>
        </div>

        <div class="self-end h-10 w-40 bg-gray-200 rounded"></div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
