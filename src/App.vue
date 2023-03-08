<template>
  <el-config-provider :locale="locale">
    <RouterView />
    <div style="width: 60px; height: 60px">
      <el-image src="3" style="width: 200px; height: 200px" />
    </div>
    <ElButton @click="onChangeLocale">ElButton--{{ ll }} --{{ appStore.locale }}</ElButton>
  </el-config-provider>
</template>

<script setup lang="ts">
import { localesConfigs } from '@/locales'
import { useAppStore } from '@/stores/modules/app'
import { computed } from 'vue'
import { Lang } from './locales/type'
import { useTitle } from '@/hooks/web/useTitle'
import { useLocale } from '@/locales/useLocale'

const { locale: ll } = useLocale()

const appStore = useAppStore()
const locale = computed(() => localesConfigs[appStore.getLocale].el)
useTitle()
const onChangeLocale = function () {
  const lang = appStore.locale === Lang.ZH_CN ? Lang.EN : Lang.ZH_CN
  appStore.setLocale(lang)
}
</script>
