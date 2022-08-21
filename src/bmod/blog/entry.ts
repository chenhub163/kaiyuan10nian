import moduleConfig from './config/module-config'
const ModuleName = moduleConfig.module

export async  function entryInit() {
  // 检测该模块是否启用
  if(!globalCenter.isBmodEnable(ModuleName)) return;

  // 初始化当前模块的语言包
  globalCenter.getAppCtrl().mergeLpk(import.meta.glob('./locales/*', { eager: true }))

  // 初始化当前模块的配置信息

  // 初始化当前模块的状态管理信息

  // 初始化当前模块的路由信息
}

export default {}