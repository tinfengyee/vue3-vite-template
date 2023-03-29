<template>
  <div class="app-navbar">
    <div class="navbar-left">
      <Hamburger />
      <RouterLink to="/" class="logo">
        <span>LOGO</span>
      </RouterLink>
      <RouterLink to="/about" class="right-menu-item">
        <SvgIcon icon="icon-logo-google" />
      </RouterLink>
    </div>
    <div class="navbar-right">
      <LocalPicker class="right-menu-item locale-picker" />
      <Management class="right-menu-item management" />
      <User />
    </div>
  </div>
</template>
<script setup lang="ts">
import Hamburger from './components/Hamburger.vue'
import LocalPicker from '@/components/Application/src/AppLocalePicker.vue'
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
    height: 100%;
    // display: inline-flex;
    // align-items: stretch;
    line-height: var(--header-height);
    cursor: pointer;
    &:hover {
      background: var(--navbar-hover-color);
    }
    &.management {
      padding: 0 8px;
    }
    :deep(.svg-icon) {
      box-sizing: content-box;
      padding: 0 10px;
      height: var(--header-height);
      line-height: var(--header-height);
      &.manage-icon {
        padding: 0;
      }
    }
  }
}
</style>
