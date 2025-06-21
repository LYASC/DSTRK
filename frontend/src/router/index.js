import { createRouter, createWebHistory } from "vue-router";
import Accueil from "../views/Accueil.vue";
import MonCompte from "../views/MonCompte.vue";
import Connexion from "../views/Connexion.vue";
import Communaute from "../views/Communaute.vue";

const routes = [
  { path: "/", name: "Accueil", component: Accueil },
  { path: "/mon-compte", name: "MonCompte", component: MonCompte },
  { path: "/connexion", name: "Connexion", component: Connexion },
  { path: "/communaute", name: "Communaute", component: Communaute },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
