<template>
  <el-row justify="center" class="card">
    <el-col :span="16">
      <h2 class="mgb_20">{{ t('views.Password.title') }}</h2>
      <el-form label-position="top" label-width="120px" :model="resetPassword">
        <el-form-item :label="t('views.Password.currentPassword')">
          <el-input v-model="resetPassword.currentPassword" :placeholder="t('views.Password.placeholder.currentPassword')" show-password />
        </el-form-item>
        <el-form-item :label="t('views.Password.newPassword')">
          <el-input v-model="resetPassword.newPassword" :placeholder="t('views.Password.placeholder.newPassword')" show-password />
        </el-form-item>
        <el-form-item :label="t('views.Password.confirmPassword')">
          <el-input v-model="resetPassword.confirmPassword" :placeholder="t('views.Password.placeholder.confirmPassword')" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirm">{{ t('views.Password.confirmBtn') }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
// import { useUserStore } from '@/stores/modules/user'
import type { passwordParams } from '@/api/sys/model/userModel'
import { ElMessage } from 'element-plus'
import { changePassword } from '@/api/sys/user'

const { t } = useI18n()
// const userStore = useUserStore()

const resetPassword = reactive<passwordParams>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

async function handleConfirm() {
  try {
    await changePassword(resetPassword)
    // await userStore.getUserInfoAcion()

    ElMessage.success(t('common.success'))
  } catch (error) {
    ElMessage.error(error as any)
  }
}
</script>

<style></style>
