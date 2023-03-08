<template>
  <el-container>
    <AppLocalePicker />
  </el-container>
</template>

<script setup lang="ts">
// import { useI18n } from 'vue-i18n'
import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'
</script>

<style>
.main {
  /* color: var(--main-color); */
  background: var(--theme-color);
}
</style>
