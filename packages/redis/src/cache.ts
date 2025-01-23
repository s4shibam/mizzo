import { redis } from '.'

type TCacheOptions = {
  ttl?: number // in seconds
  prefix?: string
}

type TWithCacheParams<T> = {
  key: string
  fn: () => Promise<T>
  options?: TCacheOptions
}

export const withCache = async <T>({
  key,
  fn,
  options = {}
}: TWithCacheParams<T>): Promise<T> => {
  if (!redis) {
    return fn()
  }

  const finalKey = options.prefix ? `${options.prefix}:${key}` : key

  try {
    const cachedData = await redis.get(finalKey)

    if (cachedData) {
      return JSON.parse(cachedData) as T
    }
  } catch (error) {
    console.error('Failed to get cached data', { key: finalKey, error })
  }

  const data = await fn()

  if (data) {
    try {
      await redis.set(finalKey, JSON.stringify(data), 'EX', options.ttl || 3600)
    } catch (error) {
      console.error('Failed to cache data', { key: finalKey, error })
    }
  }

  return data
}

export const invalidateCache = async (pattern: string): Promise<void> => {
  if (!redis) {
    return
  }

  const keys = await redis.keys(pattern)
  if (keys.length > 0) {
    try {
      await redis.del(...keys)
    } catch (error) {
      console.error('Failed to invalidate cache', { pattern, error })
    }
  }
}
