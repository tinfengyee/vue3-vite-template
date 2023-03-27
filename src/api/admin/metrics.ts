import { http } from '@/utils/http'
import type { JhimetricsModel, ThreadsItemModel } from './model/metricsModel'

enum Api {
  Jhimetrics = '/management/jhimetrics',
  Threaddump = '/management/threaddump'
}

export const featchJhimetrics = () => {
  return http.request<JhimetricsModel>('get', Api.Jhimetrics)
}
export const featchThreaddump = () => {
  return http.request<{ threads: ThreadsItemModel[] }>('get', Api.Threaddump)
}
