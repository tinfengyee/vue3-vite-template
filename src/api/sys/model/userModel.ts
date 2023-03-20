export interface LoginParams {
  username: string
  password: string
  rememberMe: boolean
}

export interface LoginResultModel {
  id_token: string
}

export interface AccountResultModel {
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
