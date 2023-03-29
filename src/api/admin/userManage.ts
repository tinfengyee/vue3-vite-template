import http from '@/utils/http'
import type { AxiosResponse } from 'axios'
import type { AccountResultModel } from '../sys/model/userModel'

enum Api {
  User = '/api/admin/users',
  Authorities = '/api/authorities'
}
// interface UserListParam {
//   sort: string
//   page: string | number
//   size: string | number
// }
export const fetchUserList = (req?: { page: number; size: number }) => {
  return http.request<any, AxiosResponse<AccountResultModel[]>>({
    method: 'get',
    url: Api.User,
    params: req
  })
}

export const addUserApi = (req?: any) => {
  return http.request({
    method: 'post',
    url: Api.User,
    data: req
  })
}

export const updateUserApi = (req?: any) => {
  return http.request({
    method: 'put',
    url: Api.User,
    data: req
  })
}

export const fetchAuthorities = () => {
  return http.request<any, string[]>({
    method: 'get',
    url: Api.Authorities
  })
}

export const fetchUserInfo = (login: string) => {
  return http.request({
    method: 'get',
    url: `${Api.User}/${login}`
  })
}
export const deleteUserApi = (login: string) => {
  return http.request({
    method: 'delete',
    url: `${Api.User}/${login}`
  })
}
