<template>
  <app-layout :display-footer="false">
    <div class="bg-[#f4f6fb] w-screen min-h-screen flex items-center justify-center py-6">
      <div class="bg-white px-6 py-6 rounded-lg shadow-lg">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-center">Crear cuenta</h1>
          <p class="text-[#65758B] text-center">Únete a Tienda Senillosa hoy</p>
        </div>
        <v-form v-model="valid" ref="form" validate-on="submit" @submit.prevent="register" :hide-details="!valid"
          class="w-full md:w-98">
          <v-container class="flex flex-col gap-3">
            <v-text-field v-model="username" :counter="100" :rules="usernameRules" label="Nombre de usuario" required
              variant="outlined" color="accent-main" bg-color="bg-primary">
              <template #prepend-inner>
                <User :size="18" class="text-primary" />
              </template>
            </v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="Correo electrónico" required variant="outlined"
              color="accent-main" bg-color="bg-primary">
              <template #prepend-inner>
                <Mail :size="18" class="text-primary" />
              </template>
            </v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" :type="showPassword ? 'text' : 'password'"
              hint="Por lo menos 8 caracteres" variant="outlined" color="accent-main" bg-color="bg-primary"
              label="Contraseña" name="password" counter @click:append="handleShowPassword">
              <template #prepend-inner>
                <Lock :size="18" class="text-primary" />
              </template>
              <template #append>
                <Eye :size="18" v-if="!showPassword" class="text-primary cursor-pointer" @click="handleShowPassword" />
                <EyeOff :size="18" v-else class="text-primary cursor-pointer" @click="handleShowPassword" />
              </template>
            </v-text-field>
            <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules"
              :type="showConfirmPassword ? 'text' : 'password'" hint="Por lo menos 8 caracteres" variant="outlined"
              color="accent-main" bg-color="bg-primary" label="Confirmar contraseña" name="confirmPassword" counter
              @click:append="handleShowConfirmPassword">
              <template #prepend-inner>
                <Lock :size="18" class="text-primary" />
              </template>
              <template #append>
                <Eye :size="18" v-if="!showConfirmPassword" class="text-primary cursor-pointer"
                  @click="handleShowConfirmPassword" />
                <EyeOff :size="18" v-else class="text-primary cursor-pointer" @click="handleShowConfirmPassword" />
              </template>
            </v-text-field>
            <v-btn color="primary" class="mt-1" block type="submit">Registrarse</v-btn>
          </v-container>
        </v-form>
        <v-divider color="text-muted" thickness="1">
          <p class="text-[#65758B] text-sm">o continuar con</p>
        </v-divider>

        <v-btn color="secondary" class="mt-4 custom-hover" block @click="registerWithGoogle">
          <GoogleIcon class="mr-2" />
          <p class="font-bold">Google</p>
        </v-btn>

        <v-container class="mt-4">
          <p class="text-sm text-center text-[#65758B]">
            ¿Ya tienes una cuenta?
            <a href="/login" class="text-accent-main font-semibold hover:underline"
              @click.prevent="router.push('/login')">Iniciar sesión</a>
          </p>
        </v-container>
      </div>
    </div>
    <v-snackbar v-model="snackbar" color="error">
      {{ errorMessages }}
      <template v-slot:actions>
        <v-btn color="text-primary" variant="text" @click="handleSnackbarClose">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <loader-modal :display="loading" message="Registrando usuario, por favor espere..." />
  </app-layout>
</template>

<script lang="ts" setup>

import AppLayout from '@/layout/AppLayout.vue';
import LoaderModal from '@/components/LoaderModal.vue';
import { ref, onBeforeMount } from 'vue';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';
import { postData } from '@/services/api.ts';
import { VForm } from 'vuetify/components';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const valid = ref<boolean>(false);

const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const handleShowPassword = () => {
  showPassword.value = !showPassword.value;
}

const handleShowConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const usernameRules = [
  (v: string) => !!v || 'El nombre de usuario es obligatorio',
  (v: string) => (v && v.length <= 100) || 'El nombre de usuario debe tener menos de 100 caracteres',
];

const emailRules = [
  (v: string) => !!v || 'El correo electrónico es obligatorio',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
];

const passwordRules = [
  (v: string) => !!v || 'La contraseña es obligatoria',
  (v: string) => (v && v.length >= 8) || 'La contraseña debe tener al menos 8 caracteres',
];

const confirmPasswordRules = [
  (v: string) => !!v || 'La confirmación de la contraseña es obligatoria',
  (v: string) => v === password.value || 'Las contraseñas no coinciden',
];

const loading = ref<boolean>(false);
const errorMessages = ref<string[]>([]);
const snackbar = ref<boolean>(false);
const form = ref<VForm | null>(null)

const register = async (): Promise<void> => {
  const { valid: isValid } = await form.value!.validate();

  if (!isValid) return;

  loading.value = true;

  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  postData('/auth/register', userData)
    .then((response) => {
      console.log('Registro exitoso:', response);
      router.push('/');
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      snackbar.value = true;
      errorMessages.value = error.response.data.errors[0];
    })
    .finally(() => {
      loading.value = false;
    });
}

const handleSnackbarClose = () => {
  snackbar.value = false;
}

const registerWithGoogle = () => {
  window.location.href = 'http://localhost:8000/api/auth/google/redirect'
}

onBeforeMount(() => {
  if (isAuthenticated.value) {
    router.push('/');
  }
});

</script>

<style scoped>
.custom-hover:hover {
  background-color: #3c83f6 !important;
  color: white !important;
}
</style>
