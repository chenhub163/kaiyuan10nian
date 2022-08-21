export interface ILoginUser {
  id: string | number;
  name: string;
  phone: string;
}

export default {
  getUserInfoApi(): Promise<ILoginUser> {
    return Promise.resolve({
      id: 1,
      name: '张三',
      phone: '1599886655'
    })
  }
}