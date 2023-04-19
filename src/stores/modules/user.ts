import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { UserInfo } from '#/store'
import type { Nullable } from 'vitest'
import Cache from '@/utils/cache'
import type { LoginParams } from '@/api/sys/model/userModel'
import { accountApi, loginApi } from '@/api/sys/user'
import { router } from '@/router'
import { isEmpty } from '@/utils/is'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  sessionTimeout?: boolean
  lastUpdateTime?: number
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: (): UserState => ({
    userInfo: null,
    token: Cache.getToken(),
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      Cache.setToken(token)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      // Cache.setUserInfo(info)
    },
    resetState() {
      this.setToken('')
      this.setUserInfo(null)
      this.sessionTimeout = false
      this.lastUpdateTime = 0
    },
    async login(params: LoginParams) {
      try {
        const res = await loginApi(params)
        if (!isEmpty(res.data)) {
          this.setToken(res.data.id_token)
          return this.getUserInfoAcion()
        }
        return Promise.reject('请检查账户信息')
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfoAcion() {
      if (!this.token) return null
      const account = (await accountApi()).data as UserInfo
      this.setUserInfo(account)
      return account
    },
    logout() {
      this.setToken('')
      this.setUserInfo(null)
      router.replace('/')
    }
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
