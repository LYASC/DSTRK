<template>
  <div
    class="min-h-screen bg-white text-black flex flex-col items-center px-6 py-10 font-texte"
  >
    <!-- Logo -->
    <img src="/logo-dstrk.png" alt="Logo DSTRK" class="w-48 mb-6" />

    <!-- Titre -->
    <h1 class="text-xl font-titre font-semibold uppercase mb-6 text-center">
      Communauté
    </h1>

    <!-- Formulaire de publication -->
    <form
      @submit.prevent="soumettrePost"
      class="w-full max-w-xl space-y-4 mb-10"
    >
      <textarea
        v-model="postTexte"
        placeholder="Exprime-toi..."
        class="champ h-24 resize-none"
      ></textarea>
      <input
        ref="inputFichier"
        type="file"
        accept="image/*"
        @change="chargerImage"
        class="champ"
      />
      <button type="submit" class="btn-noir w-full">
        {{ enEdition ? "Modifier" : "Publier" }}
      </button>
    </form>

    <!-- Liste des publications -->
    <div v-if="posts.length === 0" class="text-gray-500">
      Aucune publication pour le moment.
    </div>
    <div v-else class="w-full max-w-xl space-y-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="border border-gray-200 rounded-md p-4 shadow-sm relative bg-white"
      >
        <p class="mb-2 whitespace-pre-line">{{ post.texte }}</p>

        <img
          v-if="post.imageUrl"
          :src="post.imageUrl"
          alt="Image du post"
          class="w-full rounded-md mt-2"
        />

        <!-- Infos posteur -->
        <p class="text-xs text-gray-500 mt-2">
          Posté par {{ post.utilisateur?.prenom ?? "Un utilisateur" }}
        </p>

        <!-- Boutons pour l'auteur -->
        <div
          v-if="post.utilisateur?.id === utilisateur.id"
          class="absolute top-2 right-2 flex gap-2"
        >
          <button
            @click="modifierPost(post)"
            class="text-sm text-blue-600 hover:underline"
          >
            Modifier
          </button>
          <button
            @click="supprimerPost(post.id)"
            class="text-sm text-red-500 hover:underline"
          >
            Supprimer
          </button>
        </div>

        <!-- Commentaire (aperçu) -->
        <div v-if="post.commentaires?.length" class="mt-3">
          <p class="text-sm text-gray-700">
            {{ tronquerTexte(post.commentaires[0].contenu) }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ post.commentaires.length }} commentaire(s) —
            <RouterLink
              :to="`/post/${post.id}`"
              class="underline hover:text-black"
            >
              Voir tous les commentaires
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, RouterLink } from "vue-router";

const API = "http://localhost:3000";
const router = useRouter();
const posts = ref([]);
const utilisateur = ref({});
const postTexte = ref("");
const fichierImage = ref(null);
const inputFichier = ref(null);
const enEdition = ref(false);
const postEnCoursId = ref(null);

const token = localStorage.getItem("token");
if (!token) router.push("/connexion");

const headers = {
  Authorization: `Bearer ${token}`,
};

// Charger posts et profil
async function chargerPostsEtProfil() {
  try {
    const profilRes = await axios.get(`${API}/utilisateurs/mon-profil`, {
      headers,
    });
    utilisateur.value = profilRes.data.utilisateur;

    const res = await axios.get(`${API}/posts`);
    posts.value = res.data;
  } catch (err) {
    console.error("Erreur chargement communauté", err);
  }
}

// Publier ou modifier un post
async function soumettrePost() {
  const formData = new FormData();
  formData.append("texte", postTexte.value);
  if (fichierImage.value) {
    formData.append("image", fichierImage.value);
  }

  try {
    if (enEdition.value) {
      await axios.patch(`${API}/posts/${postEnCoursId.value}`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await axios.post(`${API}/posts`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    postTexte.value = "";
    fichierImage.value = null;
    inputFichier.value.value = "";
    enEdition.value = false;
    postEnCoursId.value = null;
    await chargerPostsEtProfil();
  } catch (err) {
    console.error("Erreur publication", err);
  }
}

// Supprimer un post
async function supprimerPost(id) {
  try {
    await axios.delete(`${API}/posts/${id}`, { headers });
    posts.value = posts.value.filter((p) => p.id !== id);
  } catch (err) {
    console.error("Erreur suppression", err);
  }
}

// Préparer la modification d’un post
function modifierPost(post) {
  postTexte.value = post.texte;
  enEdition.value = true;
  postEnCoursId.value = post.id;
  fichierImage.value = null;
}

// Récupérer fichier image
function chargerImage(event) {
  fichierImage.value = event.target.files[0];
}

// Tronquer un commentaire
function tronquerTexte(commentaire) {
  if (!commentaire || typeof commentaire !== "string") return "";
  return commentaire.length > 100
    ? commentaire.slice(0, 100) + "..."
    : commentaire;
}

onMounted(chargerPostsEtProfil);
</script>

<style scoped>
.champ {
  @apply w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black;
}
.btn-noir {
  @apply bg-black text-white py-2 rounded-md hover:bg-gray-900;
}
</style>
