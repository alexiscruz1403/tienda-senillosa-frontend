<template>
  <app-layout :display-footer="false">
    <div class="bg-[#f4f6fb] w-screen min-h-screen flex items-center justify-center py-6">
      <div
        class="bg-white px-6 py-6 rounded-lg shadow-lg absolute top-25 w-[90%] md:w-max md:relative md:top-0"
      >
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-center">Iniciar sesión</h1>
          <p class="text-[#65758B] text-center">Ingresa tu cuenta para continuar</p>
        </div>
        <v-form
          v-model="valid"
          ref="form"
          validate-on="submit"
          @submit.prevent="loginUser"
          :hide-details="!valid"
          class="w-full md:w-98"
        >
          <v-container class="flex flex-col gap-3">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Correo electrónico"
              required
              variant="outlined"
              color="accent-main"
              bg-color="bg-primary"
            >
              <template #prepend-inner>
                <Mail :size="18" class="text-primary" />
              </template>
            </v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              hint="Por lo menos 8 caracteres"
              variant="outlined"
              color="accent-main"
              bg-color="bg-primary"
              label="Contraseña"
              name="password"
              counter
              @click:append="handleShowPassword"
            >
              <template #prepend-inner>
                <Lock :size="18" class="text-primary" />
              </template>
              <template #append>
                <Eye
                  :size="18"
                  v-if="!showPassword"
                  class="text-primary cursor-pointer"
                  @click="handleShowPassword"
                />
                <EyeOff
                  :size="18"
                  v-else
                  class="text-primary cursor-pointer"
                  @click="handleShowPassword"
                />
              </template>
            </v-text-field>
            <v-btn color="primary" class="mt-1" block type="submit">Iniciar sesión</v-btn>
          </v-container>
        </v-form>
        <v-divider color="text-muted" thickness="1">
          <p class="text-[#65758B] text-sm">o continuar con</p>
        </v-divider>

        <v-btn color="secondary" class="mt-4 custom-hover" block @click="loginWithGoogle">
          <GoogleIcon class="mr-2" />
          <p class="font-bold">Google</p>
        </v-btn>

        <v-container class="mt-4">
          <p class="text-sm text-center text-[#65758B]">
            ¿No tenes cuenta?
            <a
              href="/register"
              class="text-accent-main font-semibold hover:underline"
              @click.prevent="router.push('/register')"
              >Crear cuenta</a
            >
          </p>
        </v-container>
      </div>
    </div>
    <v-snackbar v-model="snackbar" color="error">
      {{ errorMessages }}
      <template v-slot:actions>
        <v-btn color="text-primary" variant="text" @click="handleSnackbarClose"> Cerrar </v-btn>
      </template>
    </v-snackbar>
    <loader-modal :display="loading" message="Iniciando sesión, por favor espere..." />
  </app-layout>
</template>
<script setup lang="ts">
import AppLayout from '@/layout/AppLayout.vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import LoaderModal from '@/components/LoaderModal.vue'
import { ref, onBeforeMount } from 'vue'
import { Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { VForm } from 'vuetify/components'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import {
  login,
  loginWithGoogle,
  type LoginPayload,
  type LoginResponse,
} from '@/services/authService'
import { handleApiError } from '@/utils/apiUtils'

const valid = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
const showPassword = ref<boolean>(false)
const snackbar = ref<boolean>(false)
const errorMessages = ref<string>('')
const loading = ref<boolean>(false)
const form = ref<VForm | null>(null)
const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const handleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const handleSnackbarClose = () => {
  snackbar.value = false
}

const emailRules = [
  (v: string) => !!v || 'El correo electrónico es obligatorio',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
]

const passwordRules = [
  (v: string) => !!v || 'La contraseña es obligatoria',
  (v: string) => (v && v.length >= 8) || 'La contraseña debe tener al menos 8 caracteres',
]

const loginUser = async (): Promise<LoginResponse | undefined> => {
  const { valid: isValid } = await form.value!.validate()

  if (!isValid) return

  loading.value = true

  const userData: LoginPayload = {
    email: email.value,
    password: password.value,
  }

  try {
    const response = await login(userData)
    authStore.login(response.data.token)
    cartStore.setItemCount(response.data.cartCount)
  } catch (error) {
    snackbar.value = true
    errorMessages.value = handleApiError(error)
  } finally {
    loading.value = false
  }
}

onBeforeMount(() => {
  if (isAuthenticated.value) {
    router.push('/')
  }
})
</script>
<style scoped>
.custom-hover:hover {
  background-color: #3c83f6 !important;
  color: white !important;
}
</style>
