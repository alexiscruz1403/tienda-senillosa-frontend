<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 border border-gray-300 rounded-lg w-max p-2">
      <button
        class="size-12 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200! transition-colors duration-200"
        :disabled="props.modelValue <= props.min" @click="handleButtonClick(props.modelValue - 1)">
        <Minus :size="18" />
      </button>
      <span class="w-10 text-center">{{ props.modelValue }}</span>
      <button
        class="size-12 flex items-center justify-center cursor-pointer hover:bg-gray-200! transition-colors duration-200"
        :disabled="props.modelValue >= props.max" @click="handleButtonClick(props.modelValue + 1)">
        <Plus :size="18" />
      </button>
    </div>
    <div v-if="max > 0">
      <p class="text-sm text-[#65758B]">Max: {{ props.max }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">

import { Plus, Minus } from 'lucide-vue-next';
import { defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: false,
    default: 1
  }
});

const emits = defineEmits<{
  (e: 'update', value: number): void;
}>();

const handleButtonClick = (newValue: number) => {
  emits('update', newValue);
};

</script>
