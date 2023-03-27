<template>
  <el-dropdown trigger="click" @command="onDropChange">
    <div class="flex fvertical">
      <span>管理</span>
      <SvgIcon icon="down" class="manage-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="UserManagement">用户管理</el-dropdown-item>
        <el-dropdown-item command="Metrics">资源监控</el-dropdown-item>
        <el-dropdown-item command="Health">服务状态</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { router } from '@/router'

const onDropChange = function (command: string) {
  router.push({
    name: command
  })
}
</script>
