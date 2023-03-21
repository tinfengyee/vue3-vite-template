import { defineStore } from 'pinia'
import { store } from '@/stores'
import Cache from '@/utils/cache'
import type { LocaleType } from '#/config'
import { i18n } from '@/locales'

export type appStoreType = {
  locale: LocaleType
  sidebar: {
    opened: boolean
  }
}

export const useAppStore = defineStore({
  id: 'appStore',
  state: (): appStoreType => ({
    locale: Cache.getLocale(),
    sidebar: {
      opened: false
    }
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale ?? 'zh-cn'
    },
    getSidebarStatus(): boolean {
      return this.sidebar.opened
    }
  },
  actions: {
    setLocale(locale: LocaleType) {
      this.locale = locale
      i18n.global.locale.value = locale
      Cache.setLocale(locale)
    },
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
    }
  }
})

export function useAppStoreHook() {
  return useAppStore(store)
}
