import { ILoginUser } from '@/api/UserApi'
import { changeLpk } from '@/config/lpk'

let loginUser:ILoginUser = {} as ILoginUser

export default {
  changeLpk,
  getLoginUser(): ILoginUser {
    return loginUser
  }
}