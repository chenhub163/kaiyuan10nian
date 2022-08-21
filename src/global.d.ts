import { IGlobalCenter } from '@/config/global-center'
import { ITools } from '@/utils/tools'

declare global {
  declare namespace GlobalType {
    type IKey = string | number; 
    type IRecord = Record<IKey, any>;
  }
  const globalCenter: IGlobalCenter;

  interface Window {
    globalCenter: IGlobalCenter;
    tools: ITools;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    globalCenter: IGlobalCenter;
    tools: ITools;
  }
}

export {}