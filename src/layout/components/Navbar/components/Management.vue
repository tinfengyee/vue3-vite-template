<template>
  <el-dropdown trigger="click" @command="onDropChange">
    <div class="flex fvertical">
      <span>{{ t('routes.admin.admin') }}</span>
      <SvgIcon icon="down" class="manage-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="UserManagement">{{ t('routes.admin.user') }}</el-dropdown-item>
        <el-dropdown-item command="Swagger">{{ t('routes.admin.swagger') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const onDropChange = function (command: string) {
  router.push({
    name: command
  })
}
</script>
