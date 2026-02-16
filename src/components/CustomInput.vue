<template>
  <div class="flex gap-1">
    <div class="flex flex-col gap-1 w-full">
      <label :for="props.label"
        >{{ props.label }} <span v-if="props.required" class="text-[#EF4343] ml-1">*</span></label
      >
      <div class="flex gap-1 items-center w-full">
        <div
          class="bg-[#F4F6FB]! py-2 px-3 rounded-lg flex items-center gap-3 ring-1 ring-[#65758B] focus-within:ring-2 focus-within:ring-[#3C83F6] focus-within:ring-offset-1 focus-within:ring-offset-white w-full"
        >
          <div>
            <slot name="prepend"></slot>
            <input
              :type="props.type"
              :id="props.label"
              :placeholder="props.placeholder"
              :disabled="props.disabled"
              v-model="inputValue"
              class="bg-transparent w-full outline-none disabled:bg-gray-100! disabled:text-gray-400! disabled:border-gray-200! disabled:cursor-not-allowed!"
            />
          </div>
        </div>
        <label :for="props.label" class="text-[#EF4343] text-sm">{{ props.error }}</label>
        <div class="d-flex justify-center" v-if="props.disclaimer">
          <v-tooltip interactive>
            <template v-slot:activator="{ props: activatorProps }">
              <Info v-bind="activatorProps" class="text-[#1976D2] cursor-pointer" />
            </template>
            <div>
              {{ props.disclaimer }}
            </div>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineModel } from 'vue'
import { Info } from 'lucide-vue-next'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disclaimer: {
    type: String,
    default: '',
  },
})

const inputValue = defineModel('inputValue', {
  type: String,
  default: '',
})
</script>
