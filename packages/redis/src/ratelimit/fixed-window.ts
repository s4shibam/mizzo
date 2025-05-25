import { redis as defaultRedis } from '..'
import type Redis from 'ioredis'

import type { RateLimitStrategy } from './strategy'

/**
 * Fixed Window Algorithm Implementation
 * - Counts requests in fixed time windows (e.g., per minute)
 * - Resets counter at the beginning of each new window
 */
export class FixedWindowStrategy implements RateLimitStrategy {
  private readonly limit: number
  private readonly windowSizeInSeconds: number
  private readonly redis: Redis
  private readonly prefix: string

  /**
   * @param limit Maximum requests allowed in the window
   * @param windowSizeInSeconds Time window size in seconds
   * @param redis Redis client instance
   */
  constructor({
    limit,
    windowSizeInSeconds,
    prefix,
    redis
  }: {
    limit: number
    windowSizeInSeconds: number
    prefix?: string
    redis?: Redis
  }) {
    this.limit = limit
    this.windowSizeInSeconds = windowSizeInSeconds
    this.redis = redis ?? defaultRedis
    this.prefix = prefix ?? 'ratelimit:window'
  }

  async isAllowed(key: string): Promise<boolean> {
    // Create a time-bound key that changes each window
    const currentWindow = Math.floor(
      Date.now() / 1000 / this.windowSizeInSeconds
    )

    const windowKey = `${this.prefix}:${key}:${currentWindow}`
    const normalizedKey = windowKey.replace(/:+/g, ':')

    // Increment the counter for this window
    const count = await this.redis.incr(normalizedKey)

    // Set expiration for this window key (if not already set)
    if (count === 1) {
      await this.redis.expire(windowKey, this.windowSizeInSeconds)
    }

    // Check if request is allowed
    return count <= this.limit
  }
}
