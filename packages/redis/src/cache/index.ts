import { getRedis } from '..'
import type Redis from 'ioredis'

import { log, type LogParams } from '@mizzo/logger'

import { env } from '../env'
import { CacheStore, NullCacheStore } from './service'
import type { TCacheStore } from './store'

type TCacheOptions = {
  ttl?: number
}

type TCacheDefaultConfig = {
  ttl: number
  prefix: string
}

export class CacheService {
  private store: TCacheStore
  private defaultConfig: TCacheDefaultConfig
  private app: LogParams['app']

  constructor({
    redis,
    defaultConfig,
    app
  }: {
    redis?: Redis
    defaultConfig?: TCacheDefaultConfig
    app?: LogParams['app']
  }) {
    const redisInstance = redis || getRedis()
    const isFallback = !redisInstance || !env.enableCaching

    this.store = isFallback
      ? new NullCacheStore()
      : new CacheStore(redisInstance)

    this.defaultConfig = {
      ttl: 1 * 60 * 60,
      prefix: 'cache',
      ...defaultConfig
    }

    this.app = app
  }

  async get<T>(key: string): Promise<T | null> {
    const finalKey = this.buildKey(key)

    try {
      const cachedData = await this.store.get(finalKey)
      return cachedData ? (JSON.parse(cachedData) as T) : null
    } catch (error) {
      log.error({
        message: 'Failed to get cached data',
        app: this.app,
        meta: { key: finalKey, error }
      })
      return null
    }
  }

  async set<T>({
    key,
    value,
    options = {}
  }: {
    key: string
    value: T
    options: TCacheOptions
  }): Promise<void> {
    if (!value) return

    const finalKey = this.buildKey(key)
    const ttl = options.ttl || this.defaultConfig.ttl

    try {
      await this.store.set(finalKey, JSON.stringify(value), ttl)
    } catch (error) {
      log.error({
        message: 'Failed to cache data',
        app: this.app,
        meta: { key: finalKey, error }
      })
    }
  }

  async getOrSet<T>({
    key,
    fn,
    options = {}
  }: {
    key: string
    fn: () => Promise<T>
    options: TCacheOptions
  }): Promise<T> {
    try {
      const cached = await this.get<T>(key)
      if (cached !== null) {
        return cached
      }

      const value = await fn().catch((error) => {
        log.error({
          message: 'Failed to execute data fetching function in getOrSet',
          app: this.app,
          meta: { key, error }
        })
        throw error
      })

      if (value !== null && value !== undefined) {
        await this.set({ key, value, options })
      }

      return value
    } catch (error) {
      log.error({
        message: 'Failed to get or set cached data',
        app: this.app,
        meta: { key, error }
      })

      throw error
    }
  }

  async invalidate(patterns: string | string[]): Promise<void> {
    const patternArray = Array.isArray(patterns) ? patterns : [patterns]

    try {
      const patternPromises = patternArray.map(async (pattern) => {
        return this.store.keys(this.buildKey(pattern))
      })

      const allKeys = await Promise.all(patternPromises)

      const uniqueKeys = Array.from(new Set(allKeys.flat()))

      if (uniqueKeys.length > 0) {
        await this.store.del(...uniqueKeys)
      }
    } catch (error) {
      log.error({
        message: 'Failed to invalidate cache',
        app: this.app,
        meta: { patterns: patternArray, error }
      })
      throw new Error(`Failed to invalidate cache: ${(error as Error).message}`)
    }
  }

  private buildKey(key: string): string {
    const finalKey = `${this.defaultConfig.prefix}:${key}`

    return finalKey.replace(/:+/g, ':')
  }
}
