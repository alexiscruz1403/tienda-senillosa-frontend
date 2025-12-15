<template>
  <v-overlay :model-value="props.display" scrim="true" opacity="0.7">
    <div
      class="h-screen w-screen flex flex-col items-center justify-center gap-4 md:text-2xl font-semibold text-secondary">
      <v-progress-circular indeterminate size="50" color="secondary" />
      <p>{{ props.message }}</p>
    </div>
  </v-overlay>
</template>
<script lang="ts" setup>

const props = defineProps({
  display: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    default: 'Cargando, por favor espere...',
  },
});

</script>
