import { defineStore } from 'pinia'
import { store } from '@/stores'
import Cache from '@/utils/cache'
import type { LocaleType } from '#/config'
import { i18n } from '@/locales'

export const useAppStore = defineStore({
  id: 'appStore',
  state: () => ({
    locale: Cache.getLocale()
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale ?? 'zh-cn'
    }
  },
  actions: {
    setLocale(locale: LocaleType) {
      this.locale = locale
      i18n.global.locale.value = locale
      Cache.setLocale(locale)
    }
  }
})

export function useAppStoreHook() {
  return useAppStore(store)
}
