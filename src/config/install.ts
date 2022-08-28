/**
 * 初始化系统基础配置信息
 *  1. 全局变量(global-center) | 工具库(tools) | 语言包（lpk） | Ajax 的定义
 *  2. 异步加载基础模块配置信息
 *  3. 异步加载业务模块， 完成基本初始化
 */
import globalCenter from "./global-center"
import tools from "@/utils/tools"
import { App } from "vue"
import { useLpk, initLpk } from "@/config/lpk"
import { initLoginUserInfo } from "@/controller/AppCtrl"
import { initSystemTheme } from "./theme"

// 声明全局变量相关的类型
type IGlobalVarsKey = "globalCenter" | "tools" | "useLpk" | "ajax"
type IGlobalVars = {
  [key in IGlobalVarsKey]?: any
}

// 1. 全局变量(global-center) | 工具库(tools) | 语言包（lpk） | Ajax 的定义
const iGlobalVars: IGlobalVars = {
  globalCenter,
  tools,
  useLpk,
}

Object.keys(iGlobalVars).forEach(key => {
  ;(window as any)[key as IGlobalVarsKey] = iGlobalVars[key as IGlobalVarsKey]
})

export async function installGlobalCenter() {
  //@DESC: 初始化登录用户信息
  await initLoginUserInfo()

  //@DESC: 主题定制
  // 1. 针对不同主题书写不同的样式文件, 系统初始化时, 根据当前使用的主题到 server 端加载对应的样式文件来使用
  // 2. 通过 scss 变量与 scss 里面的函数和 mixin 来实现主题的定制
  // 3. 通过 csss 变量来实现主题的定制
  initSystemTheme()

  //@DESC: 加载基础平台语言包
  initLpk()

  //@DESC: 初始化业务模块
  const bmodEntryAll: GlobalType.IRecord = import.meta.glob("@/bmod/*/entry.ts", { eager: true })

  for (const path in bmodEntryAll) {
    const entryFile = bmodEntryAll[path]

    entryFile && entryFile.entryInit && (await entryFile.entryInit())
  }
}

// 初始化全局组件
export function installGlobalComponent(uiApp: App<Element>) {
  const globalComponentAll: GlobalType.IRecord = import.meta.glob("@/components/*/src/*.vue", {
    eager: true,
  })

  Object.keys(globalComponentAll).forEach((path: string) => {
    // path -> /src/components/Icon/src/Icon.vue
    const pathArray: string[] = path.split("/")
    const componentName: string = pathArray[pathArray.length - 3]

    uiApp.component(componentName, globalComponentAll[path].default)
  })
}
