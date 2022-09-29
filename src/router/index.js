import notFound from "./../views/NotFound.vue";
const routes = [
  { path: "/", component: () => import("/@/views/layout.vue") },
  { path: "/page1", component: () => import("/@/views/Page1.vue") },
  { path: "/page2", component: () => import("/@/views/Page2.vue") },
  { path: "/page3", component: () => import("/@/views/page3/index.vue") },
  { path: "/page4", component: () => import("/@/views/Page4.vue") },
  {
    path: "/404",
    name: "notFound",
    component: notFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];
export default routes;
