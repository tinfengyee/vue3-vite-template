/**用户信息，与account 基本一致，可根据需要增加属性 */
export interface UserInfo {
  activated: boolean
  authorities: string[]
  createdBy: string
  createdDate: null
  email: string
  firstName: string
  id: number
  imageUrl: string
  langKey: string
  lastModifiedBy: string
  lastModifiedDate: null
  lastName: string
  login: string
}
