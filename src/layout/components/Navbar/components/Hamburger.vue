<template>
  <div class="hamburger-box" @click="handleClick">
    <el-icon :size="20" class="hamburger" :class="{ 'is-active': appStore.getSidebarStatus }">
      <i-ep-fold />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const handleClick = () => {
  appStore.toggleSidebar()
}
</script>
<style scoped lang="scss">
.hamburger-box {
  height: 100%;
  line-height: var(--header-height);
  font-size: 20px;
  padding: 0 10px;
  &:hover {
    background-color: var(--navbar-hover-color);
  }
}
.hamburger {
  height: 100%;
  &.is-active {
    transform: rotate(180deg);
  }
}
</style>
