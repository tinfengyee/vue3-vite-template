export interface IResponseType<P = Record<string, unknown>> {
  code: number
  msg: string
  data: P
}
