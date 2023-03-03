/**
 * @method setItem 设置缓存
 * @method getItem 获取缓存
 * @method removeItem 移除缓存
 * @method clear 移除全部缓存
 */
interface ICache {
  clear(): void
  getItem<T>(key: string): T
  removeItem(key: string): void
  setItem(key: string, value: any): void
}
/**
 * @description: window.localStorage
 */
export const Storage: ICache = {
  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  getItem<T>(key: string) {
    const json: any = window.localStorage.getItem(key)
    return JSON.parse(json) as T
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  }
}

/**
 * @description window.sessionStorage
 */
export const SessionStorage: ICache = {
  setItem(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  getItem<T>(key: string) {
    const json: any = window.sessionStorage.getItem(key)
    return JSON.parse(json) as T
  },
  removeItem(key: string) {
    window.sessionStorage.removeItem(key)
  },
  clear() {
    window.sessionStorage.clear()
  }
}
