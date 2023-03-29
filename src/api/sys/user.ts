import type { UserInfo } from '#/store'
import http from '@/utils/http'
import type { LoginParams, LoginResultModel, AccountResultModel, passwordParams } from './model/userModel'

enum Api {
  Login = '/api/authenticate',
  Account = '/api/account',
  Password = '/api/account/change-password'
}

export const loginApi = (data: LoginParams) => {
  return http.request<LoginResultModel, LoginParams>({
    method: 'post',
    url: Api.Login,
    data
  })
}

export const accountApi = () => {
  return http.request<AccountResultModel>({
    method: 'get',
    url: Api.Account
  })
}

export const updateAccount = (data: UserInfo) => {
  return http.request<any>({ method: 'post', url: Api.Account, data })
}
export const changePassword = (data: passwordParams) => {
  return http.request<any, passwordParams>({
    method: 'post',
    url: Api.Password,
    data
  })
}
