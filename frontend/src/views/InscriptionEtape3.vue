<template>
  <div
    class="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-10 font-texte"
  >
    <!-- Logo -->
    <img src="/logo-dstrk.png" alt="Logo DSTRK" class="w-48 mb-6" />

    <!-- Titre -->
    <h1 class="text-xl font-titre font-semibold uppercase mb-4 text-center">
      INSCRIPTION – ÉTAPE 3 / 3
    </h1>

    <!-- Étapes -->
    <EtapesInscription :etape-active="3" />

    <!-- Formulaire -->
    <form
      @submit.prevent="validerInscription"
      class="w-full max-w-sm flex flex-col gap-6"
    >
      <ChampFormulaire
        v-model="motDePasse"
        name="motDePasse"
        type="password"
        label="Mot de passe"
        autocomplete="new-password"
        required
      />

      <ChampFormulaire
        v-model="confirmation"
        name="confirmation"
        type="password"
        label="Confirmer le mot de passe"
        autocomplete="new-password"
        required
      />

      <button
        type="submit"
        class="w-full bg-black text-white py-2 rounded-full font-medium hover:opacity-90 mt-2"
      >
        Valider l’inscription
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import EtapesInscription from "@/components/EtapesInscription.vue";
import ChampFormulaire from "@/components/ChampFormulaire.vue";

const router = useRouter();

const motDePasse = ref("");
const confirmation = ref("");

function validerInscription() {
  if (motDePasse.value !== confirmation.value) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  console.log("Inscription validée :", motDePasse.value);
  // 👉 Envoi vers backend ici si nécessaire

  router.push("/connexion");
}
</script>
