<template>
  <div class="post-card">
    <p v-if="post.texte" class="post-texte">{{ post.texte }}</p>

    <img
      v-if="post.imageUrl"
      :src="`${API}${post.imageUrl}`"
      alt="Image du post"
      class="post-image"
    />

    <p class="text-xs text-gray-500 mt-2 mb-1">
      Posté par {{ post.utilisateur?.prenom ?? "Un utilisateur" }}
    </p>

    <!-- Boutons Modifier / Supprimer (si auteur) -->
    <div
      v-if="post.utilisateur?.id === utilisateurConnecte.id"
      class="post-actions"
    >
      <button @click="$emit('modifier', post)" class="bouton-action">
        🖊️ Modifier
      </button>
      <button
        @click="$emit('supprimer', post.id)"
        class="bouton-action bouton-supprimer"
      >
        ✖️ Supprimer
      </button>
    </div>

    <!-- Aperçu du 1er commentaire -->
    <div v-if="post.commentaires?.length" class="mt-3">
      <p class="text-sm text-gray-700">
        {{ tronquerTexte(post.commentaires[0].contenu) }}
      </p>
      <p class="text-xs text-gray-500 mt-1">
        {{ post.commentaires.length }} commentaire(s) —
        <RouterLink :to="`/post/${post.id}`" class="underline hover:text-black">
          Voir tous les commentaires
        </RouterLink>
      </p>
    </div>

    <!-- Bouton Commenter -->
    <RouterLink :to="`/post/${post.id}`" class="bouton-commenter">
      💬 Commenter
    </RouterLink>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const API = `${import.meta.env.VITE_API_URL}`;
const props = defineProps({
  post: Object,
  utilisateurConnecte: Object,
});

function tronquerTexte(commentaire) {
  if (!commentaire || typeof commentaire !== "string") return "";
  return commentaire.length > 100
    ? commentaire.slice(0, 100) + "..."
    : commentaire;
}
</script>

<style scoped lang="postcss">
.post-card {
  @apply border border-black rounded-xl p-5 bg-white shadow-lg;
}
.post-image {
  @apply w-full object-contain rounded-lg border border-black shadow-md mt-4 mb-3;
}
.post-texte {
  @apply text-gray-900 font-texte text-base whitespace-pre-line mb-2;
}
.post-actions {
  @apply flex gap-3 mt-4 mb-2;
}
.bouton-action {
  @apply text-sm px-3 py-1 border border-black text-black rounded hover:bg-black hover:text-white transition-all;
}
.bouton-supprimer {
  @apply border-red-500 text-red-600 hover:bg-red-600 hover:text-white;
}
.bouton-commenter {
  @apply inline-block text-sm font-medium mt-3 border border-black px-3 py-1 rounded hover:bg-black hover:text-white transition;
}
</style>
