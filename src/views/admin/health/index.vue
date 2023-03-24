<template>
  <div class="c-table-box">
    <div class="c-btn-list">
      <el-button type="primary">
        <el-icon class="el-icon--right"><i-ep-refresh /></el-icon>
        <span class="mgr_10" @click="initData">刷新</span>
      </el-button>
    </div>
    <el-table :data="tableData" row-key="ID">
      <el-table-column label="Service Name" min-width="50" prop="name" />
      <el-table-column label="Status" min-width="150" prop="status" />
      <el-table-column label="Details" min-width="60" fixed="right">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="handleView(scope.row.details)"
            v-if="scope.row.details"
          >
            <i-ep-view />
            <span>查看</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogShow"
    class="user-dialog"
    title="详情"
    :show-close="true"
    :close-on-press-escape="false"
    :close-on-click-modal="true"
  >
    <div style="overflow: auto; padding: 0 12px">
      <el-table :data="dialogTable" row-key="dialogTable">
        <el-table-column label="key" prop="key" />
        <el-table-column label="value" prop="value" />
      </el-table>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { featchHealth } from '@/api/admin/health'
import type { HealthRecord } from '@/api/admin/model/healthModel'
import { ref } from 'vue'

const tableData = ref<any>([])
const dialogTable = ref<any>([])
const dialogShow = ref(false)

const initData = async () => {
  const res = await featchHealth()
  tableData.value = flattenData(res.components)
}
initData()

const handleView = (details: any) => {
  const res: any[] = []
  Object.keys(details).forEach((key) => {
    const item = { key, value: details[key] }
    res.push(item)
  })
  dialogTable.value = res
  dialogShow.value = true
}

const flattenData = (data: HealthRecord) => {
  const response = []
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const item = { name: key, ...data[key] }
      response.push(item)
    }
  }
  return response
}
</script>
