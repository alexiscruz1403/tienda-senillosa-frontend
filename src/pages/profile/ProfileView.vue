<template>
  <app-layout>
    <div class="bg-[#F4F6FB] px-4 py-8">
      <div>
        <h1 class="text-4xl font-semibold">Mi perfil</h1>
        <p class="text-[#65758B]">Administra tu información personal</p>
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Seccion de Menu -->
        <section class="bg-white px-4 py-4 flex flex-col gap-2 rounded-lg">
          <div>
            <div class="flex items-center gap-4">
              <div class="rounded-full px-4 py-4 bg-[#3C83F61A] max-w-max max-h-max">
                <User class="h-10 w-10 text-[#3C83F6]" />
              </div>
              <div>
                <p class="text-lg font-semibold">{{ user?.username }}</p>
                <p class="text-[#65758B]">{{ user?.email }}</p>
              </div>
            </div>
          </div>
          <div>
            <v-item-group mandatory v-model="selectedMenu">
              <v-item v-slot="{ isSelected, toggle }" :value="'profile'">
                <button
                  :class="[
                    'flex gap-2 cursor-pointer py-3 px-3 rounded-lg items-center w-full!',
                    isSelected ? 'text-[#3C83F6]! bg-[#3C83F61A]!' : 'text-[#65758B]!',
                  ]"
                  @click="toggle"
                >
                  <User class="h-5 w-5" />
                  <p>Mi Perfil</p>
                </button>
              </v-item>
              <v-item v-slot="{ isSelected, toggle }" :value="'orders'">
                <button
                  :class="[
                    'flex gap-2 cursor-pointer py-3 px-3 rounded-lg items-center w-full!',
                    isSelected ? 'text-[#3C83F6]! bg-[#3C83F61A]!' : 'text-[#65758B]!',
                  ]"
                  @click="toggle"
                >
                  <User class="h-5 w-5" />
                  <p>Mis ordenes</p>
                </button>
              </v-item>
            </v-item-group>
          </div>
          <div>
            <button
              class="flex gap-2 cursor-pointer py-3 px-3 rounded-lg items-center text-[#EF4343]! w-full!"
              @click="handleLogout()"
            >
              <LogOut class="h-5 w-5" />
              <p>Cerrar sesión</p>
            </button>
          </div>
        </section>

        <!-- Seccion de Mi Perfil -->
        <section class="bg-white px-4 py-4 flex flex-col gap-8 rounded-lg w-full">
          <div class="flex flex-col gap-4">
            <h2 class="text-lg font-semibold">Información Personal</h2>
            <v-form class="flex flex-col gap-6" @submit.prevent="onInfoSubmit()">
              <div class="flex flex-col md:grid md:grid-cols-2 gap-6">
                <custom-input
                  label="Nombre completo"
                  placeholder="Juan Perez"
                  required
                  v-model:input-value="username"
                  :error="usernameError"
                  :disabled="hasGoogleId"
                  :disclaimer="
                    hasGoogleId
                      ? 'Usted no puede cambiar esta información ya que inicio sesión con su cuenta de Google'
                      : ''
                  "
                />
                <custom-input
                  label="Correo Electronico"
                  placeholder="juan.perez@gmail.com"
                  required
                  v-model:input-value="email"
                  :error="emailError"
                  :disabled="hasGoogleId"
                  :disclaimer="
                    hasGoogleId
                      ? 'Usted no puede cambiar esta información ya que inicio sesión con su cuenta de Google'
                      : ''
                  "
                />
                <custom-input
                  label="Número de teléfono"
                  placeholder="299123456"
                  v-model:input-value="phone_number"
                  :error="phoneNumberError"
                />
              </div>
              <v-btn
                color="primary"
                class="max-w-max! self-end!"
                type="submit"
                :disabled="!metaInfoForm.valid || !metaInfoForm.dirty"
              >
                <template #prepend>
                  <Save class="h-5 w-5" />
                </template>
                Guardar Cambios
              </v-btn>
            </v-form>
          </div>
          <v-divider></v-divider>
          <div class="flex flex-col gap-4">
            <h2 class="text-lg font-semibold">Datos para envío</h2>
            <v-form class="flex flex-col gap-6" @submit.prevent="onAddressSubmit()">
              <div class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <custom-input
                  label="Provincia"
                  placeholder="Buenos Aires"
                  required
                  v-model:input-value="province"
                  :error="provinceError"
                />
                <custom-input
                  label="Ciudad"
                  placeholder="La Plata"
                  required
                  v-model:input-value="city"
                  :error="cityError"
                />
                <custom-input
                  label="Código Postal"
                  placeholder="1900"
                  required
                  v-model:input-value="postal_code"
                  :error="postalCodeError"
                />
                <custom-input
                  label="Calle y Número"
                  placeholder="Calle 123"
                  required
                  v-model:input-value="street"
                  :error="streetError"
                />
                <custom-input
                  label="Departamento"
                  placeholder="Piso 2, Depto B"
                  v-model:input-value="department"
                  :error="departmentError"
                />
                <custom-input
                  label="Información Adicional"
                  placeholder="Entre calles, referencias, etc."
                  v-model:input-value="additional_info"
                  :error="additionalInfoError"
                />
              </div>
              <v-btn
                color="primary"
                class="max-w-max! self-end!"
                type="submit"
                :disabled="!metaAddressForm.valid || !metaAddressForm.dirty"
              >
                <template #prepend>
                  <Save class="h-5 w-5" />
                </template>
                Guardar Cambios
              </v-btn>
            </v-form>
          </div>
          <v-divider></v-divider>
          <div class="flex flex-col gap-4">
            <h2 class="text-lg font-semibold">Cambiar Contraseña</h2>
            <v-form class="flex flex-col gap-6 lg:w-[50%]" @submit.prevent="onPasswordSubmit()">
              <custom-input
                label="Contraseña Actual"
                type="password"
                placeholder="********"
                v-model:input-value="current_password"
                :required="true"
                :error="currentPasswordError"
              />
              <custom-input
                label="Nueva Contraseña"
                type="password"
                placeholder="********"
                v-model:input-value="new_password"
                :required="true"
                :error="newPasswordError"
              />
              <custom-input
                label="Confirmar Nueva Contraseña"
                type="password"
                placeholder="********"
                v-model:input-value="confirm_password"
                :required="true"
                :error="confirmPasswordError"
              />
              <v-btn
                color="primary"
                class="max-w-max! self-end!"
                type="submit"
                :disabled="!metaPasswordForm.valid || !metaPasswordForm.dirty"
              >
                <template #prepend>
                  <Save class="h-5 w-5" />
                </template>
                Guardar Cambios
              </v-btn>
            </v-form>
          </div>
        </section>
      </div>
      <app-alert
        :alertMessage="alertMessage"
        :alertTitle="alertTitle"
        :alertType="alertType"
        :showAlert="showAlert"
      />
      <loader-modal :display="loading" />
    </div>
  </app-layout>
