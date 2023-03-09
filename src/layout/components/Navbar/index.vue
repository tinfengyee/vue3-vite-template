<template>
  <div class="app-navbar">
    <div class="navbar-left">
      <SvgIcon icon="i18n" color="red" width="20px" height="20px" />
      <div>logo</div>
    </div>
    <div class="navbar-right">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'
// import moduleName from '@/assets/svg/i18n.svg?component'
</script>
<style scoped lang="scss">
.app-navbar {
  display: flex;
}
.navbar-left {
  flex: 1;
  // display: flex;
}
</style>
