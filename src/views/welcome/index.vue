<template>
  <div>
    <h1>Welcome Page</h1>
    <el-button type="danger" @click="show = true">关闭嵌套 Dialog</el-button>
    <base-dialog title="第1个 dialog" v-model="show" :appendToBody="true">
      <div @click="show1 = true">default</div>
      <div></div>
      <template #footer>
        <el-button type="danger" @click="show = false">关闭嵌套 Dialog</el-button>
      </template>
    </base-dialog>
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
