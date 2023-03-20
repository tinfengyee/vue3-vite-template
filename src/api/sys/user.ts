import { http } from '@/utils/http'
import type { LoginParams, LoginResultModel, AccountResultModel } from './model/userModel'

enum Api {
  Login = '/authenticate',
  Account = '/account'
}

export const loginApi = (data: LoginParams) => {
  return http.request<LoginResultModel, LoginParams>('post', Api.Login, {
    data
  })
}

export const accountApi = () => {
  return http.request<AccountResultModel>('get', Api.Account)
}
