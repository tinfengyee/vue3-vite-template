import {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios'

export type resultType = {
  accessToken?: string
}

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface CustomHttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface CustomHttpResponse extends AxiosResponse {
  config: CustomHttpRequestConfig
}

export interface CustomHttpRequestConfig extends InternalAxiosRequestConfig {
  beforeRequestCallback?: (request: CustomHttpRequestConfig) => void
  beforeResponseCallback?: (response: CustomHttpResponse) => void
}

export default class CustomHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: CustomHttpRequestConfig
  ): Promise<T>
  post<T, P>(url: string, params?: T, config?: CustomHttpRequestConfig): Promise<P>
  get<T, P>(url: string, params?: T, config?: CustomHttpRequestConfig): Promise<P>
}
