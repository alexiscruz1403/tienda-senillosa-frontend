<template>
  <app-layout>
    <div class="min-h-screen w-full bg-[#F4F6FB] flex flex-col items-center">
      <div class="bg-[#0E1629] w-full h-52 text-white flex flex-col gap-2 justify-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold">Mis Favoritos</h1>
        <p class="text-[#F8FAFCB2]">{{ likedProducts.length }} productos encontrados</p>
      </div>
      <div class="h-full w-full flex flex-col items-center justify-center gap-6" v-if="emptyLikedProducts && !loading">
        <div class="px-6 py-6 rounded-full bg-[#EDEFF3] max-w-max">
          <Heart :size="50" color="#65758B" />
        </div>
        <div class="flex flex-col gap-2 justify-center items-center text-center">
          <h2 class="text-2xl font-semibold">No tenes productos favoritos</h2>
          <p class="text-lg text-[#65758B]">Guarda los productos que te gusten para encontrarlos fácilmente aquí.</p>
        </div>
        <div>
          <v-btn color="primary" @click="handleExploreClick">
            Explorar catálogo
            <template #append>
              <ArrowRight :size="20" />
            </template>
          </v-btn>
        </div>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-screen py-8 px-4 gap-y-4 gap-x-4">
        <ProductCard v-for="product in likedProducts" :key="product.product_id" :product_id="product.product_id"
          :name="product.name" :brand="product.brand" :price="product.price"
          :imageUrl="product.images?.length > 0 ? product.images.find(image => image.is_main)?.url ?? '' : ''"
          :discount="product.discount" @like="handleLikeClick(product.product_id)" :isLiked="product.is_liked" />
        <div class="px-2" v-for="n in 4" :key="n">
          <v-skeleton-loader v-if="loading" type="image, list-item-three-line" class="w-full h-96 flex items-start!" />
        </div>
      </div>
      <v-btn v-if="!loading && page !== 1" color="primary" class="mb-4" @click="fetchLikedProducts">
        Cargar más
      </v-btn>
    </div>
  </app-layout>
</template>
<script lang="ts" setup>

import AppLayout from '@/layout/AppLayout.vue';
import ProductCard from '@/components/ProductCard.vue';
import { Heart, ArrowRight } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { getData } from '@/services/api';
import type { PublicProduct } from '@/types/ProductTypes';
import type { PublicProductPaginated } from '@/types/ProductTypes';
import { likeProduct } from '@/services/likeService';

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const loading = ref<boolean>(false);
const page = ref<number>(1);

const likedProducts = ref<PublicProduct[]>([]);
const emptyLikedProducts = ref(true);

const handleExploreClick = () => {
  router.push('/products');
};

const fetchLikedProducts = async () => {
  loading.value = true;
  try {
    const response = await getData<PublicProductPaginated>('/user/likes', { page: page.value });
    likedProducts.value = [...likedProducts.value, ...response.data.data];

    emptyLikedProducts.value = likedProducts.value.length === 0;

    if (response.data.links.next) {
      page.value += 1;
    } else {
      page.value = 1;
    }
  } catch (error) {
    console.error('Error fetching liked products:', error);
  } finally {
    loading.value = false;
  }
};

const handleLikeClick = async (productId: number) => {
  const product: PublicProduct | undefined = likedProducts.value.find(p => p.product_id === productId);
  try {
    likedProducts.value = likedProducts.value.filter(product => product.product_id !== productId);

    await likeProduct(productId);
  } catch (error) {
    console.error('Error unliking product:', error);
    if (product) likedProducts.value.push(product);

  } finally {
    emptyLikedProducts.value = likedProducts.value.length === 0;
  }
};

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login');
    return;
  }

  fetchLikedProducts();
});

</script>
