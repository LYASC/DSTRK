import { createRouter, createWebHistory } from "vue-router";

import Connexion from "@/views/Connexion.vue";
import InscriptionEtape1 from "@/views/InscriptionEtape1.vue";
import InscriptionEtape2 from "@/views/InscriptionEtape2.vue";
import InscriptionEtape3 from "@/views/InscriptionEtape3.vue";
import MonProfile from "@/views/MonProfile.vue";
const routes = [
  {
    path: "/",
    redirect: "/connexion",
  },
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/inscription",
    name: "InscriptionEtape1",
    component: InscriptionEtape1,
  },
  {
    path: "/inscription/etape2",
    name: "InscriptionEtape2",
    component: InscriptionEtape2,
  },
  {
    path: "/inscription/etape3",
    name: "InscriptionEtape3",
    component: InscriptionEtape3,
  },
  {
    path: "/mon-profile",
    name: "MonProfile",
    component: MonProfile,
  },
  {
    path: "/mon-espace-client",
    name: "MonEspaceClient",
    component: () => import("@/views/MonEspaceClient.vue"),
  },
  {
    path: "/communaute",
    name: "Communaute",
    component: () => import("@/views/Communaute.vue"),
  },
  {
    path: "/commandes",
    name: "Commandes",
    component: () => import("@/views/Commandes.vue"), // Crée ce fichier si besoin
  },
  {
    path: "/collection",
    name: "Collection",
    component: () => import("@/views/Collection.vue"), // Crée ce fichier si besoin
  },

  {
    path: "/post/:id",
    name: "CommentairesPost",
    component: () => import("@/views/CommentairesPost.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
