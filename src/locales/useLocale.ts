import { useAppStoreHook } from '@/stores/modules/app'
import { computed } from 'vue'

export function useLocale() {
  const appStore = useAppStoreHook()
  const locale = computed(() => appStore.locale)
  const getLocale = computed(() => appStore.getLocale)
  return { getLocale, locale }
}
