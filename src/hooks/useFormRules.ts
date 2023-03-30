import { ref, reactive } from 'vue'
import type { FormRules } from 'element-plus'

export function useFormRules() {
  const rules = ref<FormRules>({
    login: [
      {
        required: true,
        message: 'Please Input Login'
      }
    ],
    email: [
      {
        required: true,
        message: 'Please Input Email'
      },
      {
        min: 5,
        message: 'Please Input email format',
        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      }
    ]
  })

  const getRules = (keys: string[]) => {
    const result: FormRules = {}
    keys.forEach((key) => {
      result[key] = rules.value[key]
    })
    return reactive(result)
  }

  return {
    rules,
    getRules
  }
}
