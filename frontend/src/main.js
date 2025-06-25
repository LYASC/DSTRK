import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// Ajout pour PWA
import { registerSW } from "virtual:pwa-register";

// Enregistrement du Service Worker avec retour console (optionnel)
registerSW({
  onNeedRefresh() {
    console.log("Une nouvelle version est disponible !");
  },
  onOfflineReady() {
    console.log(" L'application est prête à fonctionner hors ligne.");
  },
});

const app = createApp(App);
app.use(router);
app.mount("#app");
