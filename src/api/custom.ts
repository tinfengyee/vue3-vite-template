import { http } from '@/utils/http'
type TestRes = {
  code: number
  data: {
    name: string
  }
}

type TestReq = {
  id: number
}

export const getDemo = (query: string, data: TestReq) => {
  return http.request<TestRes>('get', '/get', {
    params: {
      id: query
    },
    data
  })
}
