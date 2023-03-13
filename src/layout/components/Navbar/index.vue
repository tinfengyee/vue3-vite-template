<template>
  <div class="app-navbar">
    <div class="navbar-left">
      <RouterLink to="/" class="logo">
        <SvgIcon icon="logo-jhipster" width="50px" height="50px" />
        <span>LOGO</span>
      </RouterLink>
    </div>
    <div class="navbar-right">
      <LocalPicker />
      <DarkMode />
      <RouterLink to="/about">
        <SvgIcon icon="icon-logo-google" />
      </RouterLink>
      <User />
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'
import LocalPicker from '@/components/Application/src/AppLocalePicker.vue'
import DarkMode from '@/components/Application/src/AppDarkMode.vue'
import User from './components/User.vue'
// import moduleName from '@/assets/svg/i18n.svg?component'
</script>
<style scoped lang="scss">
.app-navbar {
  display: flex;
  height: var(--navbar-height);
}
.navbar-left {
  flex: 1;
  display: flex;
  align-items: center;
  .logo {
    // padding: 10px;
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    padding: 8px;
    span {
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
.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: var(--navbar-height);
  :deep(.svg-icon) {
    font-size: 16px;
    height: var(--navbar-height);
    line-height: var(--navbar-height);
    cursor: pointer;
    padding: 0 12px;
    &:hover {
      background-color: var(--navbar-hover-color);
    }
  }
}
</style>
