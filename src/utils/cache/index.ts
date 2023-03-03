import { Storage } from '@/utils/storage'
import { USER_INFO_KEY, TOKEN_KEY } from '@/enums/cacheEnum'
import type { UserInfo } from '#/store'
class Cache {
  getToken = () => Storage.getItem<string>(TOKEN_KEY)
  getUserInfo = () => Storage.getItem<UserInfo>(USER_INFO_KEY)
}
export default new Cache()
