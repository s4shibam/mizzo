import { CacheFactory } from '@mizzo/redis'

export const cache = CacheFactory.create({
  app: 'API',
  config: {
    defaultTtl: 3600,
    prefix: 'cache'
  }
})
