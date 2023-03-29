import http from '@/utils/http'
import type { JhimetricsModel, ThreadsItemModel } from './model/metricsModel'

enum Api {
  Jhimetrics = '/management/jhimetrics',
  Threaddump = '/management/threaddump'
}

export const featchJhimetrics = () => {
  return http.get<JhimetricsModel>(Api.Jhimetrics)
}
export const featchThreaddump = () => {
  return http.get<{ threads: ThreadsItemModel[] }>(Api.Threaddump)
}
