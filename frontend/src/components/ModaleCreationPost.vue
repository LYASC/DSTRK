<template>
  <div
    class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
    @click.self="fermer"
  >
    <div
      class="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-[92%] max-w-xl font-texte relative"
    >
      <button
        @click="fermer"
        class="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
      >
        ×
      </button>

      <h2 class="font-titre text-xl font-semibold uppercase text-center mb-4">
        Créer un post
      </h2>

      <form @submit.prevent="soumettre" class="space-y-4">
        <textarea
          v-model="postTexteLocal"
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["fermer", "soumettre"]);
const props = defineProps({
  enEdition: Boolean,
  postTexte: String,
});

const postTexteLocal = ref(props.postTexte || "");
const fichierImage = ref(null);
const inputFichier = ref(null);

function chargerImage(e) {
  fichierImage.value = e.target.files[0];
}

function soumettre() {
  emit("soumettre", { texte: postTexteLocal.value, image: fichierImage.value });
  postTexteLocal.value = "";
  inputFichier.value.value = "";
  fichierImage.value = null;
}

function fermer() {
  emit("fermer");
}
</script>

<style scoped lang="postcss">
.champ {
  @apply w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black;
}
.btn-noir {
  @apply bg-black text-white py-2 rounded-md hover:bg-gray-900;
}
</style>
