import type { RouteRecordRaw } from 'vue-router'

export interface RouteMeta {
  title: string
  link?: string
  icon?: string
  hidden?: boolean
  keepAlive?: boolean
}

// @ts-ignore 或者使用 type xx = {} & RouteRecordRaw
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name?: string
  meta: RouteMeta
  children?: AppRouteRecordRaw[]
}

export interface Menu {
  name: string
  icon?: string
  path: string
  // .....
}
