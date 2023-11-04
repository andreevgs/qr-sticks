// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    name: "default",
    children: [
      {
        path: "",
        component: () => import("@/views/Main.vue"),
        name: "main",
      },
      {
        path: "create",
        component: () => import("@/views/Create.vue"),
        name: "create",
      },
    ],
  },
  {
    path: "/stickers",
    component: () => import("@/layouts/plain/Plain.vue"),
    name: "plain",
    children: [
      {
        path: ":base64Data",
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
