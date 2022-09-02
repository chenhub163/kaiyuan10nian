export interface IBmodItem {
  name: string; // 业务模块名称
  enable: boolean; // 是否启用
}

export interface ISystemConfig {
  baseUrl: string; // 域名地址： http://192.168.0.1:8585
  bmods: IBmodItem[] // 业务模块列表
}

const systemConfig: ISystemConfig = {
  baseUrl: 'htpp://192.168.1.102:8585',
  bmods: [
    { name: 'blog', enable: false }
  ]
}

export default systemConfig