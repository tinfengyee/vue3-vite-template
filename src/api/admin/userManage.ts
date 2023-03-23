import { http } from '@/utils/http'
import type { LoginResultModel } from '../sys/model/userModel'

enum Api {
  userList = '/api/admin/users'
}
// interface UserListParam {
//   sort: string
//   page: string | number
//   size: string | number
// }

export const fetchUserList = (req?: any) => {
  return http.request<LoginResultModel[]>('get', Api.userList, {
    params: req
  })
}
