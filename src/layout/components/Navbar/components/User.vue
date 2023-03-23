<template>
  <el-dropdown class="avatar-container" trigger="hover">
    <div class="avatar-wrapper">
      <template v-if="userinfo">
        <el-avatar shape="circle" :size="30" :src="userinfo.imageUrl" />
        <span>{{ userinfo.firstName }}</span>
      </template>
      <template v-else>
        <el-avatar shape="circle" :size="30" src="" />
      </template>
      <SvgIcon icon="icon-down" />
    </div>
    <template #dropdown>
      <el-dropdown-menu class="user-dropdown">
        <template v-if="!userinfo">
          <el-dropdown-item @click="showLoginForm = true">{{
            t('components.user.login')
          }}</el-dropdown-item>
          <el-dropdown-item divided> {{ t('components.user.register') }} </el-dropdown-item>
        </template>
        <template v-else>
          <el-dropdown-item @click="$router.push('/account/settings')">
            {{ t('components.user.settings') }}
          </el-dropdown-item>
          <el-dropdown-item @click="$router.push('/account/password')">
            {{ t('components.user.pwdChange') }}
          </el-dropdown-item>
          <el-dropdown-item @click="userStore.logout">
            {{ t('components.user.logout') }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <LoginForm v-model="showLoginForm" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon'
import LoginForm from '@/views/account/login/index.vue'
import { useUserStore } from '@/stores/modules/user'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()
const userStore = useUserStore()

const userinfo = computed(() => userStore.userInfo)

const showLoginForm = ref(false)
</script>

<style scoped lang="scss">
.avatar-wrapper {
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 8px;
  span {
    margin-left: 6px;
  }
  :deep(.svg-icon) {
    padding: 0 !important;
    margin-left: 2px;
  }
}
</style>
