<template>
  <div class="c-table-box">
    <div class="c-btn-list">
      <el-button icon="plus" type="primary">新增用户</el-button>
      <el-icon :size="20"> <Edit />ee </el-icon>
      <!-- <span class="iconify" data-icon="ep:plus" data-inline="false"></span> -->
      <ep:plus></ep:plus>
      <ep:plus style="font-size: 2em; color: red" />
      <i-ep-add-location />
      <i-ep-arrow-left />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
