<template>
  <div
    class="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-10 font-texte"
  >
    <!-- Logo -->
    <img src="/logo-dstrk.png" alt="Logo DSTRK" class="w-48 mb-6" />

    <!-- Titre -->
    <h1 class="text-xl font-titre font-semibold uppercase mb-6 text-center">
      INSCRIPTION
    </h1>

    <!-- Étapes -->
    <div class="flex space-x-3 mb-8">
      <span
        class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black text-black"
        >1</span
      >
      <span
        class="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white"
        >2</span
      >
      <span
        class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black text-black"
        >3</span
      >
    </div>

    <!-- Formulaire -->
    <form @submit.prevent="validerEtape" class="w-full max-w-md space-y-6">
      <div>
        <label for="motDePasse" class="block mb-1 font-semibold"
          >Mot de passe</label
        >
        <input
          id="motDePasse"
          v-model="motDePasse"
          type="password"
          placeholder="Mot de passe"
          class="champ"
          required
        />
      </div>

      <div>
        <label for="confirmation" class="block mb-1 font-semibold"
          >Confirmation du mot de passe</label
        >
        <input
          id="confirmation"
          v-model="confirmation"
          type="password"
          placeholder="Confirmation du mot de passe"
          class="champ"
          required
        />
      </div>

      <button type="submit" class="btn-noir w-full mt-6">Suivant</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const motDePasse = ref("");
const confirmation = ref("");
const router = useRouter();

const validerEtape = () => {
  if (motDePasse.value !== confirmation.value) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  localStorage.setItem("motDePasseTemp", motDePasse.value);
  router.push("/inscription/etape-3");
};
</script>

<style scoped lang="postcss">
.champ {
  @apply w-full border-2 border-black rounded-md px-4 py-2 text-sm outline-none;
}

.btn-noir {
  @apply bg-black text-white py-3 px-6 rounded-full font-semibold text-sm hover:opacity-90 transition;
}

.font-titre {
  font-family: "Unbounded", sans-serif;
}

.font-texte {
  font-family: "ABCFavoritMono-Book", monospace;
}
</style>
