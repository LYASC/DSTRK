import { createRouter, createWebHistory } from "vue-router";

// ✅ Chemins corrigés avec @ au lieu de /
import Connexion from "@/views/Connexion.vue";
import InscriptionEtape1 from "@/views/InscriptionEtape1.vue";
import InscriptionEtape2 from "@/views/InscriptionEtape2.vue";
import InscriptionEtape3 from "@/views/InscriptionEtape3.vue";
import MonCompte from "@/views/MonCompte.vue";
import Communaute from "@/views/Communaute.vue";

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
    path: "/mon-compte",
    name: "MonCompte",
    component: MonCompte,
  },
  {
    path: "/mon-espace-client",
    name: "MonEspaceClient",
    component: () => import("@/views/MonEspaceClient.vue"),
  },

  {
    path: "/communaute",
    name: "Communaute",
    component: Communaute,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
