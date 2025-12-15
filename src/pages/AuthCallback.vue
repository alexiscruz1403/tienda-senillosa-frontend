<template>
  <div></div>
</template>
<script lang="ts" setup>

import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const token = route.query.token as string

  if (token) {
    console.log('Authentication successful. Token:', token);
    router.push('/')
  } else {
    router.push('/auth-error')
  }
})


</script>
