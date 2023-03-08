<template>
  <el-dropdown trigger="click" @command="onChangeLocale">
    <span
      ><el-icon size="20px"><Reading /></el-icon
    ></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh-cn">简体中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import type { LocaleType } from '#/config'
import { useAppStore } from '@/stores/modules/app'
const appStore = useAppStore()
const onChangeLocale = function (locale: LocaleType) {
  appStore.setLocale(locale)
}
</script>
