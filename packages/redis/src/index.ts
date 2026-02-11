import Redis from 'ioredis'

import { log } from '@mizzo/logger'

import { env } from './env'

let redisInstance: Redis | null = null

export const getRedis = (): Redis | null => {
  if (!env.shouldUseRedis || env.redisUrl === 'NA') return null

  if (!redisInstance) {
    redisInstance = new Redis(env.redisUrl, {
      enableReadyCheck: false // Disable ready check to avoid unnecessary latency
    })

    redisInstance.on('error', (error) => {
      log.error({
        message: 'Redis connection error',
        meta: { error }
      })
    })
  }

  return redisInstance
}

export const disconnectRedis = async (): Promise<void> => {
  if (redisInstance) {
    try {
      await redisInstance.quit()
      redisInstance = null
    } catch (error) {
      log.error({
        message: 'Redis disconnect error',
        meta: { error }
      })
    }
  }
}

export * from './cache/index'
export * from './env'

export * from './ratelimit/fixed-window'
export * from './ratelimit/index'
export * from './ratelimit/token-bucket'
