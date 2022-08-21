/**
 * 初始化系统基础配置信息
 *  1. 全局变量(global-center) | 工具库(tools) | 语言包（lpk） | Ajax 的定义
 *  2. 异步加载基础模块配置信息
 *  3. 异步加载业务模块， 完成基本初始化
 */
import globalCenter from './global-center'
import tools from '@/utils/tools'
import { useLpk, initLpk } from '@/config/lpk'

// 声明全局变量相关的类型
type IGlobalVarsKey = 'globalCenter' | 'tools' | 'useLpk' |  'ajax'
type IGlobalVars = {
  [key in IGlobalVarsKey]?: any
}

// 1. 全局变量(global-center) | 工具库(tools) | 语言包（lpk） | Ajax 的定义
const iGlobalVars: IGlobalVars = {
  globalCenter,
  tools,
  useLpk
}

Object.keys(iGlobalVars).forEach(key => {
  (window as any)[key as IGlobalVarsKey] = iGlobalVars[key as IGlobalVarsKey]
})

export async function installGlobalCenter() {
  initLpk()
}