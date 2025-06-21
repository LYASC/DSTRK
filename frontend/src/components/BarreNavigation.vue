<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-black text-white border-t border-gray-700"
  >
    <ul class="flex justify-around items-center h-16">
      <li>
        <RouterLink to="/" class="flex flex-col items-center text-sm">
          <span class="material-icons">shopping_cart</span>
          Commandes
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/mon-compte" class="flex flex-col items-center text-sm">
          <span class="material-icons">person</span>
          Mon Compte
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/communaute" class="flex flex-col items-center text-sm">
          <span class="material-icons">chat</span>
          Communauté
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.material-icons {
  font-size: 20px;
}
</style>
