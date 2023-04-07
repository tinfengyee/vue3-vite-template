<template>
  <el-row justify="center" class="card">
    <el-col :span="16">
      <h2 class="mgb_20">{{ t('views.Register.title') }}</h2>
      <el-form ref="formEl" :model="regiserInfo" label-position="top" label-width="120px" :rules="rules">
        <el-form-item :label="t('global.user.login')" prop="registerAccount.login">
          <el-input v-model="regiserInfo.registerAccount.login" :placeholder="t('global.user.login_placeholder')" />
        </el-form-item>
        <el-form-item :label="t('global.user.email')" prop="registerAccount.email">
          <el-input v-model="regiserInfo.registerAccount.email" :placeholder="t('global.user.email_placeholder')" />
        </el-form-item>
        <el-form-item :label="t('global.user.password')" prop="registerAccount.password">
          <el-input v-model="regiserInfo.registerAccount.password" :placeholder="t('global.user.password_placeholder')" show-password />
        </el-form-item>
        <el-form-item :label="t('global.user.confirmPassword')" prop="confirmPassword">
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
import { reactive, ref } from 'vue'
import { useI18n } from '@/hooks/useI18n'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { registerAccount } from '@/api/sys/user'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const formEl = ref<FormInstance>()

// 表单
const regiserInfo = reactive({
  registerAccount: {
    login: undefined,
    email: undefined,
    password: undefined
  },
  confirmPassword: undefined
})

// 校验
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (regiserInfo.confirmPassword !== '') {
      if (!formEl.value) return
      formEl.value.validateField('confirmPassword', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== regiserInfo.registerAccount.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  'registerAccount.login': [
    {
      required: true,
      message: 'Please Input Login'
    }
  ],
  'registerAccount.email': [
    {
      required: true,
      message: 'Please Input Email'
    },
    {
      min: 5,
      message: 'Please Input email format',
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    }
  ],
  'registerAccount.password': [
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

// 操作
const handleConfirm = async () => {
  try {
    formEl.value?.validate(async (valid) => {
      if (valid) {
        await registerAccount(regiserInfo.registerAccount)
        ElMessage.success(t('views.Register.message.success'))
        router.replace('/')
      } else {
        return false
      }
    })
  } catch (error) {
    // ElMessage.error(error as any)
  }
}
</script>
