import { CacheService } from '@mizzo/redis'
import { APP_SLUG } from '@mizzo/utils'

export const cache = new CacheService({
  app: 'API',
  defaultConfig: {
    ttl: 3600,
    prefix: `${APP_SLUG}:cache`
  }
})
