<template>
  <app-layout>
    <div class="bg-[#F4F6FB]">
      <div class="bg-[#0E1629] w-full h-52 text-white flex flex-col gap-2 justify-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold">Catálogo</h1>
        <p class="text-[#F8FAFCB2]">{{ matchesFound }} productos encontrados</p>
      </div>
      <div class="px-4 py-8 flex flex-col lg:flex-row lg:items-start gap-4">
        <!-- Filtros sm -->
        <div class="flex flex-col gap-2 lg:hidden">
          <v-text-field label="Buscar producto" variant="outlined" class="w-full" hide-details density="comfortable"
            v-model="searchValue">
            <template #prepend-inner>
              <Search class="w-5 h-5 text-gray-400 mr-2" />
            </template>
          </v-text-field>
          <div class="flex gap-2">
            <button class="flex items-center gap-3 px-4 py-2 border border-[#ABABAB]! rounded-md"
              @click="handleFilterButtonClick">
              <Funnel class="w-5 h-5" />
              <span>Filtros</span>
            </button>
            <v-select v-model="orderingValue" :items="orderingItems" variant="outlined" class="w-48 ml-4" hide-details
              density="comfortable" />
          </div>
        </div>

        <!-- Filtros lg -->
        <div class="w-[25%] hidden lg:block shrink-0">
          <div class="sticky top-24 flex flex-col">

            <v-text-field label="Buscar producto" variant="outlined" class="w-full" hide-details density="comfortable"
              v-model="searchValue">
              <template #prepend-inner>
                <Search class="w-5 h-5 text-gray-400 mr-2" />
              </template>
            </v-text-field>

            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-1 mt-6">
                <h3 class="text-lg font-semibold">Categoría</h3>
                <div class="flex flex-col">
                  <v-checkbox v-model="categoryFilterValue" label="Remeras" value="remeras" density="compact"
                    hide-details></v-checkbox>
                  <v-checkbox v-model="categoryFilterValue" label="Camisas" value="camisas" density="compact"
                    hide-details></v-checkbox>
                  <v-checkbox v-model="categoryFilterValue" label="Pantalones" value="pantalones" density="compact"
                    hide-details></v-checkbox>
                  <v-checkbox v-model="categoryFilterValue" label="Shorts" value="shorts" density="compact"
                    hide-details></v-checkbox>
                  <v-checkbox v-model="categoryFilterValue" label="Buzos" value="buzos" density="compact"
                    hide-details></v-checkbox>
                  <v-checkbox v-model="categoryFilterValue" label="Camperas" value="camperas" density="compact"
                    hide-details></v-checkbox>
                  <v-checkbox v-model="categoryFilterValue" label="Zapatillas" value="zapatillas" density="compact"
                    hide-details></v-checkbox>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-lg font-semibold">Género</h3>
                <v-radio-group v-model="genderFilterValue">
                  <v-radio label="Masculino" value="masculino" />
                  <v-radio label="Femenino" value="femenino" />
                  <v-radio label="Unisex" value="unisex" />
                </v-radio-group>
              </div>
            </div>
            <v-btn color="primary" @click="clearFilters" v-if="activeFilters()">Limpiar Filtros</v-btn>
          </div>
        </div>

        <div class="flex flex-col gap-6 w-full">
          <v-select v-model="orderingValue" :items="orderingItems" variant="outlined" class="w-48" hide-details
            density="comfortable" />
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2">
            <ProductCard v-for="product in products" :key="product.product_id" :product_id="product.product_id"
              :name="product.name" :brand="product.brand" :price="product.price"
              :imageUrl="product.images?.length > 0 ? product.images.find(image => image.is_main)?.url ?? '' : ''"
              :discount="product.discount" @like="handleProductLike" :isLiked="product.is_liked" />
            <div class="px-2" v-for="n in 10" :key="n">
              <v-skeleton-loader v-if="loading" type="image, list-item-three-line"
                class="w-full h-96 flex items-start!" />
            </div>
          </div>
          <v-btn @click="fetchProducts" color="primary" v-if="!loading && page != 1">Cargar más</v-btn>
        </div>
      </div>

      <!-- Filtros sidebar sm -->
      <v-slide-x-transition>
        <div class="h-screen w-screen bg-black/60 fixed top-0 left-0 z-50" v-show="displayFilterSidebar">
          <div class="h-full w-[80%] md:w-[45%] bg-[#F4F6FB] px-4 py-8 flex flex-col gap-2">
            <div class="w-full flex justify-between items-center">
              <h2 class="text-xl font-bold">Filtros</h2>
              <X :size="25" @click="handleFilterButtonClick" />
            </div>
            <div class="flex flex-col gap-1 mt-6">
              <h3 class="text-lg font-semibold">Categoría</h3>
              <div class="flex flex-col">
                <v-checkbox v-model="categoryFilterValue" label="Remeras" value="remeras" density="compact"
                  hide-details></v-checkbox>
                <v-checkbox v-model="categoryFilterValue" label="Camisas" value="camisas" density="compact"
                  hide-details></v-checkbox>
                <v-checkbox v-model="categoryFilterValue" label="Pantalones" value="pantalones" density="compact"
                  hide-details></v-checkbox>
                <v-checkbox v-model="categoryFilterValue" label="Shorts" value="shorts" density="compact"
                  hide-details></v-checkbox>
                <v-checkbox v-model="categoryFilterValue" label="Buzos" value="buzos" density="compact"
                  hide-details></v-checkbox>
                <v-checkbox v-model="categoryFilterValue" label="Camperas" value="camperas" density="compact"
                  hide-details></v-checkbox>
                <v-checkbox v-model="categoryFilterValue" label="Zapatillas" value="zapatillas" density="compact"
                  hide-details></v-checkbox>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-lg font-semibold">Género</h3>
              <v-radio-group v-model="genderFilterValue">
                <v-radio label="Masculino" value="masculino"></v-radio>
                <v-radio label="Femenino" value="femenino"></v-radio>
                <v-radio label="Unisex" value="unisex"></v-radio>
              </v-radio-group>
            </div>
            <v-btn color="primary" @click="clearFilters" v-if="activeFilters()">Limpiar Filtros</v-btn>
          </div>
        </div>
      </v-slide-x-transition>
    </div>
  </app-layout>
