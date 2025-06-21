import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App); //stockes l'instance

app.use(router); //ajoutes le routeur
app.mount("#app"); //montes l'app
