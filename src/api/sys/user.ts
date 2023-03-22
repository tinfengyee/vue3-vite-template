import type { UserInfo } from '#/store'
import { http } from '@/utils/http'
import type {
  LoginParams,
  LoginResultModel,
  AccountResultModel,
  passwordParams
} from './model/userModel'

enum Api {
  Login = '/authenticate',
  Account = '/account',
  Password = '/account/change-password'
}

export const loginApi = (data: LoginParams) => {
  return http.request<LoginResultModel, LoginParams>('post', Api.Login, {
    data
  })
}

export const accountApi = () => {
  return http.request<AccountResultModel>('get', Api.Account)
}

export const updateAccount = (data: UserInfo) => {
  return http.request<any>('post', Api.Account, {
    data
  })
}
export const changePassword = (data: passwordParams) => {
  return http.request<any, passwordParams>('post', Api.Password, {
    data
  })
}
