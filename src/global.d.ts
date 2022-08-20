import { IGlobalCenter } from '@/config/global-center'

declare global {
  declare namespace GlobalType {
    type IKey = string | number; 
    type IRecord = Record<IKey, any>;
  }
  const globalCenter: IGlobalCenter;

  interface Window {
    globalCenter: IGlobalCenter;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    globalCenter: IGlobalCenter;
  }
}

export {}