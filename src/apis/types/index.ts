import type { AxiosResResult } from '@/sdk'

export * from './user'

export type ApiResult<T = null> = Promise<T>
export type AxiosApiResult<T = null> = ApiResult<AxiosResResult<T>>
