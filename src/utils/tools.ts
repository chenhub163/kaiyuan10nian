import cookies from 'js-cookie'

const tools = {
  router: { //@DESC: 路由操作

  },
  store: { //@DESC: 状态管理操作

  },
  localStorage: { //@DESC: 本地存储操作
    setItem(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    getItem(key: string) {
      const item = localStorage.getItem(key)

      try {
        return JSON.parse(item as string)
      } catch (error) {
        return item
      }
    },
    removeItem(key: string) {
      localStorage.removeItem(key)
    }
  },
  cookie: { //@DESC: cookie操作
    setItem(key: string, value: any) {
      cookies.set(key, JSON.stringify(value), { expires: 30 })
    },
    getItem(key: string, defaultValue?: any) {
      const item = cookies.get(key) || defaultValue

      try {
        return JSON.parse(item)
      } catch (error) {
        return item;
      }
    },
    removeItem(key: string) {
      cookies.remove(key)
    }
  },
  date: { //@DESC: 日期操作

  },
  dom: { //@DESC: DOM操作

  }
}

export type ITools = typeof tools

export default tools