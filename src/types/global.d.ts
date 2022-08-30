import { IGlobalCenter } from "@/config/global-center"
import { ITools } from "@/utils/tools"
import { IFnUseLpk } from "@/config/lpk"

declare global {
  declare namespace GlobalType {
    type IKey = string | number
    type IRecord = Record<IKey, any>
  }

  const globalCenter: IGlobalCenter
  const tools: ITools
  const useLpk: IFnUseLpk

  interface Window {
    globalCenter: IGlobalCenter
    tools: ITools
    useLpk: IFnUseLpk
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    globalCenter: IGlobalCenter
    tools: ITools
    useLpk: IFnUseLpk
  }
}


export {}
