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
          <el-button type="primary" link>
            <i-ep-edit-pen />
            <span>编辑</span>
          </el-button>
          <el-button type="primary" link>
            <i-ep-close />
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="c-pagination">
      <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
  <el-dialog
    v-model="userDialogShow"
    class="user-dialog"
    title="用户"
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
import type { LoginResultModel } from '@/api/sys/model/userModel'
import { fetchUserList } from '@/api/admin/userManage'
import { ref } from 'vue'
// ID 	登录 	邮箱 		语言 	角色	创建时间 	最近修改人 	最近修改时间
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref<LoginResultModel[]>([])

// 初始化数据
const initData = async () => {
  const res = await fetchUserList()
  tableData.value = res
  total.value = res.length
}
initData()

// 分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
  initData()
}
const handleCurrentChange = (val: number) => {
  page.value = val
  initData()
}

const userDialogShow = ref(false)

// 操作
const handleView = (login: string) => {
  console.log(login)
  userDialogShow.value = true
}
</script>
