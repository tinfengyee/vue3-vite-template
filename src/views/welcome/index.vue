<template>
  <div>
    <h1>Welcome</h1>
    <svg-icon size="20" icon="iconicon-test" />
    <SvgIcon icon="test-left" color="pink" size="20" />
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Welcome'
})
</script> -->
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const show1 = ref(false)
</script>
