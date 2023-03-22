<template>
  <el-dropdown trigger="click" @command="onDropChange">
    <span>管理<SvgIcon icon="icon-down" /></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="UserManagement">用户管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'
import { router } from '@/router'

const onDropChange = function (command: string) {
  router.push({
    name: command
  })
}
</script>
