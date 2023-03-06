import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { Lang } from './type'

export const loadLang = (lang?: Lang) => {
  const langModules = import.meta.glob('./lang/**/*.ts', { eager: true })
  const langDefaults = Object.fromEntries(
    Object.entries(langModules).map(([key, value]: [string, any]) => {
      const matched = key.match(/\/([\w\d-_]+)\.[tj]s/i)![1]
      return [matched, value.default]
    })
  )
  return lang ? langDefaults[lang] : langDefaults
}
console.log(loadLang())

export const localesConfigs = {
  [Lang.ZH_CN]: loadLang(Lang.ZH_CN),
  [Lang.EN]: loadLang(Lang.EN)
}

export const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: Lang.ZH_CN,
  fallbackLocale: Lang.EN,
  messages: localesConfigs
})
console.log(localesConfigs)

// config router
export function setI18n(app: App<Element>) {
  app.use(i18n)
}

/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），一般用于路由标题显示 */
export const $t = (key: string) => key
