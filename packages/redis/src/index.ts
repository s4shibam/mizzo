import Redis from 'ioredis'

import { log } from '@mizzo/logger'
import { NODE_ENV } from '@mizzo/utils'

const globalForRedis = global as unknown as { redis: Redis }

export const redis = globalForRedis.redis || new Redis(process.env.REDIS_URL!)

redis.on('error', (error) => {
  log.error({
    message: 'Redis connection error',
    meta: { error }
  })
})

if (NODE_ENV !== 'prod') {
  globalForRedis.redis = redis
}

export const disconnectRedis = async (): Promise<void> => {
  if (redis) {
    try {
      await redis.quit()
      console.log('Redis connection closed')
    } catch (error) {
      console.log(`Redis connection close error...\n`, error)
    }
  }
}

export * from './cache/index'

export * from './ratelimit/fixed-window'
export * from './ratelimit/index'
export * from './ratelimit/token-bucket'
