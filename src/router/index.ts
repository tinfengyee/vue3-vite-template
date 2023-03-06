import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import type { AppRouteRecordRaw } from '@/router/types'
import type { App } from 'vue'
import { $t } from '@/locales'

const base: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/welcome',
    meta: {
      title: $t('app.title')
    },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/welcome/index.vue'),
        meta: {
          title: $t('app.title')
        }
      }
    ]
  }
]

const add: Array<AppRouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    redirect: '/about/child',
    meta: {
      title: $t('routes.about')
    },
    children: [
      {
        path: '/about/child',
        name: 'AboutChildren',
        component: () => import('../views/aboutView/index.vue'),
        meta: {
          title: $t('routes.about.aboutChild')
        }
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...base, ...add] as unknown as RouteRecordRaw[]
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
