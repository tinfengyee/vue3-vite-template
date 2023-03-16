import { http } from '@/utils/http'
import type { LoginParams, LoginResultModel } from './model/userModel'

enum Api {
  Login = '/authenticate'
}

export const loginApi = (data: LoginParams) => {
  return http.request<LoginResultModel, LoginParams>('post', Api.Login, {
    data
  })
}
