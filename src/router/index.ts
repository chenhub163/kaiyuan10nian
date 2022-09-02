import { set, get } from "lodash"
import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router"
import Index from "@/views/index/Index.vue"
import { ROUTE_VIEW_KEY } from "@/UTILS/constants"

// 对于 RouteRecordRaw 类型的扩展
// 扩展的原因是因为: RouteRecordRaw 不允许我们通过 push 的方式添加路由
type RouteRecordRawExpand = RouteRecordRaw & {
  chidlren?: RouteRecordRawExpand[]
}
let routeAll: RouteRecordRawExpand[] = []

export function initRouter(): Router {
  let routes: RouteRecordRawExpand[] = [
    { path: "/", redirect: "/index" },
    {
      path: "/index",
      name: "Index",
      component: Index,
      meta: {
        key: ROUTE_VIEW_KEY.Index,
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
  ]

  //@DESC: 聚合业务模块的路由

  routes = routes.concat(globalCenter.getBmodRoutePool())
  routes.push({
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/NotFound.vue"),
  })

  routeAll = routes
  routeToRouteView()

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

// 将业务模块路由对应到相同的 <router-view> 内
function routeToRouteView() {
  function _Do(route: RouteRecordRawExpand, routes: RouteRecordRawExpand[]) {
    const routerViewKey = get(route, "meta.key")

    if (!routerViewKey || !routes.length) return

    for (let i = 0; i < routes.length; ) {
      const item = routes[i]

      // 如果 route 与 item 则停止查找
      if (route == item) {
        i++
        continue
      }

      if (routerViewKey == get(item, "meta.toKey")) {
        route.children = route.children || []
        route.children.push(item)
        routes.splice(i, 1)
      } else {
        item.children && _Do(route, item.children)
        i++
      }
    }
  }

  routeAll.forEach(route => _Do(route, routeAll))
}
