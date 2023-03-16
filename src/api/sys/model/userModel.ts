export interface LoginParams {
  username: string
  password: string
  rememberMe: boolean
}

export interface LoginResultModel {
  [p: string]: any
}
