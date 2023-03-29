<template>
  <base-dialog v-model="value" :title="t('components.login.title')" width="40%">
    <el-form :model="form" label-position="top">
      <el-form-item :label="t('components.login.username')">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="t('components.login.password')">
        <el-input v-model="form.password" autocomplete="off" show-password @keyup.enter="doLogin" />
      </el-form-item>
      <el-form-item>
        <div>
          <label for="rememberMe" class="mgr_10">{{ t('components.login.rememberme') }}</label>
          <el-switch v-model="form.rememberMe" />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('update:modelValue', false)">{{ t('common.cancelText') }}</el-button>
        <el-button type="primary" @click="doLogin"> {{ t('components.login.okText') }} </el-button>
      </span>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { LoginParams } from '@/api/sys/model/userModel'
import { useUserStore } from '@/stores/modules/user'
import { useI18n } from '@/hooks/web/useI18n'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
const userStore = useUserStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const form = reactive<LoginParams>({
  username: 'admin',
  password: 'admin',
  rememberMe: true
})

const doLogin = async () => {
  try {
    const userInfo = await userStore.login(form)
    if (userInfo) {
      emit('update:modelValue', false)
    }
  } catch (error: any) {
    ElMessage({
      type: 'warning',
      message: error.response.data.detail
    })
  }
}
</script>
