<template>
  <el-dropdown class="avatar-container" trigger="hover">
    <div class="avatar-wrapper">
      <el-avatar shape="circle" :size="30" src="/src/assets/44761321.jpg" />
      <span>Admin</span>
      <SvgIcon icon="icon-down" />
    </div>
    <template #dropdown>
      <el-dropdown-menu class="user-dropdown">
        <router-link to="/profile/password">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided> 退出 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'
</script>

<style scoped lang="scss">
.avatar-wrapper {
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 8px;
  span {
    margin-left: 6px;
  }
  :deep(.svg-icon) {
    padding: 0 !important;
    margin-left: 2px;
  }
}
</style>
