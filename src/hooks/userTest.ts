import { reactive, ref } from 'vue'

export function useCounter() {
  const kk = ref({
    count: 0
  })
  const increment = () => {
    const res: any = {}
    res['count'] = kk.value['count']
    return reactive(res)
  }
  return {
    kk,
    increment
  }
}
