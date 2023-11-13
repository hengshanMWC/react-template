import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { isUndefined } from 'lodash'
import errCode from 'err-code'

export interface AxiosResResult<T = null> {
  data: T
  code: number
  msg: string
}

export function combinationToken(token: string) {
  return `Bearer ${token}`
}
export interface RequestEvent {
  getToken?: () => string | null
  error?: (error: Error) => void
  tokenExpire?: (error: AxiosError<any>) => Promise<void> | void
  serverError?: (error: Error & errCode.Extensions) => void
}

export function createBusinessRequest(
  request: AxiosInstance,
  refreshTokenRequest?: () => Promise<string>,
  on: RequestEvent = {},
) {
  let refreshTokenRequestResult: Promise<string> | null = null
  request.interceptors.request.use(async (config) => {
    if (refreshTokenRequestResult)
      await refreshTokenRequestResult

    let token: string | null = ''
    if (on.getToken) {
      try {
        token = on.getToken()
      }
      catch (err) {
        console.log(err, 'token')
      }
    }

    if (token && !config.headers.Authorization)
      config.headers.Authorization = combinationToken(token)
    return config
  })

  async function handleRefreshTokenRequest(config: AxiosRequestConfig) {
    const token = await refreshTokenRequestResult
    config.headers = { ...config.headers, Authorization: combinationToken(token as string) }
    return request(config)
  }

  request.interceptors.response.use(
    (response) => {
      const res = response?.data
      // res 有值
      if (res || response.config?.responseType === 'blob') {
        if (!(isUndefined(res.code) || isUndefined(res.msg))) {
          if (verifySuccessCode(res.code))
            return res.data || null

          else
            return getReject(res)
        }
        else {
          return res
        }
      }
      return null
    },
    async (error: AxiosError<any>) => {
      const response = error.response
      if (response?.status === 401) {
        if (on.tokenExpire) {
          await on.tokenExpire(error)
        }
        const config = response?.config as AxiosRequestConfig
        if (refreshTokenRequest) {
          if (!refreshTokenRequestResult) {
            try {
              refreshTokenRequestResult = refreshTokenRequest()
                .finally(() => {
                  refreshTokenRequestResult = null
                })
              return await handleRefreshTokenRequest(config)
            }
            catch (error) {
              on.error && on.error(error as Error)
            }
          }
          else {
            // 刷新 token 期间，将其他请求存入队列，刷新成功之后重新请求一次
            return await handleRefreshTokenRequest(config)
          }
        }
      }
      else {
        on.serverError && on.serverError(error)
        const data = error?.response?.data
        return getReject(data, { data: data.error })
      }
    },
  )
}

export function verifySuccessCode(code: number | string) {
  return code.toString().startsWith('2')
}

export function getReject(res: AxiosResResult<any>, props?: errCode.Extensions) {
  return Promise.reject(errCode(new Error(res.msg), res.code.toString(), props))
}
