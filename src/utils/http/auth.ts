import Cache from '@/utils/cache'
import { SessionStorage } from '@/utils/storage'

// 这里可以处理 userStore 的状态

export function getToken() {
  return Cache.getToken()
}

export function setToken(token: string) {
  Cache.setToken(token)
}

export function removeToken() {
  SessionStorage.clear()
}

export const formatToken = (token: string): string => {
  return 'Bearer ' + token
}
