<template>
  <el-row justify="center" class="card">
    <el-col :span="16">
      <h2 class="mgb_20">{{ t('views.Settings.title') }}</h2>
      <el-form label-position="top" label-width="120px" :model="userinfo">
        <el-form-item :label="t('global.user.firstName')">
          <el-input v-model="userinfo.firstName" />
        </el-form-item>
        <el-form-item :label="t('global.user.lastName')">
          <el-input v-model="userinfo.lastName" />
        </el-form-item>
        <el-form-item :label="t('global.user.email')">
          <el-input v-model="userinfo.email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirm">{{ t('views.Settings.confirmBtn') }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useUserStore } from '@/stores/modules/user'
import { updateAccount } from '@/api/sys/user'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
const userStore = useUserStore()
const user = toRaw(userStore.userInfo)
const userinfo = reactive({ ...user! })

async function handleConfirm() {
  try {
    await updateAccount(userinfo)
    await userStore.getUserInfoAcion()

    ElMessage.success(t('common.success'))
  } catch (error) {
    ElMessage.error(error as any)
  }
}
</script>

<style></style>
