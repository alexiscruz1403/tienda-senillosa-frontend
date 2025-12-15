<template>
  <v-footer color="primary">
    <v-col class="flex flex-col gap-4" align-self="start">
      <div class="flex flex-col gap-4">
        <p class="text-3xl">Logo</p>
        <p class="text-sm text-[#F8FAFCB2]">Tu destino para streetwear y moda urbana. Encuentra las últimas tendencias y
          expresa tu
          estilo único.</p>
      </div>
      <div class="flex gap-4">
        <v-btn class="social-btn" icon>
          <instagram-icon></instagram-icon>
        </v-btn>
        <v-btn class="social-btn" icon>
          <facebook-icon></facebook-icon>
        </v-btn>
        <v-btn class="social-btn" icon>
          <tik-tok-icon></tik-tok-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col class="flex flex-col gap-4" align-self="start">
      <h3 class="font-bold text-xl">Enlaces Rápidos</h3>
      <div class="flex flex-col gap-2">
        <a href="#" class="text-sm text-[#F8FAFCB2] hover:underline">Seguí tu pedido</a>
        <a href="#" class="text-sm text-[#F8FAFCB2] hover:underline">Pedí el reembolso</a>
      </div>
    </v-col>
    <v-col class="flex flex-col gap-4" align-self="start">
      <h3 class="font-bold text-xl">Contacto</h3>
      <div class="flex flex-col gap-3">
        <div class="flex gap-2 items-center">
          <map-pin :size="18"></map-pin>
          <p class="text-sm text-[#F8FAFCB2]">Calle Falsa 123, Senillosa, Argentina</p>
        </div>
        <div class="flex gap-2 items-center">
          <phone :size="18"></phone>
          <p class="text-sm text-[#F8FAFCB2]">Teléfono: +54 9 299 123-4567</p>
        </div>
        <div class="flex gap-2 items-center">
          <mail :size="18"></mail>
          <p class="text-sm text-[#F8FAFCB2]">Email: contacto@tiendasenillosa.com</p>
        </div>
      </div>
    </v-col>
  </v-footer>
</template>
<script lang="ts" setup>

import InstagramIcon from '@/components/icons/InstagramIcon.vue';
import FacebookIcon from '@/components/icons/FacebookIcon.vue';
import TikTokIcon from '@/components/icons/TikTokIcon.vue';
import { MapPin, Mail, Phone } from 'lucide-vue-next';

</script>
<style scoped>
.social-btn {
  background-color: rgba(248, 250, 252, 0.1) !important;
  color: white;
}
</style>
