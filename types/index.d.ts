/**
 * @description: 展开查看类型
 */
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

type ExpandRecursively<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never) : T
