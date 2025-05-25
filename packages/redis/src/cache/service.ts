import type Redis from 'ioredis'

import type { TCacheStore } from './store'

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

export class CacheStore implements TCacheStore {
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
