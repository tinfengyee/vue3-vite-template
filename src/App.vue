<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import { localesConfigs } from '@/locales'
import { useAppStore } from '@/stores/modules/app'
import { computed } from 'vue'
import { useTitle } from '@/hooks/web/useTitle'

const appStore = useAppStore()
const locale = computed(() => localesConfigs[appStore.getLocale].el)
useTitle()
</script>
