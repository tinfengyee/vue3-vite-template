<template>
  <!-- <el-button @click="toggleDark()">UseDark</el-button> -->
  <div class="icon dark-mode" @click="toggleDark()">
    <span><SvgIcon icon="icon-themelightdark" width="30px" height="30px" color="#333" /></span>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
