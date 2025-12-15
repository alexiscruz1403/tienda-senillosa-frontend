<template>
  <v-app>
    <TopNavbar />

    <v-main>
      <slot />
    </v-main>

    <BottomFooter v-if="props.displayFooter" />
  </v-app>
</template>
<script lang="ts" setup>

import TopNavbar from './TopNavbar.vue';
import BottomFooter from './BottomFooter.vue';

const props = defineProps({
  displayFooter: {
    type: Boolean,
    default: true,
  },
});

</script>
