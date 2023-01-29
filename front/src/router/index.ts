import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { store } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/join",
    name: "join",
    component: () => import("../views/JoinView.vue"),
  },
  {
    path: "/edit",
    name: "edit",
    component: () => import("../views/EditView.vue"),
    meta: {
      needsAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    const isLoggedIn = store.getters.getIsLoggedIn;
    if (isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
