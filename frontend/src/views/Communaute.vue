<template>
  <div class="min-h-screen bg-white text-black font-texte relative px-4 py-6">
    <div class="flex justify-center items-center mb-4">
      <img src="/logo-dstrk.png" alt="Logo" class="w-12" />
    </div>
    <h1 class="text-xl font-titre font-semibold uppercase mb-6 text-center">
      Communauté
    </h1>

    <!-- Liste des publications -->
    <div v-if="posts.length === 0" class="text-gray-500 text-center">
      Aucune publication pour le moment.
    </div>
    <div v-else class="w-full max-w-xl mx-auto space-y-8">
      <CartePost
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :utilisateurConnecte="utilisateur"
        @modifier="ouvrirEdition"
        @supprimer="supprimerPost"
      />
    </div>

    <!-- Bouton flottant -->
    <button
      @click="afficherModale = true"
      class="fixed bottom-24 right-6 bg-black text-white w-14 h-14 rounded-full text-3xl flex items-center justify-center shadow-lg hover:bg-gray-800 transition z-50"
    >
      +
    </button>

    <!-- Modale de création -->
    <ModaleCreationPost
      v-if="afficherModale"
      :postTexte="postAModifier?.texte ?? ''"
      :enEdition="!!postAModifier"
      @fermer="fermerModale"
      @soumettre="gererSoumission"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import CartePost from "../components/CartePost.vue";
import ModaleCreationPost from "../components/ModaleCreationPost.vue";

const API = "${import.meta.env.VITE_API_URL}";
const posts = ref([]);
const utilisateur = ref({});
const afficherModale = ref(false);
const postAModifier = ref(null);

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

async function chargerProfilEtPosts() {
  try {
    const profil = await axios.get(`${API}/utilisateurs/mon-profil`, {
      headers,
    });
    utilisateur.value = profil.data.utilisateur;

    const res = await axios.get(`${API}/posts`);
    posts.value = res.data;
  } catch (err) {
    console.error("Erreur lors du chargement", err);
  }
}

async function supprimerPost(id) {
  try {
    await axios.delete(`${API}/posts/${id}`, { headers });
    await chargerProfilEtPosts();
  } catch (err) {
    console.error("Erreur suppression", err);
  }
}

function ouvrirEdition(post) {
  postAModifier.value = post;
  afficherModale.value = true;
}

function fermerModale() {
  afficherModale.value = false;
  postAModifier.value = null;
}

async function gererSoumission({ texte, image }) {
  const formData = new FormData();
  formData.append("texte", texte);
  if (image) formData.append("image", image);

  try {
    if (postAModifier.value) {
      await axios.patch(`${API}/posts/${postAModifier.value.id}`, formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post(`${API}/posts`, formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
    }

    await chargerProfilEtPosts();
    fermerModale();
  } catch (err) {
    console.error("Erreur publication", err);
  }
}

onMounted(chargerProfilEtPosts);
</script>
