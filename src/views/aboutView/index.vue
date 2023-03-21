<template>
  <el-container>
    <div>
      <AppLocalePicker />
      <AppDarkMode />
    </div>
    <div>
      <h3 ref="h">API</h3>
      <el-button @click="doLogin">getDemo</el-button>
      <div class="box"></div>
      <div role="button">fff</div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { AppDarkMode, AppLocalePicker } from '@/components/Application'
import { loginApi } from '@/api/sys/user'
import type { LoginParams } from '@/api/sys/model/userModel'

import { onMounted, reactive, ref } from 'vue'

const params = reactive<LoginParams>({
  username: 'admin',
  password: 'admin',
  rememberMe: false
})

const doLogin = async () => {
  const res = await loginApi(params)
  console.log(res)
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
