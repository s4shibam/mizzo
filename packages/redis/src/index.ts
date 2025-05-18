import Redis from 'ioredis'

import { NODE_ENV } from '@mizzo/utils'

const globalForRedis = global as unknown as { redis: Redis }

export const redis = globalForRedis.redis || new Redis(process.env.REDIS_URL!)

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

export * from './cache'
export * from './ratelimit/fixed-window'
export * from './ratelimit/index'
export * from './ratelimit/token-bucket'
