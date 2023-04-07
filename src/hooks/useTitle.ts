import { useAppStore } from '@/stores/modules/app'
import { useTitle as usePageTitle } from '@vueuse/core'
import { unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '@/hooks/useI18n'
export function useTitle() {
  const pageTitle = usePageTitle()
  const { currentRoute } = useRouter()
  const appStore = useAppStore()
  const { t } = useI18n()

  watch(
    [() => currentRoute.value.path, () => appStore.getLocale],
    () => {
      const route = unref(currentRoute)
      // console.log(route)
      if (route.name === 'Redirect') return // 改成常量 TODO
      // 读取html plugin 设置标题 TODO
      const tTitle = t(currentRoute?.value?.meta?.title)
      pageTitle.value = tTitle ? `Admin - ${tTitle}` : `Admin`
    },
    {
      immediate: true
    }
  )
}
