import { markRaw } from "vue";
import Layout from "@/layout/index.vue";
import * as vueRouter from "vue-router";
export const routes = [
  {
    path: "",
    hidden: true,
    component: markRaw(Layout),
    redirect: "/sljTable",
  },
  {
    path: "/sljTable",
    name: "组件",
    component: markRaw(Layout),
    meta: {
      title: "组件",
      fixed: false,
      caches: false,
    },
    children: [
      {
        path: "/sljTable",
        name: "表格",
        meta: {
          title: "表格",
          caches: true,
        },
        component: () => import("@/views/s-lanjing-table/index.vue"),
      },
      {
        path: "/sljSearch",
        name: "搜索栏",
        meta: {
          title: "搜索栏",
          caches: true,
        },
        component: () => import("@/views/s-lanjing-search/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404/404.vue"),
    meta: { title: "404", fixed: false, caches: false },
  },
];

// 创建路由
const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory("/components"), //子系统base
  routes,
});

// 导出路由
export default router;
