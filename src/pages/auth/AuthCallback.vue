<template>
  <div></div>
</template>
<script lang="ts" setup>

import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const token = route.query.token as string

  if (token) {
    authStore.login(token)
    router.push('/')
  } else {
    router.push('/auth-error')
  }
})


</script>
