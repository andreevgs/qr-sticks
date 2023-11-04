// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/qr-sticks",
    component: () => import("@/layouts/default/Default.vue"),
    name: "default",
    children: [
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
    ],
  },
  {
    path: "/qr-sticks/stickers",
    component: () => import("@/layouts/plain/Plain.vue"),
    name: "plain",
    children: [
      {
        path: "/qr-sticks/:base64Data",
        component: () => import("@/views/Sticker.vue"),
        name: "sticker",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
