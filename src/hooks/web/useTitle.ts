import { useAppStore } from '@/stores/modules/app'
import { useTitle as usePageTitle } from '@vueuse/core'
import { unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
export function useTitle() {
  const pageTitle = usePageTitle()
  const { currentRoute } = useRouter()
  const appStore = useAppStore()
  const { t } = useI18n()
  // () => currentRoute.value.path
  watch(
    [() => currentRoute.value.path, () => appStore.getLocale],
    () => {
      const route = unref(currentRoute)
      // console.log(route)
      if (route.name === 'Redirect') return // 改成常量 TODO
      const tTitle = t(route?.meta?.title)
      // 读取html plugin 设置标题 TODO
      pageTitle.value = tTitle ? `Vite Admin - ${tTitle}` : `Vite Admin`
    },
    {
      immediate: true
    }
  )
}
