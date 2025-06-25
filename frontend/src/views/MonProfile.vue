<template>
  <div class="bg-white min-h-screen p-6 text-black font-texte">
    <!-- Barre du haut -->
    <div class="flex justify-center items-center mb-4">
      <img src="/logo-dstrk.png" alt="Logo" class="w-12" />
    </div>
    <h1 class="text-xl font-titre text-center mb-6 uppercase">Mon profil</h1>

    <h2 class="text-lb font-titre mb-4">Données personnelles</h2>

    <form class="space-y-4" v-if="!chargement">
      <input
        v-model="prenom"
        :readonly="!modeEdition"
        placeholder="Prénom"
        class="champ"
      />
      <input
        v-model="nom"
        :readonly="!modeEdition"
        placeholder="Nom"
        class="champ"
      />
      <input
        v-model="rue"
        :readonly="!modeEdition"
        placeholder="Rue et numéro"
        class="champ"
      />
      <input
        v-model="province"
        :readonly="!modeEdition"
        placeholder="Province"
        class="champ"
      />
      <input
        v-model="codePostal"
        :readonly="!modeEdition"
        placeholder="Code postal"
        class="champ"
      />
      <input
        v-model="ville"
        :readonly="!modeEdition"
        placeholder="Ville"
        class="champ"
      />

      <div class="flex space-x-4 mt-2">
        <button
          v-if="modeEdition"
          type="button"
          :class="genre === 'Femme' ? 'bouton-actif' : 'bouton-inactif'"
          @click="genre = 'Femme'"
        >
          Femme
        </button>
        <button
          v-if="modeEdition"
          type="button"
          :class="genre === 'Homme' ? 'bouton-actif' : 'bouton-inactif'"
          @click="genre = 'Homme'"
        >
          Homme
        </button>
        <span v-else class="text-sm">{{ genre }}</span>
      </div>

      <div class="info-ligne">
        <span class="icone">📧</span>
        <span class="text-sm flex-1 ml-2">{{ email }}</span>
      </div>

      <div class="flex justify-between mt-6">
        <button
          v-if="!modeEdition"
          type="button"
          class="btn-noir"
          @click="modeEdition = true"
        >
          MODIFIER
        </button>

        <button
          v-if="modeEdition"
          type="button"
          class="btn-noir"
          @click="enregistrerModifications"
          :disabled="enregistrementEnCours"
        >
          ENREGISTRER
        </button>

        <button type="button" class="btn-noir" @click="seDeconnecter">
          DÉCONNEXION
        </button>
      </div>
    </form>

    <p v-else class="text-center mt-10 text-gray-500">
      Chargement du profil...
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const prenom = ref("");
const nom = ref("");
const rue = ref("");
const province = ref("");
const codePostal = ref("");
const ville = ref("");
const genre = ref("");
const email = ref("");
const utilisateurInitial = ref({});

const chargement = ref(true);
const modeEdition = ref(false);
const enregistrementEnCours = ref(false);

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/connexion");
    return;
  }

  try {
    const response = await axios.get(
      "http://localhost:3000/utilisateurs/mon-profil",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const utilisateur = response.data.utilisateur;

    prenom.value = utilisateur.prenom ?? "";
    nom.value = utilisateur.nom ?? "";
    rue.value = utilisateur.rue ?? "";
    province.value = utilisateur.province ?? "";
    codePostal.value = utilisateur.codePostal ?? "";
    ville.value = utilisateur.ville ?? "";
    genre.value = ["Femme", "Homme"].includes(utilisateur.genre)
      ? utilisateur.genre
      : "";
    email.value = utilisateur.email ?? "";

    utilisateurInitial.value = { ...utilisateur };
  } catch (error) {
    console.error("Erreur profil :", error);
    alert("Erreur de chargement. Merci de vous reconnecter.");
    router.push("/connexion");
  } finally {
    chargement.value = false;
  }
});

const enregistrerModifications = async () => {
  const donneesModifiees = {};

  if (prenom.value !== utilisateurInitial.value.prenom)
    donneesModifiees.prenom = prenom.value;
  if (nom.value !== utilisateurInitial.value.nom)
    donneesModifiees.nom = nom.value;
  if (rue.value !== utilisateurInitial.value.rue)
    donneesModifiees.rue = rue.value;
  if (province.value !== utilisateurInitial.value.province)
    donneesModifiees.province = province.value;
  if (codePostal.value !== utilisateurInitial.value.codePostal)
    donneesModifiees.codePostal = codePostal.value;
  if (ville.value !== utilisateurInitial.value.ville)
    donneesModifiees.ville = ville.value;
  if (
    genre.value !== utilisateurInitial.value.genre &&
    ["Femme", "Homme"].includes(genre.value)
  ) {
    donneesModifiees.genre = genre.value;
  }

  if (Object.keys(donneesModifiees).length === 0) {
    alert("Aucune modification détectée.");
    return;
  }

  enregistrementEnCours.value = true;

  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      "http://localhost:3000/utilisateurs/mon-profil",
      donneesModifiees,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    utilisateurInitial.value = {
      ...utilisateurInitial.value,
      ...donneesModifiees,
    };
    alert("Profil mis à jour !");
    modeEdition.value = false;
  } catch (error) {
    console.error("Erreur MAJ :", error);
    alert("Erreur lors de la mise à jour.");
  } finally {
    enregistrementEnCours.value = false;
  }
};

const seDeconnecter = () => {
  if (confirm("Voulez-vous vous déconnecter ?")) {
    localStorage.removeItem("token");
    router.push("/connexion");
  }
};
</script>

<style scoped lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.champ {
  @apply w-full border border-black px-4 py-2 rounded-xl placeholder:text-gray-500 disabled:bg-gray-100;
}
.bouton-actif {
  @apply px-6 py-2 bg-black text-white rounded-full font-semibold;
}
.bouton-inactif {
  @apply px-6 py-2 border border-black text-black rounded-full font-semibold bg-white;
}
.btn-noir {
  @apply bg-black text-white px-6 py-2 rounded-full font-bold uppercase disabled:opacity-50;
}
.info-ligne {
  @apply flex items-center border border-black px-4 py-3 rounded-xl;
}
.icone {
  @apply w-6 h-6 flex items-center justify-center;
}
</style>
