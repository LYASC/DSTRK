<template>
  <div class="flex gap-2 items-center justify-center mb-6">
    <div
      v-for="index in 3"
      :key="index"
      class="w-8 h-8 rounded-full text-center leading-8 text-sm"
      :class="{
        'bg-black text-white': index === etapeActive,
        'bg-gray-300': index < etapeActive,
        'border-2 border-black text-black': index > etapeActive,
      }"
    >
      {{ index }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  etapeActive: {
    type: Number,
    required: true,
  },
});
</script>
