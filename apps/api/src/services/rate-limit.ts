import {
  FixedWindowStrategy,
  RateLimiter,
  TokenBucketStrategy
} from '@mizzo/redis'
import { APP_SLUG } from '@mizzo/utils'

export const createTokenBucketRateLimiter = (
  capacity: number,
  refillRate: number
): RateLimiter => {
  const strategy = new TokenBucketStrategy({
    capacity,
    refillRate,
    prefix: `${APP_SLUG}:rate-limit:token`
  })
  return new RateLimiter(strategy)
}

export const createFixedWindowRateLimiter = (
  limit: number,
  windowSizeInSeconds: number
): RateLimiter => {
  const strategy = new FixedWindowStrategy({
    limit,
    windowSizeInSeconds,
    prefix: `${APP_SLUG}:rate-limit:window`
  })
  return new RateLimiter(strategy)
}
