import { defineStore } from 'pinia'
import type { UserInfo } from '#/store'
import type { Nullable } from 'vitest'
import Cache from '@/utils/cache'

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
    getUserInfo(): UserInfo {
      return this.userInfo || Cache.getUserInfo() || {}
    }
  },
  actions: {}
})
