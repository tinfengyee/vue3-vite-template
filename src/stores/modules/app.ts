import { defineStore } from 'pinia'
import { store } from '@/stores'
import Cache from '@/utils/cache'
import { Lang } from '@/locales/type'
import { i18n } from '@/locales'

export const useAppStore = defineStore({
  id: 'appStore',
  state: () => ({
    locale: Cache.getLocale()
  }),
  getters: {
    getLocale(): Lang {
      return this.locale ?? Lang.ZH_CN
    }
  },
  actions: {
    setLocale(locale: Lang) {
      this.locale = locale
      i18n.global.locale.value = locale
      Cache.setLocale(locale)
    }
  }
})

export function useAppStoreHook() {
  return useAppStore(store)
}
