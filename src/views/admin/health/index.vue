<template>
  <div class="c-table-box">
    <div class="c-btn-list">
      <el-button type="primary">
        <el-icon class="el-icon--right"><i-ep-plus /></el-icon>
        <span class="mgr_10">新增用户</span>
      </el-button>
    </div>
    <el-table :data="tableData" row-key="ID">
      <el-table-column label="ID" min-width="50" prop="id" />
      <el-table-column label="登录" min-width="150" prop="login" />
      <el-table-column label="邮箱" min-width="150" prop="email" />
      <el-table-column label="语言" min-width="180" prop="langKey" />
      <el-table-column label="角色" min-width="180" prop="authorities" />
      <el-table-column label="创建时间" min-width="180" prop="createdDate" />
      <el-table-column label="最近修改人" min-width="180" prop="lastModifiedBy" />
      <el-table-column label="最近修改时间" min-width="180" prop="lastModifiedDate" />
      <el-table-column label="操作" min-width="220" fixed="right">
        <template #default="scope">
          <el-button type="primary" link @click="handleView(scope.row.login)">
            <i-ep-view />
            <span>查看</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogShow"
    custom-class="user-dialog"
    title="详情"
    :show-close="true"
    :close-on-press-escape="false"
    :close-on-click-modal="true"
  >
    <div style="height: 60vh; overflow: auto; padding: 0 12px">
      <!-- form -->
    </div>
    <template #footer>
      <div class="">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { featchHealth } from '@/api/admin/health'
import { router } from '@/router'
import { onMounted, ref } from 'vue'

const tableData = ref()
const dialogShow = ref(false)

const initData = async () => {
  const res = await featchHealth()
  console.log(res)
}
onMounted(() => {
  console.log(router.getRoutes())
}),
  initData()

const handleView = (row: any) => {
  console.log(row)
}
</script>