</template>
<script lang="ts" setup>

import AppLayout from '@/layout/AppLayout.vue';
import ProductCard from '@/components/ProductCard.vue';
import { Search, Funnel, X } from 'lucide-vue-next';
import { ref, onMounted, watch } from 'vue';
import type { PublicProduct, PublicProductPaginated } from '@/types/ProductTypes';
import { getData } from '@/services/api';
import { likeProduct } from '@/services/likeService';

const loading = ref<boolean>(true);
const products = ref<PublicProduct[]>([]);

const searchValue = ref<string>('');

const orderingValue = ref<string>('best_selling');
const orderingItems = [
  { title: 'Más vendido', value: 'best_selling' },
  { title: 'Más nuevo', value: 'newest' },
  { title: 'Más barato', value: 'price_asc' },
  { title: 'Más caro', value: 'price_desc' },
]

const displayFilterSidebar = ref<boolean>(false);
const categoryFilterValue = ref<string[]>([]);
const genderFilterValue = ref<string>('');

const matchesFound = ref<number>(0);
const page = ref<number>(1);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

let abortController: AbortController | null = null;

const handleFilterButtonClick = () => {
  displayFilterSidebar.value = !displayFilterSidebar.value;
}

const handleProductLike = async (productId: number) => {
  const product = products.value.find(p => p.product_id === productId);
  if (!product) return;

  const currentLikeStatus = product.is_liked;

  try {
    product.is_liked = !currentLikeStatus;
    await likeProduct(product.product_id);
  } catch (error) {
    console.error('Error liking the related product:', error);
    product.is_liked = currentLikeStatus;
  }
}

const fetchProducts = () => {
  loading.value = true;

  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();

  getData<PublicProductPaginated>('/products', {
    search: searchValue.value,
    category: categoryFilterValue.value,
    gender: genderFilterValue.value,
    ordering: orderingValue.value,
    page: page.value
  }, { signal: abortController?.signal })
    .then(response => {
      products.value = [...products.value, ...response.data.data];

      matchesFound.value = response.data.meta.total;
      if (response.data.links.next) {
        page.value += 1;
      } else {
        page.value = 1;
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log("Solicitud abortada");
        return;
      }
      console.error("Error al obtener productos: ", error)
    })
    .finally(() => {
      loading.value = false;
    });
}

const clearFilters = () => {
  searchValue.value = '';
  categoryFilterValue.value = [];
  genderFilterValue.value = '';
  page.value = 1;
}

const activeFilters = (): boolean => {
  return searchValue.value !== '' || categoryFilterValue.value.length > 0 || genderFilterValue.value !== '';
}

onMounted(() => {
  fetchProducts();
})

watch([searchValue, categoryFilterValue, genderFilterValue, orderingValue], () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    products.value = [];
    page.value = 1;
    fetchProducts();
  }, 500);
});

</script>
