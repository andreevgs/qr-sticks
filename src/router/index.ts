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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
