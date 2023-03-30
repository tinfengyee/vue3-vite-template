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
  createdBy: string | null
  createdDate: string | null
  email: string
  firstName: string
  id: number | null
  imageUrl: string
  langKey: string
  lastModifiedBy: string | null
  lastModifiedDate: string | null
  lastName: string
  login: string
}

export interface passwordParams {
  currentPassword: string
  newPassword: string
  confirmPassword?: string
}
