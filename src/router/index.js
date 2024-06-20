import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PostsView from "@/views/PostsView.vue";
import AboutView from "@/views/AboutView.vue";
import PostView from "@/views/PostView.vue";
import PostsWithStoreView from "@/views/PostsWithStoreView.vue";
import PostsWithCompositionView from "@/views/PostsWithCompositionView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/posts",
    name: "posts",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PostsView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/posts/:id",
    name: "post",
    component: PostView,
  },
  {
    path: "/store",
    name: "store",
    component: PostsWithStoreView,
  },
  {
    path: "/composition",
    name: "composition",
    component: PostsWithCompositionView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
