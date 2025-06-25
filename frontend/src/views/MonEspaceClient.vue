<template>
  <div class="min-h-screen bg-white text-black font-texte px-4 py-6">
    <!-- Barre du haut -->
    <div class="flex justify-center items-center mb-4">
      <img src="/logo-dstrk.png" alt="Logo" class="w-12" />
    </div>

    <!-- Titre -->
    <h1
      class="text-xl font-titre font-bold uppercase text-center leading-tight"
    >
      Bienvenue sur<br />
      votre espace client
    </h1>

    <!-- Nom utilisateur -->
    <p class="text-center text-lg mt-2 mb-6">{{ utilisateur.nom }}</p>

    <!-- Raccourcis -->
    <div class="flex justify-around mb-6">
      <router-link
        to="/commandes"
        class="flex flex-col items-center text-center"
      >
        <img src="" alt="Commandes" class="w-10 mb-1" />
        <span>Commande</span>
      </router-link>

      <router-link
        to="/mon-profile"
        class="flex flex-col items-center text-center"
      >
        <img src="" alt="Profile" class="w-10 mb-1" />
        <span>Mon Profile</span>
      </router-link>

      <router-link
        to="/collection"
        class="flex flex-col items-center text-center"
      >
        <img src="" alt="Collection" class="w-10 mb-1" />
        <span>Collection</span>
      </router-link>
    </div>

    <!-- Barre de progression -->
    <div class="text-center text-sm mb-4">
      Dépensez <strong>20€</strong> pour débloquer le
      <strong>prochain palier</strong>
    </div>
    <div class="w-full bg-gray-200 h-4 rounded-full mb-6 relative">
      <div class="bg-black h-full w-1/2 rounded-full"></div>
      <span
        class="absolute right-0 -top-6 text-xs bg-black text-white px-2 py-0.5 rounded"
      >
        CODE PROMO 15€
      </span>
    </div>

    <!-- Bloc collection -->
    <div
      class="text-center uppercase font-semibold text-sm bg-black text-white py-2"
    >
      Exclu nouvelle collection
    </div>
    <div class="text-center text-xs my-2">Vote pour ton design préféré</div>
    <div class="relative mx-auto w-3/4 h-48 bg-gray-100 mb-6">
      <img src="" alt="T-shirt à voter" class="w-full h-full object-cover" />
      <div
        class="absolute top-1/3 left-0 w-full text-white bg-black text-center rotate-[-10deg] text-xs font-bold py-1"
      >
        EXCLU PROCHAINE SORTIES
      </div>
    </div>

    <!-- Dernière commande -->
    <div class="text-center text-xs uppercase font-bold mb-2">
      Dernière commande
    </div>
    <div class="text-center text-sm mb-1">
      Expédition prévu le :
      <strong>27/09/2025</strong>
    </div>
    <div class="text-center text-sm mb-1">
      Lieu de réception de votre commande :
      <strong>Locker berthelot</strong>
    </div>
    <div class="text-center text-sm mb-4">
      2 produits <strong>73.59€</strong>
    </div>

    <router-link
      to="/commandes"
      class="block text-center underline text-sm font-semibold"
    >
      Toutes mes commandes
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const utilisateur = ref({ nom: "" });
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/connexion");
  } else {
    // Requête au backend pour récupérer les infos de l’utilisateur connecté
    fetch(`${import.meta.env.VITE_API_URL}/utilisateurs/mon-profil`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        utilisateur.value = data.utilisateur;
      })
      .catch(() => {
        router.push("/connexion");
      });
  }
});

function toggleMenu() {
  // Tu pourras gérer l’ouverture du menu ici
}
</script>
