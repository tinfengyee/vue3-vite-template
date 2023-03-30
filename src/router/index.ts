import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import type { AppRouteRecordRaw } from '@/router/types'
import type { App } from 'vue'
import { $t } from '@/locales'
import { useUserStoreHook } from '@/stores/modules/user'
import NProgress from './progress'
import { t } from '@/hooks/web/useI18n'

const base: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/welcome',
    meta: {
      title: $t('routes.home.welcome')
    },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/welcome/index.vue'),
        meta: {
          title: $t('routes.home.welcome')
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/views/404.vue')
  }
]

const add: Array<AppRouteRecordRaw> = [
  {
    path: '/account',
    name: 'account',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    meta: {
      title: $t('routes.account.account')
    },
    children: [
      {
        path: '/account/settings',
        name: 'Settings',
        component: () => import('../views/account/settings/index.vue'),
        meta: {
          title: $t('routes.account.settings')
        }
      },
      {
        path: '/account/password',
        name: 'Password',
        component: () => import('../views/account/password/index.vue'),
        meta: {
          title: $t('routes.account.password')
        }
      },
      {
        path: '/account/register',
        name: 'Register',
        component: () => import('../views/account/register/index.vue'),
        meta: {
          title: $t('routes.account.password')
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    meta: {
      title: t('routes.admin.admin')
    },
    children: [
      {
        path: '/admin/user',
        name: 'UserManagement',
        component: () => import('@/views/admin/user/index.vue'),
        meta: {
          title: t('routes.admin.user')
        }
      },
      {
        path: '/admin/swagger',
        name: 'Swagger',
        component: () => import('@/views/admin/swagger/index.vue'),
        meta: {
          title: t('routes.admin.swagger')
        }
      }
    ]
  }
]

export const errorRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)',
  redirect: '/404'
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...base, ...add] as unknown as RouteRecordRaw[]
})

// 必须加上 /welcome 不然无限循环
const whiteList = ['/', '/welcome', '/account/register']

router.beforeEach(async (to, from, next) => {
  // 开启进度条动画
  NProgress.start()
  const userStore = useUserStoreHook()
  // token存在的情况
  if (userStore.token) {
    if (!userStore.userInfo) {
      try {
        // 用户信息不存在，则重新拉取用户等信息
        await userStore.getUserInfoAcion()
        // 这里可以处理路由表 router.addRoute(..)
        router.addRoute(errorRoute)

        // 错误路由
        next({ ...to, replace: true })
      } catch {
        userStore.resetState()
        next('/')
      }
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      // console.log('NO_Token:::')
      userStore.resetState()
      next('/')
    }
  }
})
router.afterEach(() => {
  // 关闭进度条动画
  NProgress.done()
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
