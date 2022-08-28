import { get } from "lodash"
import { THEME_OPTIONS } from "@/utils/constants"

const STORE_THEME_NAME: string = "theme" //@DESC: 本地存储内存储主题的字段名称
const defaultTheme: string = THEME_OPTIONS[0] //@DESC: 默认主题
let currentTheme: string = "" //@DESC: 当前使用的主题

//@DESC: 初始化系统主题
export function initSystemTheme() {
  changeTheme(getTheme(), false)
}

//@DESC: 切换主题
export function changeTheme(theme: string, needSave: boolean = true) {
  // 不支持的主题
  if (!THEME_OPTIONS.includes(theme)) return

  document.documentElement.setAttribute("data-theme", theme)

  if (!needSave || currentTheme == theme) return
  currentTheme = theme

  // 1. 调用api更新用户线上的自定义主题
  // 2. 将主题保存到本地存储内
  tools.localStorage.setItem(STORE_THEME_NAME, currentTheme)
}

//@DESC: 获取当前的主题
export function getTheme() {
  if (currentTheme) {
    return currentTheme
  }

  // 1. 优先使用登录用户信息内配置的主题
  const userInfo = globalCenter.getAppCtrl().getLoginUser()
  currentTheme = get(userInfo, "cust.theme")
  // 2. 其次在使用本地存储内配置主题
  currentTheme = currentTheme || tools.localStorage.getItem(STORE_THEME_NAME)

  // 3. 最后在使用默认的主题
  currentTheme = currentTheme || defaultTheme

  return currentTheme
}

export {}
