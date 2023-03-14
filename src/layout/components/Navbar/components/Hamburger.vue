<template>
  <div class="hamburger-box" @click="handleClick">
    <SvgIcon
      icon="icon-toggle-left"
      :size="20"
      class-name="ee"
      class="hamburger"
      :class="{ 'is-active': appStore.getSidebarStatus }"
    />
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'
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
  padding: 0 10px;
  &:hover {
    background-color: var(--navbar-hover-color);
  }
}
.hamburger {
  &.is-active {
    transform: rotate(180deg);
  }
}
</style>
