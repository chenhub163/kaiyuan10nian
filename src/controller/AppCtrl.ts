import { LOGIN_TOKEN } from '@/utils/constants'
import mdlUserApi, { ILoginUser } from '@/api/UserApi'
import { mergeLpk,changeLpk } from '@/config/lpk'
import { changeTheme } from '@/config/theme'

let loginUser: ILoginUser = {} as ILoginUser

//@DESC: 初始化登录用户信息
export async function initLoginUserInfo() {
  if (tools.cookie.getItem(LOGIN_TOKEN)) {
    loginUser = await mdlUserApi.getUserInfoApi()
    console.log(loginUser)
  }
}

export default {
  changeTheme,
  changeLpk,
  mergeLpk,
  initLoginUserInfo,
  getLoginUser(): ILoginUser {
    return loginUser
  }
}