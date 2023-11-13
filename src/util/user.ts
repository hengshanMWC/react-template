import { $enum } from 'ts-enum-util'
import { UserCacheKey } from '../constant'

export function getToken() {
  return localStorage.getItem(UserCacheKey.TOKEN)
}

export function setToken(data: string) {
  return localStorage.setItem(UserCacheKey.TOKEN, data)
}

export function clearUserInfo() {
  const cacheKeyList = $enum(UserCacheKey).getValues()
  cacheKeyList.map((key) => {
    return localStorage.removeItem(key)
  })
}
