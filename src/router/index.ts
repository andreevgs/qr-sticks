// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Main.vue"),
    name: "main",
  },
  {
    path: "/create",
    component: () => import("@/views/Create.vue"),
    name: "create",
  },
  {
    path: "/stickers/:base64Data",
    component: () => import("@/views/Sticker.vue"),
    name: "sticker",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