</template>
<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue'
import LoaderModal from '@/components/LoaderModal.vue'
import AppAlert from '@/components/AppAlert.vue'
import { User, LogOut, Save } from 'lucide-vue-next'
import AppLayout from '@/layout/AppLayout.vue'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import type {
  InfoFormPayload,
  AddressFormPayload,
  PasswordFormPayload,
} from '@/services/userService'
import {
  getUserInfo,
  getUserAddress,
  updateUserInfo,
  updateUserAddress,
  updateUserPassword,
} from '@/services/userService'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAlert } from '@/composables/useAlert'
import router from '@/router'
import { handleApiError } from '@/utils/apiUtils'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const selectedMenu = ref<string>('profile')

const { alertMessage, alertTitle, alertType, showAlert, displayAlertSuccess, displayAlertError } =
  useAlert()

const loading = ref<boolean>(false)

const hasGoogleId = ref<boolean>(false)

const infoFormSchema = yup.object({
  username: yup
    .string()
    .required('El nombre completo es obligatorio.')
    .min(3, 'El nombre completo debe tener al menos 3 caracteres.')
    .max(255, 'El nombre completo no puede exceder los 255 caracteres.'),
  email: yup
    .string()
    .required('El correo electrónico es obligatorio.')
    .email('El correo electrónico no es válido.')
    .max(255, 'El correo electrónico no puede exceder los 255 caracteres.'),
  phone_number: yup
    .string()
    .matches(/^\d*$/, 'El número de teléfono solo admite valores numéricos')
    .max(20, 'El número de teléfono no puede tener mas de 20 caracteres.'),
})

const {
  handleSubmit: handleInfoFormSubmit,
  meta: metaInfoForm,
  resetForm: resetInfoForm,
} = useForm({
  validationSchema: infoFormSchema,
  initialValues: {
    username: '',
    email: '',
    phone_number: '',
  },
})

const { value: username, errorMessage: usernameError } = useField<string>('username')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: phone_number, errorMessage: phoneNumberError } = useField<string>('phone_number')

