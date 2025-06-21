<template>
  <div class="min-h-screen bg-black text-white pb-16">
    <router-view />
    <BarreNavigation v-if="afficherNavigation" />
  </div>
</template>

<script setup>
import BarreNavigation from "./components/BarreNavigation.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const afficherNavigation = computed(() => route.path !== "/connexion");
</script>
