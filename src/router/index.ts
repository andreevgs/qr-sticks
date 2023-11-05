// Composables
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/qr-sticks",
    component: () => import("@/views/Main.vue"),
    name: "main",
  },
  {
    path: "/qr-sticks/create",
    component: () => import("@/views/Create.vue"),
    name: "create",
  },
  {
    path: "/qr-sticks/stickers/:base64Data",
    component: () => import("@/views/Sticker.vue"),
    name: "sticker",
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