const onInfoSubmit = handleInfoFormSubmit(async (values: InfoFormPayload) => {
  try {
    await updateUserInfo(values)
    displayAlertSuccess('', 'Información actualizada correctamente')
    await getInfo()
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Error al actualizar la información', errors)
  }
})

const addressFormSchema = yup.object({
  province: yup
    .string()
    .required('La provincia es obligatoria.')
    .max(100, 'La provincia no puede tener mas de 100 caracteres.'),
  city: yup
    .string()
    .required('La ciudad es obligatoria.')
    .max(100, 'La ciudad no puede tener mas de 100 caracteres.'),
  postal_code: yup
    .string()
    .required('El código postal es obligatorio.')
    .max(20, 'El código postal no puede tener mas de 20 caracteres.'),
  street: yup
    .string()
    .required('La calle es obligatoria.')
    .max(255, 'La calle no puede tener mas de 255 caracteres.'),
  department: yup.string().max(100, 'El departamento no puede tener mas de 100 caracteres.'),
  additional_info: yup
    .string()
    .max(255, 'La información adicional no puede tener mas de 255 caracteres.'),
})

const {
  handleSubmit: handleAddressFormSubmit,
  meta: metaAddressForm,
  resetForm: resetAddressForm,
} = useForm({
  validationSchema: addressFormSchema,
  initialValues: {
    province: '',
    city: '',
    postal_code: '',
    street: '',
    department: '',
    additional_info: '',
  },
})

const { value: province, errorMessage: provinceError } = useField<string>('province')
const { value: city, errorMessage: cityError } = useField<string>('city')
const { value: postal_code, errorMessage: postalCodeError } = useField<string>('postal_code')
const { value: street, errorMessage: streetError } = useField<string>('street')
const { value: department, errorMessage: departmentError } = useField<string>('department')
const { value: additional_info, errorMessage: additionalInfoError } =
  useField<string>('additional_info')

const onAddressSubmit = handleAddressFormSubmit(async (values: AddressFormPayload) => {
  try {
    await updateUserAddress(values)
    displayAlertSuccess('', 'Dirección actualizada correctamente')
    await getAddress()
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Error al actualizar la dirección', errors)
  }
})

const passwordFormSchema = yup.object({
  current_password: yup.string().required('La contraseña actual es obligatoria.'),
  new_password: yup
    .string()
    .required('La nueva contraseña es obligatoria.')
    .min(8, 'La nueva contraseña debe tener al menos 8 caracteres.'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Las contraseñas no coinciden.')
    .required('La confirmación de la nueva contraseña es obligatoria.'),
})

const { handleSubmit: handlePasswordFormSubmit, meta: metaPasswordForm } = useForm({
  validationSchema: passwordFormSchema,
  initialValues: {
    current_password: '',
    new_password: '',
    confirm_password: '',
  },
})

const { value: current_password, errorMessage: currentPasswordError } =
  useField<string>('current_password')
const { value: new_password, errorMessage: newPasswordError } = useField<string>('new_password')
const { value: confirm_password, errorMessage: confirmPasswordError } =
  useField<string>('confirm_password')

const onPasswordSubmit = handlePasswordFormSubmit(async (values: PasswordFormPayload) => {
  try {
    await updateUserPassword(values)
    displayAlertSuccess('', 'Contraseña actualizada correctamente')
    current_password.value = ''
    new_password.value = ''
    confirm_password.value = ''
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Error al actualizar la contraseña', errors)
  }
})

const getInfo = async () => {
  try {
    const response = await getUserInfo()
    if (response.data !== null && response.data !== undefined) {
      resetInfoForm({
        values: {
          username: response.data.username,
          email: response.data.email,
          phone_number: response.data.phone_number || '',
        },
      })
      hasGoogleId.value =
        response.data.has_google_id !== null && response.data.has_google_id !== undefined
    }
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Error al obtener la información', errors)
  }
}

const getAddress = async () => {
  try {
    const response = await getUserAddress()
    if (response.data !== null && response.data !== undefined) {
      resetAddressForm({
        values: {
          province: response.data.province,
          city: response.data.city,
          postal_code: response.data.postal_code,
          street: response.data.street,
          department: response.data.department || '',
          additional_info: response.data.additional_info || '',
        },
      })
    }
  } catch (error) {
    const errors = handleApiError(error)
    displayAlertError('Error al obtener la dirección', errors)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const loadData = async () => {
  loading.value = true
  try {
    await getInfo()
    await getAddress()
  } catch (error) {
    router.push('/login')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>
