import { useUserStoreHook } from '@/stores/modules/user'
import axios, { type CustomParamsSerializer } from 'axios'
import { ElMessage } from 'element-plus'
import { stringify } from 'qs'
import { formatToken, getToken } from './auth'

// axios实例
const http = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
    const whiteList = ['/refreshToken', '/login']
    return whiteList.some((v) => config!.url!.indexOf(v) > -1)
      ? config
      : new Promise((resolve) => {
          const token = getToken()
          if (token) {
            config.headers.Authorization = formatToken(token)
          }
          resolve(config)
        })
  },
  (error) => {
    return Promise.reject(error)
  }
)

/** 响应拦截 */
http.interceptors.response.use(
  (response) => {
    if (response.headers['x-total-count']) {
      // 这个 headers 是列表返回的总数，所以这样特殊处理,建议 total 放回 data 里面...
      return response
    }
    return response.data
  },
  (error) => {
    const status = error.status || error.response!.status
    const url = error.response?.config.url
    const message = error.response.data.detail || error.response?.data?.message || error.message
    if (status === 400) {
      // fieldErrors
    }
    if (status === 401 || status === 403) {
      if (!url?.endsWith('api/account') && !url?.endsWith('api/authenticate')) {
        useUserStoreHook().logout()
      }
    }
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default http
