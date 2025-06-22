<template>
  <div
    class="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-10 font-texte"
  >
    <!-- Logo -->
    <img src="/logo-dstrk.png" alt="Logo DSTRK" class="w-48 mb-6" />

    <!-- Titre -->
    <h1 class="text-xl font-titre font-semibold uppercase mb-4 text-center">
      ESPACE COMMUNAUTAIRE DSTRK
    </h1>

    <!-- Sous-texte -->
    <p class="text-sm text-gray-700 mb-6">
      Pas de compte ?
      <RouterLink to="/inscription" class="underline hover:text-black">
        inscrivez-vous ici
      </RouterLink>
    </p>

    <!-- Formulaire -->
    <form
      @submit.prevent="seConnecter"
      class="w-full max-w-sm flex flex-col gap-6"
    >
      <ChampFormulaire
        v-model="email"
        name="email"
        type="email"
        label="Mail"
        autocomplete="email"
        required
      />

      <ChampFormulaire
        v-model="motDePasse"
        name="motDePasse"
        type="password"
        label="Mot de passe"
        autocomplete="current-password"
        required
      />

      <button
        type="submit"
        class="w-full bg-black text-white py-2 rounded-full font-medium hover:opacity-90"
      >
        Connexion
      </button>
    </form>
    <p v-if="messageErreur" class="text-red-600 text-sm text-center">
      {{ messageErreur }}
    </p>

    <!-- OU -->
    <div class="my-4 text-gray-700 font-semibold">OU</div>

    <!-- Bouton alternatif -->
    <button
      @click="allerAuSiteMarchand"
      class="w-full max-w-sm bg-black text-white py-2 rounded-full font-medium hover:opacity-90"
    >
      Accéder au site marchand
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import ChampFormulaire from "@/components/ChampFormulaire.vue";

const email = ref("");
const motDePasse = ref("");
const messageErreur = ref("");
const router = useRouter();

async function seConnecter() {
  try {
    const reponse = await fetch(
      "http://localhost:3000/utilisateurs/connexion",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          motDePasse: motDePasse.value,
        }),
      }
    );

    const donnees = await reponse.json();

    if (!reponse.ok) {
      throw new Error(donnees.message || "Erreur lors de la connexion");
    }

    localStorage.setItem("token", donnees.jeton);
    router.push("/mon-compte");
  } catch (erreur) {
    messageErreur.value = erreur.message;
  }
}

function allerAuSiteMarchand() {
  window.location.href = "https://www.dstrk.fr";
}
</script>
