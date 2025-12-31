<template>
  <app-layout>
    <div class="bg-[#F4F6FB] pb-8">
      <v-breadcrumbs :items="[
        { title: 'Inicio', href: '/' },
        { title: 'Catálogo', href: '/products' },
        { title: 'Detalle del Producto', href: '/products/', disabled: true }
      ]" />

      <section class="flex flex-col lg:flex-row px-4 py-4" v-if="loading">
        <div class="h-96 md:h-screen w-full lg:w-5xl bg-black/12 animate-pulse relative rounded-2xl">

        </div>
        <div class="flex flex-col gap-4 mt-8 md:mt-0 w-full">
          <div class="flex flex-col gap-2">
            <v-skeleton-loader type="heading" class="w-1/3 h-8" color="transparent" />
            <v-skeleton-loader type="heading" class="w-2/3 h-10" color="transparent" />
          </div>
          <v-skeleton-loader type="paragraph" class="w-full h-20" color="transparent" />
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <v-skeleton-loader type="heading" class="w-1/4 h-6" color="transparent" />
              <div class="flex gap-1">
                <v-skeleton-loader type="button" class="size-20" v-for="n in 4" :key="n" color="transparent" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <v-skeleton-loader type="heading" class="w-1/4 h-6" color="transparent" />
              <v-skeleton-loader type="button" class="w-40 h-10" color="transparent" />
            </div>
            <div class="flex gap-2">
              <v-skeleton-loader type="button" class="w-40 h-12" color="transparent" />
              <v-skeleton-loader type="button" class="w-40 h-12" color="transparent" />
            </div>
          </div>
        </div>
      </section>
      <section class="flex flex-col lg:flex-row gap-2 px-4 py-4" v-else>
        <div class="flex flex-col gap-4 md:gap-2 relative">
          <img :src="product?.images[selectedImageIndex]?.url" :alt="product?.name"
            class="h-96 md:h-screen w-full lg:w-2xl">
          <div class="flex gap-2">
            <div v-for="(image, index) in product?.images" :key="index">
              <img :src="image.url" :alt="`Imagen ${index + 2} de ${product?.name}`"
                :class="getSelectedImageClass(index)" @click="handleImageClick(index)" />
            </div>
          </div>
          <div v-if="isNew() || hasDiscount()" class="flex flex-col gap-2 absolute top-4 left-4">
            <div v-if="isNew()">
              <v-chip color="info" variant="flat" size="small">NUEVO</v-chip>
            </div>
            <div v-if="hasDiscount()">
              <v-chip color="error" variant="flat" size="small">{{ product?.discount }}% OFF</v-chip>
            </div>
          </div>
          <div v-if="hasLotOfImages()"
            class="absolute left-0 top-1/2 -translate-y-1/2 flex justify-between w-full items-center">
            <button
              class="size-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              @click="handleImageCarouselButtonClick('prev')">
              <ChevronLeft :size="24" />
            </button>
            <button
              class="size-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              @click="handleImageCarouselButtonClick('next')">
              <ChevronRight :size="24" />
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-4 mt-8 md:mt-0">
          <div class="flex flex-col gap-2">
            <h2 class="text-lg text-[#65758B]">{{ product?.brand }}</h2>
            <h1 class="text-4xl font-bold">{{ product?.name }}</h1>
          </div>
          <div class="flex gap-2 items-center">
            <p class="text-3xl font-bold">${{ discountedPrice }}</p>
            <p v-if="product?.discount" class="text-xl line-through text-gray-500">${{ product?.price }}</p>
          </div>
          <p class="text-[#65758B]">{{ product?.description }}</p>
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <h3 class="font-semibold text-lg">Talles</h3>
              <div class="flex gap-3">
                <size-button v-for="(stock, index) in product?.stocks" :key="index" :size="stock.size"
                  :selected="selectedSize == stock.size" @click="handleSizeClick" />
              </div>
            </div>

            <div class="flex flex-col gap-2" v-if="selectedSize">
              <h3 class="font-semibold text-lg">Cantidad</h3>
              <item-counter :model-value="modelValue" :max="maxQuantity" @update="handleQuantityUpdate" />
            </div>

            <div class="flex gap-2">
              <v-btn color="accent-main" size="large" :disabled="!selectedSize || maxQuantity === 0">
                <template #prepend>
                  <ShoppingBag :size="20" />
                </template>
                Agregar al carrito
              </v-btn>
              <v-btn variant="outlined" size="large" :color="getLikeButtonColor()" @click="handleLikeClick">
                <Heart :size="20" :color="getHeartColor()" :fill="getHeartFill()" />
              </v-btn>
            </div>
          </div>
        </div>
      </section>

      <section class="px-4 flex flex-col gap-4 mt-4">
        <h2 class="text-2xl md:text-3xl font-semibold">Productos <span class="text-[#3C83F6]">Similares</span></h2>
        <div class="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-4" ref="productsCarousel"
          v-if="loadingRelated">
          <div class="px-2" v-for="n in 4" :key="n">
            <v-skeleton-loader type="image, list-item-three-line" class="w-full h-96 flex items-start!" />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-4" ref="productsCarousel" v-else>
          <div class="px-2" v-for="product in relatedProducts" :key="product.product_id">
            <ProductCard :product_id="product.product_id" :name="product.name" :brand="product.brand"
              :price="product.price"
              :imageUrl="product.images?.length > 0 ? product.images.find(image => image.is_main)?.url ?? '' : ''"
              :discount="product.discount" @like="handleRelatedProductLikeClick(product.product_id)"
              :isLiked="product.is_liked" />
          </div>
        </div>
      </section>
    </div>
  </app-layout>
