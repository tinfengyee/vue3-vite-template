import Axios, { type AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CustomParamsSerializer } from 'axios'
import type {
  CustomHttpError,
  RequestMethods,
  CustomHttpResponse,
  CustomHttpRequestConfig
} from './type.d'
import { stringify } from 'qs'
import NProgress from './progress'
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { getToken, formatToken } from './auth'
// import { useUserStoreHook } from '@/store/modules/user'

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_HOST,
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
        // 开启进度条动画
        NProgress.start()
        console.log(config)

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
              resolve(config) //这行后面删除
              // const data = getToken()
              // if (data) {
              //   // 根据时间判断是否过期
              //   const now = new Date().getTime()
              //   const expired = parseInt(data.expires) - now <= 0
              //   if (expired) {
              //     // token 失效
              //     if (!CustomHttp.isRefreshing) {
              //       CustomHttp.isRefreshing = true
              //       // token过期刷新 接口调用
              //       handRefreshToken({ refreshToken: data.refreshToken })
              //         .then((res) => {
              //           const token = res.data.accessToken
              //           config.headers['Authorization'] = formatToken(token)
              //           CustomHttp.requests.forEach((cb) => cb(token))
              //           CustomHttp.requests = []
              //         })
              //         .finally(() => {
              //           CustomHttp.isRefreshing = false
              //         })
              //     }
              //     resolve(CustomHttp.retryOriginalRequest(config))
              //   } else {
              //     // token 没有失效
              //     config.headers['Authorization'] = formatToken(data.accessToken)
              //     resolve(config)
              //   }
              // } else {
              //   resolve(config)
              // }
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
        // 关闭进度条动画
        NProgress.done()
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return response.data
        }
        if (CustomHttp.initConfig.beforeResponseCallback) {
          CustomHttp.initConfig.beforeResponseCallback(response)
          return response.data
        }
        return response.data
      },
      (error: CustomHttpError) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        // 关闭进度条动画
        NProgress.done()
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      }
    )
  }

  /** 通用请求工具函数 */
  public request<T = any, D = any>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: CustomHttpRequestConfig
  ): Promise<AxiosResponse<T, D>> {
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
        .then((response) => resolve(response))
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: CustomHttpRequestConfig
  ): Promise<AxiosResponse> {
    return this.request<P>('post', url, params, config)
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: CustomHttpRequestConfig
  ): Promise<AxiosResponse> {
    return this.request<P>('get', url, params, config)
  }
}

export const http = new CustomHttp()
