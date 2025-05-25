import { redis as defaultRedis } from '..'
import type Redis from 'ioredis'

import type { RateLimitStrategy } from './strategy'

/**
 * Token Bucket Algorithm Implementation
 * - Tokens are added to a bucket at a constant rate
 * - Each request consumes one token
 * - If no tokens are available, the request is rejected
 */
export class TokenBucketStrategy implements RateLimitStrategy {
  private readonly redis: Redis
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
    this.redis = redis ?? defaultRedis
    this.prefix = prefix ?? 'ratelimit:token'
  }

  async isAllowed(key: string): Promise<boolean> {
    const nowInSecs = Date.now() / 1000
    const bucketKey = `${this.prefix}:${key}`
    const normalizedKey = bucketKey.replace(/:+/g, ':')

    // Get current bucket state
    const [tokensStr, lastRefillStr] = await this.redis.hmget(
      normalizedKey,
      'tokens',
      'lastRefill'
    )

    // Parse values or use defaults
    const tokens = tokensStr ? parseFloat(tokensStr) : this.capacity
    const lastRefill = lastRefillStr ? parseFloat(lastRefillStr) : nowInSecs

    // Calculate tokens to add based on time elapsed
    const elapsedTime = nowInSecs - lastRefill
    const tokensToAdd = elapsedTime * this.refillRate

    // Update tokens (not exceeding capacity)
    const newTokens = Math.min(this.capacity, tokens + tokensToAdd)

    // Check if we have at least 1 token
    if (newTokens >= 1) {
      // Consume a token
      const remainingTokens = newTokens - 1

      // Update the bucket
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