</template>
<script lang="ts" setup>

import AppLayout from '@/layout/AppLayout.vue';
import SizeButton from '@/components/SizeButton.vue';
import ItemCounter from '@/components/ItemCounter.vue';
import ProductCard from '@/components/ProductCard.vue';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-vue-next';
import router from '@/router';
import type { PublicProduct } from '@/types/ProductTypes';
import { getData } from '@/services/api';
import { likeProduct } from '@/services/likeService';
import { ref, onMounted, computed } from 'vue';

const loading = ref<boolean>(true);
const product = ref<PublicProduct | null>(null);
const loadingRelated = ref<boolean>(true);
const relatedProducts = ref<PublicProduct[]>([]);

const selectedImageIndex = ref<number>(0);

const selectedSize = ref<string | null>(null);
const maxQuantity = ref<number>(0);
const modelValue = ref<number>(1);

const isNew = (): boolean => {
  if (!product.value) return false;

  const createdAt = new Date(product.value.created_at);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdAt.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 30;
};

const hasDiscount = (): boolean => {
  return product.value ? product.value.discount > 0 : false;
};

const hasLotOfImages = (): boolean => {
  return product.value ? product.value.images.length > 1 : false;
};

const getSelectedImageClass = (index: number) => {
  const baseClass = 'h-28 w-28 md:h-36 md:w-36 rounded-lg object-cover cursor-pointer';
  return index === selectedImageIndex.value
    ? ` ${baseClass} border-2! border-[#3C83F6]`
    : `${baseClass} border border-gray-300`;
};

const handleImageClick = (index: number) => {
  selectedImageIndex.value = index;
};

const handleImageCarouselButtonClick = (direction: 'next' | 'prev') => {
  if (!product.value) return;

  if (direction === 'next') {
    selectedImageIndex.value = (selectedImageIndex.value + 1) % product.value.images.length;
  } else {
    selectedImageIndex.value =
      (selectedImageIndex.value - 1 + product.value.images.length) % product.value.images.length;
  }
};

const handleSizeClick = (size: string) => {
  selectedSize.value = size;

  const stockItem = product.value?.stocks.find(stock => stock.size === size);
  if (stockItem) {
    maxQuantity.value = stockItem.quantity;
  }
};

const handleQuantityUpdate = (newValue: number) => {
  modelValue.value = newValue;
};

const getLikeButtonColor = (): string => {
  if (!product.value) return "";

  return product.value.is_liked ? 'accent-main' : '';
}

const getHeartColor = (): string => {
  if (!product.value) return "black";

  return product.value.is_liked ? '#3C83F6' : 'black';
}

const getHeartFill = (): string => {
  if (!product.value) return "transparent";

  return product.value.is_liked ? '#3C83F6' : 'transparent';
}

const handleLikeClick = async () => {
  if (!product.value) return;

  const currentLikeStatus = product.value.is_liked;

  try {
    product.value.is_liked = !currentLikeStatus;
    await likeProduct(product.value.product_id);
  } catch (error) {
    console.error('Error liking the product:', error);
    product.value.is_liked = currentLikeStatus;
  }
};

const handleRelatedProductLikeClick = async (productId: number) => {
  const relatedProduct = relatedProducts.value.find(p => p.product_id === productId);
  if (!relatedProduct) return;

  const currentLikeStatus = relatedProduct.is_liked;

  try {
    relatedProduct.is_liked = !currentLikeStatus;
    await likeProduct(relatedProduct.product_id);
  } catch (error) {
    console.error('Error liking the related product:', error);
    relatedProduct.is_liked = currentLikeStatus;
  }
};

onMounted(() => {
  const productId = router.currentRoute.value.params.id;
  getData<PublicProduct>(`/products/${productId}`)
    .then(response => {
      product.value = response.data;
      getData<PublicProduct[]>(`/products/${productId}/related`)
        .then(relatedResponse => {
          relatedProducts.value = relatedResponse.data;
        })
        .catch(error => {
          console.error('Error fetching related products:', error);
        })
        .finally(() => {
          loadingRelated.value = false;
        });
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
      router.push('/products');
    })
    .finally(() => {
      loading.value = false;
    });
});

const discountedPrice = computed(() => {
  if (product.value && product.value.discount) {
    return product.value.price - (product.value.price * product.value.discount / 100);
  }

  return product.value ? product.value.price : 0;
});

</script>
