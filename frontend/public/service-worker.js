self.addEventListener("install", (_event) => {
  console.log("Service Worker installé.");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activé.");
});
