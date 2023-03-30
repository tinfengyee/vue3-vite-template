<template>
  <el-row justify="center" class="card">
    <el-col :span="16">
      <h2 class="mgb_20">{{ t('views.Register.title') }}</h2>
      <el-form label-position="top" label-width="120px" :model="regiserInfo.registerAccount">
        <el-form-item :label="t('global.user.login')">
          <el-input v-model="regiserInfo.registerAccount.login" :placeholder="t('global.user.login_placeholder')" />
        </el-form-item>
        <el-form-item :label="t('global.user.email')">
          <el-input v-model="regiserInfo.registerAccount.email" :placeholder="t('global.user.email_placeholder')" />
        </el-form-item>
        <el-form-item :label="t('global.user.password')">
          <el-input v-model="regiserInfo.registerAccount.password" :placeholder="t('global.user.password_placeholder')" show-password />
        </el-form-item>
        <el-form-item :label="t('global.user.confirmPassword')">
          <el-input v-model="regiserInfo.confirmPassword" :placeholder="t('global.user.confirmPassword_placeholder')" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirm">{{ t('views.Register.confirmBtn') }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ElMessage } from 'element-plus'
import { registerAccount } from '@/api/sys/user'

const { t } = useI18n()
const regiserInfo = reactive({
  registerAccount: {
    login: undefined,
    email: undefined,
    password: undefined
  },
  confirmPassword: undefined
})

const handleConfirm = async () => {
  try {
    await registerAccount(regiserInfo.registerAccount)
    ElMessage.success(t('views.Register.message.success'))
  } catch (error) {
    ElMessage.error(error as any)
  }
}
</script>

<style></style>
