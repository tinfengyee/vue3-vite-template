<template>
  <el-dropdown trigger="click" @command="onDropChange">
    <div class="flex fvertical">
      <span>{{ t('routes.admin.admin') }}</span>
      <SvgIcon icon="down" class="manage-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="UserManagement" v-if="isAdmin">{{ t('routes.admin.user') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { useI18n } from '@/hooks/useI18n'
import { useUserStore } from '@/stores/modules/user'
import { computed } from 'vue'
const userStore = useUserStore()

const isAdmin = computed(() => userStore?.userInfo?.authorities.includes('ROLE_ADMIN'))

const { t } = useI18n()

const onDropChange = function (command: string) {
  router.push({
    name: command
  })
}
</script>
