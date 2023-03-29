<template>
  <div class="c-table-box">
    <div class="c-btn-list">
      <el-button type="primary" @click="refresh">
        <el-icon class="el-icon--right"><i-ep-refresh /></el-icon>
        <span class="mgr_10">刷新</span>
      </el-button>
      <el-button type="primary" @click="handleAdd">
        <el-icon class="el-icon--right"><i-ep-plus /></el-icon>
        <span class="mgr_10">新增用户 </span>
      </el-button>
    </div>
    <el-table :data="tableData" row-key="ID" size="default" v-loading="loading">
      <el-table-column label="ID" min-width="50" prop="id" />
      <el-table-column label="登录" min-width="100" prop="login" />
      <el-table-column label="邮箱" min-width="150" prop="email" />
      <el-table-column label="语言" min-width="80" prop="langKey" />
      <el-table-column label="角色" min-width="160" prop="authorities">
        <template #default="{ row }">
          <el-tag v-for="auth in row.authorities" :key="auth" type="info" style="margin-top: 2px">
            {{ auth }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="180" prop="createdDate" />
      <el-table-column label="最近修改人" min-width="100" prop="lastModifiedBy" />
      <el-table-column label="最近修改时间" min-width="180" prop="lastModifiedDate" />
      <el-table-column label="操作" min-width="220" fixed="right">
        <template #default="scope">
          <el-button type="primary" link @click="handleView(scope.row.login)">
            <i-ep-view />
            <span>查看</span>
          </el-button>
          <el-button type="primary" link @click="handleEdit(scope.row.login)">
            <i-ep-edit-pen />
            <span>编辑</span>
          </el-button>

          <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.login)">
            <template #reference>
              <el-button type="primary" link>
                <i-ep-close />
                <span>删除</span>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="c-pagination">
      <el-pagination
        :current-page="pageInfo.page"
        :page-size="pageInfo.size"
        :page-sizes="[10, 30, 50, 100]"
        :total="pageInfo.total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
  <el-dialog
    v-model="userDialogShow"
    class="user-dialog"
    style="width: 38%"
    title="用户"
    :show-close="true"
    :close-on-press-escape="false"
    :close-on-click-modal="true"
  >
    <div style="overflow: auto">
      <el-form ref="userForm" :model="userInfo" label-width="70px" v-loading="dialogLoading">
        <el-form-item label="ID" prop="id" v-show="dialogType === 'view'">
          <span>{{ userInfo.id }}</span>
        </el-form-item>
        <el-form-item label="登录" prop="login">
          <el-input v-model="userInfo.login" v-if="dialogType !== 'view'" />
          <span v-else
            >{{ userInfo.login }}
            <i
              ><el-tag type="success" v-if="userInfo.activated">已激活</el-tag>
              <el-tag type="danger" v-else>已失效</el-tag>
            </i>
          </span>
        </el-form-item>
        <el-form-item label="名字" prop="firstName">
          <el-input v-model="userInfo.firstName" v-if="dialogType !== 'view'" />
          <span v-else>{{ userInfo.firstName }}</span>
        </el-form-item>
        <el-form-item label="姓氏" prop="lastName">
          <el-input v-model="userInfo.lastName" v-if="dialogType !== 'view'" />
          <span v-else>{{ userInfo.lastName }}</span>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" v-if="dialogType !== 'view'" />
          <span v-else>{{ userInfo.email }}</span>
        </el-form-item>
        <el-form-item label="已激活" prop="activated" v-show="dialogType !== 'view'">
          <el-checkbox v-model="userInfo.activated" />
        </el-form-item>
        <el-form-item label="语言" prop="langKey">
          <el-select v-model="userInfo.langKey" placeholder="Select" v-if="dialogType !== 'view'">
            <el-option v-for="item in langKeyOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <span v-else>{{ userInfo.langKey }}</span>
        </el-form-item>
        <el-form-item label="角色" prop="authorities">
          <el-select v-model="userInfo.authorities" placeholder="Select" multiple v-if="dialogType !== 'view'">
            <el-option v-for="item in authorityOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <template v-else>
            <el-tag v-for="auth in userInfo.authorities" :key="auth" type="info" style="margin-left: 4px">
              {{ auth }}
            </el-tag>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="">
        <el-button @click="userDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="handleComfirm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import type { AccountResultModel } from '@/api/sys/model/userModel'
import { fetchUserList, addUserApi, fetchAuthorities, fetchUserInfo, deleteUserApi, updateUserApi } from '@/api/admin/userManage'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
// const tableData = ref<AccountResultModel[]>([])

// 分页
const pageInfo = reactive({
  page: 1,
  total: 0,
  size: 10
})
// table data
const tableData = ref<AccountResultModel[]>()
const loading = ref(true)

// 加载数据
const initData = async () => {
  const userListRes = await fetchUserList({
    page: pageInfo.page - 1,
    size: pageInfo.size
  })
  const authoritiesRes = await fetchAuthorities()
  tableData.value = userListRes.data
  authorityOptions.value = authoritiesRes
  pageInfo.total = Number(userListRes.headers['x-total-count'])
  loading.value = false
}
onMounted(initData)

const refresh = () => {
  loading.value = true
  pageInfo.page = 1
  initData()
}
// 分页
const handleSizeChange = (val: number) => {
  pageInfo.size = val
  initData()
}
const handleCurrentChange = (val: number) => {
  pageInfo.page = val
  initData()
}

// 弹窗
const userDialogShow = ref(false)
const dialogLoading = ref(false)
type dialogOpenType = 'add' | 'view' | 'edit'
const dialogType = ref<dialogOpenType>()
const authorityOptions = ref<string[]>([])

const userForm = ref<FormInstance>()
// Partial<AccountResultModel>
const initalUser = () => ({
  id: null,
  activated: true,
  authorities: [],
  createdBy: '',
  email: '',
  firstName: '',
  imageUrl: '',
  langKey: 'zh-cn',
  lastModifiedBy: '',
  lastModifiedDate: null,
  lastName: '',
  login: ''
})
const userInfo = reactive(initalUser())

const langKeyOptions = [
  {
    value: 'zh-cn',
    label: 'zh-cn'
  }
]

const resetForm = () => {
  userForm.value?.resetFields()
  Object.assign(userInfo, initalUser())
}

const openDialog = (type: dialogOpenType) => {
  dialogType.value = type
  if (dialogType.value === 'add') {
    resetForm()
  }
  userDialogShow.value = true
}

const handleComfirm = async () => {
  console.log(userInfo)

  if (dialogType.value === 'add') {
    await addUserApi(userInfo)
    initData()
  }
  if (dialogType.value === 'edit') {
    await updateUserApi(userInfo)
    initData()
  }
  ElMessage.success('操作成功')
  userDialogShow.value = false
}

const handleAdd = () => {
  openDialog('add')
}

const handleEdit = async (login: string) => {
  dialogLoading.value = true
  openDialog('edit')
  const res = await fetchUserInfo(login)
  Object.assign(userInfo, res)
  dialogLoading.value = false
}

const handleView = async (login: string) => {
  dialogLoading.value = true
  openDialog('view')
  const res = await fetchUserInfo(login)
  Object.assign(userInfo, res)
  dialogLoading.value = false
}

const handleDelete = async (login: string) => {
  await deleteUserApi(login)
  ElMessage.success('操作成功')
  refresh()
}

// const p = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(1)
//     }, 2000)
//   })
// }
</script>
