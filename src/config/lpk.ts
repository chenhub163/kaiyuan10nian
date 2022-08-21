import { get, isArray } from 'lodash'
import tools from '@/utils/tools'
import { LOCAL_OPTIONS } from '@/utils/constants'

//@DESC: 获取环境的语言包
const STORE_LOCALE_NAME = 'locale' //@DESC: localStorage 内存储的语言包的字段名
export function getEnvLocale(): string {
  const DEFAULT_LANGUAGE = 'zh-CN' //@DESC: 默认语言包
  let lang = DEFAULT_LANGUAGE

  //@DESC: 登录用户信息 > 本地存储 > 默认
  // 1. 优先从登录用户信息中读取语言环境
  lang = get(globalCenter.getAppCtrl().getLoginUser(), 'cust.locale')

  // 2. 其次在从本地存储中读取语言环境
  lang = lang || tools.localStorage.getItem(STORE_LOCALE_NAME)
  
  // 3. 最后在使用默认的语言包
  lang = lang || DEFAULT_LANGUAGE
  
  return lang
}

//@DESC: 初始化语言包
export function initLpk() {
  mergeLpk(import.meta.glob('@/locales/*', { eager: true }))
}  

//@DESC: 合并语言包
const lpks: Record<string, string | string[]> = {}

type ILpkFiles = {
  [path: string]: {
    default: Record<string, string | string[]>
  }
}

export function mergeLpk(lpkFiles: ILpkFiles) {
  const localeLanguage = getEnvLocale();
  Object.keys(lpkFiles).forEach(path => {
    if(path.indexOf(localeLanguage) == -1) return
    
    const { default: lpkFileItem } = lpkFiles[path]
    
    for(let key in lpkFileItem) {
      lpks[key] = lpkFileItem[key]
    }
  }) 

}

//@DESC: 使用语言包
export type IFnUseLpk = (key: string, options?: { index?:number, default?: string }) => string
export const useLpk: IFnUseLpk = (key, options) => {
  const value = lpks[key]

  if(isArray(value)) {
    if(!value.length) return options?.default || key

    return value[options?.index || 0] || options?.default || key
  }

  return value || options?.default || key
}

//@DESC: 切换语言包
export function changeLpk(language: string) {
  if(!LOCAL_OPTIONS.includes(language)) return

  // 1. 如果用户登录了， 则调用api更新用户的自定义语言包
  // 2. 更新本地缓存
  tools.localStorage.setItem(STORE_LOCALE_NAME, language)
  // 3. 刷新浏览器， 防止样式产生异常
  window.location.reload()
}