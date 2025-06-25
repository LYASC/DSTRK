<template>
  <div class="min-h-screen bg-white text-black font-texte px-4 py-6">
    <!-- Barre du haut -->
    <div class="flex justify-center items-center mb-4">
      <img src="/logo-dstrk.png" alt="Logo" class="w-12" />
    </div>
    <h1 class="text-xl font-titre font-semibold uppercase mb-6 text-center">
      Mes commmandes
    </h1>

    <!-- Aucune commande -->
    <div
      v-if="commandes.length === 0"
      class="flex justify-center items-center h-64"
    >
      <div
        class="bg-black border border-white rounded-xl p-6 max-w-md text-center shadow-lg font-texte text-white"
      >
        <p class="text-base sm:text-lg mb-3 leading-snug tracking-wide">
          Vous n’avez pas encore passé de commande.
        </p>
        <p class="text-sm text-gray-300">
          Découvrez nos produits sur notre
          <span class="font-semibold">Site marchand </span>.
        </p>
      </div>
    </div>

    <!-- Liste des commandes -->
    <div v-else class="flex flex-col gap-4">
      <div
        v-for="commande in commandes"
        :key="commande.id"
        class="flex rounded-xl overflow-hidden border border-black"
      >
        <!-- Partie gauche noire -->
        <div class="bg-black text-white px-4 py-3 flex flex-col flex-1">
          <span class="font-semibold">Commande n°{{ commande.numero }}</span>
          <span class="text-sm text-gray-300">
            {{ commande.articles.length }} article{{
              commande.articles.length > 1 ? "s" : ""
            }}
          </span>
        </div>

        <!-- Partie prix -->
        <div class="px-4 py-3 border-l border-black flex items-center">
          {{ totalPrix(commande) }}€
        </div>

        <!-- Flèche -->
        <div
          class="px-4 py-3 border-l border-black flex items-center cursor-pointer hover:bg-gray-100"
          @click="voirDetail(commande.id)"
        >
          →
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const commandes = ref([]);
const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.get("http://localhost:8000/api/commandes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commandes.value = res.data.commandes || [];
  } catch (err) {
    console.error("Erreur chargement commandes", err);
    commandes.value = [];
  }
});

const totalPrix = (commande) => {
  return commande.articles
    .reduce((total, a) => total + parseFloat(a.prix), 0)
    .toFixed(2);
};

const voirDetail = (commandeId) => {
  router.push(`/commande/${commandeId}`);
};
</script>
