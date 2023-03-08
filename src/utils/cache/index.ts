import { Storage } from '@/utils/storage'
import * as CacheKey from '@/enums/cacheEnum'
import type { UserInfo } from '#/store'
import type { Lang } from '@/locales/type'
class Cache {
  getToken = () => Storage.getItem<string>(CacheKey.TOKEN_KEY)

  getUserInfo = () => Storage.getItem<UserInfo>(CacheKey.USER_INFO_KEY)

  getLocale = () => Storage.getItem<Lang>(CacheKey.LANGUAGE_KEY)

  setLocale = (value: Lang) => Storage.setItem(CacheKey.LANGUAGE_KEY, value)
}
export default new Cache()
