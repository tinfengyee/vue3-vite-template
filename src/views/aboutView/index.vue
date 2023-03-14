<template>
  <el-container>
    <div>
      <AppLocalePicker />
      <AppDarkMode />
    </div>
    <div>
      <h3>API</h3>
      <el-button @click="testApi">getDemo</el-button>
      <div class="box"></div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { AppDarkMode, AppLocalePicker } from '@/components/Application'
import { getDemo } from '@/api/custom'

const testApi = () => {
  getDemo('44', {
    id: 2
  }).then((res) => {
    console.log(res)
  })
}
</script>

<style scoped>
.main {
  /* color: var(--main-color); */
  background: var(--theme-color);
}
.box {
  height: 1000px;
}
</style>
