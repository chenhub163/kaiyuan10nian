import { set, get } from "lodash"
import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router"
import Index from "@/views/index/Index.vue"

// 对于 RouteRecordRaw 类型的扩展
// 扩展的原因是因为: RouteRecordRaw 不允许我们通过 push 的方式添加路由
type RouteRecordRawExpand = RouteRecordRaw & {
  redirect?: string
  chidlren?: RouteRecordRawExpand[]
}
const routeAll: RouteRecordRawExpand[] = []

export function initRouter(): Router {
  const routes: RouteRecordRawExpand[] = [
    { path: "/", redirect: "/index" },
    {
      path: "/index",
      name: "Index",
      component: Index,
      meta: {
        title: useLpk("page.index.title"),
        auth: false,
      },
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/Index/Home.vue"),
        },
        {
          path: "/my",
          name: "My",
          meta: {
            title: useLpk("page.my.title"),
          },
          component: () => import("@/views/My/My.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/login/Login.vue"),
      meta: { title: useLpk("page.login.title"), auth: false },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/login/Register.vue"),
      meta: { title: useLpk("page.register.title"), auth: false },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/error/NotFound.vue"),
    },
  ]

  const router = createRouter({
    routes,
    history: createWebHistory(),
  })

  router.afterEach(to => {
    const title = get(to.meta, "title", "")
    title && set(document, "title", title)
  })

  return router
}
