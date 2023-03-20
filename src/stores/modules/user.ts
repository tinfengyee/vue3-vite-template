import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { UserInfo } from '#/store'
import type { Nullable } from 'vitest'
import Cache from '@/utils/cache'
import type { LoginParams } from '@/api/sys/model/userModel'
import { accountApi, loginApi } from '@/api/sys/user'
import { router } from '@/router'

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
    token: undefined,
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo
    },
    getToken(): string {
      return this.token || Cache.getToken()
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      Cache.setToken(token)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      Cache.setUserInfo(info)
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.sessionTimeout = false
    },
    async login(params: LoginParams) {
      try {
        const res = await loginApi(params)
        this.setToken(res.id_token)
        return this.getUserInfoAcion()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfoAcion() {
      if (!this.getToken) return null
      const account = (await accountApi()) as UserInfo
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
