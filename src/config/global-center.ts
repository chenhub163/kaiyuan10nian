import { RouteRecordRaw } from "vue-router"
import systemConfig, { ISystemConfig, IBmodItem } from "./system-config"
import AppCtrl from "@/controller/AppCtrl"

// 业务模块路由池
// 存放所有业务模块的路由
let bmodRoutePool: RouteRecordRaw[] = []

interface IBmodRouteOper {
  registBmodRoute(route: RouteRecordRaw | RouteRecordRaw[]): void
  getBmodRoutePool(): RouteRecordRaw[]
}

const bmodRouteOper: IBmodRouteOper = {
  /**
   * 注册业务模块路由
   * @param route 路由或路由数组
   */
  registBmodRoute(route) {
    if (!route) return

    if (Array.isArray(route)) {
      bmodRoutePool = bmodRoutePool.concat(route)
      return
    }

    bmodRoutePool.push(route)
  },
  /**
   * 获取业务模块路由池
   */ 
  getBmodRoutePool() {
    return bmodRoutePool
  },
}

const globalCenter = {
  //@DESC: 结构业务模块路由相关的操作
  ...bmodRouteOper,

  // 获取系统配置
  getSystemConfig<T>(key: keyof ISystemConfig): T {
    return systemConfig[key] as unknown as T
  },
  // 判断指定的业务模块是否启用
  isBmodEnable(name: string) {
    const bmods: IBmodItem[] = this.getSystemConfig<IBmodItem[]>("bmods")

    if (bmods.find((item: IBmodItem) => item.name === name && item.enable)) {
      return true
    }

    return false
  },
  // 获取app控制器
  getAppCtrl() {
    return AppCtrl
  },
}

export type IGlobalCenter = typeof globalCenter

export default globalCenter
