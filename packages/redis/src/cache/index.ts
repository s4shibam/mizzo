import { redis as defaultRedis } from '..'
import type Redis from 'ioredis'

import { CacheService } from './service'

type TCacheFactoryCreateParams = {
  redis?: Redis
  config?: CacheService['config']
  app?: CacheService['app']
}

export class CacheFactory {
  static create({
    redis = defaultRedis,
    config,
    app
  }: TCacheFactoryCreateParams = {}): CacheService {
    const finalConfig = { defaultTtlSecs: 1 * 60 * 60, ...config }

    return new CacheService(redis, finalConfig, app)
  }
}
