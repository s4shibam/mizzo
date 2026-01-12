import { getRedis } from '..'
import type Redis from 'ioredis'

import type { RateLimitStrategy } from './strategy'

/**
 * Token Bucket Algorithm Implementation
 * - Tokens are added to a bucket at a constant rate
 * - Each request consumes one token
 * - If no tokens are available, the request is rejected
 */
export class TokenBucketStrategy implements RateLimitStrategy {
  private readonly redis: Redis | null
  private readonly capacity: number
  private readonly refillRate: number // tokens per second
  private readonly prefix: string

  /**
   * @param capacity Maximum number of tokens in the bucket
   * @param refillRate Rate at which tokens are added (tokens per second)
   * @param redis Redis client instance
   */
  constructor({
    capacity,
    refillRate,
    prefix,
    redis
  }: {
    capacity: number
    refillRate: number
    prefix?: string
    redis?: Redis
  }) {
    this.capacity = capacity
    this.refillRate = refillRate
    this.redis = redis ?? getRedis()
    this.prefix = prefix ?? 'ratelimit:token'
  }

  async isAllowed(key: string): Promise<boolean> {
    if (!this.redis) return true

    const nowInSecs = Date.now() / 1000
    const bucketKey = `${this.prefix}:${key}`
    const normalizedKey = bucketKey.replace(/:+/g, ':')

    const [tokensStr, lastRefillStr] = await this.redis.hmget(
      normalizedKey,
      'tokens',
      'lastRefill'
    )

    const tokens = tokensStr ? parseFloat(tokensStr) : this.capacity
    const lastRefill = lastRefillStr ? parseFloat(lastRefillStr) : nowInSecs

    const elapsedTime = nowInSecs - lastRefill
    const tokensToAdd = elapsedTime * this.refillRate
    const newTokens = Math.min(this.capacity, tokens + tokensToAdd)

    if (newTokens >= 1) {
      const remainingTokens = newTokens - 1

      await this.redis.hmset(
        bucketKey,
        'tokens',
        remainingTokens.toString(),
        'lastRefill',
        nowInSecs.toString()
      )
      await this.redis.expire(bucketKey, 24 * 60 * 60)

      return true
    }

    return false
  }
}
