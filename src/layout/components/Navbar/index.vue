<template>
  <div class="app-navbar">
    <div class="navbar-left">
      <Hamburger />
      <RouterLink to="/" class="logo">
        <SvgIcon icon="logo-jhipster" :size="50" />
        <span>LOGO</span>
      </RouterLink>
      <RouterLink to="/about" class="right-menu-item">
        <SvgIcon icon="icon-logo-google" />
      </RouterLink>
    </div>
    <div class="navbar-right">
      <LocalPicker class="right-menu-item locale-picker" />
      <DarkMode class="right-menu-item" />
      <Management class="right-menu-item" />
      <User />
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'
import Hamburger from './components/Hamburger.vue'
import LocalPicker from '@/components/Application/src/AppLocalePicker.vue'
import DarkMode from '@/components/Application/src/AppDarkMode.vue'
import User from './components/User.vue'
import Management from './components/Management.vue'
</script>
<style scoped lang="scss">
.app-navbar {
  display: flex;
  height: var(--header-height);
}
.navbar-left {
  flex: 1;
  display: flex;
  align-items: center;
  .logo {
    // padding: 10px;
    height: var(--header-height);
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
  height: var(--header-height);
  line-height: var(--header-height);
  .right-menu-item {
    // display: flex;
    // align-items: center;
    height: 100%;
    // vertical-align: center;
    line-height: var(--header-height);
    // font-size: 20px;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: var(--navbar-hover-color);
    }
  }
}
</style>
