<template>
  <el-container>
    <AppLocalePicker />
    <AppDarkMode />
  </el-container>
</template>

<script setup lang="ts">
import { AppDarkMode, AppLocalePicker } from '@/components/Application'
</script>

<style scoped>
.main {
  /* color: var(--main-color); */
  background: var(--theme-color);
}
</style>
