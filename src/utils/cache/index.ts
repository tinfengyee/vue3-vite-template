import { Storage, SessionStorage } from '@/utils/storage'
import * as CacheKey from '@/enums/cacheEnum'
import type { UserInfo } from '#/store'
import type { LocaleType } from '#/config'
class Cache {
  getToken = () => SessionStorage.getItem<string>(CacheKey.TOKEN_KEY)

  setToken = (token: string) => SessionStorage.setItem(CacheKey.TOKEN_KEY, token)

  getUserInfo = () => Storage.getItem<UserInfo>(CacheKey.USER_INFO_KEY)

  getLocale = () => Storage.getItem<LocaleType>(CacheKey.LANGUAGE_KEY)

  setLocale = (value: LocaleType) => Storage.setItem(CacheKey.LANGUAGE_KEY, value)
}
export default new Cache()
