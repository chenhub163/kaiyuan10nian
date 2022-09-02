import mcfg from "../config/module-config"
import type { RouteRecordRaw } from "vue-router"
import { ROUTE_VIEW_KEY } from "@/utils/constants"

const path = `/${mcfg.module}`

export function initRoutes() {
  const routes: RouteRecordRaw[] = [
    {
      path: `${path}`,
      name: "BlogIndex",
      meta: {
        toKey: ROUTE_VIEW_KEY.Index,
        title: useLpk("blog.index.title"),
        auth: false,
      },
      component: () => import("../views/Index/Index.vue"),
    },
    {
      path: `${path}/article/detail/:id`,
      name: "ArticleDetail",
      meta: {
        toKey: ROUTE_VIEW_KEY.Index,
        auth: false,
      },
      component: () => import("../views/Article/Detail/ArticleDetail.vue"),
    },
    {
      path: `${path}/article/edit`,
      name: "ArticleEdit",
      meta: {
        title: useLpk("blog.article.edit.title"),
      },
      component: () => import("../views/Article/Edit/ArticleEdit.vue"),
    },
  ]

  globalCenter.registBmodRoute(routes)
}
