<template>
  <div class="app-wrapper" :class="sidebarClass">
    <div class="app-mask" style="display: none"></div>
    <Sidebar />
    <div class="app-container">
      <div class="app-header">
        <Navbar />
        <!-- tabs -->
      </div>
      <el-scrollbar class="app-scrollbar">
        <AppMain />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const sidebarClass = computed(() => {
  return {
    openSidebar: appStore.getSidebarStatus,
    hideSidebar: !appStore.getSidebarStatus
  }
})
</script>
