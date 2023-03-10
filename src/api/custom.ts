import { http } from '@/utils/http'

export const getDemo = () => {
  return http.request('get', '/get')
}
