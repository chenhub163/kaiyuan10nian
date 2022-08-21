import AppCtrl from '@/controller/AppCtrl'
import systemConfig, { ISystemConfig, IBmodItem } from './system-config'

const globalCenter = {
  // 获取系统配置
  getSystemConfig<T>(key: keyof ISystemConfig): T {
    return systemConfig[key] as unknown as T
  },
  // 判断指定的业务模块是否启用
  isBmodEnable(name: string) {
    const bmods: IBmodItem[] = this.getSystemConfig<IBmodItem[]>('bmods');

    if (bmods.find((item: IBmodItem) => item.name === name && item.enable)) {
      return true
    }

    return false
  },
  // 获取app控制器
  getAppCtrl() {
    return AppCtrl
  }
}

export type IGlobalCenter = typeof globalCenter;

export default globalCenter