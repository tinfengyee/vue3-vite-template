<template>
  <el-row justify="center" class="card">
    <el-col :span="16">
      <h2 class="mgb_20">{{ t('views.Password.title') }}</h2>
      <el-form ref="formEl" :rules="rules" label-position="top" label-width="120px" :model="resetPassword">
        <el-form-item :label="t('views.Password.currentPassword')" prop="currentPassword">
          <el-input v-model="resetPassword.currentPassword" :placeholder="t('views.Password.placeholder.currentPassword')" show-password />
        </el-form-item>
        <el-form-item :label="t('views.Password.newPassword')" prop="newPassword">
          <el-input v-model="resetPassword.newPassword" :placeholder="t('views.Password.placeholder.newPassword')" show-password />
        </el-form-item>
        <el-form-item :label="t('views.Password.confirmPassword')" prop="confirmPassword">
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
import { reactive, ref } from 'vue'
import { useI18n } from '@/hooks/useI18n'
// import { useUserStore } from '@/stores/modules/user'
import type { passwordParams } from '@/api/sys/model/userModel'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { changePassword } from '@/api/sys/user'

const { t } = useI18n()
// const userStore = useUserStore()
const formEl = ref<FormInstance>()

const resetPassword = reactive<passwordParams>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 校验
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (resetPassword.confirmPassword !== '') {
      if (!formEl.value) return
      formEl.value.validateField('confirmPassword', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== resetPassword.newPassword) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  currentPassword: [
    {
      required: true,
      message: 'Please Input currentPassword'
    }
  ],
  newPassword: [
    { validator: validatePass, trigger: 'blur' },
    {
      required: true,
      message: 'Please Input password'
    }
  ],
  confirmPassword: [
    { validator: validatePass2, trigger: 'blur' },
    {
      required: true,
      message: 'Please Input confirmPassword'
    }
  ]
})

function handleConfirm() {
  try {
    formEl.value?.validate(async (valid) => {
      if (valid) {
        await changePassword(resetPassword)
        // await userStore.getUserInfoAcion()
      }
    })

    ElMessage.success(t('common.success'))
  } catch (error) {
    ElMessage.error(error as any)
  }
}
</script>

<style></style>
