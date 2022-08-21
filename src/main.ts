import { createApp } from 'vue'
import App from './App.vue'
import { installGlobalCenter } from '@/config/install'

import "normalize.css/normalize.css"
import "./assets/fonts/iconfont.css"
import "./assets/styles/global.scss"

(async () => {

  /**
   * 初始化系统基础配置信息
   *  1. 全局变量(global-center) | 工具库(tools) | 语言包（lpk） | Ajax 的定义
   *  2. 异步加载基础模块配置信息
   *  3. 异步加载业务模块， 完成基本初始化
   */
  installGlobalCenter()

  // 初始化ui
  const app = createApp(App)

  // 注册全局组件

  // 向根组件绑定全局对象
  app.config.globalProperties.globalCenter = window.globalCenter
  app.config.globalProperties.tools = window.tools
  app.config.globalProperties.useLpk = window.useLpk

  // 初始化 状态管理 和 路由， 并渲染根组件
  app.mount('#app')
})();