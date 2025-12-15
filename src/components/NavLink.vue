<template>
  <a href="props.to"
    class="relative text-[#65758B] py-2 px-4 hover:text-[#0E1629] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#3C83F6] after:transition-all after:duration-300 hover:after:w-full"
    @click.prevent="navigate">
    {{ props.label }}
  </a>
</template>
<script lang="ts" setup>

import { useRouter } from 'vue-router';

const props = defineProps<{
  to: string;
  label: string;
}>();

const router = useRouter();

const navigate = (): void => {
  router.push(props.to);
}

</script>
