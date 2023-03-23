import { http } from '@/utils/http'
import type { healthRecord } from './model/healthModel'

enum Api {
  Health = '/management/health'
}

export const featchHealth = () => {
  return http.request<healthRecord>('get', Api.Health)
}
