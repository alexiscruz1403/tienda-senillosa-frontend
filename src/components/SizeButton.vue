<template>
  <button :class="buttonClasses" @click="handleClick">
    {{ props.size }}
  </button>
</template>
<script setup lang="ts">

import { computed, defineEmits } from 'vue';

const props = defineProps({
  size: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    required: false,
    default: false
  }
});

const buttonClasses = computed(() => {
  return props.selected
    ? 'size-12 rounded-lg border-2! border-[#3C83F6] bg-[#3C83F6]! text-white font-semibold hover:bg-[#366fdb]!'
    : 'size-12 rounded-lg border-2! border-gray-300 hover:border-[#3C83F6]!';
});

const emits = defineEmits<{
  (e: 'click', size: string): void;
}>();

const handleClick = () => {
  emits('click', props.size);
};

</script>
