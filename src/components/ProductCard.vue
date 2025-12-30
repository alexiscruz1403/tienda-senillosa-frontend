<template>
  <div class="relative shadow-md hover:shadow-lg transition-shadow bg-white rounded-lg overflow-hidden">
    <div class="h-96 bg-white relative group">
      <img :src="props.imageUrl" :alt="props.name" class="w-full h-full object-cover cursor-pointer" />
      <div class="flex flex-col gap-2 max-w-max absolute top-2 left-2">
        <v-chip v-if="isNew" color="info" variant="flat" size="small">NUEVO</v-chip>
        <v-chip v-if="props.discount" color="error" variant="flat" size="small">{{ props.discount }}% OFF</v-chip>
      </div>
      <button class="absolute top-2 right-2 opacity-0! group-hover:opacity-100! transition-opacity duration-300"
        @click.stop="handleLikeClick">
        <div :class="likeClass">
          <Heart :size="20" :fill="heartFill" :color="heartColor" />
        </div>
      </button>
      <v-btn
        class="opacity-0! group-hover:opacity-100! transition-opacity duration-300 absolute bottom-12 left-1/2 -translate-x-1/2">
        <div class="flex gap-2">
          <ShoppingBag :size="16" />
          <p>Ver producto</p>
        </div>
      </v-btn>
    </div>
    <div class="flex flex-col gap-2 px-2 py-4 bg-white">
      <h4 class="text-[#65758B]">{{ props.brand }}</h4>
      <h3 class="font-semibold">{{ props.name }}</h3>
      <div class="flex items-center gap-2">
        <span class="text-lg font-bold">${{ discountedPrice.toFixed(2) }}</span>
        <span v-if="props.discount" class="text-sm line-through text-gray-500">${{ props.price.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { computed } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
  product_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: false,
    default: 0
  },
  created_at: {
    type: Date,
    required: false,
    default: () => new Date()
  },
  isLiked: {
    type: Boolean,
    required: false,
    default: false
  }
});

import { Heart, ShoppingBag } from 'lucide-vue-next';

const isNew = computed<boolean>(() => {
  const now = new Date();
  const diffInDays = (now.getTime() - props.created_at.getTime()) / (1000 * 3600 * 24);
  return diffInDays <= 30;
});

const likeClass = computed<string>(() => {
  const baseClass = 'h-10 w-10 rounded-full flex items-center justify-center';
  return props.isLiked ? `${baseClass} bg-[#3C83F6] hover:bg-[#2a62d6] transition-colors duration-200` : `${baseClass} bg-gray-200 hover:bg-gray-400 transition-colors duration-200`;
});

const heartColor = computed<string>(() => {
  return props.isLiked ? 'white' : 'black';
});

const heartFill = computed<string>(() => {
  return props.isLiked ? 'white' : 'transparent';
});

const discountedPrice = computed<number>(() => {
  if (props.discount > 0) {
    return props.price * (1 - props.discount / 100);
  }
  return props.price;
});

const emit = defineEmits<{
  (e: 'like', productId: number): void;
}>();

const handleLikeClick = () => {
  emit('like', props.product_id);
};

</script>
