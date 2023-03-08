<template>
  <el-container>
    <AppLocalePicker />
    <AppDarkMode />
  </el-container>
</template>

<script setup lang="ts">
import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'
import AppDarkMode from '@/components/Application/appDarkMode.vue'
</script>

<style>
.main {
  /* color: var(--main-color); */
  background: var(--theme-color);
}
</style>
