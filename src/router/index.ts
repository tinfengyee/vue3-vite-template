import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import type { AppRouteRecordRaw } from '@/router/types'
import type { App } from 'vue'

const base: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  }
]

const add: Array<AppRouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'About'
    }
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
