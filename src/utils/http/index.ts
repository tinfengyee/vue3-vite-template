import Axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from 'axios'
import type { CustomHttpError, RequestMethods, CustomHttpResponse, CustomHttpRequestConfig } from './type.d'
import { stringify } from 'qs'
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { getToken, formatToken } from './auth'
import { useUserStoreHook } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
// import { useUserStoreHook } from '@/store/modules/user'

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
}

class CustomHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** token过期后，暂存待执行的请求 */
  private static requests: any[] = []

  /** 防止重复刷新token */
  private static isRefreshing: boolean = false

  /** 初始化配置对象 */
  private static initConfig: Omit<CustomHttpRequestConfig, 'headers'> = {}

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 重连原始请求 */
  private static retryOriginalRequest(config: CustomHttpRequestConfig) {
    return new Promise<CustomHttpRequestConfig>((resolve) => {
      CustomHttp.requests.push((token: string) => {
        config.headers['Authorization'] = formatToken(token)
        resolve(config)
      })
    })
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    CustomHttp.axiosInstance.interceptors.request.use(
      async (config: CustomHttpRequestConfig) => {
        // console.log('request-config:::', config)

        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config)
          return config
        }
        if (CustomHttp.initConfig.beforeRequestCallback) {
          CustomHttp.initConfig.beforeRequestCallback(config)
          return config
        }
        /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
        const whiteList = ['/refreshToken', '/login']
        return whiteList.some((v) => config!.url!.indexOf(v) > -1)
          ? config
          : new Promise((resolve) => {
              const data = getToken()
              if (data) {
                // 测试
                config.headers['Authorization'] = formatToken(data)
                resolve(config)
              } else {
                resolve(config)
              }
            })
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = CustomHttp.axiosInstance
    instance.interceptors.response.use(
      (response: CustomHttpResponse) => {
        const $config = response.config
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return response.data
        }
        if (CustomHttp.initConfig.beforeResponseCallback) {
          CustomHttp.initConfig.beforeResponseCallback(response)
          return response.data
        }
        // console.log('response:::', response)

        return response.data
      },
      (error: CustomHttpError) => {
        const $error = error
        const status = error.status || error.response!.status
        const url = error.response?.config.url
        if (status === 401 || status === 403) {
          if (status === 401) {
            // console.log('logout-401:::')
            if (!url?.endsWith('api/account') && !url?.endsWith('api/authenticate')) {
              // console.log('logout-in-401:::')
              ElMessage.error('登录过期')
              useUserStoreHook().logout()
              return
            }
          }
          console.log(url)
          console.log('Unauthorized!')
          return Promise.reject($error)
        }
        if (status >= 500) {
          console.log('Server error!')
        }

        $error.isCancelRequest = Axios.isCancel($error)
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      }
    )
  }

  /** 通用请求工具函数 T: response;  D: request */
  public request<T = any, D = any>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig<D>,
    axiosConfig?: CustomHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as CustomHttpRequestConfig

    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      CustomHttp.axiosInstance
        .request(config)
        .then((response) => resolve(response as T))
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的post工具函数 T: response;  D: request */
  public post<T, D>(url: string, params?: AxiosRequestConfig<D>, config?: CustomHttpRequestConfig): Promise<T> {
    return this.request<T>('post', url, params, config)
  }

  /** 单独抽离的get工具函数 */
  public get<T, D>(url: string, params?: AxiosRequestConfig<D>, config?: CustomHttpRequestConfig): Promise<T> {
    return this.request<T>('get', url, params, config)
  }
}

export const http = new CustomHttp()
