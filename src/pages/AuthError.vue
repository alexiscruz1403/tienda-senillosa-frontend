<template>
  <AppLayout>
    <div class="bg-[#f4f6fb] flex items-center justify-center py-10">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-6" outlined>
            <v-card-title class="text-h5 font-weight-bold justify-center text-center">
              Error de Autenticación
            </v-card-title>
            <v-card-text class="text-center">
              <p class="text-subtitle-1">
                Ha ocurrido un error durante el proceso de autenticación. Por favor, inténtalo de nuevo.
              </p>
              <v-btn color="primary" class="mt-4" @click="$router.push('/')">
                Volver al Inicio
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </AppLayout>
</template>
<script lang="ts" setup>

import AppLayout from '@/layout/AppLayout.vue';

</script>
