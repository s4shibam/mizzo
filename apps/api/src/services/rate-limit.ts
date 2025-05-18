import {
  FixedWindowStrategy,
  RateLimiter,
  TokenBucketStrategy
} from '@mizzo/redis'

export const createTokenBucketRateLimiter = (
  capacity: number,
  refillRate: number
): RateLimiter => {
  const strategy = new TokenBucketStrategy({ capacity, refillRate })
  return new RateLimiter(strategy)
}

export const createFixedWindowRateLimiter = (
  limit: number,
  windowSizeInSeconds: number
): RateLimiter => {
  const strategy = new FixedWindowStrategy({ limit, windowSizeInSeconds })
  return new RateLimiter(strategy)
}
