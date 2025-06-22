<template>
  <div
    class="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-10 font-texte"
  >
    <!-- Logo -->
    <img src="/logo-dstrk.png" alt="Logo DSTRK" class="w-48 mb-6" />

    <!-- Titre -->
    <h1 class="text-xl font-titre font-semibold uppercase mb-4 text-center">
      INSCRIPTION
    </h1>

    <!-- Étapes -->
    <EtapesInscription :etape-active="1" />

    <!-- Formulaire -->
    <form
      @submit.prevent="passerEtapeSuivante"
      class="w-full max-w-sm flex flex-col gap-6"
    >
      <ChampFormulaire
        v-model="form.email"
        name="email"
        type="email"
        label="Mail"
        autocomplete="email"
        required
      />

      <ChampFormulaire
        v-model="form.prenom"
        name="prenom"
        type="text"
        label="Prénom"
        autocomplete="given-name"
        required
      />

      <ChampFormulaire
        v-model="form.nom"
        name="nom"
        type="text"
        label="Nom"
        autocomplete="family-name"
        required
      />

      <button
        type="submit"
        class="w-full bg-black text-white py-2 rounded-full font-medium hover:opacity-90 mt-2"
      >
        Suivant
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import EtapesInscription from "@/components/EtapesInscription.vue";
import ChampFormulaire from "@/components/ChampFormulaire.vue";

const router = useRouter();

const form = reactive({
  email: "",
  prenom: "",
  nom: "",
});

function passerEtapeSuivante() {
  console.log("Données étape 1 :", form);
  router.push("/inscription/etape2");
}
</script>
