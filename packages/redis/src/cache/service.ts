import type Redis from 'ioredis'

import { log } from '@mizzo/logger'

type TCacheStore = {
  get(key: string): Promise<string | null>
  set(key: string, value: string, seconds?: number): Promise<void>
  del(...keys: string[]): Promise<void>
  keys(pattern: string): Promise<string[]>
}

type TCacheOptions = {
  ttl?: number
  prefix?: string
}

type TCacheConfig = {
  defaultTtlSecs: number
  prefix?: string
}

export class RedisAdapter implements TCacheStore {
  constructor(private redis: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key)
  }

  async set(key: string, value: string, seconds?: number): Promise<void> {
    if (seconds) {
      await this.redis.set(key, value, 'EX', seconds)
    } else {
      await this.redis.set(key, value)
    }
  }

  async del(...keys: string[]): Promise<void> {
    if (keys.length > 0) {
      await this.redis.del(...keys)
    }
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern)
  }
}

export class NullCacheStore implements TCacheStore {
  async get(): Promise<string | null> {
    return null
  }

  async set(): Promise<void> {}

  async del(): Promise<void> {}

  async keys(): Promise<string[]> {
    return []
  }
}

export class CacheService {
  private store: TCacheStore
  private config: TCacheConfig
  private app: Parameters<(typeof log)['error']>[0]['app']

  constructor(
    redis: Redis,
    config: TCacheConfig,
    app?: Parameters<(typeof log)['error']>[0]['app']
  ) {
    this.store =
      redis && process.env.ENABLE_CACHE === 'true'
        ? new RedisAdapter(redis)
        : new NullCacheStore()
    this.config = config
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

    const finalKey = this.buildKey(key, options.prefix)
    const ttl = options.ttl || this.config.defaultTtlSecs

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

  private buildKey(key: string, prefix?: string): string {
    const finalPrefix = prefix || this.config.prefix
    return finalPrefix ? `${finalPrefix}:${key}` : key
  }
}
