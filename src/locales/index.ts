import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import type { LocaleType } from '#/config'
import { useAppStoreHook } from '@/stores/modules/app'
// element-plus国际化
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

export const loadLang = (lang?: LocaleType) => {
  const langModules = import.meta.glob('./lang/**/*.ts', { eager: true })

  const langDefaults = Object.fromEntries(
    Object.entries(langModules).map(([key, value]: [string, any]) => {
      const matched = key.match(/\/([\w\d-_]+)\.[tj]s/i)![1]

      return [matched, value.default]
    })
  )
  return lang ? langDefaults[lang] : langDefaults
}
export const localesConfigs: Record<LocaleType, any> = {
  'zh-cn': { ...loadLang('zh-cn'), el: { ...zhLocale } },
  en: { ...loadLang('en'), el: { ...enLocale } }
}

export const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: useAppStoreHook().getLocale,
  fallbackLocale: 'zh-cn',
  messages: localesConfigs
})
// config router
export function setupI18n(app: App<Element>) {
  app.use(i18n)
}

/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除 */
export const $t = (key: string) => key
