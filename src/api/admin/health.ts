import { http } from '@/utils/http'
import type { HealthComps } from './model/healthModel'

enum Api {
  Health = '/management/health'
}

export const featchHealth = () => {
  return http.request<HealthComps>('get', Api.Health)
}
