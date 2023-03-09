<template>
  <div class="app-wrapper">
    <div class="app-mask" style="display: none"></div>
    <Sidebar />
    <div class="app-container">
      <div class="app-header">
        <Navbar />
        <!-- tabs -->
      </div>
      <el-scrollbar>
        <div class="app-main">
          <AppMain />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'
</script>
<style>
.box {
  height: 689px;
}
</style>
