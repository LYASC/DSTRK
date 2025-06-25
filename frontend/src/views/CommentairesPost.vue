<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter, RouterLink } from "vue-router";

const API = "http://localhost:3000";
const route = useRoute();
const router = useRouter();
const postId = route.params.id;

const token = localStorage.getItem("token");
if (!token) router.push("/connexion");

const headers = { Authorization: `Bearer ${token}` };

const commentaires = ref([]);
const contenu = ref("");
const commentaireEnEdition = ref(null);
const contenuModifie = ref("");
const utilisateurConnecte = ref(null);
const commentaireSelectionnePourReponse = ref(null);
const reponseContenu = ref("");
const auteurDuPost = ref(null);

async function chargerUtilisateur() {
  try {
    const res = await axios.get(`${API}/utilisateurs/mon-profil`, { headers });
    utilisateurConnecte.value = res.data.utilisateur;
  } catch (err) {
    console.error("Erreur chargement utilisateur", err);
  }
}

async function chargerAuteurDuPost() {
  try {
    const res = await axios.get(`${API}/posts/${postId}`, { headers });
    auteurDuPost.value = res.data.utilisateur.id;
  } catch (err) {
    console.error("Erreur chargement post", err);
  }
}

async function chargerCommentaires() {
  try {
    const res = await axios.get(`${API}/commentaires/post/${postId}`, {
      headers,
    });
    commentaires.value = res.data;
  } catch (err) {
    console.error("Erreur chargement commentaires", err);
  }
}

async function envoyerCommentaire() {
  if (!contenu.value.trim()) return;
  try {
    await axios.post(
      `${API}/commentaires/${postId}`,
      { contenu: contenu.value },
      { headers }
    );
    contenu.value = "";
    await chargerCommentaires();
  } catch (err) {
    console.error("Erreur envoi commentaire", err);
  }
}

async function envoyerReponse(parentId) {
  if (!reponseContenu.value.trim()) return;
  try {
    await axios.post(
      `${API}/commentaires/${postId}`,
      { contenu: reponseContenu.value, parentId },
      { headers }
    );
    reponseContenu.value = "";
    commentaireSelectionnePourReponse.value = null;
    await chargerCommentaires();
  } catch (err) {
    console.error("Erreur envoi réponse", err);
  }
}

function demarrerEdition(commentaire) {
  commentaireEnEdition.value = commentaire.id;
  contenuModifie.value = commentaire.contenu;
}

function annulerEdition() {
  commentaireEnEdition.value = null;
  contenuModifie.value = "";
}

async function sauvegarderModification(id) {
  try {
    await axios.patch(
      `${API}/commentaires/${id}`,
      { contenu: contenuModifie.value },
      { headers }
    );
    commentaireEnEdition.value = null;
    contenuModifie.value = "";
    await chargerCommentaires();
  } catch (err) {
    console.error("Erreur modification commentaire", err);
  }
}

async function supprimerCommentaire(id) {
  try {
    await axios.delete(`${API}/commentaires/${id}`, { headers });
    await chargerCommentaires();
  } catch (err) {
    console.error("Erreur suppression commentaire", err);
  }
}

onMounted(async () => {
  await chargerUtilisateur();
  await chargerAuteurDuPost();
  await chargerCommentaires();
});
</script>

<template>
  <div class="min-h-screen bg-white text-black px-6 py-10 font-texte">
    <div class="flex items-center justify-between mb-6">
      <img src="/logo-dstrk.png" alt="Logo DSTRK" class="w-32" />
      <RouterLink to="/communaute" class="text-sm underline"
        >← Retour</RouterLink
      >
    </div>

    <h1 class="text-xl font-titre font-semibold uppercase mb-6 text-center">
      Commentaires
    </h1>

    <form
      @submit.prevent="envoyerCommentaire"
      class="max-w-xl mx-auto mb-8 space-y-4"
    >
      <textarea
        v-model="contenu"
        placeholder="Ajoute ton commentaire..."
        class="champ h-24 resize-none"
      />
      <button type="submit" class="btn-noir w-full">Envoyer</button>
    </form>

    <div
      v-if="utilisateurConnecte && auteurDuPost"
      class="max-w-xl mx-auto space-y-6"
    >
      <div
        v-for="commentaire in commentaires"
        :key="commentaire.id"
        class="p-4 border border-gray-200 rounded-md bg-white"
      >
        <!-- Mode édition -->
        <div v-if="commentaireEnEdition === commentaire.id">
          <textarea v-model="contenuModifie" class="champ h-24 resize-none" />
          <div class="flex gap-2 mt-2">
            <button
              @click="sauvegarderModification(commentaire.id)"
              class="btn-noir"
            >
              Sauvegarder
            </button>
            <button @click="annulerEdition" class="btn-annuler">Annuler</button>
          </div>
        </div>

        <!-- Affichage normal -->
        <div v-else>
          <p class="whitespace-pre-line">{{ commentaire.contenu }}</p>
          <p class="text-xs text-gray-500 mt-1">
            Posté par {{ commentaire.utilisateur?.prenom ?? "Un utilisateur" }}
          </p>

          <div class="mt-1 flex flex-wrap gap-2 text-sm">
            <button
              v-if="
                utilisateurConnecte &&
                Number(commentaire.utilisateur?.id) ===
                  Number(utilisateurConnecte.id)
              "
              @click="demarrerEdition(commentaire)"
              class="text-blue-600"
            >
              Modifier
            </button>

            <button
              v-if="
                utilisateurConnecte &&
                (Number(commentaire.utilisateur?.id) ===
                  Number(utilisateurConnecte.id) ||
                  Number(auteurDuPost) === Number(utilisateurConnecte.id))
              "
              @click="supprimerCommentaire(commentaire.id)"
              class="text-red-600"
            >
              Supprimer
            </button>

            <button
              @click="commentaireSelectionnePourReponse = commentaire.id"
              class="text-gray-700"
            >
              Répondre
            </button>
          </div>

          <!-- Champ de réponse -->
          <div
            v-if="commentaireSelectionnePourReponse === commentaire.id"
            class="mt-2 space-y-2"
          >
            <textarea
              v-model="reponseContenu"
              class="champ h-20 resize-none"
              placeholder="Ta réponse…"
            />
            <button
              @click="envoyerReponse(commentaire.id)"
              class="btn-noir w-full"
            >
              Envoyer la réponse
            </button>
            <button
              @click="commentaireSelectionnePourReponse = null"
              class="btn-annuler w-full"
            >
              Annuler
            </button>
          </div>
        </div>

        <!-- Réponses -->
        <div
          v-if="commentaire.reponses?.length"
          class="mt-4 pl-4 border-l border-gray-300 space-y-2"
        >
          <div
            v-for="reponse in commentaire.reponses"
            :key="reponse.id"
            class="text-sm"
          >
            <p class="whitespace-pre-line">{{ reponse.contenu }}</p>
            <p class="text-xs text-gray-500">
              → {{ reponse.utilisateur?.prenom ?? "Utilisateur" }}
              <button
                v-if="
                  utilisateurConnecte &&
                  (Number(reponse.utilisateur?.id) ===
                    Number(utilisateurConnecte.id) ||
                    Number(auteurDuPost) === Number(utilisateurConnecte.id))
                "
                @click="supprimerCommentaire(reponse.id)"
                class="text-red-600 text-xs ml-2"
              >
                Supprimer
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.champ {
  @apply w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black;
}
.btn-noir {
  @apply bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900;
}
.btn-annuler {
  @apply bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400;
}
</style>
