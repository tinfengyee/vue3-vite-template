<template>
  <el-container class="layout-container">
    <div></div>
    <div>
      <nav>nav</nav>
      <main>
        <RouterView />
      </main>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style></style>
