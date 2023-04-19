<template>
  <div class="c-table-box">
    <div class="c-btn-list">
      <el-button type="primary" @click="refresh">
        <el-icon class="el-icon--right"><i-ep-refresh /></el-icon>
        <span class="mgr_10">{{ t('common.refresh') }}</span>
      </el-button>
      <el-button type="primary" @click="handleAdd">
        <el-icon class="el-icon--right"><i-ep-plus /></el-icon>
        <span class="mgr_10">{{ t('views.UserManagement.addBtn') }}</span>
      </el-button>
    </div>
    <el-table :data="tableData" row-key="ID" size="default" v-loading="loading">
      <el-table-column label="ID" min-width="50" prop="id" />
      <el-table-column :label="t('views.UserManagement.login')" min-width="100" prop="login" />
      <el-table-column :label="t('views.UserManagement.email')" min-width="150" prop="email" />
      <el-table-column :label="t('views.UserManagement.langKey')" min-width="100" prop="langKey" />
      <el-table-column :label="t('views.UserManagement.authorities')" min-width="160" prop="authorities">
        <template #default="{ row }">
          <el-tag v-for="auth in row.authorities" :key="auth" type="info" style="margin-top: 2px">
            {{ auth }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('views.UserManagement.createdDate')" min-width="180" prop="createdDate">
        <template #default="{ row }">
          {{ dayjs(row.createdDate).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column :label="t('views.UserManagement.lastModifiedBy')" min-width="120" prop="lastModifiedBy" />
      <el-table-column :label="t('views.UserManagement.lastModifiedDate')" min-width="180" prop="lastModifiedDate">
        <template #default="{ row }">
          {{ dayjs(row.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column :label="t('views.UserManagement.action')" min-width="220" fixed="right">
        <template #default="scope">
          <el-button type="primary" link @click="handleView(scope.row.login)">
            <i-ep-view />
            <span>{{ t('common.viewText') }}</span>
          </el-button>
          <el-button type="primary" link @click="handleEdit(scope.row.login)">
            <i-ep-edit-pen />
            <span>{{ t('common.editText') }}</span>
          </el-button>

          <el-popconfirm :title="t('views.UserManagement.delBtn.question')" @confirm="handleDelete(scope.row.login)">
            <template #reference>
              <el-button type="primary" link>
                <i-ep-close />
                <span>{{ t('common.delText') }}</span>
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
    :title="t('views.UserManagement.dialog.title')"
    :show-close="true"
    :close-on-press-escape="false"
    :close-on-click-modal="true"
  >
    <div style="overflow: auto">
      <el-form ref="formEl" :model="userInfo" :rules="rules" label-width="100px" v-loading="dialogLoading">
        <el-form-item label="ID" prop="id" v-show="dialogType !== 'add'">
          <span>{{ userInfo.id }}</span>
        </el-form-item>
        <el-form-item :label="t('views.UserManagement.login')" prop="login">
          <el-input v-model="userInfo.login" v-if="dialogType !== 'view'" />
          <span v-else
            >{{ userInfo.login }}
            <i
              ><el-tag type="success" v-if="userInfo.activated">{{ t('views.UserManagement.activated') }}</el-tag>
              <el-tag type="danger" v-else>{{ t('views.UserManagement.deactivated') }}</el-tag>
            </i>
          </span>
        </el-form-item>
        <el-form-item :label="t('views.UserManagement.firstName')" prop="firstName">
          <el-input v-model="userInfo.firstName" v-if="dialogType !== 'view'" />
          <span v-else>{{ userInfo.firstName }}</span>
        </el-form-item>
        <el-form-item :label="t('views.UserManagement.lastName')" prop="lastName">
          <el-input v-model="userInfo.lastName" v-if="dialogType !== 'view'" />
          <span v-else>{{ userInfo.lastName }}</span>
        </el-form-item>
        <el-form-item :label="t('views.UserManagement.email')" prop="email">
          <el-input v-model="userInfo.email" v-if="dialogType !== 'view'" />
          <span v-else>{{ userInfo.email }}</span>
        </el-form-item>
        <el-form-item :label="t('views.UserManagement.activated')" prop="activated" v-show="dialogType !== 'view'">
          <el-checkbox v-model="userInfo.activated" />
        </el-form-item>
        <el-form-item :label="t('views.UserManagement.langKey')" prop="langKey">
          <el-select v-model="userInfo.langKey" placeholder="language" v-if="dialogType !== 'view'">
            <el-option v-for="item in langKeyOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <span v-else>{{ userInfo.langKey }}</span>
        </el-form-item>
        <template v-if="dialogType === 'view'">
          <el-form-item :label="t('views.UserManagement.createdBy')" prop="createdBy">
            <span>{{ userInfo.createdBy }} </span>
          </el-form-item>
          <el-form-item :label="t('views.UserManagement.createdDate')" prop="createdDate">
            <span>{{ dayjs(userInfo.createdDate).format('YYYY-MM-DD HH:mm:ss') }} </span>
          </el-form-item>
          <el-form-item :label="t('views.UserManagement.createdBy')" prop="createdBy">
            <span>{{ userInfo.lastModifiedBy }} </span>
          </el-form-item>
          <el-form-item :label="t('views.UserManagement.lastModifiedDate')" prop="lastModifiedDate">
            <span>{{ dayjs(userInfo.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss') }} </span>
          </el-form-item>
        </template>
        <el-form-item :label="t('views.UserManagement.authorities')" prop="authorities">
          <el-select
            v-model="userInfo.authorities"
            :placeholder="t('views.UserManagement.authorities_placeholder')"
            multiple
            v-if="dialogType !== 'view'"
          >
            <el-option v-for="item in authorityOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <template v-else>
            <el-tag v-for="auth in userInfo.authorities" :key="auth" type="info" style="margin-left: 4px">
              {{ auth }}
            </el-tag>
          </template>
        </el-form-item>
        <el-form-item :label="t('views.UserManagement.defaultPwd')" prop="defaultPwd" v-if="dialogType === 'add'">
          <span>123456</span>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="">
        <el-button @click="userDialogShow = false">{{ t('common.cancelText') }}</el-button>
        <el-button type="primary" @click="handleComfirm">{{ t('common.okText') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import type { AccountResultModel } from '@/api/sys/model/userModel'
import { fetchUserList, addUserApi, fetchAuthorities, fetchUserInfo, deleteUserApi, updateUserApi } from '@/api/admin/userManage'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import dayjs from 'dayjs'
import { useI18n } from '@/hooks/useI18n'
const { t } = useI18n()
//  dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
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
  tableData.value = userListRes.data.data
  authorityOptions.value = authoritiesRes.data
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

const formEl = ref<FormInstance>()

const initalUser = (): AccountResultModel => ({
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
  login: '',
  createdDate: ''
})
const userInfo = reactive(initalUser())

const langKeyOptions = [
  {
    value: 'zh-cn',
    label: 'zh-cn'
  }
]

// 校验
const rules = reactive<FormRules>({
  login: [
    {
      required: true,
      message: 'Please Input login'
    }
  ],
  email: [
    {
      required: true,
      message: 'Please Input Email'
    },
    {
      min: 5,
      message: 'Please Input email format',
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    }
  ]
})

const resetForm = () => {
  formEl.value?.resetFields()
  Object.assign(userInfo, initalUser())
}

const openDialog = (type: dialogOpenType) => {
  dialogType.value = type
  if (dialogType.value === 'add') {
    resetForm()
  }
  userDialogShow.value = true
}

const handleComfirm = () => {
  formEl.value?.validate(async (valid) => {
    if (valid) {
      if (dialogType.value === 'add') {
        await addUserApi(userInfo)
        initData()
      }
      if (dialogType.value === 'edit') {
        await updateUserApi(userInfo)
        initData()
      }
      ElMessage.success(t('common.success'))
      userDialogShow.value = false
    }
  })
}

const handleAdd = () => {
  openDialog('add')
}

const handleEdit = async (login: string) => {
  dialogLoading.value = true
  openDialog('edit')
  const res = await fetchUserInfo(login)
  Object.assign(userInfo, res.data)
  dialogLoading.value = false
}

const handleView = async (login: string) => {
  dialogLoading.value = true
  openDialog('view')
  const res = await fetchUserInfo(login)
  Object.assign(userInfo, res.data)
  dialogLoading.value = false
}

const handleDelete = async (login: string) => {
  await deleteUserApi(login)
  ElMessage.success(t('common.success'))

  refresh()
}
</script>
