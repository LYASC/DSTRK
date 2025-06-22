<template>
  <div class="p-4 text-white">Page Mon Compte</div>
  <div
    class="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-10 font-texte"
  >
    <h1 class="text-2xl font-titre font-semibold mb-6">
      Bienvenue dans ton espace personnel
    </h1>
    <p class="text-gray-600">Tu es connecté(e) ✅</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirection immédiate si aucun token
    router.push("/connexion");
  }
});
</script>
