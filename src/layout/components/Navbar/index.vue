<template>
  <div class="app-navbar">
    <div class="navbar-left">
      <RouterLink to="/"
        ><div class="logo">
          <SvgIcon icon="logo" width="30px" height="30px" />
          <span class="logo-text">LOGO</span>
        </div></RouterLink
      >
      <div class="nav-link">
        <RouterLink to="/about">About</RouterLink>
      </div>
    </div>
    <div class="navbar-right">d</div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'
// import moduleName from '@/assets/svg/i18n.svg?component'
</script>
<style scoped lang="scss">
.app-navbar {
  display: flex;
  height: 100%;
}
.navbar-left {
  flex: 1;
  display: flex;
  align-items: center;
  .logo {
    // padding: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    &-text {
      display: inline-block;
      font-weight: bold;
      margin-left: 8px;
    }
  }
  .nav-link {
    a {
      padding: 8px 10px;
    }
  }
}
</style>
