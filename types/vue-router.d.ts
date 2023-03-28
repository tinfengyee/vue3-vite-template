// typings.d.ts or router.ts
// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title: string
    // 是可选的
    isAdmin?: boolean
    // 每个路由都必须声明
    // requiresAuth: boolean
    link?: string
    icon?: string
    hidden?: boolean
    keepAlive?: boolean
  }
}

// export {}
